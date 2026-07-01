"""Application configuration loaded from environment variables and .env files."""

from functools import lru_cache
from pathlib import Path
from typing import Final

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config: Final[SettingsConfigDict] = SettingsConfigDict(
        env_file=Path(__file__).resolve().parents[2] / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    github_token: str = ""
    github_api_base_url: str = "https://api.github.com"

    # Zyloo Settings
    zyloo_api_key: str = ""
    zyloo_base_url: str = "https://api.zyloo.io/v1"
    zyloo_model: str = "zyloo/claude-opus-4-7"

    @field_validator("github_token", mode="before")
    @classmethod
    def normalize_github_token(cls, value: object) -> str:
        if not isinstance(value, str):
            return ""
        return value.strip().strip("\"'")

    @field_validator("zyloo_api_key", mode="before")
    @classmethod
    def normalize_zyloo_api_key(cls, value: object) -> str:
        if not isinstance(value, str):
            return ""
        return value.strip().strip("\"'")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()