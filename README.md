# Hono OpenAPI Starter Template

This is a starter template for building production-grade applications using Hono, OpenAPI, and Drizzle.

## Features

- [x] Structured logging
- [x] Documented type-safe routes
- [x] Interactive API documentation
- [x] Docker setup
- [x] Type-safe schemas and environment variables
- [x] Single source of truth database schemas
- [x] Database migrations and seeders
- [x] Testing
- [x] Linting and formatting rules
- [ ] Health checks
- [ ] CI/CD pipeline
- [ ] Metrics
- [ ] Error tracking
- [ ] Debugging

## Tech Stack

- Node.js
- Hono
- Drizzle
- Postgres
- TypeScript
- Docker
- Scalar
- pino
- zod
- Vitest
- Prometheus
- Grafana
- Dozzle

## Getting Started

Create `.env` file:

```sh
cp .env.example .env
```

Install dependencies:

```sh
pnpm install
```

Run DB server and push the schema:

```sh
pnpm dev:docker
pnpm db:push
```

## Running Locally

Run the app:

```sh
pnpm dev
```

You can now access API documentation at <http://localhost:4000/reference>.
