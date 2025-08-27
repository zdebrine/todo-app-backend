# Nooro Backend

A lean backend starter using **Express.js**, **TypeScript**, **Prisma**, and **MySQL (Docker)**.  
MySQL runs in Docker; the API runs on your machine (or in Docker if you prefer).  
Prisma provides a clean data layer and a built-in GUI.

---

## 📦 Quickstart

### 1. Install dependencies
```bash
npm install
```

### 2. Start MySQL in Docker
```bash
docker compose up -d
```

### 3. Point Prisma to the DB (choose one)
If tables already exist:
```bash
npx prisma db pull && npx prisma generate
```

If starting fresh (creates tables from schema):
```bash
npx prisma migrate dev --name init
```

### 4. Run the API
```bash
npm run dev
```

### 5. Smoke test
```bash
curl http://localhost:4000/health
```

---

## 🔑 Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Compose v2)  
- (Optional) `curl` for quick API tests

---

## ⚙️ Environment Variables

Create `.env` from `.env.example` and set:

```bash
# App
PORT=4000

# Local Docker MySQL
DATABASE_URL="mysql://root:password@127.0.0.1:3306/express_db"
```

If your API also runs in Docker on the same compose network, use `db` as host:

```
mysql://root:password@db:3306/express_db
```

---

## 🐳 Docker (MySQL)

`docker-compose.yml` (already in the repo):

```yaml
version: '3.9'
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: express_db
    ports:
      - "3306:3306"
    command: --default-authentication-plugin=mysql_native_password
    volumes:
      - db_data:/var/lib/mysql
volumes:
  db_data:
```

### Commands you’ll use

```bash
docker compose up -d         # start DB
docker compose logs -f db    # tail logs
docker compose down          # stop
docker compose down -v       # stop + delete data volume (DANGER: wipes data)
```

---

## 🔧 Prisma Setup

If your tables already exist (e.g., `task`):

```bash
npx prisma db pull
npx prisma generate
```

If starting fresh and want Prisma to create tables:

```bash
npx prisma migrate dev --name init
```

Open the local GUI:

```bash
npx prisma studio
# http://localhost:5555
```

---

## 🚀 Run the API

### Dev with hot-reload (via tsx)
```bash
npm run dev
# API at http://localhost:4000
```

### Build & run
```bash
npm run build
npm start
```

### npm scripts (reference)
```json
{
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "prisma:studio": "prisma studio",
  "prisma:generate": "prisma generate",
  "prisma:migrate": "prisma migrate dev"
}
```

---

## 📡 API: Tasks

Base URL: `http://localhost:4000`

### Health
```
GET /health
→ 200 { "ok": true }
```

### List tasks
```
GET /tasks
→ 200 [ { id, title, color, completed, createdAt, updatedAt }, ... ]
```

### Create task
```
POST /tasks
Content-Type: application/json
{
  "title": "Ship v1",
  "color": "#FFD166",
  "completed": false
}
→ 201 { id, title, ... }
```

### Update task
```
PUT /tasks/:id
Content-Type: application/json
{
  "completed": true,
  "title": "Ship v1.1"
}
→ 200 { id, title, ... }
```

### Delete task
```
DELETE /tasks/:id
→ 204 (no content)
```

---

## 🧪 Curl Examples

```bash
# create
curl -X POST http://localhost:4000/tasks   -H "Content-Type: application/json"   -d '{"title":"Ship v1","color":"#FFD166","completed":false}'

# list
curl http://localhost:4000/tasks

# update
curl -X PUT http://localhost:4000/tasks/1   -H "Content-Type: application/json"   -d '{"completed":true}'

# delete
curl -X DELETE http://localhost:4000/tasks/1
```
