# Cyber-Forge

[![PHP Version](https://img.shields.io/badge/PHP-%3E%3D8.2-blue?logo=php)](https://www.php.net/)
[![Laravel Version](https://img.shields.io/badge/Laravel-12.0-FF2D20?logo=laravel)](https://laravel.com/)
[![React Version](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows-blue?logo=windows)](https://www.microsoft.com/windows/)

> **Unified Command Center for Cybersecurity Operations**  
> Enterprise-grade OSINT reconnaissance, penetration testing, and cybersecurity tool orchestration platform  
> Professional dashboard accessible from any web browser

---

## 📋 Quick Navigation

👥 **For End-Users:** [What is Cyber-Forge?](#-what-is-cyber-forge) → [Quick Start](#-quick-start-users) → [Features](#-features) → [FAQs](#-faqs)

👨‍💻 **For Developers:** [Architecture](#-architecture) → [Setup](#-installation--setup) → [API Reference](#-api-reference) → [Developer Guide](#-developer-guide)

---

## 🎯 What is Cyber-Forge?

**Cyber-Forge** is a professional-grade cybersecurity platform that consolidates multiple security operations into a single, intuitive web-based interface. Whether you're conducting reconnaissance, running security assessments, or gathering open-source intelligence, Cyber-Forge gives you a centralized command center accessible from any browser.

### Who Should Use Cyber-Forge?

✅ **Security Researchers** - Conduct OSINT and reconnaissance  
✅ **Penetration Testers** - Execute security assessments  
✅ **Security Analysts** - Manage tool execution and reporting  
✅ **Educational Institutions** - Teach cybersecurity hands-on  
✅ **Security Operations Teams** - Coordinate security activities & team collaboration  

### Key Capabilities

🔍 **OSINT Reconnaissance**
- Google Dorking queries for information gathering
- Pre-built query database (40+ reconnaissance patterns)
- Domain-targeted searching

🛠️ **Tool Management & Execution**
- Execute security tools from web interface
- Tool registry with CRUD management (Create, Read, Update, Delete)
- Real-time output in terminal-like interface
- Install and verify tool installation status

🔐 **Secure Access**
- Email-based authentication with verification
- Password-protected accounts
- Multi-user support with JWT tokens
- Password reset via secure email tokens

💼 **Enterprise-Ready**
- Centralized tool management without SSH/terminal access
- CORS protection and stateless API design
- Database migrations and version control
- Development automation

---

## 🚀 Quick Start (Users)

### 1. Access the Application

Navigate to your Cyber-Forge instance:
```
https://cyber-forge.example.com
```
*(Ask your administrator for the correct URL)*

### 2. Create an Account

Click **"Sign Up"** and fill in:

| Field | Requirements |
|-------|--------------|
| **Username** | Unique identifier (alphanumeric) |
| **Email** | Valid email address (for verification) |
| **Password** | Minimum 8 characters |

### 3. Verify Your Email

Check your email inbox for verification link and click it.

### 4. Login & Start

Use your username and password to login → Access your dashboard!

---

## 💻 System Requirements (Users)

### Minimum Requirements
- ✅ **Web Browser** (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- ✅ **Internet Connection** (stable connection recommended)
- ✅ **Email Address** (for account verification)

### Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome | ✅ Full Support | Recommended |
| Firefox | ✅ Full Support | Recommended |
| Safari | ✅ Full Support | Mac/iOS |
| Edge | ✅ Full Support | Windows |
| Mobile Browsers | ⚠️ Partial | Limited terminal view |

---

## ✨ Features

### 1. 🔍 Google Dorking (OSINT Module)

**Purpose:** Automated reconnaissance using Google search operators

**How It Works:**
- Provides 40+ pre-built dorking queries
- Automatically targets your specified domain
- Opens Google search with crafted query

**What You Can Find:**
- Email addresses
- File uploads
- Database backups
- Login pages
- Configuration files
- And more...

**Example Use Case:**
```
Enter domain: company.com
Click: "Email Addresses" button
→ Google opens with: site:company.com (email search patterns)
```

---

### 2. 🛠️ Tools Management & Execution

**Purpose:** Manage and execute security tools - create, execute, update, and delete tools in your toolkit

**What You Can Do:**
- ✅ View all available tools
- ✅ Add new tools to your toolset
- ✅ Execute tools with custom commands
- ✅ Edit tool details and settings
- ✅ Install or verify tool installation
- ✅ Remove tools you no longer need

#### 📋 Viewing Tools

**Location:** Go to **"Tools"** tab

You'll see a list of all available tools with:
- Tool name (e.g., `nmap`, `whois`, `dig`)
- Category (e.g., Network, DNS, HTTP)
- Description (what the tool does)
- Installation status (✅ Installed / ⏳ Not Installed)

**Actions available per tool:**
- 🔧 Execute
- ✏️ Edit
- 📦 Install/Check Installation
- 🗑️ Delete

#### ➕ Adding a New Tool

```
1. Click "Add New Tool" button
2. Fill in tool details:
   Name:                nmap
   Category:            Network Scanning
   Description:         Network mapping and port scanning
   Installation Cmd:    apt-get install nmap
3. Click "Create Tool"
```

**Tool Details:**

| Field | Purpose | Example |
|-------|---------|---------|
| **Name** | Tool identifier | `nmap`, `whois`, `sqlmap` |
| **Category** | Tool classification | Network, DNS, Web, Database |
| **Description** | What tool does | Maps networks and scans ports |
| **Installation Cmd** | Command to install | `apt-get install nmap` |

#### 🚀 Executing a Tool

```
1. Go to Tools tab
2. Find the tool (e.g., "nmap")
3. Click "Execute" button
4. Enter your command: nmap -sV -p 80,443 target.com
5. Click "Run"
6. View results in terminal output
```

**Command Examples:**
```bash
# Network Scanning
nmap -sV -p 80,443 target.com
nmap -sn 192.168.1.0/24

# DNS Lookup
dig target.com ANY
dig subdomain.target.com MX

# Domain Information
whois target.com

# HTTP Requests
curl -I https://target.com
curl -H "User-Agent: Mozilla/5.0" https://target.com

# Web Scanning
nikto -h https://target.com
```

#### ✏️ Editing & 📦 Installing Tools

- **Edit:** Click pencil icon → Modify details → Click "Update"
- **Install:** Click "Install" button → System installs automatically
- **Delete:** Click trash icon → Confirm deletion

#### Complete Workflow: Add → Install → Execute

```
Step 1: Add Tool
├─ Click "Add New Tool"
├─ Fill details (name, category, install command)
└─ Click "Create"

Step 2: Install
├─ Find tool in list
├─ Click "Install"
└─ Wait for ✅ completion

Step 3: Execute
├─ Click "Execute"
├─ Enter command
└─ View results
```

---

### 3. 🔑 Account Management

#### Change Your Password
1. Go to **Settings** (top-right menu)
2. Click **"Change Password"**
3. Enter current & new password
4. Click **"Update"**

#### Forgot Your Password?
1. On Login page, click **"Forgot Password?"**
2. Enter your email
3. Check email for reset link (valid 1 hour)
4. Click link & set new password

---

## 📖 How to Use (Typical Workflows)

### Workflow 1: Basic Reconnaissance (30 min)

**Goal:** Gather information about a target domain

```
1. Login to Cyber-Forge
2. Go to "Google Dorking" tab
3. Enter domain: example.com
4. Click reconnaissance buttons:
   - Email Addresses
   - File uploads
   - Exposed configs
5. Review results in new tab
6. Save interesting findings
```

### Workflow 2: Network Scanning

**Goal:** Scan a network for active hosts

```
1. Go to "Tools" tab
2. Find and execute "nmap"
3. Enter: nmap -sn 192.168.1.0/24
4. Wait for scan
5. Copy results for report
```

### Workflow 3: DNS Enumeration

**Goal:** Find DNS records and subdomains

```
1. Execute "dig" tool
2. Command: dig example.com ANY
3. View DNS records
4. Repeat for subdomains: dig subdomain.example.com
```

### Workflow 4: Generating Reports

```
1. Copy output from terminals
2. Save to text file or Word/Excel
3. Include screenshots
4. Compile into final report
```

---

## ❓ FAQs (Users)

### Q: How long do my sessions last?
**A:** Your session is active while using the browser. Inactive sessions expire after **1 hour**.

### Q: Can I save commands or history?
**A:** Not automatically. You must manually:
- Copy output and save in text file
- Take screenshots
- Save in your own notes system

### Q: What if a tool I need isn't available?
**A:** Contact your **administrator**. They can add new tools.

### Q: Can I run multiple tools at the same time?
**A:** Yes! Open multiple browser tabs:
- Tab 1: Tool A (running)
- Tab 2: Tool B (running)
- Switch between tabs to monitor

### Q: What's the maximum tool execution time?
**A:** Depends on tool:
- Quick queries (whois, dig): 5-30 seconds
- Network scans (nmap): 2-10 minutes
- Large scans: 30+ minutes

### Q: Is my activity logged?
**A:** Likely yes. Check with your **administrator's security policy**.

### Q: What if I get an error?

| Error | Cause | Solution |
|-------|-------|----------|
| "Tool not installed" | Not yet installed | Contact admin |
| "Connection timeout" | Network issue | Check internet, retry |
| "Session expired" | Inactive > 1 hour | Login again |
| "Invalid command format" | Wrong syntax | Check command format |

### Q: How do I troubleshoot issues?

**Can't Login:**
- Check Caps Lock
- Verify username (not email)
- Use "Forgot Password" if needed

**Email Not Received:**
- Check Spam/Junk folder
- Wait 2-3 minutes
- Try signup again

**Tools Not Showing Output:**
- Wait a few seconds
- Scroll down
- Refresh page (F5)
- Try different tool

---

## 🔐 Security Tips (Users)

### Protect Your Account

1. **Use Strong Password**
   - 12+ characters, mix of upper/lowercase, numbers, symbols
   - Don't reuse passwords

2. **Don't Share Credentials**
   - Never give password to anyone
   - Each user gets own account

3. **Logout When Done**
   - Click "Logout" before closing
   - On shared computers, always logout

4. **Use HTTPS**
   - Always access via `https://` (not `http://`)
   - Report if HTTPS fails

5. **Report Security Issues**
   - Suspicious activity → Contact admin
   - Found a security bug → Report immediately

### Usage Responsibility

- ✅ Only scan systems you own or have permission for
- ✅ Follow your organization's policies
- ✅ Don't use for unauthorized activities
- ✅ Keep findings confidential

---

---

# DEVELOPER & SYSTEM ADMINISTRATOR SECTION

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
         REST API Gateway (CORS Protected)            │
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

## 📦 Prerequisites (Developers)

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
wsl --install -d Ubuntu
```

#### PHP 8.2+ with Composer
```powershell
# Via Laragon (recommended): https://laragon.org/
# Or install manually:
# https://www.php.net/downloads
# https://getcomposer.org/
```

#### Node.js & npm
```powershell
# Download: https://nodejs.org/ (LTS 20+)
# Or via Chocolatey:
choco install nodejs --version=20.0.0
```

#### Git (Optional)
```powershell
# https://git-scm.com/
# Or: choco install git
```

### Verification
```powershell
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
cd C:\Users\YourUsername\Projects
git clone https://github.com/mrifkitrisaputra/Cyber-Forge.git
cd Cyber-Forge
```

### Step 2: Configure Environment Variables

#### Backend (.env)
```powershell
cd backend
Copy-Item .env.example -Destination .env
php artisan key:generate
php artisan jwt:secret
```

**Edit `.env`:**

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

# Email
MAIL_MAILER=log
MAIL_HOST=127.0.0.1
MAIL_PORT=2525

# Frontend URL
FRONTEND_URL=http://localhost:5173

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_ALGORITHM=HS256
```

### Step 3: Install Dependencies

```powershell
# Backend
cd backend
composer install

# Frontend
cd ../frontend
npm install
```

### Step 4: Database Setup

```powershell
cd backend
php artisan migrate
# Optional: php artisan db:seed
```

### Step 5: Install Linux Tools (WSL)

```powershell
wsl
sudo apt update
sudo apt install -y nmap dnsutils whois curl wget git
exit
```

### Step 6: Start Development Servers

#### Option A: PowerShell Script (Recommended)
```powershell
.\laragon.ps1
```

#### Option B: Manual Start
```powershell
# Terminal 1: Backend
cd backend && php artisan serve

# Terminal 2: Frontend
cd frontend && npm run dev
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

**Production Update:**
```php
'allowed_origins' => [
    'https://yourdomain.com',
    'https://app.yourdomain.com'
],
```

#### JWT Configuration (`backend/config/jwt.php`)

```php
'secret' => env('JWT_SECRET'),
'algorithm' => 'HS256',  # or RS256 for production
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

### Email Configuration

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@cyber-forge.com
MAIL_FROM_NAME="Cyber-Forge"
```

---

## 📖 Usage Guide (Developers)

### User Onboarding

#### 1. Register New Account

```
URL: http://localhost:5173/signup
```

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

User clicks verification link in email.

```
GET /api/verify-email/{id}?token=xxx
├─ Validate token
└─ Mark email_verified_at = now()
```

#### 3. Login

```
POST /api/login
├─ Validate credentials
├─ Generate JWT token
└─ Return Bearer token (store in localStorage)
```

---

### Tools Management (CRUD)

#### Add New Tool

```
POST /api/tools
{
  "name": "nmap",
  "category": "Reconnaissance",
  "description": "Network scanning",
  "installation_command": "apt-get install nmap"
}
```

#### List Tools

```
GET /api/tools
```

#### Update Tool

```
PUT /api/tools/{id}
{
  "name": "nmap",
  "description": "Updated description"
}
```

#### Delete Tool

```
DELETE /api/tools/{id}
```

---

### Command Execution

#### Run Tool Command

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

---

## 📁 Project Structure

```
Cyber-Forge/
├── backend/                         # Laravel 12 API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginController.php
│   │   │   │   ├── SignupController.php
│   │   │   │   ├── VerifyEmailController.php
│   │   │   │   ├── ForgotPasswordController.php
│   │   │   │   └── ResetPasswordController.php
│   │   │   ├── ToolController.php           # Tool CRUD
│   │   │   └── ToolShellController.php      # Command execution (CORE)
│   │   ├── Mail/
│   │   │   ├── VerifyEmail.php
│   │   │   └── ResetPasswordMail.php
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   └── Tool.php
│   │   └── Providers/
│   │       └── AppServiceProvider.php
│   ├── config/
│   │   ├── app.php
│   │   ├── auth.php
│   │   ├── cors.php
│   │   ├── database.php
│   │   ├── jwt.php
│   │   └── mail.php
│   ├── database/
│   │   ├── migrations/
│   │   ├── factories/
│   │   └── seeders/
│   ├── routes/
│   │   ├── api.php
│   │   └── web.php
│   ├── tests/
│   ├── composer.json
│   ├── phpunit.xml
│   └── artisan
│
├── frontend/                        # React 19 SPA
│   ├── src/
│   │   ├── pages/
│   │   │   ├── login.jsx
│   │   │   ├── signup.jsx
│   │   │   ├── home.jsx
│   │   │   ├── Tools.jsx             # Tool management (CORE)
│   │   │   └── google-dorking.jsx    # OSINT dashboard
│   │   ├── component/
│   │   │   ├── layout.jsx
│   │   │   └── navbar.jsx
│   │   ├── context/
│   │   │   └── authContext.jsx       # Auth state
│   │   ├── api/
│   │   │   ├── api.jsx               # Axios config
│   │   │   └── dorking.json          # Dorking queries DB
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── index.html
│
├── laragon.ps1                      # Startup automation
├── stop.ps1                         # Shutdown automation
├── package.json
├── LICENSE
└── README.md                        # This file
```

---

## 🔌 API Reference

### Authentication

#### Register
```http
POST /api/signup
{
  "username": "researcher1",
  "email": "researcher@example.com",
  "password": "securepass123",
  "password_confirmation": "securepass123"
}
```

#### Login
```http
POST /api/login
{
  "username": "researcher1",
  "password": "securepass123"
}
```

Returns JWT Bearer token → Store in localStorage

#### Verify Email
```http
GET /api/verify-email/{user_id}?token=xxx
```

#### Forgot Password
```http
POST /api/forgot-password
{ "email": "researcher@example.com" }
```

#### Reset Password
```http
POST /api/reset-password
{
  "token": "xxx",
  "email": "researcher@example.com",
  "password": "newpass123",
  "password_confirmation": "newpass123"
}
```

### Tools (CRUD)

#### List Tools
```http
GET /api/tools
Authorization: Bearer {token}
```

#### Create Tool
```http
POST /api/tools
Authorization: Bearer {token}
{
  "name": "nmap",
  "category": "Reconnaissance",
  "description": "Network mapping",
  "installation_command": "apt-get install nmap"
}
```

#### Get Single Tool
```http
GET /api/tools/{tool_id_or_name}
Authorization: Bearer {token}
```

#### Update Tool
```http
PUT /api/tools/{tool_id}
Authorization: Bearer {token}
{
  "name": "nmap",
  "description": "Updated description"
}
```

#### Delete Tool
```http
DELETE /api/tools/{tool_id}
Authorization: Bearer {token}
```

### Command Execution

#### Run Tool Command
```http
POST /api/run-command
Authorization: Bearer {token}
{
  "command": "nmap -sV -p 80,443 example.com"
}
```

**Response (success):**
```json
{
  "output": "Starting Nmap 7.92...\nNmap scan report for example.com\n..."
}
```

#### Check & Install Tool
```http
POST /api/tool/check-install
Authorization: Bearer {token}
{
  "tool": "nmap"
}
```

#### Get Installed Tools
```http
GET /api/available-tools
Authorization: Bearer {token}
```

---

## 🔧 Tool Execution Architecture (Core Feature)

This section provides deep technical insight into how Cyber-Forge executes system commands.

### Execution Pipeline

#### 1. Frontend Initiation (React)

**File:** `frontend/src/pages/Tools.jsx`

```javascript
const executeCommand = async () => {
  try {
    const response = await axiosInstance.post("/run-command", {
      command: command
    });
    setTerminalOutput(response.data.output);
  } catch (error) {
    console.error("Execution failed:", error);
  }
};
```

#### 2. Backend Reception & Validation

**File:** `backend/app/Http/Controllers/ToolShellController.php`

```php
public function runCommand(Request $request)
{
    // 1. Validate input
    $request->validate(['command' => 'required|string']);
    $command = trim($request->input('command'));
    
    if (empty($command)) {
        return response()->json(['output' => 'Command kosong']);
    }
    
    // 2. Extract tool name
    $parts = explode(' ', $command);
    $toolName = strtolower($parts[0]);
    
    // 3. Check tool exists in DB
    $tool = Tool::where('name', $toolName)->first();
    if (!$tool) {
        return response()->json([
            'output' => "Error: Tool '$toolName' tidak dikenali."
        ]);
    }
    
    // 4. Verify installation
    if (!$tool->is_installed) {
        return response()->json([
            'output' => "Error: Tool '$toolName' belum terinstall."
        ], 500);
    }
    
    // 5. Execute command
    try {
        $output = [];
        $exitCode = 0;
        
        exec("wsl /bin/bash -c \"" . escapeshellcmd($command) . "\" 2>&1", 
             $output, 
             $exitCode);
        
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

### WSL Integration

**Windows Subsystem for Linux (WSL 2)** enables native Linux tool execution on Windows:

```php
// Execute Linux command via WSL
exec("wsl /bin/bash -c \"$command\"", $output, $exitCode);

// - wsl: Invoke WSL
// - /bin/bash: Run Bash shell
// - -c: Execute command string
// - $command: Actual tool command
// - $output: Captured stdout/stderr
// - $exitCode: Return code (0 = success)
```

### Security Considerations

#### 1. Command Escaping
```php
escapeshellcmd($command);  // Escape shell metacharacters
```

#### 2. Whitelist Validation
- Every command requires tool name verification
- Installation status check
- User authorization (JWT token)

#### 3. Multi-Layer Validation
```
User Request
    ↓ [JWT Token check]
    ↓ [Tool exists check]
    ↓ [Tool installed check]
    ↓ [User authorized check]
    ↓ [Execute]
Output
```

---

## 📋 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Tools Table
```sql
CREATE TABLE tools (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(255),
    description TEXT,
    installation_command TEXT,
    is_installed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Password Resets Table
```sql
CREATE TABLE password_resets (
    email VARCHAR(255) PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🧪 Testing

### Running Tests

```powershell
# Backend tests
cd backend
php artisan test

# Or specific test file
php artisan test tests/Feature/ToolExecutionTest.php
```

### Test Coverage

Current test coverage:
- ✅ Authentication (login, signup, email verification)
- ✅ Tool CRUD operations
- ✅ Command execution (basic)
- ⚠️ Security validation
- ⚠️ Error handling

---

## 🐛 Troubleshooting (Developers)

### WSL Command Not Found

```powershell
# Verify WSL installation
wsl --list -v

# Check tool in WSL
wsl which nmap

# Manually install if missing
wsl sudo apt install nmap
```

### Database Connection Error

```powershell
# Check running database
mysql -u root -p
# Or verify SQLite: ls -la database.sqlite

# Reset database
php artisan migrate:fresh --seed
```

### JWT Token Issues

```powershell
# Regenerate JWT secret
php artisan jwt:secret

# Update .env with new secret
```

### CORS Issues

Update `backend/config/cors.php`:
```php
'allowed_origins' => ['http://localhost:5173']
```

---

## 🚀 Deployment (Production)

### Environment Setup

```env
APP_ENV=production
APP_DEBUG=false

# Use real URL
APP_URL=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com

# Database (MySQL)
DB_CONNECTION=mysql
DB_HOST=database.yourdomain.com
DB_DATABASE=cyber_forge
DB_USERNAME=app_user
DB_PASSWORD=strong_password

# Real email service
MAIL_MAILER=mailgun
MAIL_HOST=api.mailgun.net
```

### Security Checklist

- [ ] Update CORS allowed_origins to real domain
- [ ] Set APP_DEBUG=false
- [ ] Use strong JWT_SECRET (min 32 char)
- [ ] Configure real email service
- [ ] Use HTTPS only
- [ ] Enable rate limiting
- [ ] Add password reset token expiration
- [ ] Implement command audit logging
- [ ] Set up automated backups
- [ ] Monitor tool execution logs

---

## 📞 Support & Contributing

### Getting Help

**Technical Issues:**
- Create Issue on GitHub
- Include: Steps to reproduce, error message, environment

**Security Issues:**
- Email: security@cyber-forge.com (if applicable)
- Do NOT post publicly

### Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit Pull Request

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🎓 Quick References

### Useful Commands

```powershell
# Development
php artisan serve              # Start Laravel server
npm run dev                    # Start Vite server

# Database
php artisan migrate            # Run migrations
php artisan db:seed            # Seed database
php artisan tinker             # Interactive shell

# JWT
php artisan jwt:secret         # Generate JWT secret

# Testing
php artisan test               # Run tests
php artisan test --coverage    # With coverage report
```

### Key Files For Modification

- API Routes: `backend/routes/api.php`
- Controllers: `backend/app/Http/Controllers/`
- Frontend Pages: `frontend/src/pages/`
- Migrations: `backend/database/migrations/`
- Config: `backend/config/`

---

**Last Updated:** March 2026  
**Version:** 1.0.0  
**Maintained by:** Cyber-Forge Development Team