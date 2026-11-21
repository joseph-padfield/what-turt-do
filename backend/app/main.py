import logging
from typing import Literal

from fastapi import FastAPI, HTTPException
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from .database import engine

logger = logging.getLogger(__name__)
app = FastAPI(title="WhatTurtDo")


@app.get("/api/health")
def health() -> dict[str, Literal["ok"]]:
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1")).scalar_one()
    except SQLAlchemyError as exc:
        logger.exception("Database health check failed")
        raise HTTPException(status_code=503, detail="Database unavailable") from exc
    return {"status": "ok"}
