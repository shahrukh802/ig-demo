from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas, utils
from ..database import get_db
from app.oauth2 import get_current_user

router = APIRouter(
    prefix="/users",
    tags=['Users']
)

# /users/
# /users


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):

    # hash the password - user.password
    hashed_password = utils.hash(user.password)
    user.password = hashed_password

    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.get('/{id}', response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(get_db), ):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id: {id} does not exist")

    return user


@router.post('/change_password')
def change_password(request: schemas.ChangePassword, db: Session = Depends(get_db), user: int = Depends(get_current_user)):
    matched = utils.verify(request.password, user.password)
    if not matched:
        raise HTTPException(status_code=401,
                            detail=f"Password does not matched")
    # Hash the new password
    hashed_password = utils.hash(request.new_password)
    
    # Update the user's password in the database
    user.password = hashed_password
    db.commit()
    db.refresh(user)

    return {"detail": "Password updated successfully"}
