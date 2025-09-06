# backend/app/api/v1/endpoints/users.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from Backend.app.crud import crud_user
from Backend.app.db.models.user import User, UserCreate
from Backend.app.api.v1.deps import get_db, get_current_user
from Backend.app.db.models.user import User as UserModel

router = APIRouter()

@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    """
    Handles new user registration.
    """
    db_user = crud_user.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud_user.create_user(db=db, user=user)


@router.get("/me", response_model=User)
def read_current_user(current_user: UserModel = Depends(get_current_user)):
    """
    Fetches the profile of the currently authenticated user.
    """
    return current_user