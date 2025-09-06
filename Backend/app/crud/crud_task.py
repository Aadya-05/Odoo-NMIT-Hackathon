# backend/app/crud/crud_task.py

from typing import Optional
from sqlmodel import Session

from app.models import Task, TaskCreate, TaskUpdate

def get_task(session: Session, task_id: int) -> Optional[Task]:
    """
    Find a task by its primary key (ID).
    """
    return session.get(Task, task_id)

def create_task(session: Session, task_create: TaskCreate, project_id: int) -> Task:
    """
    Create a new task associated with a specific project.
    """
    # Add the project_id to the task data before creating the model instance
    db_task = Task.model_validate(task_create, update={"project_id": project_id})
    
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    
    return db_task

def update_task(session: Session, db_task: Task, task_update: TaskUpdate) -> Task:
    """
    Update an existing task's properties.
    """
    # Get the data from the update schema, excluding fields that weren't set
    task_data = task_update.model_dump(exclude_unset=True)
    
    # Update the existing task object with the new data
    for key, value in task_data.items():
        setattr(db_task, key, value)
        
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    
    return db_task