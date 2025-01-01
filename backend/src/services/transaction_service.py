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

def makeBitcoinTransaction(sender_address, recipient_address, amount_to_send, fee):
    mnemonic = getWalletByAddress(sender_address)['mnemonic']
    wallet_id = getWalletByAddress(sender_address)['wallet_id']

    master_key = HDKey.from_passphrase(mnemonic, network="testnet")
    child_key = master_key.subkey_for_path("m/0")
    derived_address = child_key.address()

    if derived_address != sender_address:
        print(f"Derived address does not match expected address!")
        return None
    
    print(f"Derived Address: {derived_address}")
    print(f"Expected Address: {sender_address}")

    utxos = getUtxos(sender_address)
    for utxo in utxos:
        print(f"UTXO - TXID: {utxo['txid']}, VOUT: {utxo['vout']}, VALUE: {utxo['value']} satoshis")

    total_needed = amount_to_send + fee

    selected_utxos = []
    total_value = 0
    for utxo in utxos:
        selected_utxos.append(utxo)
        total_value += utxo["value"]
        if total_value >= total_needed:
            break

    if total_value < total_needed:
        print(f"Insufficient funds. Total: {total_value}, Needed: {total_needed}")
        return None
    
    tx = Transaction(network="testnet")

    for utxo in selected_utxos:
        print(f"Adding Input - TXID: {utxo['txid']}, VOUT: {utxo['vout']}, VALUE: {utxo['value']} satoshis")
        tx.add_input(utxo["txid"], utxo["vout"], value=utxo["value"], witness_type="segwit")

    tx.add_output(address=recipient_address, value=amount_to_send)
    
    change = total_value - total_needed
    if change > 0:
        tx.add_output(address=sender_address, value=change)

    tx.fee = fee

    tx.sign(keys=[child_key])

    tx_hex = tx.raw_hex()

    if not tx.verify():
        print("Transaction verification failed.")
        return None

    try:
        txid = broadcastTransaction(tx_hex)
        print(f"Transaction broadcasted successfully. TXID: {txid}")
        try:
            storeTxInDB = storeTransaction(wallet_id, txid, total_needed)
            if storeTxInDB is False:
                print("Store transaction has failed")
        except Exception as e:
            return None
        return txid
    except Exception as e:
        print(f"Error broadcasting transaction: {e}")


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