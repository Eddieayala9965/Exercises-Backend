from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class TaskBase(BaseModel):
    name: str
    date: datetime 

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    name: Optional[str] = None
    date: Optional[datetime] = None
    

class TaskDelete(TaskBase):
    pass

class Task(TaskBase):
    id: int
    
    class Config:
        from_attributes = True