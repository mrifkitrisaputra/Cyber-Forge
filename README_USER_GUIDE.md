# Cyber-Forge - User Guide

[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Web-blue)](https://cyber-forge.example.com)

> **Professional Cybersecurity Operations Dashboard**  
> Reconnaissance, Tool Orchestration & OSINT from Your Browser

---

## 📋 Table of Contents

- [What is Cyber-Forge?](#what-is-cyber-forge)
- [Getting Started](#getting-started)
- [System Requirements](#system-requirements)
- [Account Setup](#account-setup)
- [Features](#features)
- [How to Use](#how-to-use)
- [FAQs](#faqs)
- [Support](#support)

---

## 🎯 What is Cyber-Forge?

**Cyber-Forge** is a web-based security operations platform that brings professional-grade cybersecurity tools into a unified dashboard. Whether you're conducting reconnaissance, running security assessments, or gathering open-source intelligence, Cyber-Forge gives you a centralized command center accessible from any browser.

### Who Should Use Cyber-Forge?

✅ **Security Researchers** - Conduct OSINT and reconnaissance  
✅ **Penetration Testers** - Execute security assessments  
✅ **Security Analysts** - Manage tool execution and reporting  
✅ **Educational Institutions** - Teach cybersecurity hands-on  
✅ **Security Operations Teams** - Coordinate security activities  

### Key Capabilities

🔍 **OSINT Reconnaissance**
- Google Dorking queries for information gathering
- Pre-built query database (40+ reconnaissance patterns)
- Domain-targeted searching

🛠️ **Tool Management & Execution**
- Execute security tools from web interface
- Tool registry with installation management
- Real-time output in terminal-like interface

🔐 **Secure Access**
- Email-based authentication
- Password-protected accounts
- Multi-user support

---

## 🚀 Getting Started

### Docker Deployment

This project can run on Linux, WSL, or any Docker host with a single command.

```bash
docker compose up --build
```

Open the app at `http://localhost:8080`.

The backend stores SQLite data and runtime files in a named Docker volume, so the app can start without manual PHP or Node installation on the host.

When you use the provided Docker Compose setup on a Linux VPS, the terminal feature is configured to execute commands on the VPS host shell, not just inside the app container. That is what makes free mode behave like a real server terminal.

### 1. Access the Application

Navigate to your Cyber-Forge instance:
```
https://cyber-forge.example.com
```
*(Ask your administrator for the correct URL)*

You'll see the **Login** screen.

### 2. Create an Account (First Time)

Click **"Sign Up"** and fill in:

| Field | Example |
|-------|---------|
| **Username** | researcher_alpha |
| **Email** | your-email@company.com |
| **Password** | SecurePass123! |

Requirements:
- ✅ Username: Unique, any alphanumeric characters
- ✅ Email: Valid, you'll receive verification link
- ✅ Password: Minimum 8 characters

**Click "Create Account"**

### 3. Verify Your Email

Check your email inbox for **"Verify Your Email Address"** message.

Click the verification link in the email → Your account is now active!

### 4. Login

Return to the login page:
- **Username:** Your chosen username
- **Password:** Your password

**Click "Login"** → Welcome to your dashboard!

---

## 💻 System Requirements

You need **very little** to use Cyber-Forge:

### Minimum Requirements
- ✅ **Web Browser** (any modern browser)
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+
- ✅ **Internet Connection** (stable connection recommended)
- ✅ **Email Address** (for account verification)

### Recommended
- Broadband connection (for faster tool output)
- Desktop/laptop (for better interface)
- JavaScript enabled in browser

### Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome | ✅ Full Support | Recommended |
| Firefox | ✅ Full Support | Recommended |
| Safari | ✅ Full Support | Mac/iOS |
| Edge | ✅ Full Support | Windows |
| Mobile Browsers | ⚠️ Partial | Limited terminal view |

---

## 🔑 Account Management

### Change Your Password

1. Login to your account
2. Go to **Settings** (top-right menu)
3. Click **"Change Password"**
4. Enter current password
5. Enter new password (8+ characters)
6. Click **"Update"**

### Forgot Your Password?

1. On **Login** page, click **"Forgot Password?"**
2. Enter your **email address**
3. Check your email for **"Reset Your Password"** link
4. Click link → Choose new password
5. Return to Login and use new password

### Reset Password Link Expires

⏱️ **Valid for 1 hour** from when it's sent  
If link expired, request a new one from "Forgot Password" page

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

**Use Case:**
You want to find all email addresses for company.com:
1. Go to **"Google Dorking"** tab
2. Enter domain: `company.com`
3. Click **"Email Addresses (Google Groups)"** button
4. Google opens with search: `site:company.com + email search patterns`

### 2. 🛠️ Tools Management

**Purpose:** Manage security tools - create, execute, update, and delete tools in your toolkit

**What You Can Do:**
- ✅ View all available tools
- ✅ Add new tools to your toolset
- ✅ Execute tools with custom commands
- ✅ Edit tool details and settings
- ✅ Install or verify tool installation
- ✅ Remove tools you no longer need

---

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

---

#### ➕ Adding a New Tool

**When to Add Tools:**
You want to add a new security tool to your toolkit.

**How to Add:**
```
1. In Tools tab, click "Add New Tool" button
2. Fill in tool details:

   Name:                nmap
   Category:            Network Scanning
   Description:         Network mapping and port scanning
   Installation Cmd:    apt-get install nmap
   
3. Click "Create Tool"
```

**Tool Details Explained:**

| Field | Purpose | Example |
|-------|---------|---------|
| **Name** | Tool identifier | `nmap`, `whois`, `sqlmap` |
| **Category** | Tool classification | Network, DNS, Web, Database |
| **Description** | What tool does (for reference) | Maps networks and scans ports |
| **Installation Cmd** | Command to install the tool | `apt-get install nmap` |

**Example Tools You Can Add:**

```
🔹 nmap
   Category: Network Scanning
   Install: apt-get install nmap

🔹 nikto
   Category: Web Scanner
   Install: apt-get install nikto

🔹 sqlmap
   Category: Database Testing
   Install: apt-get install sqlmap

🔹 curl
   Category: HTTP Requests
   Install: apt-get install curl

🔹 dig
   Category: DNS Enumeration
   Install: apt-get install dnsutils
```

---

#### 🚀 Executing a Tool

**How to Run a Tool:**

```
Example: Network scan with nmap

1. Go to Tools tab
2. Find "nmap" tool
3. Click "Execute" button
4. Enter your command:
   
   nmap -sV -p 80,443 target.com

5. Click "Run"
6. View results in terminal output below
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

# Database Testing
sqlmap -u "http://target.com/page?id=1" --dbs
```

**Execution Tips:**
- ⏱️ **Timeouts:** Long scans may take 1-5 minutes
- 📊 **Large Output:** Results display in scrollable terminal
- 🔄 **Real-time:** See output as tool runs
- 📋 **Copy Results:** Select and copy terminal output
- 💾 **Save Findings:** Keep notes of important discoveries

---

#### ✏️ Editing a Tool

**When to Edit:**
You want to change tool details (name, description, installation command).

**How to Edit:**

```
1. In Tools tab, find the tool
2. Click "Edit" (pencil icon)
3. Modify any field:
   - Name
   - Category
   - Description
   - Installation Command
4. Click "Update"
```

**Example - Updating nmap Installation:**
```
Before: apt-get install nmap
After:  apt-get install nmap nmap-scripts

(You want to add NSE scripts for enhanced scanning)
```

---

#### 📦 Installing Tools

**What It Does:**
Verifies if a tool is installed on the system, or installs it if not.

**How to Install:**

```
1. In Tools tab, find the tool
2. Click "Install" or "Check Installation" button
3. System will:
   - Check if tool is already installed
   - If not, run the installation command
   - Show status when complete
4. Once installed (✅), you can execute it
```

**Installation Status:**
- 🟡 **Pending:** Installation command not yet run
- ⏳ **Installing:** Currently installing
- ✅ **Installed:** Ready to use
- ❌ **Failed:** Installation had errors (check logs)

---

#### 🗑️ Deleting a Tool

**When to Delete:**
Tool is no longer needed in your toolkit.

**How to Delete:**

```
1. In Tools tab, find the tool
2. Click "Delete" (trash icon)
3. Confirm deletion message
4. Tool is removed from your list
```

⚠️ **Warning:** This removes the tool from your toolkit but does NOT uninstall it from the system.

---

#### Complete Workflow: Add → Install → Execute

**Scenario:** You want to add and use `nikto` web scanner

```
Step 1: Add the Tool
╔════════════════════════════════════════════╗
║ Go to Tools tab                            ║
║ Click "Add New Tool"                       ║
║ Name: nikto                                ║
║ Category: Web Scanner                      ║
║ Description: Web application scanning      ║
║ Install Cmd: apt-get install nikto         ║
║ Click "Create Tool"                        ║
╚════════════════════════════════════════════╝

Step 2: Install the Tool
╔════════════════════════════════════════════╗
║ Find "nikto" in your tools list            ║
║ Click "Install" button                     ║
║ Wait for installation to complete (✅)     ║
╚════════════════════════════════════════════╝

Step 3: Execute the Tool
╔════════════════════════════════════════════╗
║ Click "Execute" on nikto                   ║
║ Enter command:                             ║
║   nikto -h https://target.com              ║
║ Click "Run"                                ║
║ View results in terminal                   ║
╚════════════════════════════════════════════╝
```

---

#### Tool Management Tips

✅ **Best Practices:**
- 📝 Use clear, descriptive names
- 🏷️ Categorize tools logically
- 🔍 Test tools after installation
- 📚 Keep descriptions updated
- 🧹 Remove unused tools periodically

⚠️ **Common Issues:**
- **Tool won't install:** Check if installation command is correct
- **Execute fails:** Verify tool is installed (✅ status)
- **Slow execution:** Some tools can take several minutes
- **Permission denied:** Some tools need elevated privileges

💡 **Pro Tips:**
- Build a toolkit tailored to your workflow
- Group similar tools by category
- Document custom tools with detailed descriptions
- Share tool configurations with your team

---

## 📖 How to Use

### Workflow 1: Basic Reconnaissance

**Goal:** Gather information about a target domain

**Steps:**
```
1. Login to Cyber-Forge
2. Go to "Google Dorking" tab
3. Enter target domain (e.g., "example.com")
4. Click reconnaissance query buttons:
   - "Email Addresses"
   - "File uploads"
   - "Exposed configs"
5. Review results in new browser tab
6. Bookmark/save interesting findings
```

### Workflow 2: Network Scanning

**Goal:** Scan a network for active hosts

**Steps:**
```
1. Go to "Tools" tab
2. Find "nmap" tool
3. Click "Execute"
4. Enter command:
   nmap -sn 192.168.1.0/24
5. Wait for scan to complete
6. View results showing active hosts
7. Copy results for report
```

### Workflow 3: DNS Enumeration

**Goal:** Find DNS records and subdomains

**Steps:**
```
1. Go to "Tools" tab
2. Click "Execute" on "dig" tool
3. Enter command:
   dig example.com ANY
4. View DNS records returned
5. Repeat for subdomains you found
   dig subdomain.example.com
```

### Workflow 4: Generating Reports

**Save Your Findings:**
1. As you find results, take screenshots
2. Copy important output from terminals
3. Use your notes app or Word/Excel
4. Compile into your report

**Export Options:**
- Screenshot tool (if available)
- Copy/paste results
- Save browser page as PDF

---

## ❓ FAQs

### Q: How long do my sessions last?
**A:** Your session remains active as long as you're using the browser. Inactive sessions expire after **1 hour**. You'll be asked to login again.

### Q: Can I save commands or history?
**A:** Not currently in the interface, but you can:
- Copy results and save in text file
- Take screenshots
- Keep notes in your own system

### Q: What if a tool I need isn't available?
**A:** Contact your **administrator**. They can add new tools to the platform.

### Q: Can I run multiple tools at the same time?
**A:** You can open multiple browser tabs and run tools in parallel:
1. Open tool in Tab 1, start execution
2. Open tool in Tab 2, start execution
3. Switch between tabs to monitor progress

### Q: What's the maximum time a tool can run?
**A:** Depends on the tool, but typically:
- Quick queries (whois, dig): 5-30 seconds
- Network scans (nmap): 2-10 minutes
- Large scans: 30+ minutes

### Q: Is my data/findings saved?
**A:** Currently **no automatic saving**. You must:
- Copy output manually
- Save to your own files
- Make screenshots

Consider asking admin about data export features.

### Q: Can I share results with team members?
**A:** Share findings by:
- Exporting results to file
- Screenshot sharing
- Email summary

Or ask admin if they can add shared projects feature.

### Q: What if I get an error?
**A:** Common errors:

| Error | Cause | Solution |
|-------|-------|----------|
| "Tool not installed" | Administrator hasn't installed tool | Contact admin |
| "Connection timeout" | Network issue | Check internet, wait, retry |
| "Command not allowed" | Invalid command format | Review command syntax |
| "Session expired" | Inactive for > 1 hour | Login again |

### Q: Is my activity being logged?
**A:** Possibly. Check with your **administrator's security policy**.

For enterprise users: assume all activities are logged for compliance.

### Q: Can admins see my commands?
**A:** Likely yes, in professional/enterprise settings. Don't run unauthorized commands.

### Q: What if I forget my username?
**A:** Contact your **administrator** for account recovery.

---

## 🆘 Support & Troubleshooting

### I Can't Login

**Issue:** "Invalid username or password"

- ✓ Check if Caps Lock is ON
- ✓ Verify username (not email)
- ✓ Copy/paste password carefully
- ✓ Use "Forgot Password" if unsure

### Email Verification Not Working

**Issue:** "Didn't receive verification email"

- ✓ Check **Spam/Junk** folder
- ✓ Wait 2-3 minutes (mail can be slow)
- ✓ Check if email was entered correctly during signup
- ✓ Try signing up again with different email
- ✓ Contact **administrator** if still failing

### Tools Not Showing Results

**Issue:** "Tool executed but no output shown"

- ✓ Wait a few seconds (output loads)
- ✓ Scroll down (output might be below)
- ✓ Refresh browser (F5)
- ✓ Try different tool to test
- ✓ Contact **administrator**

### Command Errors

**Issue:** "Command format invalid" or "Command not allowed"

- ✓ Check command **spelling**
- ✓ Verify **command format** (e.g., `nmap -sV domain.com`)
- ✓ Some special characters might be blocked
- ✓ Try simpler version of command
- ✓ Ask **administrator** if command is whitelisted

### Slow Performance

**Issue:** "Tool is running very slowly" or "Page is laggy"

- ✓ Check your **internet connection** speed
- ✓ Close other browser tabs (free up RAM)
- ✓ Try using **different browser**
- ✓ Use incognito/private mode
- ✓ Restart browser
- ✓ Contact **administrator** for server status

### Browser Compatibility

**Issue:** "Interface looks broken" or "Buttons not working"

- ✓ Make sure you're using **recommended browser**
- ✓ Try **Chrome or Firefox** (most compatible)
- ✓ Disable browser extensions
- ✓ Clear browser cache (Ctrl+Shift+Del)
- ✓ Try incognito/private mode

### Data Not Saving

**Issue:** "I lost my results when I refreshed the page"

⚠️ Currently the platform **does not auto-save** results.

**Workaround:**
- Copy output → paste in text editor
- Save file on your computer
- Take screenshots
- Ask **administrator** about export features

---

## 🔐 Security Tips

### Protect Your Account

1. **Use Strong Password**
   - 12+ characters
   - Mix of upper/lowercase, numbers, symbols
   - Don't reuse passwords

2. **Don't Share Credentials**
   - Never give password to anyone
   - Each user gets own account
   - Report shared accounts to admin

3. **Logout When Done**
   - Click "Logout" before closing
   - On shared computers, always logout
   - Don't let browser stay open unattended

4. **Use HTTPS**
   - Always access via `https://` (not `http://`)
   - Warning icon = security issue
   - Stop and contact admin if HTTPS fails

5. **Report Security Issues**
   - Suspicious activity → Contact admin
   - Found a security bug → Report immediately
   - Unauthorized access attempt → Alert team

### Usage Responsibility

- ✅ Only scan systems **you own or have permission** for
- ✅ Follow your **organization's policies**
- ✅ Don't use for unauthorized activities
- ✅ Keep findings **confidential**
- ✅ Document your security testing

---

## 📞 Contact & Support

### Getting Help

**For Account Issues:**
- Email: support@cyber-forge.example.com
- Contact your administrator

**For Technical Issues:**
- Check this FAQ section first
- Contact your **system administrator**
- Document the error/issue clearly

**For Feature Requests:**
- Share ideas with your **administrator**
- They can prioritize new features

**For Security Issues:**
- **DO NOT post publicly**
- Email administrator immediately
- Include: What happened, when, details

### Information to Provide When Asking for Help

1. **What you were doing** (step by step)
2. **What happened** (expected vs actual)
3. **Error messages** (exact text or screenshot)
4. **When it happened** (date/time)
5. **Your username** (so they can check logs)
6. **Browser & OS** (Chrome on Windows 11, etc.)

---

## 🎓 Quick Start Checklist

- [ ] Login to Cyber-Forge
- [ ] Verify your email
- [ ] Explore "Google Dorking" tab
- [ ] Try one dorking query (e.g., email search)
- [ ] Go to "Tools" tab
- [ ] Find a tool (nmap, dig, whois)
- [ ] Execute a simple command
- [ ] Save results manually
- [ ] Logout before leaving

---

## 💡 Tips & Tricks

### Shortcut Commands

```bash
# Quick DNS check
dig target.com MX          # Mail servers
dig target.com NS          # Name servers
dig +short target.com      # Simple format

# Quick network info
whois target.com           # Domain info
whois 1.2.3.4              # IP info

# Quick port check
nmap -p 80,443 target.com  # Check specific ports
nmap --top-ports 20 target.com  # Top 20 ports
```

### Organizing Your Findings

1. Create text file: `findings_target.txt`
2. Paste results as you find them
3. Add notes like:
   ```
   === target.com ===
   Scanned: 2025-05-20
   Tools Used: nmap, dig, whois
   
   Key Findings:
   - Open ports: 80, 443
   - Mail server: mail.target.com
   - Admin email: admin@target.com
   
   Notes: Follow up on exposed config file
   ```

### Combining Tools for Better Results

```
Workflow: Get full picture of target

1. whois target.com → Get basic info
2. dig target.com → Get IP address
3. nmap -sV [IP] → Scan services
4. Google Dorking → Find exposed files
5. Compile findings in report
```

---

## 🔄 Workflow Examples

### Example 1: Domain Intelligence Gathering (30 min)

```
Goal: Gather all available info about example.com

Step 1: Basic Info (5 min)
├─ whois example.com → Get registrant info
└─ dig example.com → Get IP & DNS records

Step 2: OSINT Search (10 min)
├─ Google Dorking: Email addresses
├─ Google Dorking: File uploads
├─ Google Dorking: Exposed configs
└─ Google Dorking: Login pages

Step 3: Network Scan (10 min)
├─ nmap -sV [IP] → Get services
└─ nmap --script vuln [IP] → Check vulns

Step 4: Compile (5 min)
└─ Save findings to report document
```

### Example 2: Quick Technical Check

```
Need to verify: Are services running on target.com?

Quick commands:
1. dig target.com → Get IP
2. nmap -sV 1.2.3.4 -p 80,443 → Check web ports
3. curl https://target.com → Test HTTP response

Done in < 5 minutes
```

---

## 📊 Feature Summary Table

| Feature | What It Does | Who Uses It | Time | Output |
|---------|-------------|------------|------|--------|
| **Google Dorking** | OSINT via Google search | Researchers | Variable | Browser tab |
| **Nmap** | Network scanning | Security teams | 2-30 min | Terminal output |
| **Dig** | DNS queries | Analysts | < 1 sec | DNS records |
| **Whois** | Domain information | Everyone | 2-5 sec | Registration info |
| **Tool Executor** | Run custom tools | Admins | Variable | Terminal output |

---

## 🎯 Next Steps

1. **Get Started:** Login and verify your email
2. **Explore:** Try Google Dorking on a test domain
3. **Learn:** Execute a simple tool (dig, whois)
4. **Practice:** Run a tool workflow
5. **Save:** Know how to save your findings
6. **Bookmark:** Keep this guide handy

---

## 📌 Remember

✅ This is a **professional tool** - use responsibly  
✅ Always have **written permission** before testing  
✅ Document and save **all your findings**  
✅ Keep results **confidential**  
✅ Follow your **organization's policies**  
✅ When stuck, **contact your administrator**  

---

**Happy security hunting! 🔒**

---

*For technical documentation, developers, and administrators, see the main README.md*  
*Last Updated: May 2025*
