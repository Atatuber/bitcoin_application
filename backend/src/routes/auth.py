from flask import Blueprint, request, Response
from services.auth import checkPassword

auth_bp = Blueprint('/api/auth', __name__)


@auth_bp.route('/login', methods=['POST'])
def login():
    if request.method == "POST":
        try:
            email = request.json.get('email')
            password = request.json.get('password')
            
            isPasswordCorrect = checkPassword(email, password)
            print(checkPassword(email, password))
            if isPasswordCorrect:
                return "200", 200
            else:
                return "401", 401
        except KeyError:
            return "400", 400
        except Exception as e:
            return "500", 500