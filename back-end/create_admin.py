from database import SessionLocal
from models import User
from auth import hash_password

db = SessionLocal()

admin = User(
    nom="Admin",
    email="admin@gmail.com",
    password_hash=hash_password("admin123"),
    role="Admin"
)

db.add(admin)
db.commit()
db.close()

print("Admin user created!")