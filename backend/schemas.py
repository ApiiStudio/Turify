from pydantic import BaseModel
from datetime import date

class UserCreate(BaseModel):
    nombre: str
    apellido: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class CartItemBase(BaseModel):
    product_id: int
    quantity: int

class CartItemCreate(CartItemBase):
    user_id: int

class CartItemUpdate(BaseModel):
    product_id: int
    quantity: int

class CartItemOut(CartItemBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

class PedidoCabeceraCreate(BaseModel):
    cliente: str
    fecha_pedido: date
    forma_pago: str = None
    moneda: str = None
    total: float = None

    class Config:
        orm_mode = True

class PedidoCabecera(PedidoCabeceraCreate):
    idPedido: int

    class Config:
        orm_mode = True
