from bitcoinlib.networks import Network
from bitcoinlib.keys import Address

# Testnet address
testnet_address = "tb1q5zqf0kyl5hvnt7aw44ss76vjnturmvkf3ewm0w"

try:
    # Validate address against testnet
    network = Network('testnet')
    address = Address(testnet_address, network=network)
    print(f"The address {testnet_address} is valid on the testnet.")
except ValueError as e:
    print(f"The address {testnet_address} is NOT valid on the testnet. Error: {e}")
