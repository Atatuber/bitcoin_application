from database.db_config import db
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv('AES_SECRET_KEY')


def getWalletsAndKeysById(account_id):
    query = """
    SELECT 
        w.wallet_id, 
        w.account_id, 
        k.key_id, 
        w.name, 
        k.balance, 
        pgp_sym_decrypt(w.mnemonic, :secret_key) AS mnemonic,
        w.network,
        w.created_at AS wallet_created_at, 
        pgp_sym_decrypt(k.key_public, :secret_key) AS key_public, 
        pgp_sym_decrypt(k.key_private, :secret_key) AS key_private, 
        k.address,
        k.path, 
        k.created_at AS key_created_at
    FROM wallets w 
    INNER JOIN keys k 
    ON w.wallet_id = k.wallet_id 
    WHERE w.account_id = :account_id
    """
    params = {
        "account_id": account_id, 
        "secret_key": SECRET_KEY
    }
    df = db.readQuery(query, params)
    
    if df is None or df.empty:
        print(f"No wallets found for account ID {account_id}")
        return None

    records = df.to_dict(orient='records')
    return records

def getWalletAndKeysByWalletId(wallet_id):
    query = """
    SELECT 
        w.wallet_id, 
        w.account_id, 
        k.key_id, 
        w.name, 
        k.balance, 
        pgp_sym_decrypt(w.mnemonic, :secret_key) AS mnemonic,
        w.network,
        w.created_at AS wallet_created_at, 
        pgp_sym_decrypt(k.key_public, :secret_key) AS key_public, 
        pgp_sym_decrypt(k.key_private, :secret_key) AS key_private, 
        k.address,
        k.path, 
        k.created_at AS key_created_at
    FROM wallets w 
    INNER JOIN keys k 
    ON w.wallet_id = k.wallet_id 
    WHERE w.wallet_id = :wallet_id
    """
    params = {
        "wallet_id": wallet_id,
        "secret_key": SECRET_KEY
    }
    df = db.readQuery(query, params)
    
    if df is None or df.empty:
        print(f"No wallets and keys found for wallet ID {wallet_id}")
        return None

    record = df.to_dict(orient='records')[0]
    return record

def getWalletById(wallet_id):
    query = """
    SELECT wallet_id, account_id, name, pgp_sym_decrypt(w.mnemonic, :secret_key) AS mnemonic, network, created_at
    FROM wallets
    WHERE wallet_id = :wallet_id
    """
    params = {
        "wallet_id": wallet_id,
        "secret_key": SECRET_KEY
    }
    df = db.readQuery(query, params)
    
    if df is not None and not df.empty:
        return df.to_dict(orient='records')[0]
    return None

def getWalletByAddress(address, account_id):
    query = """
    SELECT w.wallet_id, w.account_id, pgp_sym_decrypt(w.mnemonic, :secret_key) AS mnemonic 
    FROM wallets w 
    INNER JOIN keys k ON w.wallet_id = k.wallet_id 
    WHERE k.address = :address AND w.account_id = :account_id
    """
    params = {"address": address, "account_id": account_id, "secret_key": SECRET_KEY}
    df = db.readQuery(query, params)
    
    if df is not None and not df.empty:
        return df.to_dict(orient='records')[0]
    
    return None

def insertWalletInDB(account_id, name, mnemonic, network='testnet'):
    query = """
    INSERT INTO wallets (account_id, name, mnemonic, network)
    VALUES (:account_id, :name, pgp_sym_encrypt(:mnemonic, :secret_key), :network)
    RETURNING wallet_id
    """
    params = {
        "account_id": account_id,
        "name": name,
        "mnemonic": mnemonic,
        "secret_key": SECRET_KEY,
        "network": network,
    }
    df = db.insertQuery(query, params)
    
    if df is not None and not df.empty:
        return df.to_dict(orient='records')[0]
    
    return None

def insertKeyInDB(wallet_id, key_public, key_private, path, address, balance=0):
    query = """
    INSERT INTO keys (wallet_id, key_public, key_private, path, address, balance)
    VALUES (:wallet_id, pgp_sym_encrypt(:key_public, :secret_key), pgp_sym_encrypt(:key_private, :secret_key), :path, :address, :balance)
    RETURNING key_id
    """
    params = {
        "wallet_id": wallet_id,
        "key_public": key_public,
        "key_private": key_private,
        "path": path,
        "secret_key": SECRET_KEY,
        "address": address,
        "balance": balance,
    }
    df = db.insertQuery(query, params)
    
    if df is not None and not df.empty:
        return df.to_dict(orient='records')[0]
    
    return None

def insertNewBalance(address, new_balance):
    try:
        query = "UPDATE keys SET balance = :new_balance WHERE address = :address"
        params = {"new_balance": new_balance, "address": address}
        db.insertQuery(query, params)
        return True
    except Exception as e:
        print(f"Error updating balance: {e}")
        return False

def storeTransaction(wallet_id, address_from, address_to, txid, amount_to_send):
    try:
        query = """
        INSERT INTO transactions (wallet_id, address_from, address_to, txid, amount) 
        VALUES(:wallet_id, :address_from, :address_to, :txid, :amount)
        """
        params = {
            "wallet_id": wallet_id,
            "address_from": address_from,
            "address_to": address_to,
            "txid": txid,
            "amount": amount_to_send
        }
        db.insertQuery(query, params)
        return True
    except Exception as e:
        print(f"Error storing transaction: {e}")
        return False
