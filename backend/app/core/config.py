"""Application configuration loaded from environment variables and .env files."""

from functools import lru_cache
from pathlib import Path
from typing import Final

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Centralized settings for the backend.

    This class keeps environment-specific configuration isolated so the rest of
    the application can depend on a stable interface.
    """

    model_config: Final[SettingsConfigDict] = SettingsConfigDict(
        env_file=Path(__file__).resolve().parents[2] / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    github_token: str = ""
    github_api_base_url: str = "https://api.github.com"

    @field_validator("github_token", mode="before")
    @classmethod
    def normalize_github_token(cls, value: object) -> str:
        """Strip surrounding whitespace and quotes from the GitHub token."""
        if not isinstance(value, str):
            return ""

        return value.strip().strip("\"'")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Return a cached settings instance for dependency injection."""
    return Settings()
