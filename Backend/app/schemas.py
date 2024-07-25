from pydantic import BaseModel
from datetime import datetime

class TaskBase(BaseModel):
    name: str
    date: datetime 

class TaskCreate(TaskBase):
    pass

class TaskDelete(TaskBase):
    pass

class Task(TaskBase):
    id: int
    
    class Config:
        from_attributes = True