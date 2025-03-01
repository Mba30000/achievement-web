from typing import Optional
from sqlmodel import SQLModel, Session, create_engine, select
from datetime import timedelta, datetime


class PersonUpdate(SQLModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    department_id: Optional[int] = None

def convert_to_datetime(value: str | None) -> datetime | None:
    if value and isinstance(value, str):
        try:
            return datetime.strptime(value, "%Y-%m-%dT%H:%M:%S.%fZ")
        except ValueError:
            return datetime.strptime(value, "%Y-%m-%dT%H:%M:%S.%f")
    return value