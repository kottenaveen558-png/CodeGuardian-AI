"""API routes for GitHub integration endpoints."""

from fastapi import APIRouter, HTTPException

from app.core.exceptions import GitHubIntegrationError
from app.schemas.github import (
    GitHubRepositoryResponse,
    GitHubUserResponse,
    PullRequestResponse,
)
from app.services.github_service import GitHubService

# Routes are isolated here so the main entry point stays simple.
router = APIRouter(prefix="/github", tags=["github"])


@router.get("/user", response_model=GitHubUserResponse)
async def get_github_user() -> GitHubUserResponse:
    """Return the authenticated GitHub user's profile information."""
    service = GitHubService()
    try:
        return await service.get_authenticated_user()
    except GitHubIntegrationError as exc:
        raise HTTPException(status_code=exc.status_code or 500, detail=str(exc)) from exc
    finally:
        await service.close()


@router.get("/repositories", response_model=list[GitHubRepositoryResponse])
async def get_github_repositories() -> list[GitHubRepositoryResponse]:
    """Return repositories for the authenticated GitHub user."""
    service = GitHubService()
    try:
        return await service.get_user_repositories()
    except GitHubIntegrationError as exc:
        raise HTTPException(status_code=exc.status_code or 500, detail=str(exc)) from exc
    finally:
        await service.close()


@router.get("/{owner}/{repo}/pull-requests", response_model=list[PullRequestResponse])
async def get_repository_pull_requests(owner: str, repo: str) -> list[PullRequestResponse]:
    """Return pull requests for a specific GitHub repository."""
    service = GitHubService()
    try:
        return await service.get_repository_pull_requests(owner, repo)
    except GitHubIntegrationError as exc:
        raise HTTPException(status_code=exc.status_code or 500, detail=str(exc)) from exc
    finally:
        await service.close()
