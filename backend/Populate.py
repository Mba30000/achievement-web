from sqlmodel import Session, SQLModel, create_engine
from datetime import datetime
from Models import (
    Role, User, Person, Department, Achievement, AchievementType,
    AchievementAttribute, AchievementPerson, AchievementDepartment
)

DATABASE_URL = "sqlite:///database.db"
engine = create_engine(DATABASE_URL)

def populate_database():
    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        roles = [
            Role(name="Admin", permissions="ALL"),
            Role(name="User", permissions="READ"),
            Role(name="Manager", permissions="WRITE"),
            Role(name="HR", permissions="MODERATE"),
            Role(name="Tech Lead", permissions="MANAGE"),
            Role(name="Intern", permissions="LIMITED")
        ]
        session.add_all(roles)
        session.commit()

        departments = [
            Department(name="Engineering", description="Handles tech development"),
            Department(name="HR", description="Manages human resources"),
            Department(name="Marketing", description="Responsible for branding"),
            Department(name="Finance", description="Manages financial operations"),
            Department(name="Research", description="Conducts studies"),
            Department(name="Sales", description="Drives revenue")
        ]
        session.add_all(departments)
        session.commit()

        persons = [
            Person(first_name="Alice", last_name="Smith", email="alice@example.com", department_id=departments[0].id),
            Person(first_name="Bob", last_name="Jones", email="bob@example.com", department_id=departments[1].id),
            Person(first_name="Charlie", last_name="Brown", email="charlie@example.com", department_id=departments[2].id),
            Person(first_name="Diana", last_name="Prince", email="diana@example.com", department_id=departments[3].id),
            Person(first_name="Eve", last_name="Adams", email="eve@example.com", department_id=departments[4].id),
            Person(first_name="Frank", last_name="Miller", email="frank@example.com", department_id=departments[5].id)
        ]
        session.add_all(persons)
        session.commit()

        users = [
            User(username="alice_admin", password_hash="hashed1", person_id=persons[0].id, role_id=roles[0].id),
            User(username="bob_user", password_hash="hashed2", person_id=persons[1].id, role_id=roles[1].id),
            User(username="charlie_mgr", password_hash="hashed3", person_id=persons[2].id, role_id=roles[2].id),
            User(username="diana_hr", password_hash="hashed4", person_id=persons[3].id, role_id=roles[3].id),
            User(username="eve_techlead", password_hash="hashed5", person_id=persons[4].id, role_id=roles[4].id),
            User(username="frank_intern", password_hash="hashed6", person_id=persons[5].id, role_id=roles[5].id)
        ]
        session.add_all(users)
        session.commit()

        achievement_types = [
            AchievementType(name="Innovation", description="For innovative projects"),
            AchievementType(name="Teamwork", description="For collaboration efforts"),
            AchievementType(name="Leadership", description="For outstanding leadership"),
            AchievementType(name="Research", description="For groundbreaking studies"),
            AchievementType(name="Community", description="For contributions to society"),
            AchievementType(name="Productivity", description="For exceptional efficiency")
        ]
        session.add_all(achievement_types)
        session.commit()

        # Create Achievements
        achievements = [
            Achievement(title="AI Breakthrough", description="Developed a new AI model.", achievement_type_id=achievement_types[0].id, date=datetime(2025, 1, 10), primary_person_id=persons[0].id, visibility="public", created_at=datetime.now(), updated_at=datetime.now()),
            Achievement(title="Team Building", description="Led a successful project.", achievement_type_id=achievement_types[1].id, date=datetime(2025, 2, 15), primary_person_id=persons[1].id, visibility="private", created_at=datetime.now(), updated_at=datetime.now()),
            Achievement(title="Leadership Award", description="Recognized for leadership.", achievement_type_id=achievement_types[2].id, date=datetime(2025, 3, 20), primary_person_id=persons[2].id, visibility="public", created_at=datetime.now(), updated_at=datetime.now()),
            Achievement(title="Scientific Discovery", description="Published a research paper.", achievement_type_id=achievement_types[3].id, date=datetime(2025, 4, 5), primary_person_id=persons[3].id, visibility="public", created_at=datetime.now(), updated_at=datetime.now()),
            Achievement(title="Community Service", description="Organized charity event.", achievement_type_id=achievement_types[4].id, date=datetime(2025, 5, 10), primary_person_id=persons[4].id, visibility="private", created_at=datetime.now(), updated_at=datetime.now()),
            Achievement(title="Efficiency Booster", description="Optimized workflows.", achievement_type_id=achievement_types[5].id, date=datetime(2025, 6, 25), primary_person_id=persons[5].id, visibility="public", created_at=datetime.now(), updated_at=datetime.now())
        ]
        session.add_all(achievements)
        session.commit()

        achievement_persons = [
            AchievementPerson(achievement_id=achievements[0].id, person_id=persons[0].id),
            AchievementPerson(achievement_id=achievements[1].id, person_id=persons[1].id),
            AchievementPerson(achievement_id=achievements[2].id, person_id=persons[2].id),
            AchievementPerson(achievement_id=achievements[3].id, person_id=persons[3].id),
            AchievementPerson(achievement_id=achievements[4].id, person_id=persons[4].id),
            AchievementPerson(achievement_id=achievements[5].id, person_id=persons[5].id)
        ]
        session.add_all(achievement_persons)
        session.commit()

        achievement_departments = [
            AchievementDepartment(achievement_id=achievements[0].id, department_id=departments[0].id),
            AchievementDepartment(achievement_id=achievements[1].id, department_id=departments[1].id),
            AchievementDepartment(achievement_id=achievements[2].id, department_id=departments[2].id),
            AchievementDepartment(achievement_id=achievements[3].id, department_id=departments[3].id),
            AchievementDepartment(achievement_id=achievements[4].id, department_id=departments[4].id),
            AchievementDepartment(achievement_id=achievements[5].id, department_id=departments[5].id)
        ]
        session.add_all(achievement_departments)
        session.commit()

        achievement_attributes = [
            AchievementAttribute(achievement_id=achievements[0].id, attribute_name="Impact", attribute_value="High"),
            AchievementAttribute(achievement_id=achievements[1].id, attribute_name="Difficulty", attribute_value="Medium"),
            AchievementAttribute(achievement_id=achievements[2].id, attribute_name="Recognition", attribute_value="Top Award"),
            AchievementAttribute(achievement_id=achievements[3].id, attribute_name="Publication", attribute_value="Scientific Journal"),
            AchievementAttribute(achievement_id=achievements[4].id, attribute_name="Community Reach", attribute_value="5000 People"),
            AchievementAttribute(achievement_id=achievements[5].id, attribute_name="Efficiency Gain", attribute_value="30% Improvement")
        ]
        session.add_all(achievement_attributes)
        session.commit()

        print("Database populated successfully with 6 rows per table!")

if __name__ == "__main__":
    populate_database()
