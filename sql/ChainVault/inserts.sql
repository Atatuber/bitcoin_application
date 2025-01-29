DELETE FROM accounts;

INSERT INTO accounts (username, email, password_hash, created_at, updated_at, is_active, role)
VALUES 
('john_doe', 'john.doe@example.com', '$2b$12$KZdzfFYj2OwqNHMUVunV3eh1iGQh.8ivGBO/OexVY8Mf/ALf0sXWu', NOW(), NULL, TRUE, 'User'),
('jane_smith', 'jane.smith@example.com', '$2b$12$pLsHbnnaLNfZIHEHmiU8IekJjyhIfVYV2DN.R1if.nK37mm0YB3C2', NOW(), NULL, TRUE, 'Admin'),
('bitcoin_guru', 'guru.bitcoin@example.com', '$2b$12$DDOFIjGMb9Ca2MOK.oLWKuEs7Kj/Fw8z0zG8fPurBoqlqjoz1VqrO', NOW(), NULL, TRUE, 'User'),
('crypto_trader', 'trader.crypto@example.com', '$2b$12$XzgfPLKWpfXensatolRNWei2KmzTwfFmpur3wJeIpUQ/aw7a6gNfy', NOW(), NULL, TRUE, 'User'),
('alex_99', 'alex.99@example.com', '$2b$12$YVhk/F7Qg4KNlO.jdGQxY.A7bezNlk/ueYy4STM9/6hZVtfomZiyq', NOW(), NULL, TRUE, 'User'),
('emma_w', 'emma.white@example.com', '$2b$12$L.VnHxR38NpDNFHG8B6ileU.UG5Fn5UODS.bKDYJ3x2ioHl5GnH8i', NOW(), NULL, TRUE, 'User'),
('admin_master', 'master.admin@example.com', '$2b$12$UjAjVKWM0htnm/imDi0n9eNazml3nEyWcxYMHtQhtPXBP33Z.Htt6', NOW(), NULL, TRUE, 'Admin'),
('test_user1', 'test.user1@example.com', '$2b$12$8VSxdQ5DEgMIcjIKj2jRWeexe/I0lhPjqrpX7Mtf3AX506m/pkmKq', NOW(), NULL, FALSE, 'User'),
('inactive_user', 'inactive.user@example.com', '$2b$12$Q.q1d5SAHJo6YAdWQsaUjuxcxBiyIr9k8dWF4mQZVbMKZCEMhsgTW', NOW(), NULL, FALSE, 'User'),
('charlie_b', 'charlie.brown@example.com', '$2b$12$CFQN.fYlXAZuNSep3F2ECOI.m36rr9ahRIIxUeMqZPuQeqt70zQdS', NOW(), NULL, TRUE, 'User');