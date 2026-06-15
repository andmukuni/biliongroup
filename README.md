# Bilion Group

Corporate profile and website for **Belion Groupe Limited**.

## Contents

- [`BELION-GROUPE-PROFILE-2026.md`](BELION-GROUPE-PROFILE-2026.md) — Structured company profile extracted from the 2026 PDF
- [`BELION GROUPE - PROFILE 2026.pdf`](BELION%20GROUPE%20-%20PROFILE%202026.pdf) — Source company profile document
- [`belion-web/`](belion-web/) — AdonisJS corporate website (Docker + Coolify ready)

## Website

```bash
cd belion-web
npm install
cp .env.example .env
node ace generate:key
node ace migration:run
npm run dev
```

See [`belion-web/README.md`](belion-web/README.md) for Docker and Coolify deployment.
