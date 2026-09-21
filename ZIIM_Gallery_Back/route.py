from fastapi import FastAPI, HTTPException, status, Depends, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from database import Database
import model
import route_model
from route_logic import ValidateUserCreation, AuthenticateUser, IsAuthenticate, update_user_avatar

security = HTTPBearer()

def auth(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
        token = credentials.credentials
        print(token)
        return IsAuthenticate(token)


def Init(app: FastAPI, db: Database):
    @app.get("/status")
    async def get_status() -> dict:
        return {"status": "Ok"}

    @app.get("/user/id/{id}", response_model=route_model.UserResponse)
    def Get_user(id: str) -> dict:
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

    @app.post("/user/avatar", status_code=status.HTTP_201_CREATED)
    async def Post_avatar(auth_data: dict = Depends(auth), file: UploadFile = File(...)) -> dict:
        allowed_mime_types = ["image/jpeg", "image/png", "image/webp"]
        if file.content_type not in allowed_mime_types:
            raise HTTPException(
                status_code=400, 
                detail="Format de fichier non autorisé. Utilisez JPEG, PNG ou WEBP."
            )
        
        session = db.get_session()()
        try:
            avatar_key = await update_user_avatar(auth_data['sub'], file, session)
            
            if not avatar_key:
                raise HTTPException(status_code=404, detail="Utilisateur introuvable.")
            
            return {
                "message": "Avatar mis à jour avec succès", 
                "avatar_key": avatar_key
            }
            
        except HTTPException:
            session.rollback()
            raise
        except Exception as e:
            session.rollback()
            raise HTTPException(status_code=500, detail="Une erreur est survenue lors de l'enregistrement de l'image.")
        finally:
            session.close()

    @app.post("/auth/register", status_code=status.HTTP_201_CREATED, response_model=route_model.UserResponse)
    def Post_user(user_data: route_model.UserCreate):
        session = db.get_session()()
        try:
            is_valid, user_data = ValidateUserCreation(
                user_data, session
            )
            if is_valid:
                new_user = model.user(**user_data.model_dump())
                session.add(new_user)
                session.commit()
                session.refresh(new_user)
                return new_user
            print(is_valid)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email invalide ou identifiant/email déjà utilisé",
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

    @app.post("/auth/login")
    def login(user_data: route_model.UserAuth) -> str:
        session = db.get_session()()
        try:
            token = AuthenticateUser(user_data, session)
        except Exception as error:
            print(error)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unable to authenticate",
            ) from error
        finally:
            session.close()

        return token
    @app.get("/test/auth/status")
    def get_authStatus(auth_data: dict = Depends(auth)) -> dict:
        return {
            "IsAuthenticate": True,
            "UserId": auth_data["sub"]
        }
    
