# backend/app/crud/crud_user.py

from typing import Optional
from sqlmodel import Session, select

from app.models import User, UserCreate
from app.core.security import get_password_hash

def get_user_by_email(session: Session, email: str) -> Optional[User]:
    """
    Find a user in the database by their email.
    """
    statement = select(User).where(User.email == email)
    return session.exec(statement).first()

def create_user(session: Session, user_create: UserCreate) -> User:
    """
    Create a new user in the database.
    """
    # Hash the user's password before saving
    hashed_password = get_password_hash(user_create.password)
    
    # Create a new User model instance from the input schema
    db_user = User.model_validate(user_create, update={"hashed_password": hashed_password})
    
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    
    return db_user