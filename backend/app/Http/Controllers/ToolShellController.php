<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class ToolShellController extends Controller
{
    protected function isHostMode(): bool
    {
        return config('terminal.execution_mode') === 'host';
    }

    protected function buildHostCommand(string $command): string
    {
        $nsenterPath = escapeshellarg((string) config('terminal.host_nsenter_path', '/usr/bin/nsenter'));
        $hostPid = (int) config('terminal.host_pid', 1);
        $hostShell = escapeshellarg((string) config('terminal.host_shell', '/bin/bash'));
        $remoteCommand = escapeshellarg($command);

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

    protected function runSystemCommand(string $command, array &$output, int &$exitCode): void
    {
        if ($this->isHostMode()) {
            exec($this->buildHostCommand($command) . ' 2>&1', $output, $exitCode);
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
        $request->validate(['command' => 'required|string']);

        $command = trim($request->input('command'));

        if (empty($command)) {
            return response()->json(['output' => 'Command kosong']);
        }

        try {
            $output = [];
            $exitCode = 0;

            $this->runSystemCommand($command, $output, $exitCode);
            $normalizedOutput = trim(implode("\n", $output));

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
                    'output' => $normalizedOutput
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'executed_on' => $this->isHostMode() ? 'host' : (PHP_OS_FAMILY === 'Windows' ? 'wsl' : 'local'),
                    'exit_code' => $exitCode,
                    'output' => "Gagal menjalankan perintah '$command':\n" . $normalizedOutput
                ], 500);
            }
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'executed_on' => $this->isHostMode() ? 'host' : (PHP_OS_FAMILY === 'Windows' ? 'wsl' : 'local'),
                'output' => "Terjadi kesalahan: " . $e->getMessage()
            ], 500);
        }
    }
}