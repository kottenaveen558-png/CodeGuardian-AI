"""API routes for end-to-end pull request review workflows."""

import logging

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.review import Review
from app.schemas.review import ReviewRequest, ReviewResponse
from app.services.ai_service import AIReviewService
from app.services.github_service import GitHubService
from app.services.prompt_builder import PromptBuilder

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/review", tags=["review"])

MAX_PATCH_SIZE = 6000


@router.post(
    "/pull-request",
    response_model=list[ReviewResponse],
    summary="Review a pull request",
    description="Analyze changed files in a pull request using AI.",
)
async def review_pull_request(
    payload: ReviewRequest = Body(
        ...,
        examples={
            "default": {
                "summary": "Sample Request",
                "value": {
                    "owner": "octocat",
                    "repo": "Hello-World",
                    "pull_number": 1,
                },
            }
        },
    ),
    db: Session = Depends(get_db),
) -> list[ReviewResponse]:

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

        for changed_file in changed_files[:1]:

            if not changed_file.patch:
                continue

            patch = changed_file.patch

            if len(patch) > MAX_PATCH_SIZE:
                patch = patch[:MAX_PATCH_SIZE]

            prompt = prompt_builder.build_code_review_prompt(
                filename=changed_file.filename,
                patch=patch,
            )

            logger.info("Reviewing %s", changed_file.filename)

            # ---------- AI Review ----------
            try:
                review = ai_service.review_code(prompt)

            except Exception as e:

                logger.warning(
                    "AI unavailable. Using development mock review. %s",
                    str(e),
                )

                review = f"""
# AI Code Review (Development Mode)

## Repository
{payload.owner}/{payload.repo}

## Pull Request
#{payload.pull_number}

## File
{changed_file.filename}

## Overall Assessment

The external AI provider is currently unavailable.
This review was generated automatically for development.

## Strengths

- Good project structure.
- Modular architecture.
- Readable code.

## Suggestions

1. Improve exception handling.
2. Add more comments.
3. Increase unit test coverage.
4. Validate user input.
5. Improve logging.

## Security

No obvious security concerns detected.

## Performance

No obvious performance bottlenecks detected.

---

Mock review generated because AI credits are unavailable.
"""

            # ---------- Save to MySQL ----------

            db_review = Review(
                repository=f"{payload.owner}/{payload.repo}",
                pull_request=payload.pull_number,
                filename=changed_file.filename,
                review=review,
            )

            db.add(db_review)
            db.commit()
            db.refresh(db_review)

            reviews.append(
                ReviewResponse(
                    repository=f"{payload.owner}/{payload.repo}",
                    pull_request=payload.pull_number,
                    filename=changed_file.filename,
                    review=review,
                )
            )

        return reviews

    except Exception as exc:

        logger.exception("Unexpected error")

        raise HTTPException(
            status_code=500,
            detail={
                "status": "server_error",
                "message": str(exc),
            },
        )

    finally:
        await github_service.close()