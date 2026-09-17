from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base

class user(Base):
    __tablename__="user"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[str] = mapped_column( String(100), nullable=False)
    username: Mapped[str] = mapped_column(String(100), nullable=True)
    bio: Mapped[str] = mapped_column(String(250), nullable=True)
    password: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(nullable=False)
    date: Mapped[str] = mapped_column(nullable=False)
    gallery_id: Mapped[int] = mapped_column(
        ForeignKey("gallery.id"),
        nullable=True
    )

    gallery: Mapped["gallery"] = relationship(
        back_populates="user"
    )

class gallery(Base):
    __tablename__="gallery"

    id: Mapped[int] = mapped_column(primary_key=True)

    user: Mapped["user"] = relationship(
        back_populates="gallery"
    )