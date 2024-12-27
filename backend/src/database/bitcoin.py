from database.db_config import db

def getAllWallets():
    query = "SELECT wallet_id, account_id, name, mnemonic, network, created_at FROM wallets"
    df = db.readQuery(query)
    if df is not None:
        return df.to_dict(orient='records')
    return None


def insertWalletInDB(account_id, name, mnemonic, network):
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
    try:
        df = db.insertQuery(query, params)
        if df is not None and not df.empty:
            return df.to_dict(orient='records')[0]
        else:
            return None
    except Exception as e:
        return None


def getWallet(wallet_id):
    query = "SELECT wallet_id, account_id, name, mnemonic, network, created_at FROM wallets WHERE wallet_id = %s"
    df = db.readQuery(query, params=(wallet_id,))
    if df is not None:
        return df.to_dict(orient='records')[0]
    return None


def deleteWallet(wallet_id):
    query = "DELETE FROM wallets WHERE wallet_id = %s"
    db.readQuery(query, params=(wallet_id,))
    return None

