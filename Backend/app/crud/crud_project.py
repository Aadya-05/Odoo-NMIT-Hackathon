# backend/app/crud/crud_project.py

from typing import List, Optional
from sqlmodel import Session

from app.models import Project, ProjectCreate, User

def get_project(session: Session, project_id: int) -> Optional[Project]:
    """
    Find a project by its primary key (ID).
    """
    return session.get(Project, project_id)

def get_projects_for_user(session: Session, user: User) -> List[Project]:
    """
    Get all projects a specific user is a member of.
    """
    # The relationship on the User model makes this straightforward
    return user.member_of_projects

def create_project(session: Session, project_create: ProjectCreate, owner: User) -> Project:
    """
    Create a new project, setting the owner and adding them as the first member.
    """
    db_project = Project.model_validate(project_create)
    db_project.owner = owner
    db_project.members.append(owner) # The project's creator is always a member
    
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    
    return db_project