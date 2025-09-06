# backend/app/main.py

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel

# Import the database engine and the API routers
from ..app.db.base import engine
from .api.v1.endpoints import auth, users, projects, tasks

def create_db_and_tables():
    """
    Creates all database tables based on the SQLModel models.
    """
    SQLModel.metadata.create_all(engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    An event handler that runs code on application startup and shutdown.
    """
    # Code to run on startup
    print("Starting up...")
    create_db_and_tables()
    yield
    # Code to run on shutdown
    print("Shutting down.")

# Create the main FastAPI application instance
app = FastAPI(
    title="SynergySphere API",
    description="The backend API for the SynergySphere collaboration platform.",
    version="1.0.0",
    lifespan=lifespan
)

# --- Middleware ---
# Set up CORS (Cross-Origin Resource Sharing) to allow the frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # The origin of your React frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# --- API Routers ---
# Include the routers from your endpoint files to organize the API paths
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(projects.router, prefix="/api/v1/projects", tags=["Projects"])
app.include_router(tasks.router, prefix="/api/v1/projects/{project_id}/tasks", tags=["Tasks"])


# --- Root Endpoint ---
@app.get("/", tags=["Root"])
def read_root():
    """
    A simple root endpoint to confirm the API is running.
    """
    return {"message": "Welcome to the SynergySphere API"}