import bcrypt
from database.users import getUserByEmail

def checkPassword(email, given_password):
    user_password = getUserByEmail(email)[0]['password_hash']
    return bcrypt.check_password_hash(user_password, given_password)
