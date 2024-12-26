from flask import Blueprint, request
from services.auth import checkPassword

auth_bp = Blueprint('/api/auth', __name__)


@auth_bp.route('', methods=['POST'])
def login():
    if request.method == "POST":
        email = request.form['email']
        password = request.form['password']
        print(email, password)
        if checkPassword(email, password):
            return True
        return False