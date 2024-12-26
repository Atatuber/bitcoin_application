from flask import Blueprint, jsonify
from database.users import getAllUsers

users_bp = Blueprint('/api/users', __name__)

@users_bp.route('', methods=['GET'])
def returnAllUsers():
    users = getAllUsers()
    return jsonify(users)