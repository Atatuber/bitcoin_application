from flask import Blueprint, jsonify
from services.bitcoin import getAllWallets 
from services.bitcoin import getWalletInfo

api_bp = Blueprint('api', __name__)

@api_bp.route('/wallets', methods=['GET'])
def returnAllWallets():
    wallets = getAllWallets()
    return jsonify(wallets)


@api_bp.route('/wallets/<name>', methods=['GET'])
def returnWalletInfo(name):
    wallet = getWalletInfo(name)
    return jsonify(wallet)