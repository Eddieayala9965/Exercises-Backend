from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ... import crud, models, schemas
from ...database import get_db

router = APIRouter()

@router.post("/tasks/", response_model=schemas.Task)
def create_expense(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_tasks(db=db, task=task)

@router.get("/tasks/", response_model=List[schemas.Task])
def read_expenses(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    tasks = crud.get_tasks(db, skip=skip, limit=limit)
    return tasks

