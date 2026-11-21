# WhatTurtDo

A shared wishlist of things to do together. Local development uses React,
TypeScript, Vite and Tailwind CSS for the frontend, and FastAPI, SQLAlchemy,
SQLite and Alembic for the backend.

## Local setup

Use Node.js 22.12 or newer and Python 3.11 or newer. Run these commands from
the repository root.

Install dependencies and prepare SQLite:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r backend/requirements.txt
.venv/bin/alembic -c backend/alembic.ini upgrade head
npm --prefix frontend ci
```

Start the API in one terminal:

```sh
.venv/bin/python -m uvicorn app.main:app --app-dir backend --reload --reload-dir backend/app
```

Start the frontend in another terminal:

```sh
npm --prefix frontend run dev
```

Open [WhatTurtDo](http://127.0.0.1:5173). The startup page checks the API
through Vite's local proxy and reports whether FastAPI can query SQLite.
[FastAPI docs](http://127.0.0.1:8000/docs) are available while the API is running.

SQLite data lives in `backend/data/`. Alembic is configured, and migration
revisions will be added when the first application tables are defined.

Run `npm --prefix frontend run build` to type-check and build the frontend.
