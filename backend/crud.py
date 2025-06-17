from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate
from passlib.context import CryptContext
from models import CartItem
from schemas import CartItemCreate
from schemas import PedidoCabeceraCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = User(
        nombre=user.nombre,
        apellido=user.apellido,
        email=user.email,
        password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_cart(db: Session, user_id: int):
    return db.query(CartItem).filter(CartItem.user_id == user_id).all()

def add_item(db: Session, item: CartItemCreate):
    db_item = CartItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def remove_item(db: Session, user_id: int, product_id: int):
    item = db.query(CartItem).filter(CartItem.user_id == user_id, CartItem.product_id == product_id).first()
    if item:
        db.delete(item)
        db.commit()

def create_pedido(db: Session, pedido: PedidoCabeceraCreate):
    db_pedido = PedidoCabecera(**pedido.dict())
    db.add(db_pedido)
    db.commit()
    db.refresh(db_pedido)
    return db_pedido
