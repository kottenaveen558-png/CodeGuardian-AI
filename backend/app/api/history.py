from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.review import Review

router = APIRouter(
    prefix="/history",
    tags=["History"],
)


# Get all reviews
@router.get("/")
def get_history(db: Session = Depends(get_db)):
    reviews = (
        db.query(Review)
        .order_by(Review.created_at.desc())
        .all()
    )

    return reviews


# Get a single review
@router.get("/{review_id}")
def get_review(
    review_id: int,
    db: Session = Depends(get_db),
):
    review = (
        db.query(Review)
        .filter(Review.id == review_id)
        .first()
    )

    if review is None:
        raise HTTPException(
            status_code=404,
            detail="Review not found."
        )

    return review


# Delete a review
@router.delete("/{review_id}")
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
):
    review = (
        db.query(Review)
        .filter(Review.id == review_id)
        .first()
    )

    if review is None:
        raise HTTPException(
            status_code=404,
            detail="Review not found."
        )

    db.delete(review)
    db.commit()

    return {
        "message": "Review deleted successfully."
    }