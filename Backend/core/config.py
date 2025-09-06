from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Manages application settings and configurations.
    It automatically loads environment variables from a .env file.
    """
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        # Specifies the file to load environment variables from.
        env_file = ".env"

# Create a single, globally accessible instance of the settings.
settings = Settings()