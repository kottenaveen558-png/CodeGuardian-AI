import unittest
from unittest.mock import AsyncMock, Mock, patch

from fastapi.testclient import TestClient

from app.main import app
from app.schemas.review import ReviewRequest


class TestReviewAPI(unittest.TestCase):
    """Verify the review endpoint orchestrates GitHub and AI services correctly."""

    def setUp(self) -> None:
        self.client = TestClient(app)

    @patch("app.api.review.AIReviewService")
    @patch("app.api.review.GitHubService")
    @patch("app.api.review.PromptBuilder")
    def test_review_pull_request_returns_reviews(self, prompt_builder_cls, github_service_cls, ai_service_cls) -> None:
        github_service = Mock()
        github_service.get_pull_request_changed_files = AsyncMock(
            return_value=[
                Mock(filename="src/example.py", patch="@@ -1 +1 @@\n-old\n+new"),
            ]
        )
        github_service.close = AsyncMock()
        github_service_cls.return_value = github_service

        prompt_builder = Mock()
        prompt_builder.build_code_review_prompt.return_value = "prompt"
        prompt_builder_cls.return_value = prompt_builder

        ai_service = Mock()
        ai_service.review_code.return_value = "## Review\n- Looks good."
        ai_service_cls.return_value = ai_service

        response = self.client.post(
            "/review/pull-request",
            json={"owner": "octocat", "repo": "Hello-World", "pull_number": 1},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]["filename"], "src/example.py")
        self.assertEqual(response.json()[0]["review"], "## Review\n- Looks good.")


if __name__ == "__main__":
    unittest.main()
