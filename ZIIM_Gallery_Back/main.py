from fastapi import FastAPI
from route import Init as InitRoute
from database import Base, Database
import model

app = FastAPI()
db = Database()
Base.metadata.create_all(bind=db.engine)

InitRoute(app, db)