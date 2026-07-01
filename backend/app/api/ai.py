"""Temporary API routes for validating the AI service integration."""

from fastapi import APIRouter

from app.services.ai_service import AIReviewService

# This route exists only for temporary verification of the Gemini integration.
router = APIRouter(prefix="/ai", tags=["ai"])


@router.get("/test")
async def test_ai_service() -> dict[str, str]:
    """Send a minimal prompt to Gemini and return the response or an error message."""
    try:
        service = AIReviewService()
        response = service.review_code("Reply with exactly: Gemini API is working.")
        return {"status": "success", "response": response}
    except Exception as exc:  # pragma: no cover - temporary test route
        return {"status": "error", "response": str(exc)}
