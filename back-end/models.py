from sqlalchemy import Column, Integer, String, Text, Boolean, TIMESTAMP
from database import Base
from sqlalchemy.sql import func



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String(255), nullable=False)  # Added this
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), default="Analyste") # Added this
    created_at = Column(TIMESTAMP, server_default=func.now())