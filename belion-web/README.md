# Belion Groupe Corporate Website

AdonisJS 6 corporate marketing website for **Belion Groupe Limited**, built from the company profile data.

## Stack

- AdonisJS 6 (Edge templates)
- Tailwind CSS 4
- Alpine.js
- GSAP ScrollTrigger
- Lucid ORM (SQLite dev / PostgreSQL production)
- AdonisJS Mail (contact form notifications)
- Docker + Coolify ready

## Local Development

```bash
cd belion-web
npm install
cp .env.example .env
node ace generate:key
# Set HOST=localhost and DB_CONNECTION=sqlite in .env for local dev
node ace migration:run
npm run dev
```

Visit [http://localhost:3333](http://localhost:3333)

## Docker (local)

### Option A — App + PostgreSQL (recommended)

```bash
cp .env.example .env
node ace generate:key   # copy APP_KEY into .env
# Set POSTGRES_PASSWORD in .env

docker compose up --build
```

App: [http://localhost:3333](http://localhost:3333)

### Option B — Dockerfile only (SQLite + volume)

```bash
docker build -t belion-web .
docker run -p 3333:3333 \
  -e APP_KEY=your-app-key \
  -e HOST=0.0.0.0 \
  -e DB_CONNECTION=sqlite \
  -v belion_data:/app/tmp \
  belion-web
```

## Coolify Deployment

### 1. Create the application

1. In Coolify, add a new **Resource** → **Application**
2. Connect your Git repository (`belion-web` folder or monorepo with base directory `belion-web`)
3. Set **Build Pack** to **Dockerfile**
4. Dockerfile location: `Dockerfile` (default)

### 2. Configure ports & health check

| Setting | Value |
|---------|-------|
| **Port Exposes** | `3333` |
| **Health Check Path** | `/health` |
| **Health Check Port** | `3333` |

Reference: [`coolify.json`](coolify.json)

### 3. Environment variables (required)

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=3333
LOG_LEVEL=info
APP_KEY=<generate with: node ace generate:key>
SESSION_DRIVER=cookie
DB_CONNECTION=postgres
DB_HOST=<postgres service hostname from Coolify>
DB_PORT=5432
DB_USER=<postgres user>
DB_PASSWORD=<postgres password>
DB_DATABASE=<postgres database>
SMTP_HOST=<your smtp host>
SMTP_PORT=587
SMTP_USERNAME=<smtp user>
SMTP_PASSWORD=<smtp password>
MAIL_FROM_ADDRESS=sales@beliongroupe.com
CONTACT_NOTIFY_EMAIL=sales@beliongroupe.com
```

### 4. PostgreSQL on Coolify

1. Create a **PostgreSQL** database in Coolify
2. Link it to the application (Coolify injects `DB_*` vars or use the provided connection details)
3. Set `DB_CONNECTION=postgres` on the app

Migrations run automatically on container start via [`docker/entrypoint.sh`](docker/entrypoint.sh).

### 5. Docker Compose on Coolify (optional)

Deploy using [`docker-compose.yml`](docker-compose.yml) if you prefer a single-stack app + database. Set `POSTGRES_PASSWORD` and `APP_KEY` in Coolify environment variables.

### 6. Persistent storage (SQLite only)

If using `DB_CONNECTION=sqlite`, mount a persistent volume:

| Container path | Purpose |
|----------------|---------|
| `/app/tmp` | SQLite database file |

For production, **PostgreSQL is strongly recommended**.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about` | About Us |
| `/vision-mission` | Vision & Mission |
| `/services` | Products & Services |
| `/projects` | Projects portfolio |
| `/compliance` | Certificates |
| `/contact` | Contact form |
| `/health` | Health check (Coolify/Docker) |

## Production Build (without Docker)

```bash
npm run build
cd build && npm ci --omit=dev && node bin/server.js
```
