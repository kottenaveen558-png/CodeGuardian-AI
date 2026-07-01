from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.review import Review

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    repositories = db.query(
        func.count(func.distinct(Review.repository))
    ).scalar()

    pull_requests = db.query(
        func.count(func.distinct(Review.pull_request))
    ).scalar()

    files_reviewed = db.query(
        func.count(Review.id)
    ).scalar()

    reviews_stored = db.query(
        func.count(Review.id)
    ).scalar()

    return {
        "repositories_reviewed": repositories,
        "pull_requests_reviewed": pull_requests,
        "files_reviewed": files_reviewed,
        "reviews_stored": reviews_stored,
    }