from email_validator import validate_email, EmailNotValidError

import route_model
import model
from sqlalchemy.orm import Session

def ValidateUserCreationAndNormalMail(
    data: route_model.UserCreate, session: Session
) -> tuple[bool, str | None]:
    user_id_exists = sessionCompare(
        session, model.user, model.user.user_id, data.user_id
    )
    email_exists = sessionCompare(session, model.user, model.user.email, data.email)
    try:
        mail = validate_email(data.email).normalized
    except EmailNotValidError:
        return False, None

    return (not user_id_exists and not email_exists, mail)

def sessionCompare(session: Session, model_class, column, value) -> bool:
    return session.query(model_class).filter(column == value).first() is not None
