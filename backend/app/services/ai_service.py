"""AI review service using Groq."""

from __future__ import annotations

import logging
from typing import Any, Protocol

from groq import Groq

from app.core.config import get_settings

logger = logging.getLogger(__name__)


class AIClient(Protocol):
    """Protocol for an AI provider client."""

    @property
    def chat(self) -> Any:
        ...


class AIReviewService:
    """Generate AI-powered code reviews using Groq."""

    def __init__(self, client: AIClient | None = None) -> None:
        self.settings = get_settings()

        self.client = client or Groq(
            api_key=self.settings.groq_api_key,
        )

    def review_code(self, prompt: str) -> str:
        """Send prompt to Groq and return AI review."""

        if not self.settings.groq_api_key:
            raise RuntimeError("GROQ_API_KEY_NOT_FOUND")

        try:
            response = self.client.chat.completions.create(
                model=self.settings.groq_model,
                messages=[
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
                temperature=0.2,
                max_tokens=400,
            )

        except Exception as exc:
            logger.exception("Groq API request failed")

            print("========== GROQ ERROR ==========")
            print(type(exc))
            print(repr(exc))
            print(str(exc))
            print("================================")

            raise

        if not response.choices:
            raise RuntimeError("Empty response from Groq.")

        content = response.choices[0].message.content

        if not content:
            raise RuntimeError("Empty response from Groq.")

        return content