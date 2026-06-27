"""Pydantic models for the review API."""

from pydantic import BaseModel, Field


class ReviewRequest(BaseModel):
    """Input model for triggering a pull request review."""

    owner: str = Field(
        ...,
        description="Repository owner",
        json_schema_extra={"examples": ["kottenaveen558-png"]},
    )
    repo: str = Field(
        ...,
        description="Repository name",
        json_schema_extra={"examples": ["CodeGuardian-AI"]},
    )
    pull_number: int = Field(
        ...,
        description="Pull request number",
        json_schema_extra={"examples": [1]},
    )


class ReviewResponse(BaseModel):
    """Output model for one reviewed file in a pull request."""

    repository: str = Field(..., description="Repository full name")
    pull_request: int = Field(..., description="Pull request number")
    filename: str = Field(..., description="Changed file path")
    review: str = Field(..., description="AI-generated review in Markdown")
