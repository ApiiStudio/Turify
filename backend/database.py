from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from models import * 

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:Be13ni08@localhost/clientes"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()