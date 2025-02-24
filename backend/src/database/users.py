from database.db_config import db

def getAllUsers():
    query = "SELECT account_id, username, email, password_hash, created_at, updated_at, is_active, role FROM accounts"
    df = db.readQuery(query)
    if df is not None:
        return df.to_dict(orient='records')
    return None


def getUserByEmail(email):
    query = "SELECT account_id, username, email, password_hash, is_active, role FROM accounts WHERE email = :email"
    params = {
        "email": email,
    }
    df = db.readQuery(query, params)
    if df is not None and not df.empty:  
        return df.to_dict(orient='records')[0]
    return None  
