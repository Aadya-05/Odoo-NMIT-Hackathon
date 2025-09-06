# backend/app/api/v1/endpoints/projects.py

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.crud import crud_project, crud_task
from app.schemas.project import Project, ProjectCreate
from app.schemas.task import Task
from app.api.v1.deps import get_db, get_current_user
from app.db.models.user import User as UserModel

router = APIRouter()

@router.post("/", response_model=Project, status_code=status.HTTP_201_CREATED)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    """
    Creates a new project owned by the current user.
    """
    return crud_project.create_project(db=db, project=project, owner_id=current_user.id)


@router.get("/", response_model=List[Project])
def read_projects_for_user(
    db: Session = Depends(get_db), 
    current_user: UserModel = Depends(get_current_user)
):
    """
    Lists all projects the current user is a member of.
    """
    return crud_project.get_projects_for_user(db, user_id=current_user.id)


@router.get("/{project_id}/tasks", response_model=List[Task])
def read_tasks_in_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    """
    Lists all tasks for a specific project. Ensures user is a member.
    """
    project = crud_project.get_project(db, project_id=project_id)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    
    # Check if the current user is a member of the project
    if current_user not in project.members:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to access this project")
    
    return crud_task.get_tasks_for_project(db, project_id=project_id)