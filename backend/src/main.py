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
        
        wallet_info = ""
        for wallet in wallets:
            wallet_id = wallet.get('id', 'Onbekend ID')
            wallet_name = wallet.get('name', 'Onbekende Naam')
            wallet_network = wallet.get('network', 'Onbekend Netwerk')
            wallet_info += f"Wallet ID: {wallet_id}, Naam: {wallet_name}, Netwerk: {wallet_network}\n"
        return wallet_info.strip()
    except Exception as e:
        return f"Fout bij ophalen van wallets: {e}"

def getWallet(name):
    try:
        wallet = Wallet(name)
    except Exception as e:
        return "Wallet with " + name + " Does not exist."
    return wallet

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



def main():
    while True:
        print("Welcome to the Bitcoin Wallet Manager. What can i help you with?")
        print("1. Create Wallet")
        print("2. Get Wallets")
        print("3. Get Wallet Info")
        print("4. Delete Wallet")
        print("5. Get Wallet Balance")
        print("6. Exit")
        choice = input("Enter your choice: ")
        if choice == "1":
            name = input("Enter Wallet Name: ")
            print(createWallet(name))
        elif choice == "2":
            wallets = getAllWallets()
            print(wallets)
        elif choice == "3":
            name = input("Enter Wallet Name: ")
            print(getWalletInfo(name))
        elif choice == "4":
            name = input("Enter Wallet Name: ")
            print(deleteWallet(name))
        elif choice == "5":
            name = input("Enter Wallet Name: ")
            print(getBalance(name))
        elif choice == "6":
            break
        else:
            print("Invalid Choice. Please try again.")

if __name__ == "__main__":
    main()


