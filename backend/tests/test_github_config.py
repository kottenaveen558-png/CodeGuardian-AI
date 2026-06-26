import asyncio
import os
import unittest

import httpx

from app.core.config import Settings
from app.services.github_service import GitHubService


class TestSettings(unittest.TestCase):
    """Verify that application settings can be loaded from environment variables."""

    def test_settings_read_token_from_env(self) -> None:
        os.environ["GITHUB_TOKEN"] = "test-token"

        settings = Settings()

        self.assertEqual(settings.github_token, "test-token")

    def test_settings_strip_quotes_and_whitespace(self) -> None:
        os.environ["GITHUB_TOKEN"] = "  'test-token'  "

        settings = Settings()

        self.assertEqual(settings.github_token, "test-token")

    def test_github_service_uses_token_auth_scheme(self) -> None:
        os.environ["GITHUB_TOKEN"] = "test-token"

        service = GitHubService(client=httpx.AsyncClient(timeout=10.0))
        try:
            self.assertEqual(service.headers["Authorization"], "token test-token")
        finally:
            asyncio.run(service.close())


if __name__ == "__main__":
    unittest.main()
