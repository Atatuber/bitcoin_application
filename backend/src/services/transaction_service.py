import requests
from bitcoinlib.transactions import Transaction
from bitcoinlib.keys import HDKey
from database.bitcoin_db import getWalletByAddress, storeTransaction
from database.transactions_db import getTransactionsConnectedToAccount
def getUtxos(address):
    url = f"https://mempool.space/testnet4/api/address/{address}/utxo"
    response = requests.get(url)
    response.raise_for_status()
    utxos = response.json()
    if not utxos:
        raise Exception(f"No UTXOs found for address: {address}")
    return utxos

def broadcastTransaction(tx_hex):
    url = "https://mempool.space/testnet4/api/tx"
    response = requests.post(url, data=tx_hex, headers={"Content-Type": "text/plain"})
    if response.status_code != 200:
        raise Exception(f"Broadcast failed: {response.json()}")
    return response.text.strip()

def makeBitcoinTransaction(sender_address, recipient_address, amount_to_send, fee, account_id):
    try:
        wallet = getWalletByAddress(sender_address, account_id)
        if wallet is None:
            return {"error": 403, "message": "Wallet not found or wallet isn't from user"}
        
        mnemonic = wallet['mnemonic']
        wallet_id = wallet['wallet_id']

        master_key = HDKey.from_passphrase(mnemonic, network="testnet")
        child_key = master_key.subkey_for_path("m/0")
        derived_address = child_key.address()

        if derived_address != sender_address:
            return {"error": 404, "message": "Derived address does not match expected address"}

        print(f"Derived Address: {derived_address}")
        print(f"Expected Address: {sender_address}")

        utxos = getUtxos(sender_address)
        total_needed = amount_to_send + fee

        selected_utxos = []
        total_value = 0
        for utxo in utxos:
            selected_utxos.append(utxo)
            total_value += utxo["value"]
            if total_value >= total_needed:
                break

        if total_value < total_needed:
            return {"error": 400, "message": f"Insufficient funds. Total: {total_value}, Needed: {total_needed}"}

        tx = Transaction(network="testnet")

        for utxo in selected_utxos:
            tx.add_input(utxo["txid"], utxo["vout"], value=utxo["value"], witness_type="segwit")

        tx.add_output(address=recipient_address, value=amount_to_send)
        
        change = total_value - total_needed
        if change > 0:
            tx.add_output(address=sender_address, value=change)

        tx.fee = fee

        tx.sign(keys=[child_key])

        if not tx.verify():
            return {"error": 500, "message": "Transaction verification failed"}

        tx_hex = tx.raw_hex()

        txid = broadcastTransaction(tx_hex)
        print(f"Transaction broadcasted successfully. TXID: {txid}")

        if not storeTransaction(wallet_id, txid, total_needed):
            return {"error": 500, "message": "Failed to store transaction in database"}

        return {"transaction_id": txid}

    except Exception as e:
        print(f"Error in transaction processing: {e}")
        return {"error": 500, "message": str(e)}


def getAllAccountTransactions(account_id):
    try:
        transactions = getTransactionsConnectedToAccount(account_id)

        if transactions is None:
            print("Error getting transactions")
            return None
        
        return transactions
    
    except Exception as e:
        print("Error getting transactions (SERIVCE LAYER.)")
        return None