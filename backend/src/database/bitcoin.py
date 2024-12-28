from database.db_config import db

def getWalletsById(account_id):
    query = """
    SELECT wallet_id, account_id, name, mnemonic, network, created_at
    FROM wallets
    WHERE account_id = :account_id
    """
    params = {
        "account_id": account_id,
    }

    df = db.readQuery(query, params)
    if df is not None:
        return df.to_dict(orient='records')
    return []

def getWalletById(wallet_id):
    query = """
    SELECT wallet_id, account_id, name, mnemonic, network, created_at
    FROM wallets
    WHERE wallet_id = :wallet_id
    """
    params = {
        "wallet_id": wallet_id,
    }
    df = db.readQuery(query, params)
    if df is not None and not df.empty:
        return df.to_dict(orient='records')[0]
    return None

def getKeysById(wallet_id):
    query = """
    SELECT key_id, wallet_id, key_public, key_private, path, address, balance, created_at
    FROM keys
    WHERE wallet_id = :wallet_id
    """
    params = {"wallet_id": wallet_id}
    df = db.readQuery(query, params)
    if df is not None:
        return df.to_dict(orient='records')[0]
    return None


def insertWalletInDB(account_id, name, mnemonic, network='testnet'):
    query = """
    INSERT INTO wallets (account_id, name, mnemonic, network)
    VALUES (:account_id, :name, :mnemonic, :network)
    RETURNING wallet_id
    """
    params = {
        "account_id": account_id,
        "name": name,
        "mnemonic": mnemonic,
        "network": network,
    }
    df = db.insertQuery(query, params)
    if df is not None and not df.empty:
        return df.to_dict(orient='records')[0]
    return None

def insertKeyInDB(wallet_id, key_public, key_private, path, address, balance=0):
    query = """
    INSERT INTO keys (wallet_id, key_public, key_private, path, address, balance)
    VALUES (:wallet_id, :key_public, :key_private, :path, :address, :balance)
    RETURNING key_id
    """
    params = {
        "wallet_id": wallet_id,
        "key_public": key_public,
        "key_private": key_private,
        "path": path,
        "address": address,
        "balance": balance,
    }
    df = db.insertQuery(query, params)
    if df is not None and not df.empty:
        return df.to_dict(orient='records')[0]
    return None

def deleteWalletById(wallet_id):
    query = "DELETE FROM wallets WHERE wallet_id = :wallet_id"
    params = {
        "wallet_id": wallet_id,
    }
    db.insertQuery(query, params)
    return True

def insertNewBalance(address, new_balance):
    try:
        query = "UPDATE keys SET balance = :new_balance WHERE address = :address"
        params = {
        "new_balance": new_balance,
        "address": address,
        }
        db.insertQuery(query, params)
        return True
    except Exception as e:
        return False
