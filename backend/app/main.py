"""Application entry point for the AI Code Review backend."""

from fastapi import FastAPI

from app.api.ai import router as ai_router
from app.api.github import router as github_router
from app.api.health import router as health_router
from app.api.review import router as review_router
from app.core.logging import configure_logging

# Logging is initialized once so all modules share consistent output.
configure_logging()

# The application factory keeps the entry point clean and easy to extend.
app = FastAPI(
    title="Code Guardian AI",
    description="A modular FastAPI backend for AI-powered code review services.",
    version="0.1.0",
)

# Include routers here so endpoints stay organized by responsibility.
app.include_router(health_router)
app.include_router(github_router)
app.include_router(ai_router)
app.include_router(review_router)
