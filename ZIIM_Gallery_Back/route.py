from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

from database import Database
from model import user


class UserCreate(BaseModel):
    user_id: str
    username: str | None = None
    bio: str | None = None
    password: str
    email: str
    date: str
    gallery_id: int | None = None


def Init(app: FastAPI, db: Database):
    @app.get("/status")
    async def status():
        return {"status": "Ok"}

    @app.post("/user/new", status_code=201)
    def Post_user(user_data: UserCreate):
        session = db.get_session()()
        new_user = user(**user_data.model_dump())

        try:
            session.add(new_user)
            session.commit()
            session.refresh(new_user)
            return new_user
        except Exception as error:
            print(error)
            session.rollback()
            raise HTTPException(
                status_code=400,
                detail="Impossible de créer l'utilisateur",
            ) from error
        finally:
            session.close()
