from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .api.endpoints import tasks

Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"]
    
)

app.include_router(tasks.router)

app.get("/")
def read_root():
    return {"Hello": "World"}
