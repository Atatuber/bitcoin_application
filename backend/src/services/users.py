from database.users import getUserByEmail

def getUserDataByEmail(email):
    try:
        userData = getUserByEmail(email)

        if userData is None:
            return None

        return userData
    
    except Exception as e:
        print(f"Error getting user data: {str(e)}")
        return None