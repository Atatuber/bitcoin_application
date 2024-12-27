from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token

from database.users import getUserByEmail

bcrypt = Bcrypt()

def checkPassword(email, given_password):
    try:
        user = getUserByEmail(email)
        if not user or 'password_hash' not in user:
            return False

        user_password_hash = user['password_hash']


        if bcrypt.check_password_hash(user_password_hash, given_password):
            token = create_access_token(identity=email)
            return token
        else:
            return None
            
    except Exception as e:
        print(f"Error checking password: {str(e)}")

        return False
