from flask_bcrypt import Bcrypt
from database.users import getUserByEmail

bcrypt = Bcrypt()

def checkPassword(email, given_password):
    try:
        user = getUserByEmail(email)
        if not user or 'password_hash' not in user[0]:
            return False

        user_password_hash = user[0]['password_hash']

        return bcrypt.check_password_hash(user_password_hash, given_password)
    except Exception as e:
        print(f"Error checking password: {str(e)}")

        return False
