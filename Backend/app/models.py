from sqlalchemy import Column, Integer, String, Float, Datetime
from .database import Base


class Task(Base):
    __tablename__ = "tasks"
    
    