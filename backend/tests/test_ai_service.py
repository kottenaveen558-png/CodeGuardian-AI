import unittest
from types import SimpleNamespace
from unittest.mock import Mock

from app.services.ai_service import AIReviewService


class TestAIReviewService(unittest.TestCase):
    """Verify the AI review service builds requests and returns Markdown content."""

    def test_review_code_returns_text_from_provider(self) -> None:
        client = Mock()
        client.chat.completions.create.return_value = SimpleNamespace(
            choices=[SimpleNamespace(message=SimpleNamespace(content="## Review\n- Looks good."))]
        )

        service = AIReviewService(client=client)
        service.settings.groq_api_key = "test-key"

        result = service.review_code("test prompt")

        self.assertEqual(result, "## Review\n- Looks good.")
        client.chat.completions.create.assert_called_once()

    def test_review_code_raises_when_key_missing(self) -> None:
        service = AIReviewService(client=Mock())
        service.settings.groq_api_key = ""

        with self.assertRaises(ValueError):
            service.review_code("test prompt")


if __name__ == "__main__":
    unittest.main()
