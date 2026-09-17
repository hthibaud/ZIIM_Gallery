from fastapi import FastAPI, HTTPException, status

from database import Database
from model import user
import route_model

def Init(app: FastAPI, db: Database):
    @app.get("/status")
    async def get_status():
        return {"status": "Ok"}

    @app.post("/user/new", status_code=status.HTTP_201_CREATED)
    def Post_user(user_data: route_model.UserCreate):
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
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Impossible de créer l'utilisateur",
            ) from error
        finally:
            session.close()
