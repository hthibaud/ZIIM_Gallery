from fastapi import FastAPI, HTTPException, status

from database import Database
import model
import route_model
from route_logic import ValidateUserCreationAndNormalMail

def Init(app: FastAPI, db: Database):
    @app.get("/status")
    async def get_status():
        return {"status": "Ok"}

    @app.get("/user/id/{id}", response_model=route_model.UserResponse)
    def Get_user(id: str):
        session = db.get_session()()
        try:
            found_user = session.query(model.user).filter(model.user.user_id == id).first()
            if found_user is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Utilisateur introuvable",
                )
            return found_user
        finally:
            session.close()

    @app.post("/user/new", status_code=status.HTTP_201_CREATED)
    def Post_user(user_data: route_model.UserCreate):
        session = db.get_session()()
        new_user = model.user(**user_data.model_dump())
        try:
            is_valid, normalized_email = ValidateUserCreationAndNormalMail(
                user_data, session
            )
            if is_valid:
                new_user.email = normalized_email
                session.add(new_user)
                session.commit()
                session.refresh(new_user)
                return new_user
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Impossible de vérifier l'utilisateur",
            )
        except HTTPException:
            session.rollback()
            raise
        except Exception as error:
            session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Impossible de créer l'utilisateur",
            ) from error
        finally:
            session.close()
