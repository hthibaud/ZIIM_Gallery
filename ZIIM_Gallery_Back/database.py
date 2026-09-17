from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker
from dotenv import load_dotenv
import os

class Base(DeclarativeBase):
    pass

class Database:
    def __init__(self):
        load_dotenv()

        self.db_url = os.getenv("DATABASE_URL")

        self.engine = create_engine(self.db_url)

        self.session_local = sessionmaker(bind=self.engine, class_=Session, autoflush=False)

    def get_session(self) -> Session:
        return self.session_local