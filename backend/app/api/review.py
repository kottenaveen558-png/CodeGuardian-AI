"""API routes for end-to-end pull request review workflows."""

import logging
from typing import Any

from fastapi import APIRouter, Body, HTTPException

from app.schemas.review import ReviewRequest, ReviewResponse
from app.services.ai_service import AIReviewService
from app.services.github_service import GitHubService
from app.services.prompt_builder import PromptBuilder

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/review", tags=["review"])


@router.post(
    "/pull-request",
    response_model=list[ReviewResponse],
    summary="Review a pull request",
    description="Send a JSON body with the repository owner, repository name, and pull request number.",
)
async def review_pull_request(
    payload: ReviewRequest = Body(
        ...,
        example={
            "owner": "octocat",
            "repo": "Hello-World",
            "pull_number": 1,
        },
    )
) -> list[ReviewResponse]:
    """Review each changed file in a pull request and return AI-generated feedback."""
    github_service = GitHubService()
    ai_service = AIReviewService()
    prompt_builder = PromptBuilder()

    try:
        changed_files = await github_service.get_pull_request_changed_files(
            payload.owner,
            payload.repo,
            payload.pull_number,
        )

        reviews: list[ReviewResponse] = []
        for changed_file in changed_files:
            prompt = prompt_builder.build_code_review_prompt(
                changed_file.filename,
                changed_file.patch or "No patch available.",
            )
            review_text = ai_service.review_code(prompt)
            reviews.append(
                ReviewResponse(
                    repository=f"{payload.owner}/{payload.repo}",
                    pull_request=payload.pull_number,
                    filename=changed_file.filename,
                    review=review_text,
                )
            )

        return reviews
    except Exception as exc:  # pragma: no cover - routing layer safeguard
        logger.exception("Pull request review failed")
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    finally:
        await github_service.close()
