from flask import Blueprint, jsonify
from database.users import getAllUsers, getUserByEmail

users_bp = Blueprint('/api/users', __name__)

@users_bp.route('', methods=['GET'])
def returnAllUsers():
    users = getAllUsers()
    return jsonify(users)


@users_bp.route('/<email>', methods=['GET'])
def returnUser(email):
    user = getUserByEmail(email)
    return jsonify(user)