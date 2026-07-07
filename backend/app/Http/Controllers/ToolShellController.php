<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class ToolShellController extends Controller
{
    protected const WORKING_DIR_MARKER = '__CYBER_FORGE_CWD__';

    protected function isHostMode(): bool
    {
        return config('terminal.execution_mode') === 'host';
    }

    protected function buildHostCommand(string $command, ?string $workingDirectory = null): string
    {
        $nsenterPath = escapeshellarg((string) config('terminal.host_nsenter_path', '/usr/bin/nsenter'));
        $hostPid = (int) config('terminal.host_pid', 1);
        $hostShell = escapeshellarg((string) config('terminal.host_shell', '/bin/bash'));
        $script = '';

        if (!empty($workingDirectory)) {
            $script .= 'cd ' . escapeshellarg($workingDirectory) . ' || exit 1; ';
        }

        $script .= $command . '; command_exit=$?; printf "\\n' . self::WORKING_DIR_MARKER . '%s\\n" "$PWD"; exit $command_exit';
        $remoteCommand = escapeshellarg($script);

        return sprintf(
            'timeout 15s %s -t %d -m -u -i -n -p %s -lc %s',
            $nsenterPath,
            $hostPid,
            $hostShell,
            $remoteCommand
        );
    }

    protected function isWindowsHost(): bool
    {
        return PHP_OS_FAMILY === 'Windows';
    }

    protected function runSystemCommand(string $command, array &$output, int &$exitCode, ?string $workingDirectory = null): void
    {
        if ($this->isHostMode()) {
            exec($this->buildHostCommand($command, $workingDirectory) . ' 2>&1', $output, $exitCode);
            return;
        }

        if ($this->isWindowsHost()) {
            exec('wsl /bin/bash -lc ' . escapeshellarg($command) . ' 2>&1', $output, $exitCode);
            return;
        }

        exec($command . ' 2>&1', $output, $exitCode);
    }

    public function runCommand(Request $request)
    {
        // Validasi input
        $request->validate([
            'command' => 'required|string',
            'cwd' => 'nullable|string',
        ]);

        $command = trim($request->input('command'));
        $workingDirectory = trim((string) $request->input('cwd', ''));

        if (empty($command)) {
            return response()->json(['output' => 'Command kosong']);
        }

        try {
            $output = [];
            $exitCode = 0;

            $this->runSystemCommand($command, $output, $exitCode, $workingDirectory !== '' ? $workingDirectory : null);
            $rawOutput = trim(implode("\n", $output));
            $resolvedWorkingDirectory = $workingDirectory !== '' ? $workingDirectory : null;

            if ($rawOutput !== '') {
                $lines = preg_split('/\r\n|\r|\n/', $rawOutput) ?: [];
                $lastLine = end($lines);

                if (is_string($lastLine) && str_starts_with($lastLine, self::WORKING_DIR_MARKER)) {
                    $resolvedWorkingDirectory = substr($lastLine, strlen(self::WORKING_DIR_MARKER));
                    array_pop($lines);
                    $rawOutput = trim(implode("\n", $lines));
                }
            }

            $normalizedOutput = trim($rawOutput);

            if ($normalizedOutput === '') {
                $normalizedOutput = $exitCode === 0
                    ? '(perintah dijalankan, tetapi tidak ada output)'
                    : '(perintah gagal tanpa output yang bisa dibaca)';
            }

            if ($exitCode === 0) {
                return response()->json([
                    'success' => true,
                    'executed_on' => $this->isHostMode() ? 'host' : (PHP_OS_FAMILY === 'Windows' ? 'wsl' : 'local'),
                    'exit_code' => $exitCode,
                    'working_directory' => $resolvedWorkingDirectory,
                    'output' => $normalizedOutput
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'executed_on' => $this->isHostMode() ? 'host' : (PHP_OS_FAMILY === 'Windows' ? 'wsl' : 'local'),
                    'exit_code' => $exitCode,
                    'working_directory' => $resolvedWorkingDirectory,
                    'output' => "Gagal menjalankan perintah '$command':\n" . $normalizedOutput
                ], 500);
            }
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'executed_on' => $this->isHostMode() ? 'host' : (PHP_OS_FAMILY === 'Windows' ? 'wsl' : 'local'),
                'working_directory' => $workingDirectory !== '' ? $workingDirectory : null,
                'output' => "Terjadi kesalahan: " . $e->getMessage()
            ], 500);
        }
    }
}