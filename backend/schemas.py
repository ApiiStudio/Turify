from pydantic import BaseModel

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
