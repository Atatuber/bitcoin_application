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