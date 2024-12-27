from bitcoinlib.mnemonic import Mnemonic
from bitcoinlib.keys import HDKey
from database.bitcoin import (
    insertWalletInDB,
    insertKeyInDB,
    getWalletsById,
    getKeysById,
    getWalletById,
    deleteWalletById,
    updateBalanceById
)

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

def updateBalanceByWalletId(wallet_id, balance):
    try:
        updateBalance = updateBalanceById(wallet_id, balance)

        if updateBalance is False:
            return None
        
        return True
    except Exception as e:
        print(f"Error updating balance: {e}")
        return None

