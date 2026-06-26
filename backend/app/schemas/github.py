"""Pydantic models for GitHub API responses."""

from pydantic import BaseModel, Field


class GitHubUserResponse(BaseModel):
    """Serializable representation of a GitHub user profile."""

    login: str = Field(..., description="GitHub username")
    id: int = Field(..., description="GitHub user id")
    html_url: str = Field(..., description="Profile URL")
    type: str = Field(..., description="Account type")


class GitHubRepositoryResponse(BaseModel):
    """Serializable representation of a GitHub repository."""

    id: int = Field(..., description="Repository id")
    name: str = Field(..., description="Repository name")
    full_name: str = Field(..., description="Owner/name")
    private: bool = Field(..., description="Whether the repository is private")
    html_url: str = Field(..., description="Repository URL")
    description: str | None = Field(default=None, description="Repository description")


class PullRequestResponse(BaseModel):
    """Serializable representation of a repository pull request."""

    number: int = Field(..., description="Pull request number")
    title: str = Field(..., description="Pull request title")
    author: str = Field(..., description="Pull request author login")
    state: str = Field(..., description="Pull request state")
    created_at: str = Field(..., description="Pull request creation timestamp")
