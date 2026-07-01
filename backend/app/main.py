"""Application entry point for the AI Code Review backend."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.ai import router as ai_router
from app.api.github import router as github_router
from app.api.health import router as health_router
from app.api.review import router as review_router
from app.core.logging import configure_logging
from app.init_db import init_db
from app.api.history import router as history_router
from app.api.dashboard import router as dashboard_router

# Logging is initialized once so all modules share consistent output.
configure_logging()

# Initialize database tables
init_db()

# The application factory keeps the entry point clean and easy to extend.
app = FastAPI(
    title="Code Guardian AI",
    description="A modular FastAPI backend for AI-powered code review services.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("✅ CORS middleware loaded")

# Include routers here so endpoints stay organized by responsibility.
app.include_router(health_router)
app.include_router(github_router)
app.include_router(ai_router)
app.include_router(review_router)
app.include_router(history_router)
app.include_router(dashboard_router)