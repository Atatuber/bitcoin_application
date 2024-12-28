import requests
from bitcoinlib.transactions import Transaction
from bitcoinlib.keys import HDKey
from database.bitcoin import getWalletById

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

stored_mnemonic = getWalletById(1)["mnemonic"]
expected_address = "tb1qkh73ra25wnhzrj3st96yczg5578sr0cddzqys6"

master_key = HDKey.from_passphrase(stored_mnemonic, network="testnet")
child_key = master_key.subkey_for_path("m/0")
derived_address = child_key.address()
derived_private_key = child_key.wif()

if derived_address != expected_address:
    raise Exception("Derived address does not match expected address!")

print(f"Derived Address: {derived_address}")
print(f"Expected Address: {expected_address}")

utxos = getUtxos(expected_address)
for utxo in utxos:
    print(f"UTXO - TXID: {utxo['txid']}, VOUT: {utxo['vout']}, VALUE: {utxo['value']} satoshis")

recipient_address = "tb1qg3lau83hm9e9tdvzr5k7aqtw3uv0dwkfct4xdn"
amount_to_send = 10000  # Satoshis
fee = 5000  # Satoshis
total_needed = amount_to_send + fee

selected_utxos = []
total_value = 0
for utxo in utxos:
    selected_utxos.append(utxo)
    total_value += utxo["value"]
    if total_value >= total_needed:
        break

if total_value < total_needed:
    raise Exception(f"Insufficient funds. Total: {total_value}, Needed: {total_needed}")

tx = Transaction(network="testnet")

for utxo in selected_utxos:
    print(f"Adding Input - TXID: {utxo['txid']}, VOUT: {utxo['vout']}, VALUE: {utxo['value']} satoshis")
    tx.add_input(utxo["txid"], utxo["vout"], value=utxo["value"], witness_type="segwit")

tx.add_output(address=recipient_address, value=amount_to_send)

change = total_value - total_needed
if change > 0:
    tx.add_output(address=expected_address, value=change)

tx.fee = fee

tx.sign(keys=[child_key])

if not tx.verify():
    raise Exception("Transaction verification failed.")

print("Transaction Debug Info:")
print(tx.info())

tx_hex = tx.raw_hex()
print(f"Serialized Transaction Hex: {tx_hex}")

try:
    txid = broadcastTransaction(tx_hex)
    print(f"Transaction broadcasted successfully. TXID: {txid}")
except Exception as e:
    print(f"Error broadcasting transaction: {e}")
