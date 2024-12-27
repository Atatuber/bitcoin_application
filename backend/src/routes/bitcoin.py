from flask import Blueprint, jsonify, request, make_response
from services.bitcoin import getAllWallets, getWalletInfo, createBitcoinWallet

btc_bp = Blueprint('api/btc', __name__)

@btc_bp.route('/wallets', methods=['GET'])
def returnAllWallets():
    wallets = getAllWallets()
    return jsonify(wallets)


@btc_bp.route('/wallets/<name>', methods=['GET'])
def returnWalletInfo(name):
    wallet = getWalletInfo(name)
    return jsonify(wallet)

@btc_bp.route('/wallets', methods=['POST'])
def returnNewWallet():
    if request.method == "POST":
        wallet_name = request.json.get('name')
        account_id = request.json.get('account_id')

        if wallet_name and account_id:
            try:
                wallet = createBitcoinWallet(account_id, wallet_name)
                if wallet is not None:
                    return "200", 200  
                else:
                    return "422", 422  
            except KeyError:
                return "400", 400  
            except Exception as e:
                return "500", 500  
        else:
            return "400", 400  
