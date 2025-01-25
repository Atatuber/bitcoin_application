import requests
from datetime import datetime, timezone
from bitcoinlib.transactions import Transaction
from bitcoinlib.keys import HDKey
from database.bitcoin_db import getWalletByAddress, storeTransaction
from database.transactions_db import getTransactionsConnectedToAccount, getWalletIdFromAddress, updateTransactions, getAddressFromAccountId, checkTxidExists
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

        if not storeTransaction(wallet_id, sender_address, recipient_address, txid, total_needed):
            return {"error": 500, "message": "Failed to store transaction in database"}

        return txid

    except Exception as e:
        print(f"Error in transaction processing: {e}")
        return {"error": 500, "message": str(e)}
    
def unixToDateTime(unix_timestamp):
    try:
        unix_timestamp = int(unix_timestamp)
        utc_time = datetime.fromtimestamp(unix_timestamp, tz=timezone.utc)
        return utc_time.isoformat()  #
    except Exception as e:
        return f"Error converting timestamp: {e}"

def getAllTransactionsFromAddress(address):
    url = f"https://mempool.space/testnet4/api/address/{address}/txs"
    try:
        response = requests.get(url)
        if response:
            return response.json()
    except Exception as e:
        return None
    
def filterIncomingTransactions(transactions, address):
    incoming_transactions = []
    for tx in transactions:
        for vout in tx.get("vout", []):
            if vout.get("scriptpubkey_address") == address:
                sender_address = None
                if tx.get("vin"):
                    prevout = tx["vin"][0].get("prevout", {})
                    sender_address = prevout.get("scriptpubkey_address", "unknown")
                
                incoming_transactions.append({
                    "txid": tx["txid"],
                    "address_from": sender_address,
                    "address_to": address,
                    "amount": vout.get("value", 0) / 1e8,  
                    "timestamp": unixToDateTime(tx.get("status", {}).get("block_time", 0))
                })
    return incoming_transactions
    
def updateTransactionsForAllAddresses(addresses):
    all_filtered_transactions = []
    for address in addresses:
        print(f"Checking transactions for address: {address}")
        transactions = getAllTransactionsFromAddress(address)
        filtered_transactions = filterIncomingTransactions(transactions, address)
        all_filtered_transactions.extend(filtered_transactions)
    
    return all_filtered_transactions
    
def getAllAccountTransactions(account_id):
    try:
        all_addresses = getAddressFromAccountId(account_id)
        if not all_addresses:
            print(f"No addresses found for account ID {account_id}")
            return None
        
        if isinstance(all_addresses, dict): 
            all_addresses = [all_addresses.get("address")] 
        elif isinstance(all_addresses, list):
            all_addresses = [addr.get("address") for addr in all_addresses if "address" in addr]
        else:
            print(f"Unexpected data format for addresses: {all_addresses}")
            return None

        print(f"Addresses to check: {all_addresses}")

        filtered_transactions = updateTransactionsForAllAddresses(all_addresses)
        if not filtered_transactions:
            print("No transactions found")
            return None
        
        print("Filtered transactions:")
        for tx in filtered_transactions:
            txExists = checkTxidExists(tx["txid"])
            if txExists:
                continue
            print(tx)
            walletId = getWalletIdFromAddress(tx["address_to"])["wallet_id"]
            sending = False
            amount = tx["amount"] * 100000000
            updateTransactions(walletId, tx["address_from"], tx["address_to"], sending, tx["txid"], amount)

        transactions = getTransactionsConnectedToAccount(account_id)
        if transactions is None:
            print("Error getting existing transactions")
            return None
        
        return transactions
    
    except Exception as e:
        print(f"Error getting transactions (SERVICE LAYER): {e}")
        return None
