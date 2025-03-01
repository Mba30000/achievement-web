from sqlmodel import Field, SQLModel, Relationship
from typing import List, Optional
from datetime import date, datetime
from sqlalchemy import Column, Integer, String, ForeignKey

class AchievementDepartment(SQLModel, table=True):
    achievement_id: int = Field(foreign_key="achievement.id", primary_key=True)
    department_id: int = Field(foreign_key="department.id", primary_key=True)

class AchievementPerson(SQLModel, table=True):
    achievement_id: int = Field(foreign_key="achievement.id", primary_key=True)
    person_id: int = Field(foreign_key="person.id", primary_key=True)

class Role(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    permissions: Optional[str] = None

    users: List["User"] = Relationship(back_populates="role")

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    username: str  # Add this line
    password_hash: str
    person_id: Optional[int] = Field(foreign_key="person.id")
    role_id: Optional[int] = Field(foreign_key="role.id")

    person: Optional["Person"] = Relationship(back_populates="user")
    role: Optional[Role] = Relationship(back_populates="users")


class Person(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    email: str = Field(sa_column_kwargs={"unique": True})  # Unique constraint❄️
    department_id: Optional[int] = Field(foreign_key="department.id")

    department: Optional["Department"] = Relationship(back_populates="persons")
    user: Optional[User] = Relationship(back_populates="person")
    achievements: List["Achievement"] = Relationship(
        back_populates="persons", link_model=AchievementPerson
    )

class Achievement(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    achievement_type_id: Optional[int] = Field(foreign_key="achievementtype.id")
    date: Optional[datetime] = None
    primary_person_id: Optional[int] = Field(foreign_key="person.id")
    department_id: Optional[int] = Field(foreign_key="department.id")
    visibility: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    achievement_type: Optional["AchievementType"] = Relationship(back_populates="achievements")
    departments: Optional["Department"] = Relationship(
        back_populates="achievements", link_model=AchievementDepartment
    )
    persons: List["Person"] = Relationship(link_model=AchievementPerson)
    attributes: List["AchievementAttribute"] = Relationship(back_populates="achievement")

class AchievementAttribute(SQLModel, table=True):
    achievement_id: int = Field(
        sa_column=Column(Integer, ForeignKey("achievement.id", ondelete="CASCADE"), primary_key=True)
    )
    attribute_name: str = Field(
        sa_column=Column(String, primary_key=True)
    )
    attribute_value: Optional[str] = None
    achievement: Optional["Achievement"] = Relationship(back_populates="attributes")


class Department(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = None

    persons: List["Person"] = Relationship(back_populates="department")
    achievements: List["Achievement"] = Relationship(
        back_populates="departments", link_model=AchievementDepartment
    )

class AchievementType(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = None

    achievements: List["Achievement"] = Relationship(back_populates="achievement_type")