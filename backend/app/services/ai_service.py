"""AI review service using Zyloo (OpenAI-compatible API)."""

from __future__ import annotations

import logging
from typing import Any, Protocol

from openai import OpenAI

from app.core.config import get_settings

logger = logging.getLogger(__name__)


class AIClient(Protocol):
    """Protocol for an AI provider client."""

    @property
    def chat(self) -> Any:
        ...


class AIReviewService:
    """Generate AI-powered code reviews using Zyloo."""

    def __init__(self, client: AIClient | None = None) -> None:
        self.settings = get_settings()

        self.client = client or OpenAI(
            api_key=self.settings.zyloo_api_key,
            base_url=self.settings.zyloo_base_url,
        )

    def review_code(self, prompt: str) -> str:
        """Send prompt to Zyloo and return AI review."""

        if not self.settings.zyloo_api_key:
            raise RuntimeError("ZYLOO_API_KEY_NOT_FOUND")

        try:
            response = self.client.chat.completions.create(
                model=self.settings.zyloo_model,
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
            logger.exception("Zyloo API request failed")

            print("========== ZYLOO ERROR ==========")
            print(type(exc))
            print(repr(exc))
            print(str(exc))
            print("=================================")

            raise

        if not response.choices:
            raise RuntimeError("Empty response from Zyloo.")

        content = response.choices[0].message.content

        if not content:
            raise RuntimeError("Empty response from Zyloo.")

        return content