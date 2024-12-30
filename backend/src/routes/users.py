from flask import Blueprint, jsonify, request
from services.users import getUserDataByEmail

users_bp = Blueprint('/api/users', __name__)

@users_bp.route('/<email>', methods=['GET'])
def returnUser(email):
    if request.method == "GET":
        try:
            user = getUserDataByEmail(email)
            if user is not None:
                return jsonify(user), 200
            else:
                return "404", 404
        except Exception as e:
            return "500", 500
        