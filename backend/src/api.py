from flask import Blueprint, jsonify
from bitcoin import getAllWallets 

api_bp = Blueprint('api', __name__)

@api_bp.route('/wallets', methods=['GET'])
def returnAllWallets():
    wallets = getAllWallets()
    return jsonify(wallets)
