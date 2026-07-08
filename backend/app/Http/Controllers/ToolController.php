<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Tool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ToolController extends Controller
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
            '%s -t %d -m -u -i -n -p %s -lc %s',
            $nsenterPath,
            $hostPid,
            $hostShell,
            $remoteCommand
        );
    }

    // Daftar pola perintah yang diizinkan (whitelist)
    protected $allowedPatterns = [
        '/^sudo\s+apt\s+install\s+[a-zA-Z0-9\-\_\.]+$/i',
        '/^sudo\s+apt\s+install\s+[a-zA-Z0-9\-\_\.]+\s+-y$/i',
        '/^apt\s+update$/i',
        '/^apt\s+upgrade(\s+-y)?$/i',
        '/^apt\s+remove\s+[a-zA-Z0-9\-\_\.]+$/i',
        '/^apt\s+purge\s+[a-zA-Z0-9\-\_\.]+$/i',
        '/^sudo\s+apt-get\s+install\s+[a-zA-Z0-9\-\_\.]+$/i',
        '/^sudo\s+apt-get\s+install\s+-y\s+[a-zA-Z0-9\-\_\.]+$/i',
        '/^sudo\s+apt\s+update\s*&&\s*sudo\s+apt\s+install\s+[a-zA-Z0-9\-\_\.]+\s+-y$/i',
        '/^sudo\s+apt\s+update\s*&&\s*sudo\s+apt-get\s+install\s+-y\s+[a-zA-Z0-9\-\_\.]+$/i',
    ];

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

    protected function isCommandAllowed(string $command): bool
    {
        foreach ($this->allowedPatterns as $pattern) {
            if (preg_match($pattern, $command)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tools = Tool::all();

        return response()->json([
            'status' => 'success',
            'data' => $tools
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:tools,name',
            'category' => 'required|string',
            'description' => 'nullable|string',
            'installation_command' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        $tool = Tool::create([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'description' => $validated['description'] ?? null,
            'installation_command' => $validated['installation_command'],
            'is_installed' => $request->boolean('is_installed', true)
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Tool berhasil ditambahkan (instalasi dilewati secara simulasi)',
            'data' => $tool
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($toolName)
    {
        $tool = is_numeric($toolName)
            ? Tool::find($toolName)
            : Tool::where('name', $toolName)->first();

        if (!$tool) {
            return response()->json([
                'status' => 'error',
                'message' => "Tool '$toolName' tidak ditemukan"
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $tool
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $toolName)
    {
        $tool = is_numeric($toolName)
            ? Tool::find($toolName)
            : Tool::where('name', $toolName)->first();

        if (!$tool) {
            return response()->json([
                'status' => 'error',
                'message' => "Tool '$toolName' tidak ditemukan"
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|unique:tools,name,' . $tool->id,
            'category' => 'sometimes|required|string',
            'description' => 'sometimes|nullable|string',
            'installation_command' => 'sometimes|required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();
        $tool->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Tool berhasil diperbarui',
            'data' => $tool
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($toolName)
    {
        $tool = is_numeric($toolName)
            ? Tool::find($toolName)
            : Tool::where('name', $toolName)->first();

        if (!$tool) {
            return response()->json([
                'status' => 'error',
                'message' => "Tool '$toolName' tidak ditemukan"
            ], 404);
        }

        $tool->delete();

        return response()->json([
            'status' => 'success',
            'message' => "Tool '$toolName' berhasil dihapus"
        ], 204);
    }

    /**
     * Execute a WSL command with whitelist check.
     */
    public function executeWSL(Request $request)
    {
        $command = trim($request->input('command'));

        if (empty($command)) {
            return response()->json([
                'success' => false,
                'error' => 'Command tidak boleh kosong'
            ], 400);
        }

        if (!$this->isCommandAllowed($command)) {
            return response()->json([
                'success' => false,
                'error' => 'Perintah tidak diizinkan demi alasan keamanan'
            ], 403);
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
                    'error' => implode("\n", $output) ?: 'Unknown error',
                    'exit_code' => $exitCode
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Terjadi kesalahan eksekusi: ' . $e->getMessage()
            ]);
        }
    }

    public function checkAndInstallTool(Request $request)
    {
        $tool = trim($request->input('tool'));

        if (empty($tool)) {
            return response()->json([
                'success' => false,
                'error' => 'Tool tidak boleh kosong'
            ], 400);
        }

        try {
            $toolModel = Tool::where('name', $tool)->first();
            if ($toolModel) {
                $toolModel->update(['is_installed' => true]);
            }

            return response()->json([
                'success' => true,
                'message' => "Tool '$tool' registered successfully without executing an install command",
                'installed' => true,
                'output' => 'Installation skipped; stored as a registered tool.'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Terjadi kesalahan: ' . $e->getMessage()
            ]);
        }
    }

    public function getInstalledTools()
    {
        $tools = Tool::where('is_installed', true)->get();

        return response()->json([
            'success' => true,
            'data' => $tools
        ]);
    }
}
