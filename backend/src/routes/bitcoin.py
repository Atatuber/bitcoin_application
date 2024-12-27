from flask import Blueprint, jsonify, request, make_response
from services.bitcoin import createBitcoinWallet, getWalletsByAccountId, getKeysByWalletId, getWalletByWalletId, updateBalanceByWalletId

btc_bp = Blueprint('api/btc', __name__)

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


@btc_bp.route('/wallets/<account_id>', methods=['GET'])
def returnWalletsById(account_id):
    if request.method == "GET":
        try:
            wallets = getWalletsByAccountId(account_id)
            if wallets is not None:
                return jsonify(wallets), 200
            else:
                return "404", 404
        except Exception as e:
            return "500", 500

@btc_bp.route('/wallets/<wallet_id>/keys', methods=['GET'])
def returnKeysByWalletId(wallet_id):
    if request.method == "GET":
        try:
            keys = getKeysByWalletId(wallet_id)
            if keys is not None:
                return jsonify(keys), 200
            else:
                return "404", 404
        except Exception as e:
            return "500", 500

@btc_bp.route('/wallet/<wallet_id>', methods=['GET'])
def returnWalletByWalletId(wallet_id):
    if request.method == "GET":
        try:
            wallet = getWalletByWalletId(wallet_id)
            if wallet is not None:
                return jsonify(wallet), 200
            else:
                return "404", 404
        except Exception as e:
            return "500", 500

@btc_bp.route('/wallets/<wallet_id>', methods=['PUT'])
def returnWalletWithUpdatedBalance(wallet_id):
    if request.method == "PUT":
        try:
            new_balance = request.json.get('new_balance')
            print(new_balance)
            wallet = updateBalanceByWalletId(wallet_id, new_balance)
            if wallet is not None:
                return "200", 200
            else:
                return "404", 404
        except Exception as e:
            return "500", 500