# Cyber-Forge

Cyber-Forge is a web-based cybersecurity operations dashboard for reconnaissance, tool management, and terminal-style command execution.

## What it does

- Manage and organize security tools from a single interface
- Run terminal-style commands through a browser
- Switch between free and restricted terminal modes
- Open a lightweight OSINT workflow with Google Dorking helpers
- Support Docker-based deployment for easier setup

## Quick start

### With Docker

```bash
docker compose up --build
```

Open the app at:

```text
http://localhost:8080
```

### Local development

Backend:

```bash
cd backend
composer install
php artisan migrate
php artisan serve
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Default test account

After seeding the database, you can sign in with:

- Username: `testuser`
- Password: `TestUser123!`

Seed command:

```bash
docker compose exec backend php artisan db:seed
```

## Project structure

- `backend/` — Laravel API, authentication, tool logic, database
- `frontend/` — React + Vite UI, terminal view, tools page
- `docker-compose.yml` — container setup for backend and frontend

## Notes

- The terminal supports free mode for shell-style commands and restricted mode for installed tools only.
- Tool registration and management are available directly from the Tools page.

## License

MIT License. See [LICENSE](LICENSE).
