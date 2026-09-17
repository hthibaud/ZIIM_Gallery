from pydantic import BaseModel

class UserCreate(BaseModel):
    user_id: str
    username: str | None = None
    bio: str | None = None
    password: str
    email: str
    date: str
    gallery_id: int | None = None


