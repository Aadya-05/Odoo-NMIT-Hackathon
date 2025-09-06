# backend/app/api/v1/endpoints/tasks.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.crud import crud_task, crud_project
from app.schemas.task import Task, TaskCreate, TaskUpdate
from app.api.v1.deps import get_db, get_current_user
from app.db.models.user import User as UserModel

router = APIRouter()

@router.post("/", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_new_task(
    project_id: int,
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    """
    Creates a new task within a specific project.
    """
    project = crud_project.get_project(db, project_id=project_id)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    if current_user not in project.members:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Not authorized to create tasks in this project"
        )
    
    # Optional: Check if assignee is also a member of the project
    if task.assignee_id:
        assignee = db.query(UserModel).filter(UserModel.id == task.assignee_id).first()
        if not assignee or assignee not in project.members:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Assignee is not a member of this project")
    
    return crud_task.create_task(db=db, task=task, project_id=project_id)


@router.patch("/{task_id}", response_model=Task)
def update_existing_task(
    project_id: int,
    task_id: int,
    task_update: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    """
    Updates a task's details (e.g., status, title, assignee).
    """
    project = crud_project.get_project(db, project_id=project_id)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    if current_user not in project.members:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Not authorized to update tasks in this project"
        )

    updated_task = crud_task.update_task(db=db, task_id=task_id, task_data=task_update)
    if not updated_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    
    return updated_task