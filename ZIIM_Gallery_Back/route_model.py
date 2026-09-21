from pydantic import BaseModel

class UserCreate(BaseModel):
    user_id: str
    username: str | None = None
    bio: str | None = None
    password: str
    email: str
    date: str
    gallery_id: int | None = None


class UserResponse(BaseModel):
    id: int
    user_id: str
    username: str | None = None
    bio: str | None = None
    profile_picture: str | None = None
    profile_banner: str | None = None
    date: str
    gallery_id: int | None = None

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    username: str | None = None
    bio: str | None = None

class UserAuth(BaseModel):
    user_id: str
    password: str


