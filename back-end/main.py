from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
import models, schemas, auth
from database import engine, SessionLocal, Base
from typing import List
from fastapi.middleware.cors import CORSMiddleware  

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Leads API")

# CORS (VERY IMPORTANT for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev (later restrict)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency (DB session)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.post("/auth/login", response_model=schemas.TokenResponse)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    
    token = auth.create_access_token({"sub": db_user.email, "user_id": db_user.id})
    return {"access_token": token, "token_type": "bearer"}

# --- USER CRUD ---

@app.get("/users", response_model=List[schemas.UserOut])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@app.post("/users", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_pwd = auth.hash_password(user.password)
    db_user = models.User(
        email=user.email, 
        password_hash=hashed_pwd, 
        nom=user.nom, # Ensure 'nom' is added to your User model in models.py
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.put("/users/{user_id}", response_model=schemas.UserOut)
def update_user(user_id: int, user_update: schemas.UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = user_update.dict(exclude_unset=True)
    if "password" in update_data:
        update_data["password_hash"] = auth.hash_password(update_data.pop("password"))
    
    for key, value in update_data.items():
        setattr(db_user, key, value)
    
    db.commit()
    return db_user

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"detail": "User deleted"}