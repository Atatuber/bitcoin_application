DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS keys;
DROP TABLE IF EXISTS wallets;
DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
    account_id SERIAL PRIMARY KEY,           
    username VARCHAR(50) NOT NULL UNIQUE,       
    email VARCHAR(100) NOT NULL UNIQUE,         
    password_hash VARCHAR(256) NOT NULL,        
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
    updated_at TIMESTAMP NULL,                  
    is_active BOOLEAN NOT NULL DEFAULT TRUE,   
    role VARCHAR(20) NOT NULL DEFAULT 'User'
);


CREATE TABLE wallets (
    wallet_id SERIAL PRIMARY KEY,
    account_id SERIAL NOT NULL REFERENCES accounts(account_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    mnemonic TEXT NOT NULL,
    network VARCHAR(50) DEFAULT 'testnet',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE keys (
    key_id SERIAL PRIMARY KEY,
    wallet_id INT REFERENCES wallets(wallet_id) ON DELETE CASCADE,
    key_public TEXT NOT NULL,
    key_private TEXT NOT NULL,
    path TEXT NOT NULL,
    address VARCHAR(255) UNIQUE NOT NULL,
    balance NUMERIC DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    wallet_id INT REFERENCES wallets(wallet_id) ON DELETE CASCADE, 
    address_from VARCHAR(255) NOT NULL,
    address_to VARCHAR(255) NOT NULL,
    sending BOOLEAN NOT NULL DEFAULT TRUE,
    txid TEXT NOT NULL,
    amount NUMERIC,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);