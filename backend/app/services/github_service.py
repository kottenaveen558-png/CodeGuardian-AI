"""GitHub integration service built on top of the GitHub REST API."""

from __future__ import annotations

import logging
from typing import Any

import httpx

from app.core.config import get_settings
from app.core.exceptions import GitHubIntegrationError
from app.schemas.github import (
    ChangedFileResponse,
    GitHubRepositoryResponse,
    GitHubUserResponse,
    PullRequestResponse,
)

logger = logging.getLogger(__name__)


class GitHubService:
    """Reusable service for reading public and authenticated GitHub data.

    The class is intentionally narrow and follows a dependency-inverted shape:
    it depends on configuration and an HTTP client rather than hard-coded values.
    """

    def __init__(self, client: httpx.AsyncClient | None = None) -> None:
        self.settings = get_settings()
        self.client = client or httpx.AsyncClient(timeout=10.0)
        self.base_url = self.settings.github_api_base_url.rstrip("/")
        logger.info("GitHub token configured with length %d", len(self.settings.github_token))
        self.headers = {
            "Accept": "application/vnd.github+json",
            "Authorization": f"token {self.settings.github_token}",
            "X-GitHub-Api-Version": "2022-11-28",
        }

    async def close(self) -> None:
        """Close the underlying HTTP client when the service is no longer needed."""
        if self.client and not self.client.is_closed:
            await self.client.aclose()

    async def get_authenticated_user(self) -> GitHubUserResponse:
        """Fetch the authenticated GitHub user profile."""
        if not self.settings.github_token:
            raise GitHubIntegrationError("GitHub token is not configured.", status_code=500)

        try:
            response = await self.client.get(
                f"{self.base_url}/user",
                headers=self.headers,
            )
            response.raise_for_status()
        except httpx.HTTPStatusError as exc:
            logger.exception("GitHub user request failed")
            raise GitHubIntegrationError(
                f"GitHub user request failed: {exc.response.text}",
                status_code=exc.response.status_code,
            ) from exc
        except httpx.RequestError as exc:
            logger.exception("GitHub user request could not be completed")
            raise GitHubIntegrationError(
                f"GitHub request failed: {str(exc)}",
                status_code=502,
            ) from exc

        payload: dict[str, Any] = response.json()
        return GitHubUserResponse(**payload)

    async def get_user_repositories(self) -> list[GitHubRepositoryResponse]:
        """Fetch repositories owned by the authenticated user."""
        if not self.settings.github_token:
            raise GitHubIntegrationError("GitHub token is not configured.", status_code=500)

        try:
            response = await self.client.get(
                f"{self.base_url}/user/repos",
                headers=self.headers,
                params={"per_page": 100, "sort": "updated"},
            )
            response.raise_for_status()
        except httpx.HTTPStatusError as exc:
            logger.exception("GitHub repositories request failed")
            raise GitHubIntegrationError(
                f"GitHub repositories request failed: {exc.response.text}",
                status_code=exc.response.status_code,
            ) from exc
        except httpx.RequestError as exc:
            logger.exception("GitHub repositories request could not be completed")
            raise GitHubIntegrationError(
                f"GitHub request failed: {str(exc)}",
                status_code=502,
            ) from exc

        payload: list[dict[str, Any]] = response.json()
        return [GitHubRepositoryResponse(**item) for item in payload]

    async def get_repository_pull_requests(
        self,
        owner: str,
        repo: str,
    ) -> list[PullRequestResponse]:
        """List pull requests for a repository using the GitHub REST API."""
        if not self.settings.github_token:
            raise GitHubIntegrationError("GitHub token is not configured.", status_code=500)

        try:
            response = await self.client.get(
                f"{self.base_url}/repos/{owner}/{repo}/pulls",
                headers=self.headers,
                params={"state": "all", "per_page": 100},
            )
            response.raise_for_status()
        except httpx.HTTPStatusError as exc:
            logger.exception("GitHub pull requests request failed")
            raise GitHubIntegrationError(
                f"GitHub pull requests request failed: {exc.response.text}",
                status_code=exc.response.status_code,
            ) from exc
        except httpx.RequestError as exc:
            logger.exception("GitHub pull requests request could not be completed")
            raise GitHubIntegrationError(
                f"GitHub request failed: {str(exc)}",
                status_code=502,
            ) from exc

        payload: list[dict[str, Any]] = response.json()
        return [
            PullRequestResponse(
                number=item["number"],
                title=item["title"],
                author=item["user"]["login"],
                state=item["state"],
                created_at=item["created_at"],
            )
            for item in payload
        ]

    async def get_pull_request_changed_files(
        self,
        owner: str,
        repo: str,
        pull_number: int,
    ) -> list[ChangedFileResponse]:
        """List changed files for a specific pull request."""
        if not self.settings.github_token:
            raise GitHubIntegrationError("GitHub token is not configured.", status_code=500)

        try:
            response = await self.client.get(
                f"{self.base_url}/repos/{owner}/{repo}/pulls/{pull_number}/files",
                headers=self.headers,
                params={"per_page": 100},
            )
            response.raise_for_status()
        except httpx.HTTPStatusError as exc:
            logger.exception("GitHub pull request files request failed")
            raise GitHubIntegrationError(
                f"GitHub pull request files request failed: {exc.response.text}",
                status_code=exc.response.status_code,
            ) from exc
        except httpx.RequestError as exc:
            logger.exception("GitHub pull request files request could not be completed")
            raise GitHubIntegrationError(
                f"GitHub request failed: {str(exc)}",
                status_code=502,
            ) from exc

        payload: list[dict[str, Any]] = response.json()
        return [
            ChangedFileResponse(
                filename=item["filename"],
                status=item.get("status", "unknown"),
                additions=item.get("additions", 0),
                deletions=item.get("deletions", 0),
                total_changes=item.get("changes", 0),
                patch=item.get("patch"),
            )
            for item in payload
        ]
