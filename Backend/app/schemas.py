# backend/app/schemas.py

from typing import List, Optional
from sqlmodel import Field, Relationship, SQLModel
from datetime import date

# --- User Schemas & Model ---

# Shared properties for a user
class UserBase(SQLModel):
    name: str
    email: str = Field(unique=True, index=True)

# Schema for creating a new user (receives password)
class UserCreate(UserBase):
    password: str

# Schema for reading a user (hides password)
class UserRead(UserBase):
    id: int

# The actual database table model for a User
class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str

    owned_projects: List["Project"] = Relationship(back_populates="owner")
    member_of_projects: List["Project"] = Relationship(back_populates="members", link_model="ProjectMemberLink")
    assigned_tasks: List["Task"] = Relationship(back_populates="assignee")


# --- Project Schemas & Model ---

# Link model for the many-to-many relationship between Projects and Users
class ProjectMemberLink(SQLModel, table=True):
    project_id: Optional[int] = Field(default=None, foreign_key="project.id", primary_key=True)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id", primary_key=True)

# Shared properties for a project
class ProjectBase(SQLModel):
    name: str
    description: Optional[str] = None

# Schema for creating a new project
class ProjectCreate(ProjectBase):
    pass

# Schema for reading a basic project
class ProjectRead(ProjectBase):
    id: int
    owner_id: int

# The actual database table model for a Project
class Project(ProjectBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    owner_id: int = Field(foreign_key="user.id")
    
    owner: User = Relationship(back_populates="owned_projects")
    members: List[User] = Relationship(back_populates="member_of_projects", link_model=ProjectMemberLink)
    tasks: List["Task"] = Relationship(back_populates="project")

# Schema for reading a project with all its related details
class ProjectReadWithDetails(ProjectRead):
    owner: UserRead
    members: List[UserRead]
    tasks: List["TaskRead"]


# --- Task Schemas & Model ---

# Shared properties for a task
class TaskBase(SQLModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[date] = None
    status: str = "To-Do"

# Schema for creating a new task
class TaskCreate(TaskBase):
    assignee_id: Optional[int] = Field(default=None, foreign_key="user.id")

# Schema for updating an existing task
class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[date] = None
    status: Optional[str] = None
    assignee_id: Optional[int] = None

# Schema for reading a task
class TaskRead(TaskBase):
    id: int
    project_id: int
    assignee_id: Optional[int]

# The actual database table model for a Task
class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    project_id: int = Field(foreign_key="project.id")
    assignee_id: Optional[int] = Field(default=None, foreign_key="user.id")

    project: Project = Relationship(back_populates="tasks")
    assignee: Optional[User] = Relationship(back_populates="assigned_tasks")


# --- Token Schemas ---

# Schema for the JWT token response
class Token(SQLModel):
    access_token: str
    token_type: str

# Schema for the data encoded inside the JWT
class TokenData(SQLModel):
    email: Optional[str] = None