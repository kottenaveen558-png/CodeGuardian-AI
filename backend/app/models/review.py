from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from sqlalchemy.sql import func

from app.database import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    repository = Column(String(255), nullable=False)
    pull_request = Column(Integer, nullable=False)
    filename = Column(String(255), nullable=False)
    review = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())