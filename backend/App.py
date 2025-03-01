from fastapi import FastAPI, HTTPException, Depends
from sqlmodel import SQLModel, Session, create_engine, select
from Models import (
    Role, User, Person, Department, Achievement, AchievementType,
    AchievementAttribute, AchievementPerson, AchievementDepartment
)
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta, datetime
import jwt  
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from utility import *
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import delete
from datetime import datetime
import logging

DATABASE_URL = "sqlite:///database.db"
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

engine = create_engine(DATABASE_URL)
SQLModel.metadata.create_all(engine)

app = FastAPI()

# Define allowed origins
origins = [
    "http://localhost:3000",  # Frontend URL
    "http://127.0.0.1:3000",
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specific frontend origins
    allow_credentials=True,  # Allows cookies
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_session():
    with Session(engine) as session:
        yield session

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    print(token)
    return token

def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    payload = jwt.decode(token + "=", SECRET_KEY, algorithms=["HS256"], options={"verify_signature": False})
    user_id = payload.get("sub")
    user = session.exec(select(User).where(User.id == user_id)).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user

@app.get("/users/{user_id}/")
def get_user(user_id: int, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.id == user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/persons/{person_id}/")
def get_person(person_id: int, session: Session = Depends(get_session)):
    person = session.exec(select(Person).where(Person.id == person_id)).first()
    if not person:
        raise HTTPException(status_code=404, detail="Person not found")
    return person

@app.get("/achievements/achievement/{achievement_id}/")
def get_achievement(achievement_id: int, session: Session = Depends(get_session)):
    achievement = session.exec(select(Achievement).where(Achievement.id == achievement_id)).first()
    if not achievement:
        raise HTTPException(status_code=404, detail="Acheivment not found")
    return achievement

@app.get("/department/{department_id}/")
def get_achievement(department_id: int, session: Session = Depends(get_session)):
    department = session.exec(select(Department).where(Department.id == department_id)).first()
    if not department:
        raise HTTPException(status_code=404, detail="Acheivment not found")
    return department

@app.post("/signup/")
def signup(first_name: str, last_name: str, email: str, username: str, password_hash: str, session: Session = Depends(get_session)):
    # Create a new Person instance
    person = Person(first_name=first_name, last_name=last_name, email=email)
    session.add(person)
    session.commit()  # Commit to get the `person.id`
    session.refresh(person)  # Refresh the person object to have the ID
    
    # Hash the password before storing (if not done already)
    hashed_password = hash_password(password_hash)
    
    # Create a new User instance and link to the created Person
    user = User(username=username, password_hash=hashed_password, person_id=person.id)
    session.add(user)
    session.commit()  # Commit to add the user to the database
    session.refresh(user)  # Refresh the user object to ensure it has the latest data
    
    return user

@app.post("/token/")
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.username == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token({"sub": user.id}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer", "user_id": user.id}

@app.post("/logout/")
def logout():
    return {"message": "Logged out successfully"}

### --- USERS ---
@app.put("/users/{user_id}/")
def edit_user_profile(user_id: int, updated_user: User, session: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    user = session.exec(select(User).where(User.id == user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.password_hash = hash_password(user.password_hash) #! you need to enter the UNHASHED password
    for key, value in updated_user.model_dump(exclude_unset=True).items():
        setattr(user, key, value)
    session.commit()
    session.refresh(user)
    return user


### --- PERSONS ----
@app.put("/person/{person_id}/")
def update_person(person_id: int, updated_person: PersonUpdate, session: Session = Depends(get_session)):
    person = session.exec(select(Person).where(Person.id == person_id)).first()
    if not person:
        raise HTTPException(status_code=404, detail="Person not found")
    
    if updated_person.department_id:
        department = session.exec(select(Department).where(Department.id == updated_person.department_id)).first()
        if not department:
            raise HTTPException(status_code=400, detail="Invalid department ID")
    
    for key, value in updated_person.model_dump(exclude_unset=True).items():
        setattr(person, key, value)
    session.commit()
    session.refresh(person)
    return person


### --- ACHIEVEMENTS ---
@app.post("/achievements/")
def create_achievement(achievement: Achievement, contributors: list[int] = [], session: Session = Depends(get_session)):
    try:
        # Validate title
        # Validate title
        if not achievement.title:
            raise HTTPException(status_code=400, detail=f"Title cannot be null or empty. Provided title: {achievement.date}")


        # Check if 'date' is provided, otherwise set to current date
        if achievement.date:
            achievement.date = convert_to_datetime(achievement.date)
        else:
            achievement.date = datetime.utcnow()  # Or set to NULL if desired
        
        # Ensure created_at and updated_at are valid datetime objects
        achievement.created_at = convert_to_datetime(achievement.created_at)
        achievement.updated_at = convert_to_datetime(achievement.updated_at)

        # Add the achievement to the session
        session.add(achievement)
        session.commit()  # Commit to get achievement ID assigned
        session.refresh(achievement)
        logging.info(f"Achievement added with ID: {achievement.id}")

        # Add contributors to the AchievementPerson table
        if achievement.primary_person_id:
            achievement_person = AchievementPerson(
                achievement_id=achievement.id, person_id=achievement.primary_person_id
            )
            session.add(achievement_person)
            logging.info(f"Added contributor with person ID: {achievement.primary_person_id}")

        # Add departments to the AchievementDepartment table
        if achievement.department_id:
            achievement_department = AchievementDepartment(
                achievement_id=achievement.id, department_id=achievement.department_id
            )
            session.add(achievement_department)
            logging.info(f"Added department with department ID: {achievement.department_id}")

        # Commit all changes to the database
        session.commit()
        logging.info(f"Contributors and departments committed for achievement ID: {achievement.id}")

        return achievement

    except Exception as e:
        logging.error(f"Error while creating achievement: {str(e)}")
        session.rollback()
        raise HTTPException(status_code=500, detail="Error while creating achievement")
import logging
logging.basicConfig(level=logging.INFO)  # Set logging level to INFO or DEBUG for detailed logs


@app.put("/achievements/{achievement_id}/")
def edit_achievement(achievement_id: int, updated_achievement: Achievement, session: Session = Depends(get_session)):
    try:
        # Fetch existing achievement
        existing_achievement = session.get(Achievement, achievement_id)
        if not existing_achievement:
            raise HTTPException(status_code=404, detail="Achievement not found")

        # Validate title
        if not updated_achievement.title:
            raise HTTPException(status_code=400, detail="Title cannot be null or empty")

        # Update fields
        existing_achievement.title = updated_achievement.title
        existing_achievement.date = convert_to_datetime(updated_achievement.date) if updated_achievement.date else datetime.utcnow()
        existing_achievement.updated_at = datetime.utcnow()  # Only update 'updated_at'
        

        if updated_achievement.achievement_type_id:
            achievement_type = session.get(AchievementType, updated_achievement.achievement_type_id)
        if not achievement_type:
            raise HTTPException(status_code=400, detail="Invalid achievement type ID")
        existing_achievement.achievement_type = achievement_type
        # Commit all changes
        session.commit()
        session.refresh(existing_achievement)

        logging.info(f"Achievement updated with ID: {existing_achievement.id}")
        return existing_achievement

    except Exception as e:
        logging.error(f"Error while updating achievement: {str(e)}")
        session.rollback()
        raise HTTPException(status_code=500, detail="Error while updating achievement")
    
    
@app.delete("/achievements/{achievement_id}/")
def delete_achievement(achievement_id: int, session: Session = Depends(get_session)):
    logging.debug(f"Deleting achievement with ID: {achievement_id}")

    achievement = session.exec(select(Achievement).where(Achievement.id == achievement_id)).first()
    if not achievement:
        logging.debug(f"Achievement with ID {achievement_id} not found")
        raise HTTPException(status_code=404, detail="Achievement not found")

    try:
        # Log related AchievementAttributes deletion
        logging.debug(f"Deleting related AchievementAttributes for achievement_id {achievement_id}")
        session.exec(delete(AchievementAttribute).where(AchievementAttribute.achievement_id == achievement_id))

        # Log main Achievement deletion
        logging.debug(f"Deleting achievement with ID {achievement_id}")
        session.delete(achievement)
        session.commit()
        logging.debug(f"Achievement with ID {achievement_id} deleted successfully")

    except SQLAlchemyError as e:
        logging.error(f"Error during deletion: {str(e)}")
        session.rollback()
        raise HTTPException(status_code=500, detail="An error occurred while deleting the achievement")

    return {"message": f"Achievement with ID {achievement_id} deleted"}



@app.get("/achievements/user/{user_id}/")
def get_user_achievements(user_id: int, session: Session = Depends(get_session)):
    person_achievements = session.exec(
        select(AchievementPerson).where(AchievementPerson.person_id == user_id)
    ).all()

    achievement_ids = [pa.achievement_id for pa in person_achievements]

    if not achievement_ids:
        return []

    achievements = session.exec(
        select(Achievement).where(Achievement.id.in_(achievement_ids))
    ).all()

    return achievements

@app.get("/achievements/department/{department_id}/")
def get_department_achievements(department_id: int, session: Session = Depends(get_session)):
    department_achievements = session.exec(select(AchievementDepartment).where(AchievementDepartment.department_id == department_id)).all()
    achievement_ids = [da.achievement_id for da in department_achievements]
    if not achievement_ids:
        return []
    return session.exec(select(Achievement).where(Achievement.id.in_(achievement_ids))).all()

@app.get("/achievements/recent/")
def get_recent_achievements(session: Session = Depends(get_session)):
    return session.exec(select(Achievement).order_by(Achievement.created_at.desc()).limit(10)).all()

### --- SEARCH ---
@app.get("/search/")
def search_entities(query: str, session: Session = Depends(get_session)):
    users = session.exec(select(User).where(User.username.contains(query))).all()
    departments = session.exec(select(Department).where(Department.name.contains(query))).all()
    achievements = session.exec(select(Achievement).where(Achievement.title.contains(query))).all()
    return {"Users": users, "departments": departments, "achievements": achievements}



@app.get("/department/{department_id}")
def get_departmentName(department_id: int, session: Session = Depends(get_session)) -> str:
    department = session.exec(select(Department).where(Department.id == department_id)).first()
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")
    return department.name

@app.get("/role/{role_id}")
def get_roleName(role_id: int, session: Session = Depends(get_session)) -> str:
    role = session.exec(select(Role).where(Role.id == role_id)).first()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    return role.name

@app.get("/roles/")
def get_roles(session: Session = Depends(get_session)) -> list:
    roles = session.exec(select(Role)).all()
    if not roles:
        raise HTTPException(status_code=404, detail="No roles found")
    return roles

@app.get("/types/")
def get_types(session: Session = Depends(get_session)) -> list:
    types = session.exec(select(AchievementType)).all()
    if not types:
        raise HTTPException(status_code=404, detail="No roles found")
    return types

if __name__ == "__main__":
    uvicorn.run("App:app", host="127.0.0.1", port=8000, reload=True)