from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
import models, schemas, database, crud
from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from database import get_db

app = FastAPI()

# Crea tablas en la base de datos
models.Base.metadata.create_all(bind=database.engine)

# Dependencia para obtener sesión DB
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Funciona :)"}

@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Verificar si ya existe el email
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Este mail ya está registrado")

    # Crear nuevo usuario
    nuevo_usuario = models.User(
        nombre=user.nombre,
        apellido=user.apellido,
        email=user.email,
        password=user.password 
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return {"message": "Usuario creado correctamente", "user_id": nuevo_usuario.id}


@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(
        models.User.email == user.email,
        models.User.password == user.password
    ).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    return {"message": "Login exitoso", "user_id": db_user.id, "role": db_user.rol}

@app.get("/cart/{user_id}", response_model=list[schemas.CartItemOut])
def get_cart(user_id: int, db: Session = Depends(get_db)):
    return crud.get_cart(db, user_id)

@app.post("/cart/add", response_model=schemas.CartItemOut)
def add_to_cart(item: schemas.CartItemCreate, db: Session = Depends(get_db)):
    return crud.add_item(db, item)

@app.post("/cart/remove")
def remove_from_cart(user_id: int, product_id: int, db: Session = Depends(get_db)):
    crud.remove_item(db, user_id, product_id)
    return {"msg": "Se eliminó el producto del carrito"}
