from flask import Blueprint, jsonify, request
from services.bitcoin_service import createBitcoinWallet, getWalletsByAccountId, getKeysByWalletId, getWalletByWalletId, updateBalanceByAddress
from services.transaction import makeBitcoinTransaction

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

@btc_bp.route('/wallets/<address>', methods=['PUT'])
def returnAddressWithUpdatedBalance(address):
    if request.method == "PUT":
        try:
            wallet = updateBalanceByAddress(address)
            if wallet is not None:
                return "200", 200
            else:
                return "404", 404
        except Exception as e:
            return "500", 500
        
@btc_bp.route('/transaction', methods=['POST'])
def returnBitcoinTransaction():
    if request.method == "POST":
        try:
            sender_address = request.json.get("sender_address")
            recipient_address = request.json.get("recipient_address")
            amount_to_send = request.json.get("amount_to_send")
            fee = request.json.get("fee")

            transaction = makeBitcoinTransaction(sender_address, recipient_address, amount_to_send, fee)
            
            if transaction is not None:
                return transaction
            else:
                return "422", 422
        except Exception as e:
            return "500", 500

            
