from fastapi import FastAPI
from route import Init as InitRoute
from database import Database

app = FastAPI()
db = Database()

InitRoute(app)