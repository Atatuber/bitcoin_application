from database.db_config import db

def getTransactionsConnectedToAccount(account_id):
    query = """
    SELECT t.transaction_id, w.wallet_id, t.address_from, t.address_to, w.account_id, t.txid, t.amount, t.timestamp, t.sending
    FROM transactions t 
    INNER JOIN wallets w ON t.wallet_id = w.wallet_id 
    INNER JOIN keys k on w.wallet_id = k.wallet_id
    WHERE account_id = :account_id ORDER BY t.timestamp DESC
    """
    params = {
        "account_id": account_id
    }
    df = db.readQuery(query, params)
    if df is not None and not df.empty:
        return df.to_dict(orient='records')


def getWalletIdFromAddress(address):
    query = """
    SELECT w.wallet_id
    FROM wallets w
    INNER JOIN keys k ON w.wallet_id = k.wallet_id
    WHERE k.address = :address
    """
    params = {
        "address": address
    }
    df = db.readQuery(query, params)
    if df is not None and not df.empty:
        return df.to_dict(orient='records')[0]
    
def getAddressFromAccountId(account_id):
    query = """
    SELECT k.address
    FROM keys k
    INNER JOIN wallets w ON k.wallet_id = w.wallet_id
    INNER JOIN accounts a ON w.account_id = a.account_id
    WHERE a.account_id = :account_id
    """
    params = {
        "account_id": account_id
    }
    df = db.readQuery(query, params)
    if df is not None and not df.empty:
        return df.to_dict(orient='records')
    

def updateTransactions(wallet_id, address_from, address_to, sending, txid, amount, timestamp):
    query = """
    INSERT INTO transactions (wallet_id, address_from, address_to, sending, txid, amount, timestamp)
    VALUES (:wallet_id, :address_from, :address_to, :sending, :txid, :amount, :timestamp)
    """
    params = {
        "wallet_id": wallet_id,
        "address_from": address_from,
        "address_to": address_to,
        "sending": sending,
        "txid": txid,
        "amount": amount,
        "timestamp": timestamp
    }
    df = db.insertQuery(query, params)
    if df is not None and not df.empty:
        return True
    return None

def checkTxidExists(txid):
    query = """
    SELECT 1
    FROM transactions
    WHERE txid = :txid
    LIMIT 1
    """
    params = {
        "txid": txid
    }
    df = db.readQuery(query, params)
    if df is not None and not df.empty:
        return True
    return False
