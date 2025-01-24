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
