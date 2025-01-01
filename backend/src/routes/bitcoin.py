from flask import Blueprint, jsonify, request
from werkzeug.exceptions import HTTPException

from services.bitcoin_service import createBitcoinWallet, getWalletByWalletId, getWalletsAndKeysByAccountId
from services.transaction_service import makeBitcoinTransaction, getAllAccountTransactions

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
def returnWalletsAndKeysById(account_id):
    if request.method == "GET":
        try:
            walletsAndKeys = getWalletsAndKeysByAccountId(account_id)

            if walletsAndKeys is not None:
                return jsonify(walletsAndKeys), 200
            else:
                return "404", 404
            
        except Exception as e:
            return "500", 500

@btc_bp.route('/wallets/<wallet_id>', methods=['GET'])
def returnWalletByWalletId(wallet_id):
    if request.method == "GET":
        try:
            wallet = getWalletByWalletId(wallet_id)
            print(wallet)
            if wallet is not None:
                return jsonify(wallet), 200
            else:
                return "404", 404
        except Exception as e:
            return "500", 500
        
@btc_bp.route('/transactions', methods=['POST'])
def returnBitcoinTransaction():
    try:
        required_fields = ["sender_address", "recipient_address", "amount_to_send", "fee", "account_id"]
        data = request.json
        if not data or not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 422
        
        sender_address = data["sender_address"]
        recipient_address = data["recipient_address"]
        amount_to_send = int(data["amount_to_send"])
        fee = int(data["fee"])
        account_id = int(data["account_id"])

        transaction = makeBitcoinTransaction(sender_address, recipient_address, amount_to_send, fee, account_id)

        if "error" in transaction:
            return jsonify({"error": transaction["error"]}), transaction["error"]

        return jsonify(transaction), 200

    except HTTPException as http_err:
        return jsonify({"error": http_err.description}), http_err.code
    except Exception as e:
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500
            
@btc_bp.route("/transactions/<account_id>", methods=['GET'])
def returnTransactionsConnectedToAccount(account_id):
    if request.method == "GET":
        try:
            transactions = getAllAccountTransactions(account_id)

            if transactions is None:
                print("No transactions found")
                return "404", 404
            
            return jsonify(transactions), 200
        except Exception as e:
            print("Error reiving transactions (ROUTE LAYER)")
            return "500", 500
        
