from app.database import Base, engine

# Import all models here
from app.models.review import Review

def init_db():
    Base.metadata.create_all(bind=engine)