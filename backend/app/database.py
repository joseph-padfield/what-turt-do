from pathlib import Path

from sqlalchemy import URL, create_engine
from sqlalchemy.orm import DeclarativeBase

DATA_DIR = Path(__file__).resolve().parents[1] / "data"
DATA_DIR.mkdir(exist_ok=True)

engine = create_engine(
    URL.create("sqlite", database=str(DATA_DIR / "whatturtdo.sqlite3")),
)


class Base(DeclarativeBase):
    pass
