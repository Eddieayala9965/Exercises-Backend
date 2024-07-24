from sqlalchemy import Column, Integer, String, Float, Datetime, Text
from .database import Base


class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    date = Column(Datetime)
    

