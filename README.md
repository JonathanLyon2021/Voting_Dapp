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

# Prerequisites
    • Node v16.15.0
    • NPM v7.19.1
    • Ethers.js v5.6

# Setup the Project
    npm install

# Deploy the Contract in Remix
  Before we continue with the client-side, let's deploy the contract in Ropsten.

# Register 
  After you have added some candidates, from Remix copy the contract address and ABI and set them in the client.js

Now it's time to make a POST request to the server.
• type – POST
• url – "/register"
• data – JSON of the username
• server password
• encrypted wallet
• content type – "application/json"

After the request is done, save the username and encrypted wallet in the session storage and show the home page
using showView("viewHome"). Show an additional message that the user has been successfully registered and
show the mnemonic for the first and last time.

Now, test the register functionality. Go to src folder and in the terminal type:

         node voting-server.js
         
Open the browser and go to http://localhost:1024

# Logout 
Now we need to logout to make sure that the the Jwt token is being removed from local storage.

# Login
Now it is time to implement the login functionality. Like the register one, take the username and wallet password
and create the back-end password using HMAC256. Then, make a POST request to "/login" with the username and
password as data. The server-side will validate whether those credentials are correct or not and return a status
message. If they are correct, the result will store the user's encrypted wallet. Save it in the session storage, along
with the username. Last but not least, show the home view and an appropriate message.

# Voting Results
Now it is time to use the contract instance and get the candidates. Go to loadVotingResults in client.js. In a try-catch
block, first get the count of the candidates using votingContract.candidatesCount(). After we have got the count,
with a simple for loop get the candidate and his votes by an index and store them in an array.

After that comes the part to display them. For each candidate, create a <li> element with its candidate name and
votes. Additionally, if a user is logged in, a button will appear with which he can vote. Append the list element (<li>) to
the unordered list(<ul>) with id #votingResults.
    
# Vote
  Last but not least, the voting functionality. The method takes the candidate's index and the candidate's name as parameters. We will decrypt the wallet and vote 
for the candidate. Take the wallet from the session storage and create a prompt box in which the user will re-enter his password.
Using ethers.Wallet.fromEncryptedWallet, decrypt the JSON file. Create a new wallet with the private key and
Ropsten provider. Then create a new voting contract instance with the wallet as a signer.
Vote for the candidate. After that, show a message with the candidate's name and a URL of the transaction in
Ropsten block explorer with the received transaction hash as callback.
Before you test the vote functionality, get yourself some test ETH from the faucet (https://faucet.egorfine.com/) or
ask someone to send you. If you ever get the error below, that means the first account in your HD wallet does not
have any ropsten test ether.
You can use your mnemonic to view keys and addresses using a tool like https://iancoleman.io/bip39/. From there,
you can copy the first address you find from the derived addresses to receive ether using this
https://faucet.egorfine.com/ or import the first account’s private key into an external wallet such as Metamask to
receive funds using this faucet.
After that, pick one of your candidates and click [Vote]. A pop-up will appear to re-enter your password. After that a
message/error will appear. You have successfully voted for a candidate, Congratulations!
