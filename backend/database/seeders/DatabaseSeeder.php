<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['username' => 'testuser'],
            [
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => Hash::make('TestUser123!'),
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate([
            'username' => 'demo'], [
            'name' => 'Demo User',
            'email' => 'demo@example.com',
            'password' => Hash::make('DemoUser123!'),
            'email_verified_at' => now(),
        ]);
    }
}
