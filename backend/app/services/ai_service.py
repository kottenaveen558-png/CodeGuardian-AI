"""AI review service for generating structured code review feedback."""

from __future__ import annotations

import logging
from typing import Any, Protocol

from groq import Groq

from app.core.config import get_settings

logger = logging.getLogger(__name__)


class AIClient(Protocol):
    """Protocol for an AI provider client so the service stays provider-agnostic."""

    def chat(self) -> Any:
        """Return the chat interface used by the underlying AI provider."""


class AIReviewService:
    """Generate AI-powered Markdown reviews for code changes.

    The implementation is deliberately isolated behind a small interface so a
    future provider such as OpenAI, Groq, or Claude can replace the current one
    without changing the rest of the application.
    """

    def __init__(self, client: AIClient | None = None) -> None:
        self.settings = get_settings()
        self.client = client or Groq(api_key=self.settings.groq_api_key)

    def review_code(self, prompt: str) -> str:
        """Send a review prompt to the Groq API and return the Markdown response."""
        if not self.settings.groq_api_key:
            raise ValueError("Groq API key is not configured.")

        try:
            response = self.client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model=self.settings.groq_model,
                temperature=0.2,
            )
        except Exception as exc:  # pragma: no cover - exercised through runtime errors
            logger.exception("Groq API request failed")
            raise RuntimeError(f"Groq API request failed: {exc}") from exc

        if not getattr(response, "choices", None):
            raise RuntimeError("Groq API returned no choices.")

        message = response.choices[0].message
        content = getattr(message, "content", None)
        if not content:
            raise RuntimeError("Groq API returned an empty response.")

        return content
