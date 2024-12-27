from flask import Blueprint, request, make_response, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.auth import checkPassword

auth_bp = Blueprint('/api/auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    if request.method == "POST":
        try:
            email = request.json.get('email')
            password = request.json.get('password')

            token = checkPassword(email, password)
            if token:
                response = make_response("200", 200)
                response.set_cookie(
                    'auth_token',
                    token,
                    httponly=True,
                    secure=True,
                    samesite='None'
                )
                return response
            else:
                return "401", 401
        except KeyError:
            return "400", 400
        except Exception as e:
            return "500", 500


@auth_bp.route('/cookie', methods=['GET'])
def getCookie():
    try:
        cookie = request.cookies.get('auth_token')
        if cookie:
            return jsonify({"auth_token": cookie}), 200
        else:
            return jsonify({"error": "Cookie not found"}), 404
    except Exception as e:
        return jsonify({"error": "An error occurred"}), 500


@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    user_email = get_jwt_identity()  
    return user_email


@auth_bp.route('/logout', methods=['POST'])
def logout():
    if request.method == "POST":
        response = make_response("200", 200)
        response.set_cookie(
            'auth_token',
            '',
            httponly=True,
            secure=True,
            samesite='None',
            expires=0
        )
        return response