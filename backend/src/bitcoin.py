from bitcoinlib.wallets import Wallet, wallet_delete_if_exists as wallet_delete, wallets_list
from bitcoinlib.mnemonic import Mnemonic

def createWallet(name):
    mnemonic = Mnemonic().generate()
    try:
        wallet = Wallet.create(name, witness_type="segwit", keys=mnemonic, network="testnet")
    except Exception as e:
        return "Wallet with " + name + " Has already been created."
    return wallet


def getAllWallets():
    try:
        wallets = wallets_list()
        if not wallets:
            return "Geen wallets gevonden."
        
        return wallets
    except Exception as e:
        return f"Fout bij ophalen van wallets: {e}"
    

def getWalletInfo(name):
    try:
        wallet = Wallet(name)
    except Exception as e:
        return "Wallet with " + name + " Does not exist."
    return "Public Address: " + wallet.get_key().address + " Private Key: " + wallet.get_key().wif

def deleteWallet(name):
    try:
        wallet_delete(name)
    except Exception as e:
        return "Wallet with " + name + " Does not exist."
    return "Wallet with " + name + " has been deleted."


def getBalance(name):
    try:
        wallet = Wallet(name)
        return print(f'Wallet Balance: {wallet.balance()} BTC')
    except Exception as e:
        return "Wallet with " + name + " Does not exist."