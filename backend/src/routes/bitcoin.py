from flask import Blueprint, jsonify
from services.bitcoin import getAllWallets 
from services.bitcoin import getWalletInfo

btc_bp = Blueprint('api/btc', __name__)

@btc_bp.route('/wallets', methods=['GET'])
def returnAllWallets():
    wallets = getAllWallets()
    return jsonify(wallets)


@btc_bp.route('/wallets/<name>', methods=['GET'])
def returnWalletInfo(name):
    wallet = getWalletInfo(name)
    return jsonify(wallet)