from sqlalchemy.orm import Session
from .  import models, schemas

def get_tasks(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Task).offset(skip).limit(limit).all()

def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def delete_task(db: Session, task: schemas.TaskDelete):
    db_task = models.Task(**task.model_dump())
    db.delete(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task