"""Health-related endpoints for infrastructure and readiness checks."""

from fastapi import APIRouter

# A dedicated router keeps the health endpoint isolated from business logic.
router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check() -> dict[str, str]:
    """Return a simple status payload for monitoring and deployment checks."""
    return {"status": "ok"}
