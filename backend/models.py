from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
    apellido = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    rol = Column(String(20), nullable=True, default="cliente")

    #Relación con el carrito
    cart_items = relationship("CartItem", back_populates="user")


class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True, index=True)
    producto_id = Column(Integer, nullable=False)
    cantidad = Column(Integer, default=1)
    user_id = Column(Integer, ForeignKey("users.id"))

    #Relación inversa con User
    user = relationship("User", back_populates="cart_items")
