from database.db_config import db

def getWalletsAndKeysById(account_id):
    query = """
    SELECT 
        w.wallet_id AS wallet_id, 
        w.account_id AS account_id, 
        k.key_id AS key_id, 
        w.name AS wallet_name, 
        k.balance AS key_balance, 
        w.mnemonic AS wallet_mnemonic, 
        w.network AS wallet_network, 
        w.created_at AS wallet_created_at, 
        k.key_public AS key_public, 
        k.key_private AS key_private, 
        k.address AS key_address, 
        k.path AS key_path, 
        k.created_at AS key_created_at
    FROM wallets w 
    INNER JOIN keys k 
    ON w.wallet_id = k.wallet_id 
    WHERE w.account_id = :account_id
    """
    params = {
        "account_id": account_id,
    }
    df = db.readQuery(query, params)
    if df is not None:
        return df.to_dict(orient='records')

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

def getWalletByAddress(address):
    query = """
    SELECT w.wallet_id, w.mnemonic FROM wallets w INNER JOIN keys k ON w.wallet_id = k.wallet_id WHERE k.address = :address
    """
    params = {
        "address": address
    }
    df = db.readQuery(query, params)
    if df is not None and not df.empty:
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

def storeTransaction(wallet_id, txid, amount_to_send):
    try:
        query = "INSERT INTO transactions (wallet_id, txid, amount) VALUES(:wallet_id, :txid, :amount)"
        params = {
            "wallet_id": wallet_id,
            "txid": txid,
            "amount": amount_to_send
        }
        db.insertQuery(query, params)
        return True
    except Exception as e:
        return False

