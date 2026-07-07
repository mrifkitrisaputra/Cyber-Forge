<?php

return [
    'execution_mode' => env('TERMINAL_EXECUTION_MODE', 'local'),
    'host_shell' => env('TERMINAL_HOST_SHELL', '/bin/bash'),
    'host_pid' => env('TERMINAL_HOST_PID', 1),
    'host_nsenter_path' => env('TERMINAL_HOST_NSENTER_PATH', '/usr/bin/nsenter'),
];