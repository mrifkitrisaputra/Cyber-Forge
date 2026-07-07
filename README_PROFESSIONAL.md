# Cyber-Forge

[![PHP Version](https://img.shields.io/badge/PHP-%3E%3D8.2-blue?logo=php)](https://www.php.net/)
[![Laravel Version](https://img.shields.io/badge/Laravel-12.0-FF2D20?logo=laravel)](https://laravel.com/)
[![React Version](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows-blue?logo=windows)](https://www.microsoft.com/windows/)

> **Unified Command Center for Cybersecurity Operations**: An enterprise-grade, full-stack web application designed as an integrated dashboard for OSINT reconnaissance, penetration testing, and cybersecurity tool orchestration.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Usage Guide](#usage-guide)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Tool Execution Architecture (Core Feature)](#tool-execution-architecture-core-feature)
- [Security Considerations](#security-considerations)
- [Developer Guide](#developer-guide)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 📌 Overview

**Cyber-Forge** is a professional-grade cybersecurity platform that consolidates multiple security operations into a single, intuitive web-based interface. Designed specifically for security researchers, penetration testers, and organizations conducting cybersecurity assessments, it provides:

- **Centralized Tool Management**: Execute reconnaissance and penetration testing tools via a web interface without SSH/terminal access
- **OSINT Integration**: Pre-built Google Dorking patterns for automated reconnaissance  
- **Multi-User Support**: Enterprise authentication with email verification and secure password management
- **Remote Command Execution**: Secure WSL-based command execution with tool validation and whitelisting
- **Real-Time Feedback**: Terminal-like output streaming from backend tool execution

### Target Users
- Security Researchers
- Penetration Testers  
- Cybersecurity Professionals
- College/University Security Programs
- Security Operations Centers (SOC)

### Primary Use Cases
1. **Asset Discovery & Reconnaissance**: Execute OSINT tools (nmap, whois, DNS tools) from central dashboard
2. **Vulnerability Assessment**: Run scanners (nessus, openvas, burpsuite) without local installation
3. **Penetration Testing Orchestration**: Coordinate multiple security tools across a single interface
4. **Team Collaboration**: Multi-user access with email-based authentication

---

## ✨ Key Features

### 🔐 **Advanced Authentication System**
- **User Registration** with email verification requirement
- **JWT-based Authorization** using Laravel Sanctum for API security  
- **Password Reset** via encrypted email tokens with expiration
- **Role-ready Architecture** for future RBAC implementation
- Protected routes with automatic token validation

### 🛠️ **Tool Management & Execution**
- **Tool Registry Database**: Maintain catalog of security tools with installation commands
- **WSL Integration**: Execute Linux tools directly from Windows via Windows Subsystem for Linux
- **Installation Verification**: Check tool installation status before execution
- **Command Whitelist**: Security patterns to restrict dangerous commands
- **Real-time Execution Output**: Stream command results back to web interface

### 🔍 **OSINT Module (Google Dorking)**
- **Pre-Built Query Database**: 40+ Google Dorking queries in JSON format
- **Domain-Targeted Searches**: Automatically scope searches to target domain
- **Query Categories**: Organized by reconnaissance type (email discovery, file findings, etc.)
- **One-Click Execution**: Launch Google searches with crafted dork queries

### 🎨 **Professional UI/UX**
- **Dark Theme Dashboard**: Modern, accessible dark interface
- **Responsive Design**: Mobile-optimized layouts
- **Real-time Tool Search & Filtering**: Find tools by name or category
- **Contextual Status Indicators**: Know which tools are installed and ready

### 📊 **Enterprise-Ready**
- **CORS Protection**: Configured for frontend security
- **Stateless API Design**: Scalable REST architecture
- **Database Migrations**: Version-controlled schema changes
- **Development Automation**: PowerShell scripts for easy startup/shutdown

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (React)                  │
│  ┌──────────┐  ┌─────────────┐  ┌──────────────────┐   │
│  │ Login UI │  │ Tools Board │  │ Google Dorking   │   │
│  └─────┬────┘  └──────┬──────┘  │ OSINT Dashboard  │   │
│        │               │         └────────┬─────────┘   │
│        │               ├─────────────────────────────┐   │
│        └───────┬───────┘                             │   │
│              Axios HTTP Client (Bearer Token)        │   │
└─────────────────────────────────────────────────────│───┘
                                                      │
             REST API Gateway (CORS Protected)        │
                                                      │
┌─────────────────────────────────────────────────────▼───┐
│              SERVER LAYER (Laravel 12)                   │
├──────────────────────────────────────────────────────────┤
│                    API Routes Layer                      │
│  ┌──────────────┐  ┌────────────┐  ┌───────────────┐  │
│  │ Auth Routes  │  │ Tool Routes │  │ Exec Routes   │  │
│  └──────────────┘  └────────────┘  └───────────────┘  │
│                                                          │
│              Middleware Layer (JWT Auth)                │
│  ┌──────────────────────────────────────────────────┐  │
│  │ CORS · Authentication · Session Management       │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│              Controller Layer (Business Logic)          │
│  ┌────────────────┐  ┌────────────────┐ ┌────────────┐ │
│  │ AuthController │  │ ToolController │ │ ToolShell  │ │
│  │ • Login        │  │ • CRUD Tool    │ │ Controller │ │
│  │ • Signup       │  │ • Validation   │ │ • Exec     │ │
│  │ • Verify Email │  │ • Install CHK  │ │ • WSL      │ │
│  └────────────────┘  └────────────────┘ └────────────┘ │
│                                                          │
│              Data Layer (Eloquent ORM)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ User Model   │  │ Tool Model   │  │ Password     │  │
│  │              │  │              │  │ Reset Model  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│              Persistence Layer (SQLite/MySQL)           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ users table  │  │ tools table   │  │ password_    │  │
│  │              │  │               │  │ resets table │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
         ┌────────────────────────────────────┐
         │  WSL (Windows Subsystem for Linux) │
         │  • Tool Execution: exec()          │
         │  • Bash Interface: /bin/bash       │
         │  • Return Output: stdout/stderr    │
         └────────────────────────────────────┘
```

### Information Flow

#### Authentication Flow
```
User Signup → Email Verification → Verified User Account → Login
                                                             ↓
                                                    JWT Token (Sanctum)
                                                             ↓
                                          Authenticated API Access
```

#### Tool Execution Flow
```
React UI (Tools.jsx)
    ↓
POST /run-command (with JWT Token)
    ↓
ToolShellController::runCommand()
    ├─ Validate command
    ├─ Check tool exists in DB
    ├─ Verify tool is installed (is_installed = true)
    └─ Execute via WSL
        ↓
    exec("wsl /bin/bash -c \"$command\"")
        ↓
    Capture stdout/stderr
        ↓
Response: { output: "..." } + HTTP Status Code
    ↓
React UI Updates Terminal Output
```

---

## 💻 Tech Stack

### Backend

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Framework** | Laravel | 12.0 | Web application framework |
| **Language** | PHP | ≥ 8.2 | Server-side logic |
| **Authentication** | Laravel Sanctum | 4.1 | API token management |
| | JWT Auth | 2.2 | JWT token implementation |
| **Database** | SQLite/MySQL | Latest | Data persistence |
| **ORM** | Eloquent | Built-in | Database abstraction |
| **Validation** | Laravel Validator | Built-in | Input validation |
| **Email** | Laravel Mail | Built-in | Email notifications |
| **Testing** | PHPUnit | 11.5.3 | Unit/Feature tests |

### Frontend

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Framework** | React | 19.0 | UI component library |
| **Build Tool** | Vite | 6.1.0 | Module bundler |
| **CSS Framework** | TailwindCSS | 4.0.4 | Utility-first CSS |
| **Routing** | React Router | 7.1.5 | Client-side routing |
| **HTTP Client** | Axios | 1.7.9 | API requests |
| **Icons** | React Icons | 5.4.0 | Icon library |
| | Lucide React | 0.475.0 | Additional icons |
| **Animations** | Framer Motion | 12.4.3 | Motion library |
| **Terminal Emulation** | xterm.js | 5.3.0 | Terminal UI |
| **UI Components** | Headless UI | 2.2.0 | Accessible components |
| **Linting** | ESLint | 9.19.0 | Code quality |

### DevOps & Automation

| Tool | Purpose |
|------|---------|
| **Laragon** | Local PHP/MySQL development server (Windows) |
| **Windows Subsystem for Linux (WSL)** | Linux environment for tool execution |
| **PowerShell Scripts** | Automation (startup/shutdown) |
| **npm/Composer** | Dependency management |

---

## 📦 Prerequisites

### System Requirements

- **Operating System**: Windows 10/11 (with WSL 2 enabled)
- **Memory**: 4GB RAM minimum (8GB recommended)
- **Disk Space**: 2GB minimum
- **Internet**: Required for package installation

### Required Software

#### Windows Subsystem for Linux (WSL 2)
```powershell
# Check if WSL is installed
wsl --list -v

# If not installed, enable WSL 2:
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform

# Set WSL 2 as default
wsl --set-default-version 2

# Install Ubuntu LTS (recommended)
# Download from Microsoft Store or use:
wsl --install -d Ubuntu
```

#### PHP 8.2+ with Composer
```powershell
# Via Laragon (recommended)
# Download from: https://laragon.org/

# Or install manually:
# https://www.php.net/downloads
# https://getcomposer.org/
```

#### Node.js & npm
```powershell
# Download from: https://nodejs.org/ (LTS 20+)
# Or via Chocolatey:
choco install nodejs --version=20.0.0
```

#### Git (Optional but recommended)
```powershell
# https://git-scm.com/
# Or via Chocolatey:
choco install git
```

### Verification

```powershell
# Verify installations
php --version        # PHP 8.2+
composer --version   # Composer 2.x
node --version       # Node 20+
npm --version        # npm 10+
wsl --list -v        # WSL 2 with Ubuntu
```

---

## 🚀 Installation & Setup

### Step 1: Clone Repository

```powershell
# Navigate to desired location
cd C:\Users\YourUsername\Projects

# Clone repository
git clone https://github.com/mrifkitrisaputra/Cyber-Forge.git
cd Cyber-Forge
```

### Step 2: Configure Environment Variables

#### Backend (.env)
```powershell
# Navigate to backend
cd backend

# Copy example to .env
Copy-Item .env.example -Destination .env

# Generate Laravel app key
php artisan key:generate

# Generate JWT secret
php artisan jwt:secret
```

**Edit `.env` with your settings:**

```env
APP_NAME=Cyber-Forge
APP_ENV=local
APP_KEY=base64:YOUR_APP_KEY_HERE
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database (SQLite for development)
DB_CONNECTION=sqlite
DB_DATABASE=database.sqlite

# Or for MySQL:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=cyber_forge
# DB_USERNAME=root
# DB_PASSWORD=

# Email (configure for production)
MAIL_MAILER=log
MAIL_HOST=127.0.0.1
MAIL_PORT=2525

# Frontend URL (for password reset links)
FRONTEND_URL=http://localhost:5173

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_ALGORITHM=HS256
```

#### Frontend (.env)
```powershell
# Create .env file in frontend folder (if needed)
# The API endpoint is configured in src/api/api.jsx
```

### Step 3: Install Dependencies

```powershell
# Backend dependencies
cd backend
composer install

# Frontend dependencies
cd ../frontend
npm install
```

### Step 4: Database Setup

```powershell
# Navigate to backend
cd backend

# Run migrations
php artisan migrate

# (Optional) Seed with test data
php artisan db:seed
```

### Step 5: Install Linux Tools (via WSL)

```powershell
# Open WSL terminal
wsl

# Update package manager
sudo apt update

# Install common cybersecurity tools (optional but recommended)
sudo apt install -y nmap dnsutils whois curl wget git

# Exit WSL
exit
```

### Step 6: Start Development Servers

#### Option A: Using PowerShell Script (Recommended)

```powershell
# From project root
.\laragon.ps1
```

This will automatically:
- Start Laragon GUI
- Launch backend (PHP Artisan Server on port 8000)
- Launch Frontend Vite server (port 5173)
- Open browser to frontend and phpMyAdmin

#### Option B: Manual Start

```powershell
# Terminal 1: Backend
cd backend
php artisan serve

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: Optional - Laragon GUI
D:\tools\laragon\laragon\laragon.exe
```

### Step 7: Access Application

```
Frontend: http://localhost:5173
Backend API: http://localhost:8000/api
phpMyAdmin: http://localhost/phpmyadmin
```

---

## ⚙️ Configuration

### API Configuration

#### CORS Settings (`backend/config/cors.php`)

```php
'paths' => ['*'],
'allowed_methods' => ['*'],
'allowed_origins_patterns' => ['*localhost*'],  # Restrict in production!
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

**⚠️ Production Note**: Update `allowed_origins_patterns` to specific domain:

```php
'allowed_origins' => [
    'https://yourdomain.com',
    'https://app.yourdomain.com'
],
```

#### JWT Configuration (`backend/config/jwt.php`)

```php
'secret' => env('JWT_SECRET'),
'algorithm' => 'HS256',  # or RS256, ES256 for production
```

### Database Selection

#### SQLite (Development - Default)

```env
DB_CONNECTION=sqlite
DB_DATABASE=database.sqlite
```

#### MySQL (Production)

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cyber_forge
DB_USERNAME=root
DB_PASSWORD=your_password
```

```powershell
# Create database
mysql -u root -p
> CREATE DATABASE cyber_forge;
> EXIT;
```

### Email Configuration

For production, configure real email service:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io  # or your provider
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@cyber-forge.com
MAIL_FROM_NAME="Cyber-Forge"
```

Supported mailers: `smtp`, `mailgun`, `postmark`, `ses`, `resend`, `sendmail`

---

## 📖 Usage Guide

### User Onboarding

#### 1. Register New Account

```
URL: http://localhost:5173/signup
```

**Fill in:**
- Username (unique identifier)
- Email (must be valid)
- Password (min 8 characters)
- Confirm Password

**Backend Flow:**
```
POST /api/signup
├─ Validate input
├─ Check email uniqueness
├─ Hash password
├─ Create user
└─ Send verification email
```

#### 2. Verify Email

Check your email inbox for verification link. Click to verify.

**Verification Process:**
```
GET /api/verify-email/{id}?token=xxx
├─ Validate token
└─ Mark email_verified_at = now()
```

#### 3. Login

```
URL: http://localhost:5173/login
```

**Credentials:**
- Username (or email)
- Password

**Returns:** JWT Bearer token stored in localStorage

---

### Tools Management

#### Access Tools Dashboard

```
URL: http://localhost:5173/tools (Protected route)
```

#### Add New Tool

1. Click **"+ Add Tool"** button
2. Fill form:
   - **Name**: Tool identifier (e.g., `nmap`)
   - **Category**: Category (e.g., `Reconnaissance`)
   - **Description**: Purpose of tool
   - **Installation Command**: e.g., `sudo apt-get install -y nmap`

3. System will:
   - Check if tool is installed in WSL
   - Install if missing
   - Save to database

#### Execute Tool Command

```
Example: Running nmap scan
```

**Frontend:**
```
POST /api/run-command
{
  "command": "nmap -sV -p 80,443 target.com"
}
```

**Backend Processing:**
```php
1. Validate command structure
2. Extract tool name: "nmap"
3. Check Tool::where('name', 'nmap')->exists()
4. Verify is_installed == true
5. Execute: exec("wsl /bin/bash -c \"nmap ...\"")
6. Return output
```

**Response:**
```json
{
  "output": "Starting Nmap 7.92...\nNmap scan report for target.com\n..."
}
```

---

### Google Dorking (OSINT)

#### Access Dorking Dashboard

```
URL: http://localhost:5173/google-dorking
```

#### Execute Dorking Query

1. Enter target domain (e.g., `example.com`)
2. Click any query button  
3. Opens Google search with crafted query

**Example Query:**
```
Input Domain: example.com
Click: "Email Addresses (Google Groups)"
Opens: https://www.google.com/search?q=site:example.com%20filetype:pdf%20intitle:email
```

#### Query Database

Queries stored in: `frontend/src/api/dorking.json`

Structure:
```json
{
  "name": "Email Addresses (Google Groups)",
  "icon": "/path/to/icon.png",
  "query": "allinurl:groups.google.com",
  "type": "google",
  "urlTemplate": null
}
```

---

### Password Recovery

#### Forgot Password Flow

1. Click "Forgot Password" on login page
2. Enter email address
3. Check email for reset link
4. Click link (valid for 60 minutes)
5. Enter new password
6. Password updated

**Backend Process:**
```
POST /api/forgot-password
├─ Validate email
├─ Generate token: Str::random(60)
├─ Store in password_resets table
└─ Send email with reset URL

GET /api/check-reset-token
├─ Validate token existence
├─ Validate email match
└─ Return valid: true/false

POST /api/reset-password
├─ Validate token
├─ Hash new password
├─ Update user.password
└─ Delete token
```

---

## 📁 Project Structure

```
Cyber-Forge/
│
├── 📂 backend/                          # Laravel 12 API Server
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Auth/
│   │   │   │   │   ├── LoginController.php          # User login
│   │   │   │   │   ├── SignupController.php         # User registration
│   │   │   │   │   ├── VerifyEmailController.php    # Email verification
│   │   │   │   │   ├── ForgotPasswordController.php # Reset initiation
│   │   │   │   │   └── ResetPasswordController.php  # Reset completion
│   │   │   │   ├── ToolController.php               # Tool CRUD & validation
│   │   │   │   └── ToolShellController.php          # Command execution (CORE)
│   │   │   └── Controller.php
│   │   │
│   │   ├── Mail/
│   │   │   ├── VerifyEmail.php                      # Email verification template
│   │   │   └── ResetPasswordMail.php                # Password reset template
│   │   │
│   │   ├── Models/
│   │   │   ├── User.php                             # User model with JWT traits
│   │   │   └── Tool.php                             # Tool model
│   │   │
│   │   └── Providers/
│   │       └── AppServiceProvider.php               # App initialization
│   │
│   ├── bootstrap/
│   │   ├── app.php                                  # Application bootstrap
│   │   └── providers.php                            # Service providers
│   │
│   ├── config/
│   │   ├── app.php                                  # App configuration
│   │   ├── auth.php                                 # Authentication config
│   │   ├── cors.php                                 # CORS settings
│   │   ├── database.php                             # Database connections  
│   │   ├── jwt.php                                  # JWT configuration
│   │   ├── mail.php                                 # Mail service config
│   │   ├── sanctum.php                              # Token guards
│   │   └── services.php                             # Third-party services
│   │
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 0001_01_01_000000_create_users_table.php
│   │   │   ├── 2025_05_11_080351_modify_users_table_for_username.php
│   │   │   ├── 2025_05_11_080631_create_password_resets_table.php
│   │   │   ├── 2025_05_17_200907_create_tools_table.php
│   │   │   └── 2025_05_19_013648_add_is_installed_to_tools_table.php
│   │   │
│   │   ├── factories/
│   │   │   ├── ToolFactory.php
│   │   │   └── UserFactory.php
│   │   │
│   │   └── seeders/
│   │       └── DatabaseSeeder.php
│   │
│   ├── public/
│   │   └── index.php                                # Application entry point
│   │
│   ├── routes/
│   │   ├── api.php                                  # API route definitions
│   │   └── web.php                                  # Web route definitions
│   │
│   ├── storage/                                     # Uploads, logs, cache
│   ├── tests/                                       # PHPUnit test files
│   │
│   ├── .env.example                                 # Environment template
│   ├── .editorconfig
│   ├── composer.json                                # PHP dependencies
│   ├── phpunit.xml                                  # Test configuration
│   └── artisan                                      # Artisan CLI
│
│
├── 📂 frontend/                         # React 19 SPA
│   ├── src/
│   │   ├── pages/
│   │   │   ├── login.jsx                            # Login page
│   │   │   ├── signup.jsx                           # Registration page
│   │   │   ├── home.jsx                             # Dashboard/home
│   │   │   ├── forgotpassword.jsx                   # Forgot password page
│   │   │   ├── resetpassword.jsx                    # Reset password page
│   │   │   ├── Tools.jsx                            # Tools management (CORE)
│   │   │   └── google-dorking.jsx                   # OSINT dashboard
│   │   │
│   │   ├── component/
│   │   │   ├── layout.jsx                           # Main layout wrapper
│   │   │   └── navbar.jsx                           # Navigation bar
│   │   │
│   │   ├── context/
│   │   │   └── authContext.jsx                      # Auth state management
│   │   │
│   │   ├── api/
│   │   │   ├── api.jsx                              # Axios config + interceptors
│   │   │   └── dorking.json                         # Google Dorking queries DB
│   │   │
│   │   ├── assets/                                  # Static assets (CSV exports, etc.)
│   │   │
│   │   ├── App.jsx                                  # Main app component
│   │   ├── main.jsx                                 # Entry point
│   │   └── index.css / App.css                      # Styling
│   │
│   ├── public/
│   │   └── aset/                                    # Public assets
│   │
│   ├── .eslintrc.config.js                          # ESLint configuration
│   ├── vite.config.js                               # Vite build configuration
│   ├── tailwind.config.js                           # TailwindCSS configuration
│   ├── package.json                                 # Dependencies
│   └── index.html                                   # HTML template
│
│
├── 📄 package.json                      # Root scripts (start/stop)
├── 📄 .env                              # Root environment (if needed)
├── 📄 .gitignore                        # Git exclusions
├── 📄 LICENSE                           # MIT License
│
├── 🔧 laragon.ps1                       # Windows startup automation
├── 🔧 stop.ps1                          # Windows shutdown automation
│
└── 📖 README.md                         # This file
```

### Key File Descriptions

| File | Purpose |
|------|---------|
| `ToolShellController.php` | **CRITICAL** - Executes commands via WSL |
| `ToolController.php` | Tool CRUD + installation validation |
| `authContext.jsx` | Frontend authentication state |
| `api.jsx` | Axios instance with JWT interceptor |
| `dorking.json` | OSINT query database |
| `migrations/` | Database schema version control |
| `laragon.ps1` | Development environment launcher |

---

## 🔌 API Reference

### Authentication Endpoints

#### Register User
```http
POST /api/signup
Content-Type: application/json

{
  "username": "researcher1",
  "email": "researcher@example.com",
  "password": "securepass123",
  "password_confirmation": "securepass123"
}
```

**Response (201):**
```json
{
  "message": "Registration successful. Please check your email to verify your address."
}
```

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "username": "researcher1",
  "password": "securepass123"
}
```

**Response (200):**
```
{eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...}
```

*Store this token in localStorage and send as `Authorization: Bearer <token>` header*

#### Verify Email
```http
GET /api/verify-email/{user_id}?token=xxx
```

#### Forgot Password
```http
POST /api/forgot-password
Content-Type: application/json

{
  "email": "researcher@example.com"
}
```

**Response (200):**
```json
{
  "message": "Password reset link has been sent to your email."
}
```

#### Check Reset Token
```http
GET /api/check-reset-token
Content-Type: application/json

{
  "token": "xxx",
  "email": "researcher@example.com"
}
```

#### Reset Password
```http
POST /api/reset-password
Content-Type: application/json

{
  "token": "xxx",
  "email": "researcher@example.com",
  "password": "newpass123",
  "password_confirmation": "newpass123"
}
```

---

### Tool Management Endpoints

#### List All Tools
```http
GET /api/tools
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "nmap",
      "category": "Reconnaissance",
      "description": "Network mapping and security auditing",
      "installation_command": "sudo apt-get install -y nmap",
      "is_installed": true,
      "created_at": "2025-05-17T10:00:00.000000Z",
      "updated_at": "2025-05-17T10:00:00.000000Z"
    }
  ]
}
```

#### Get Single Tool
```http
GET /api/tools/{tool_id_or_name}
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "status": "success",
  "data": { /* tool object */ }
}
```

#### Create Tool
```http
POST /api/tools
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "nmap",
  "category": "Reconnaissance",
  "description": "Network mapping and security auditing",
  "installation_command": "sudo apt-get install -y nmap"
}
```

**Response (201):**
```json
{
  "status": "success",
  "message": "Tool berhasil ditambahkan",
  "data": { /* new tool object */ }
}
```

#### Update Tool
```http
PUT /api/tools/{tool_id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "nmap",
  "category": "Reconnaissance",
  "description": "Updated description"
}
```

#### Delete Tool
```http
DELETE /api/tools/{tool_id}
Authorization: Bearer {token}
```

**Response (204):** No content

---

### Command Execution Endpoints

#### Run Tool Command
```http
POST /api/run-command
Authorization: Bearer {token}
Content-Type: application/json

{
  "command": "nmap -sV -p 80,443 example.com"
}
```

**Response (200):**
```json
{
  "output": "Starting Nmap 7.92...\nNmap scan report for example.com\n..."
}
```

**Response (500):**
```json
{
  "output": "Error: Tool 'nmap' belum terinstall."
}
```

#### Execute WSL Command (Restricted)
```http
POST /api/execute-wsl
Authorization: Bearer {token}
Content-Type: application/json

{
  "command": "sudo apt-get install -y nmap"
}
```

**Whitelisted Patterns:**
- `sudo apt install [package]`
- `apt update`
- `apt upgrade`
- `apt remove [package]`
- `apt purge [package]`

**Response (success):**
```json
{
  "success": true,
  "output": "Setting up nmap (7.92-1ubuntu1)..."
}
```

**Response (unauthorized):**
```json
{
  "success": false,
  "error": "Perintah tidak diizinkan demi alasan keamanan"
}
```

#### Check & Install Tool
```http
POST /api/tool/check-install
Authorization: Bearer {token}
Content-Type: application/json

{
  "tool": "nmap"
}
```

**Response (already installed):**
```json
{
  "success": true,
  "message": "Tool 'nmap' sudah terinstall",
  "installed": true,
  "output": "Skipping installation..."
}
```

**Response (installed now):**
```json
{
  "success": true,
  "message": "Tool 'nmap' berhasil diinstal",
  "installed": true,
  "output": "Setting up nmap..."
}
```

#### Get Installed Tools
```http
GET /api/available-tools
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": [ /* array of installed tools */ ]
}
```

---

### Get Current User
```http
GET /api/user
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "researcher1",
  "username": "researcher1",
  "email": "researcher@example.com",
  "email_verified_at": "2025-05-17T10:15:00.000000Z",
  "created_at": "2025-05-17T10:00:00.000000Z",
  "updated_at": "2025-05-17T10:00:00.000000Z"
}
```

---

## 🔧 Tool Execution Architecture (Core Feature)

This section provides deep technical insight into how Cyber-Forge executes system commands through the web interface.

### Overview

The tool execution system is the **heart of Cyber-Forge**, enabling security professionals to execute Linux/Unix tools directly from a web interface without SSH/terminal access. It operates in a secure, validated manner with multiple checkpoints.

### Execution Pipeline

#### 1. Frontend Initiation (React)

**File:** `frontend/src/pages/Tools.jsx`

```javascript
// User clicks "Execute" or enters command in terminal
const [command, setCommand] = useState("nmap -sV example.com");

// Send to backend
const executeCommand = async () => {
  try {
    const response = await axiosInstance.post("/run-command", {
      command: command
    });
    // Display output in terminal UI
    setTerminalOutput(response.data.output);
  } catch (error) {
    console.error("Execution failed:", error);
  }
};
```

**Flow:**
```
User Input (Tools.jsx)
    ↓
Axios POST /api/run-command
    │ Headers: Authorization: Bearer {JWT_TOKEN}
    │ Body: { command: "nmap ..." }
    ↓
Backend (ToolShellController)
```

#### 2. Backend Reception & Validation

**File:** `backend/app/Http/Controllers/ToolShellController.php`

**Step 1: Validate Command Input**

```php
public function runCommand(Request $request)
{
    // 1. Input validation
    $request->validate(['command' => 'required|string']);
    
    $command = trim($request->input('command'));
    
    if (empty($command)) {
        return response()->json(['output' => 'Command kosong']);
    }
```

**Step 2: Extract Tool Name**

```php
    // 2. Parse tool name from command
    $parts = explode(' ', $command);
    $toolName = strtolower($parts[0]);
    // Example: "nmap -sV example.com" → toolName = "nmap"
```

**Step 3: Check Tool Registration**

```php
    // 3. Lookup tool in database
    $tool = Tool::where('name', $toolName)->first();
    
    if (!$tool) {
        return response()->json([
            'output' => "Error: Tool '$toolName' tidak dikenali."
        ]);
    }
```

**Database Structure (tools table):**

```sql
CREATE TABLE tools (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) UNIQUE,          -- "nmap", "metasploit", etc.
    category VARCHAR(255),              -- "Reconnaissance", "Exploitation"
    description TEXT,
    installation_command TEXT,          -- Installation instructions
    is_installed BOOLEAN DEFAULT false, -- Status flag
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

**Step 4: Verify Installation Status**

```php
    // 4. Verify tool is installed
    if (!$tool->is_installed) {
        return response()->json([
            'output' => "Error: Tool '$toolName' belum terinstall."
        ], 500);
    }
```

#### 3. Command Execution via WSL

**Step 5: Execute Command**

```php
    try {
        $output = [];
        $exitCode = 0;
        
        // Execute via WSL Bash
        exec("wsl /bin/bash -c \"" . escapeshellcmd($command) . "\" 2>&1", 
             $output, 
             $exitCode);
        
        // Return response based on exit code
        if ($exitCode === 0) {
            return response()->json([
                'output' => implode("\n", $output)
            ]);
        } else {
            return response()->json([
                'output' => "Gagal menjalankan perintah:\n" . 
                           implode("\n", $output)
            ], 500);
        }
    } catch (\Exception $e) {
        return response()->json([
            'output' => "Terjadi kesalahan: " . $e->getMessage()
        ], 500);
    }
}
```

### Execution Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (React)                              │
│  User Input: "nmap -sV example.com"                             │
│  [Execute Button Click]                                          │
└──────────────────────┬──────────────────────────────────────────┘
                       │ POST /api/run-command
                       │ Authorization: Bearer JWT_TOKEN
                       │ { command: "nmap -sV example.com" }
                       ↓
┌────────────────────────────────────────────────────────────────┐
│           Backend: ToolShellController::runCommand()            │
├────────────────────────────────────────────────────────────────┤
│ [1] VALIDATE INPUT                                              │
│     ├─ Check: command not empty                                 │
│     └─ Check: command is string                                 │
│                                                                  │
│ [2] EXTRACT TOOL NAME                                           │
│     └─ Parse: "nmap -sV example.com" → "nmap"                 │
│                                                                  │
│ [3] VERIFY TOOL EXISTS IN DB                                    │
│     └─ Query: Tool::where('name', 'nmap')->first()             │
│        Result: Found ✓ or Not Found ✗                          │
│                                                                  │
│ [4] CHECK INSTALLATION STATUS                                   │
│     └─ Check: $tool->is_installed == true                       │
│        Result: Installed ✓ or Not Installed ✗                  │
│                                                                  │
│ [5] EXECUTE COMMAND                                             │
│     └─ System Call:                                             │
│        exec("wsl /bin/bash -c \"nmap -sV example.com\"")       │
│           ├─ Gateway: WSL (Windows Subsystem Linux)            │
│           ├─ Shell: /bin/bash                                  │
│           ├─ Command: nmap binary execution                    │
│           └─ Capture: Output + Exit Code                       │
│                                                                  │
│ [6] HANDLE RESPONSE                                             │
│     ├─ Success (exit code = 0):                                 │
│     │  └─ Return: { output: "..." }                            │
│     │                                                            │
│     └─ Failure (exit code ≠ 0):                                 │
│        └─ Return: { output: "Error..." }, HTTP 500             │
└──────────────────┬───────────────────────────────────────────┘
                   │ HTTP Response (JSON)
                   ↓
┌─────────────────────────────────┐
│    Frontend: Display Output      │
│  (Terminal UI via xterm.js)      │
└─────────────────────────────────┘
```

### WSL Integration Details

#### What is WSL?

**Windows Subsystem for Linux (WSL 2)** is a compatibility layer that allows Windows to run a full Linux kernel and Linux binaries natively.

**Key Benefits:**
- Run Linux tools on Windows without virtual machine overhead
- Access to full Linux package management (apt, dnf, etc.)
- Native file system access
- Performance approaching native Linux

#### Command Execution Mechanism

```php
// Syntax
exec("wsl /bin/bash -c \"$command\"", $output, $exitCode);

// Breakdown:
// - wsl: Invokes Windows Subsystem for Linux
// - /bin/bash: Runs Bash shell in WSL
// - -c: Execute command string inline
// - $command: Your actual command to run (escapeshellcmd'd)
// - $output: Array capturing stdout/stderr
// - $exitCode: Return code (0 = success)
```

#### Example Execution (Detour)

```bash
# In WSL Ubuntu environment:
user@PC:/mnt/c$ nmap -sV -p 80,443 example.com

Starting Nmap 7.92 (https://nmap.org) 
Nmap scan report for example.com (93.184.216.34)
Host is up (0.0020s latency).

PORT    STATE SERVICE VERSION
80/tcp  open  http    Apache httpd 2.4.41
443/tcp open  https   Apache httpd 2.4.41

# Exit Code: 0 (success)
```

### Security Considerations in Execution

#### 1. Command Escaping

The `escapeshellcmd()` function prevents shell metacharacter injection:

```php
// Without escaping (VULNERABLE):
$command = "nmap example.com; rm -rf /";  // Injection attack!

// With escaping (SAFER):
escapeshellcmd($command);
// Result: "nmap example.com\\; rm -rf /"  (semicolon escaped)
```

**Limitations:** `escapeshellcmd()` is **not sufficient** alone. It only escapes metacharacters but doesn't prevent all attacks.

#### 2. Whitelist Validation (Tool Registry)

Every command execution requires:
1. Tool name verification in database
2. Installation status check
3. User authorization (JWT token)

This creates a choke point preventing arbitrary command execution.

#### 3. Multi-Layer Validation

```
User Request
    ↓ [Check JWT Token - Fail → 401]
    ↓ [Check Tool Exists - Fail → 404]
    ↓ [Check Tool Installed - Fail → 500]
    ↓ [Check User Authorized - Fail → 403]
    ↓ [Execute Command]
Output
```

### Handling Tool Installation

#### Check Installation Status

```php
public function checkAndInstallTool(Request $request)
{
    $tool = trim($request->input('tool'));
    
    // 1. Validate tool name characters
    if (!preg_match('/^[a-zA-Z0-9\-\_\.]+$/', $tool)) {
        return response()->json([
            'success' => false,
            'error' => 'Nama tool mengandung karakter tidak valid'
        ], 422);
    }
    
    // 2. Check if already installed
    $checkOutput = [];
    $checkExitCode = 0;
    exec("wsl dpkg -s {$tool} > /dev/null 2>&1", $checkOutput, $checkExitCode);
    
    if ($checkExitCode === 0) {
        // Already installed
        $toolModel = Tool::where('name', $tool)->first();
        if ($toolModel) {
            $toolModel->update(['is_installed' => true]);
        }
        
        return response()->json([
            'success' => true,
            'message' => "Tool '$tool' sudah terinstall",
            'installed' => true
        ]);
    } else {
        // Need to install
        // [Installation process continues...]
    }
}
```

**`dpkg -s` Check:**
```bash
# Check if package installed in Debian/Ubuntu
dpkg -s nmap

# Output if installed:
# Package: nmap
# Status: install ok installed

# Exit code: 0 (installed) or 1 (not installed)
```

### Performance Considerations

#### Command Execution Time

- **Small commands** (nmap -p 80 single host): ~500ms
- **Large scans** (nmap -sV full subnet): 30-120s
- **Complex tools** (metasploit modules): 1-5 min

**⚠️ Production Issue:** Long-running commands may timeout. Consider:
- Asynchronous task queues
- Background job processing
- WebSocket for real-time streaming

#### Output Buffering

```php
// Current approach: Collect all output, then return
exec("command", $output);  // Stores in array
return response()->json(['output' => implode("\n", $output)]);

// For large outputs:
// - Risk: Memory exhaustion
// - Risk: Timeout before completion
// - Solution: Stream or pagination
```

---

## 🔐 Security Considerations

### ⚠️ CRITICAL ISSUES (Must Fix Before Production)

#### 1. **Insufficient Command Validation in ToolShellController**

**Issue:** `ToolShellController::runCommand()` only checks if tool exists in DB, but doesn't enforce the whitelist patterns defined in `ToolController`.

**Current Code (Vulnerable):**
```php
// ToolShellController
exec("wsl /bin/bash -c \"" . escapeshellcmd($command) . "\"", $output, $exitCode);
// Only source validation: Tool::where('name', $toolName)->first()
```

**Fix:**
```php
// Implement same whitelist check
protected array $allowedToolCommands = [
    'nmap' => '/^nmap\s+[\w\s\-\.]+$/',
    'dig' => '/^dig\s+[\w\.]+$/',
    'whois' => '/^whois\s+[\w\.]+$/',
    // ... more patterns
];

if (!preg_match($this->allowedToolCommands[$toolName] ?? '/^$/', $command)) {
    return response()->json(['output' => 'Command format not allowed'], 403);
}
```

#### 2. **Missing Rate Limiting on Authentication**

**Issue:** No protection against brute force password attacks.

**Fix - Add to middleware:**
```php
// config/throttle.php or middleware
Route::throttle('60,1')->group(function () {  // 60 attempts per minute
    Route::post('/login', LoginController::class);
    Route::post('/signup', SignupController::class);
});
```

#### 3. **Hardcoded SQLite in Production**

**Issue:** Default `.env` uses SQLite, not suitable for production with concurrent users.

**Fix - Use environment variable:**
```env
# .env.production
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_DATABASE=cyber_forge
DB_USERNAME={{ secrets.DB_USER }}
DB_PASSWORD={{ secrets.DB_PASS }}
```

#### 4. **No Password Reset Token Expiration**

**Issue:** Reset tokens in `password_resets` table have no TTL.

**Fix:**
```php
// ResetPasswordController
$resetData = DB::table('password_resets')
    ->where('token', $request->token)
    ->where('email', $request->email)
    ->where('created_at', '>', now()->subHours(1))  // 1-hour limit
    ->first();

if (!$resetData) {
    return response()->json(['error' => 'Token expired.'], 400);
}
```

#### 5. **CORS Wildcard in Development Leaks to Production**

**Issue:** `'allowed_origins_patterns' => ['*localhost*']` may accidentally allow unintended origins.

**Fix:**
```php
// config/cors.php - Environment-aware
'allowed_origins' => [
    env('CORS_ORIGIN', 'http://localhost:5173')
],

// Or specific domains:
'allowed_origins' => [
    'https://app.yourdomain.com',
    'https://admin.yourdomain.com'
],
```

---

### 🟡 HIGH-PRIORITY IMPROVEMENTS

#### 1. **Implement Audit Logging**

Track all tool executions for security and compliance:

```php
// Create migration: create_audit_logs_table
Schema::create('audit_logs', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id');
    $table->string('action');        // 'execute_tool', 'install_tool'
    $table->string('tool_name');
    $table->text('command');
    $table->integer('exit_code');
    $table->longText('output')->nullable();
    $table->ipAddress('ip_address');
    $table->timestamps();
});

// In ToolShellController:
AuditLog::create([
    'user_id' => auth()->id(),
    'action' => 'execute_tool',
    'tool_name' => $toolName,
    'command' => $command,
    'exit_code' => $exitCode,
    'ip_address' => request()->ip()
]);
```

#### 2. **Add Input Sanitization Middleware**

```php
// app/Http/Middleware/SanitizeInput.php
public function handle(Request $request, Closure $next)
{
    $request->merge(array_map(function ($value) {
        return is_string($value) ? trim(htmlspecialchars($value)) : $value;
    }, $request->all()));
    
    return $next($request);
}
```

#### 3. **Implement Command Timeout**

Prevent long-running commands from hanging requests:

```php
// Execute with timeout
$process = proc_open(
    "timeout 30 wsl /bin/bash -c \"$command\"",
    $descriptorspec,
    $pipes
);

// Will auto-kill after 30 seconds
```

#### 4. **Add WebSocket for Real-Time Terminal Output**

Current approach (polling) is inefficient. Consider Pusher, Socket.io, or Laravel Reverb:

```javascript
// Frontend: Real-time output streaming
Echo.channel('tool-execution.' + userId)
    .listen('ToolExecutionOutput', (event) => {
        setTerminalOutput(prev => prev + event.output);
    });
```

---

### 🟢 BEST PRACTICES IMPLEMENTED

✅ **JWT Authentication**: Token-based, stateless API\
✅ **Password Hashing**: Bcrypt with configurable rounds\
✅ **CORS Protection**: Configured origin restrictions  
✅ **Email Verification**: Required before account activation\
✅ **Password Reset**: Token-based flow with temporary URLs  
✅ **Database Migrations**: Version-controlled schema  
✅ **Environment Configuration**: .env-based secrets  

---

## 👨‍💻 Developer Guide

### code Quality Standards

- **PHP**: PSR-12 (Extended Coding Style Guide)
- **JavaScript**: ESLint with React recommended rules
- **Database**: Use Eloquent ORM, never raw SQL in controllers
- **API**: RESTful conventions (GET, POST, PUT, DELETE)

### Running Tests

```powershell
# Backend (PHPUnit)
cd backend
php artisan test

# Frontend (Jest - optional, not configured)
cd frontend
npm test
```

### Code Style Checking

```powershell
# PHP Style (Laravel Pint)
cd backend
php artisan pint

# JavaScript Lint
cd frontend
npm run lint
```

### Adding New Endpoint

1. **Create Migration** (if new table)
```powershell
cd backend
php artisan make:migration create_new_table_name
```

2. **Create Model**
```powershell
php artisan make:model NewModel
```

3. **Create Controller**
```powershell
php artisan make:controller NewController --api
```

4. **Add Routes** (`routes/api.php`)
```php
Route::apiResource('resource-name', NewController::class);
```

5. **Test Endpoint**
```powershell
# Using curl or Postman
curl -H "Authorization: Bearer {token}" http://localhost:8000/api/resource-name
```

### Debugging

#### Backend Debugging

```php
// Log messages
Log::info('User login attempt', ['user' => $user->id]);
Log::error('Command execution failed', ['error' => $e->getMessage()]);

// Dump and die
dd($variable);  // Stops execution

// Dump without dying
dump($variable);
```

**View logs:**
```powershell
tail -f backend/storage/logs/laravel.log
```

#### Frontend Debugging

```javascript
// Console logging
console.log('Execution response:', response);
console.error('API error:', error);

// Browser DevTools
// F12 → Console, Network, Sources tabs
```

#### Database Debugging

```php
// Enable query logging
DB::listen(function ($query) {
    Log::info($query->sql, $query->bindings);
});

// Or use Laravel Debugbar (add package)
composer require barryvdh/laravel-debugbar --dev
```

---

## 🆘 Troubleshooting

### Common Issues & Solutions

#### Issue: "WSL command not found"

**Symptoms:** Tool execution fails with "wsl: command not found"

**Solutions:**
```powershell
# 1. Verify WSL Installation
wsl --list -v

# 2. Check if WSL is in PATH
where wsl

# 3. Reinstall WSL
wsl --install

# 4. Repair WSL
Repair-Item "C:\Program Files\WindowsApps\CanonicalGroupLimited.Ubuntu*"

# 5. As Last Resort
Get-WindowsOptionalFeature -Online | Where-Object -Property FeatureName -Like "Windows-Subsystem-Linux"
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux -NoRestart
Restart-Computer
```

#### Issue: "CORS error on localhost:5173"

**Symptoms:** Frontend cannot reach backend API

**Solutions:**
```php
// backend/config/cors.php
'allowed_origins_patterns' => [
    '.*localhost.*',  // Match localhost with any port
    '.*127\.0\.0\.1.*'  // Also match 127.0.0.1
],

// Or specific:
'allowed_origins' => [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
],
```

#### Issue: "Database locked" error

**Symptoms:** SQLite database appears to be locked during concurrent requests

**Solutions:**
```php
// Use MySQL instead for development
// Edit .env:
DB_CONNECTION=mysql  // instead of sqlite

// Increase WAL timeout (SQLite specific)
'connections' => [
    'sqlite' => [
        'busy_timeout' => 10000,  // ms
    ]
]
```

#### Issue: "Token invalid or expired"

**Symptoms:** 401 Unauthorized on API requests, though token is in localStorage

**Solutions:**
```javascript
// Check token in localStorage
console.log(localStorage.getItem('token'));

// Check token expiration
const decoded = JSON.parse(atob(token.split('.')[1]));
console.log(new Date(decoded.exp * 1000));

// Clear and re-login
localStorage.clear();
// Navigate to login
window.location.href = '/login';
```

#### Issue: "Port 8000 already in use"

**Symptoms:** Laravel server won't start

**Solutions:**
```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process by PID
taskkill /PID <PID> /F

# Or use different port
php artisan serve --port=8001

# For Vite (port 5173):
cd frontend
npm run dev -- --port 5174
```

#### Issue: "npm ERR! ERESOLVE unable to resolve dependency tree"

**Symptoms:** npm install fails with dependency conflict

**Solutions:**
```powershell
# Clear npm cache
npm cache clean --force

# Use legacy peer deps mode
npm install --legacy-peer-deps

# Or update packages
npm update

# Check Node/npm versions
node --version  # v20+
npm --version   # v10+
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Contribution Process

1. **Fork** the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add feature: ...'`
4. Push to branch: `git push origin feature/your-feature`
5. Open Pull Request

### Code Standards

- Follow PSR-12 (PHP) and ESLint (JavaScript)
- Add tests for new features
- Document complex logic
- Update README for user-facing changes

### Reporting Issues

When reporting bugs, include:
- Operating System & version
- Exact error message
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

**Template:**
```markdown
### Description
[Brief description]

### Steps to Reproduce
1. ...
2. ...

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Environment
- OS: Windows 11
- PHP: 8.2
- Node: 20
- WSL: 2
```

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file for details.

```
MIT License

Copyright (c) 2025 mrifkitrisaputra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software...
```

---

## 👤 Author

**Muhammad Rifki Trisaputra**
- GitHub: [@mrifkitrisaputra](https://github.com/mrifkitrisaputra)
- Email: [Your email if available]
- Organization: [Your organization if any]

---

## 📞 Support & Community

- **Issues**: [GitHub Issues](https://github.com/mrifkitrisaputra/Cyber-Forge/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mrifkitrisaputra/Cyber-Forge/discussions)
- **Wiki**: [Project Wiki](https://github.com/mrifkitrisaputra/Cyber-Forge/wiki)

---

## 🗺️ Roadmap

### Planned Features

- [ ] Real-time terminal output via WebSockets
- [ ] Command history and replay
- [ ] User roles & permissions (Admin, Analyst, Viewer)
- [ ] Tool result export (CSV, JSON, PDF)
- [ ] Multi-target command execution
- [ ] Custom payload builder
- [ ] Integration with Shodan, VirusTotal APIs
- [ ] Docker containerization
- [ ] Kubernetes deployment manifests
- [ ] Dark/Light theme toggle
- [ ] Two-factor authentication (2FA)
- [ ] API rate limiting & throttling
- [ ] Advanced filtering & search
- [ ] Dashboard analytics & reporting

**Version Tracking:**
- v1.0.0 - Initial Release (Current)
- v1.1.0 - Security hardening (In Progress)
- v2.0.0 - WebSocket integration & real-time features (Planned)

---

## 📚 Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Windows Subsystem for Linux Docs](https://learn.microsoft.com/windows/wsl/)
- [REST API Best Practices](https://restfulapi.net)
- [OWASP Security Guidelines](https://owasp.org)
- [Cybersecurity Frameworks](https://www.nist.gov/cyberframework)

---

## ⚡ Quick Reference

### Common Commands

```bash
# Backend
php artisan migrate              # Run migrations
php artisan tinker              # Interactive shell
php artisan queue:listen        # Process jobs
php artisan cache:clear         # Clear cache
php artisan test                # Run tests

# Frontend
npm run dev                      # Start dev server
npm run build                    # Build for production
npm run lint                     # Check code quality
npm run preview                  # Preview production build

# Database
php artisan db:seed             # Run seeders
php artisan make:migration <name> # Create migration
php artisan migrate:rollback    # Undo migrations

# Misc
composer update                 # Update PHP deps
npm update                       # Update JS deps
git status                       # Check git status
```

---

**Last Updated:** May 2025  
**Status:** ✅ Stable Release (v1.0.0)  
**Maintenance:** Active

For the latest updates, visit [GitHub Repository](https://github.com/mrifkitrisaputra/Cyber-Forge)
