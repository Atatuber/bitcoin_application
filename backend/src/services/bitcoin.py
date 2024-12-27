from bitcoinlib.wallets import Wallet, wallet_delete_if_exists as wallet_delete, wallets_list
from bitcoinlib.mnemonic import Mnemonic
from database.bitcoin import insertWalletInDB

def createBitcoinWallet(account_id, name):
    mnemonic = Mnemonic().generate()
    try:
        wallet = Wallet.create(name, witness_type="segwit", keys=mnemonic, network="testnet")

        db_wallet = insertWalletInDB(account_id, name, mnemonic, "testnet")
        
        if db_wallet is not None:
            return db_wallet
        else:
            return None
    except Exception as e:
        return None


def getAllWallets():
    try:
        wallets = wallets_list()
        if not wallets:
            return []
        
        return wallets
    except Exception as e:
        return f"Fout bij ophalen van wallets: {e}"
    
def getWalletInfo(name):
    try:
        wallet = Wallet(name)
        wallet_info = wallet.as_dict()  
        key_info = wallet.get_key().as_dict()  
        
        return {
            "wallet_info": wallet_info,
            "key_info": key_info
        }
    except Exception as e:
        return f"Wallet with {name} does not exist or error occurred: {e}"
        
def deleteWallet(name):
    try:
        wallet_delete(name)
    except Exception as e:
        return "Wallet with " + name + " Does not exist."
    return "Wallet with " + name + " has been deleted."
