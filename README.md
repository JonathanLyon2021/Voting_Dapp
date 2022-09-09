# Voting_Dapp
This is Exercise 7 from MI4 in Kingsland Universities Blockchain Developer Program

# Goals
• The app implements register / login / logout / vote functionality.
• Clients vote for given candidates.
• Candidates and votes are stored in Solidity Contract on the Ropsten Ethereum Testnet.
• Users register in the system and get a newly created wallet (private key + address). 1.The wallet is stored in JSON encrypted format at the server side.
2.Wallet password / private key never leave the client app.
• Use different passwords for server login and for the wallet:
-Server password: HMAC(username, password)
-Wallet password: user's original password
• Encrypt wallet in UTC/JSON format (both private key + mnemonic phrase are encrypted with AES-CRT- 128 using Scrypt key derivation).
• Upon login, the client downloads the encrypted JSON from the server and stores it in the browser session.
