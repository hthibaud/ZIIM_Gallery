from fastapi import FastAPI
from route import Init as InitRoute
from database import Base, Database
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
db = Database()
Base.metadata.create_all(bind=db.engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

InitRoute(app, db)