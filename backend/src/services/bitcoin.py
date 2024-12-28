import requests
from bitcoinlib.mnemonic import Mnemonic
from bitcoinlib.keys import HDKey
from database.bitcoin import (
    insertWalletInDB,
    insertKeyInDB,
    insertNewBalance,
    getWalletsById,
    getKeysById,
    getWalletById,
    deleteWalletById,
)

def getAddressBalance(address):
    try:
        url = f"https://mempool.space/testnet4/api/address/{address}" 
        response = requests.get(url)

        if response.status_code != 200:
            print(f"HTTP Error: {response.status_code} - {response.text}")
            return None

        data = response.json()

        confirmed_balance = data['chain_stats']['funded_txo_sum'] - data['chain_stats']['spent_txo_sum']
        unconfirmed_balance = data['mempool_stats']['funded_txo_sum'] - data['mempool_stats']['spent_txo_sum']

        total_balance_satoshis = confirmed_balance + unconfirmed_balance
        total_balance_btc = total_balance_satoshis / 1e8  

        return total_balance_btc

    except requests.exceptions.RequestException as req_err:
        print(f"Request error: {req_err}")
        return None
    except KeyError as key_err:
        print(f"Key error: Missing key {key_err}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None


def createBitcoinWallet(account_id, name):
    try:
        mnemonic = Mnemonic().generate()

        db_wallet = insertWalletInDB(account_id, name, mnemonic, "testnet")
        if not db_wallet:
            return None

        master_key = HDKey.from_passphrase(mnemonic, network="testnet")
        path = "m/0" 
        child_key = master_key.subkey_for_path(path)

        key_public = child_key.public_hex
        key_private = child_key.wif()
        address = child_key.address() 

        db_key = insertKeyInDB(
            wallet_id=db_wallet["wallet_id"],
            key_public=key_public,
            key_private=key_private,
            path=path,
            address=address,
            balance=0
        )

        if not db_key:
            return None

        return {
            "wallet": db_wallet,
            "key": db_key
        }

    except Exception as e:
        print(f"Error creating wallet: {e}")
        return None

def getWalletsByAccountId(account_id):
    try:
        wallets = getWalletsById(account_id)

        if wallets is None:
            return None

        return wallets
    except Exception as e:
        print(f"Error getting wallets: {e}")
        return None

def getKeysByWalletId(wallet_id):
    try:
        keys = getKeysById(wallet_id)

        if keys is None:
            return None
        
        return keys
    except Exception as e:
        print(f"Error getting keys: {e}")
        return None

def getWalletByWalletId(wallet_id):
    try:
        wallet = getWalletById(wallet_id)

        if wallet is None:
            return None

        return wallet
    except Exception as e:
        print(f"Error getting wallet: {e}")
        return None

def updateBalanceByAddress(address):
    try:
        new_balance = getAddressBalance(address) 
        updateBalance = insertNewBalance(address, new_balance)

        if updateBalance is False:
            return None
        
        return True
    except Exception as e:
        print(f"Error updating balance: {e}")
        return None

