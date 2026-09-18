from email_validator import validate_email, EmailNotValidError
from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
import jwt
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta, timezone

import route_model
import model

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")
print(ALGORITHM)
password_hash = PasswordHash((Argon2Hasher(),))

def ValidateUserCreation(
    data: route_model.UserCreate, session: Session
) -> tuple[bool, route_model.UserCreate | None]:
    try:
        data.email = validate_email(data.email).normalized
    except EmailNotValidError:
        print("Format mail invalide")
        return False, None

    user_id_exists = sessionCompare(session, model.user, model.user.user_id, data.user_id)
    email_exists = sessionCompare(session, model.user, model.user.email, data.email)
    print(f"user_id = {user_id_exists} | email_exists = {email_exists}")
    
    if user_id_exists or email_exists:
        return False, data

    data.password = password_hash.hash(data.password)
    return True, data


def AuthenticateUser(data: route_model.UserAuth, session: Session) -> str | None:
    if not data:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid User Id or Password")

    user = session.query(model.user).filter(model.user.user_id == data.user_id).first()
    if user is None or not password_hash.verify(data.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid User Id or Password")

    return createAccess_token(data.user_id)


def IsAuthenticate(token: str) -> dict:
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token")
    return decode_access_token(token)


def sessionCompare(session: Session, model_class, column, value) -> bool:
    return session.query(model_class).filter(column == value).first() is not None


def passwordConfirme(session: Session, model_class, user_id: str, pswd: str) -> bool:
    user = session.query(model.user).filter(model.user.user_id == user_id).first()
    if user is None:
        return False
    return password_hash.verify(pswd, user.password)


def createAccess_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=10)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(
            token, 
            SECRET_KEY, 
            algorithms=[ALGORITHM], 
            options={"require": ["exp", "sub"]}, 
            leeway=10
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired")
    except jwt.InvalidTokenError as error:
        print(error)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")