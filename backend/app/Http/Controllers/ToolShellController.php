<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class ToolShellController extends Controller
{
    protected function isWindowsHost(): bool
    {
        return PHP_OS_FAMILY === 'Windows';
    }

    protected function runSystemCommand(string $command, array &$output, int &$exitCode): void
    {
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

            if ($exitCode === 0) {
                return response()->json([
                    'success' => true,
                    'output' => implode("\n", $output)
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'output' => "Gagal menjalankan perintah '$command':\n" . implode("\n", $output)
                ], 500);
            }
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'output' => "Terjadi kesalahan: " . $e->getMessage()
            ], 500);
        }
    }
}