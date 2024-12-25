from flask_bcrypt import Bcrypt 
from flask import Blueprint, Flask


app = Flask(__name__)

bcrypt = Bcrypt(app)

def hashPassword(password):
    return bcrypt.generate_password_hash(password).decode('utf-8')


def checkPassword(password, hashedPassword):
    return bcrypt.check_password_hash(hashedPassword, password)

