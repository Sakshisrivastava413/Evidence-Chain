This was build at ETHIndia 2018 and we were among the 7 finalists of the hackathon, overall experience of the hackathon was awesome <3


# ***Evidence Chain***

Evidence Chain is blockchain based solution to avoid evidence tampering in Indian Court (actually any judiary based system out there).

## <u>Problem Statement</u>

<p>
In Courts, lot of evidences are tampered in a way or another due to which innocent lives are sued. When someone submit an evidence to the court (may it be a document, video or audio), the evidence is submitted to police after submission of the same from party. The parties and the court have to trust all the middle men/parties that come in between the process of <i>approval</i> to <i>submission</i> of the evidence.
</p>

## <u>Our Solution</u>
We propose a solution where all the evidences submitted by a user are pushed to a blockchain with a very simple and elegant user interface where user just uploads all the details of the evidence like its image, name, creation date, description and type and we handle all the things behind the scenes (uploading the image to ipfs, signing the details user filled using his / her public key, making the actual transaction to blockchain via organisation's account by verifying the hash so that user doesn't have to pay for the ether via making a submission and the organisation does the payment for user's transaction via taking care of security issues like mutating user's filled information).

## <u>Technology Stack</u>
1. [Solidity](https://solidity.readthedocs.io/en/v0.4.24) for writing Smart Contract(s)
2. [React](https://reactjs.org) for frontend
3. [IPFS](https://ipfs.io/) for file storage
4. [Truffle Framework](https://truffleframework.com/ganache) for easy development of smart contracts and deploying to blockchain
5. [Ganache](https://truffleframework.com/ganache) to provide local blockchain
6. [Web3JS](https://web3js.readthedocs.io/en/1.0/) as layer to contact blockchain via normal browser

## <u>Flow of the application</u>

<p>

- User enters it's public key and the Case ID given by officials to the system
- They now chose one of the court cases going on with them
- Now they are shown a evidence list of the case chosen and an option to upload a new evidence for approval to show in next hearing
- They upload an evidence filling all its detail and signed using user's private key on the frontend and sent to the organisation's service
- Organisation / Govt.'s service automatically makes a transaction to the blockchain on the behalf of user so that user doesn't have to pay for the gas
- Evidence gets added to the blockchain and now is forever there and hence no immutability is possible, here we also trigger an event from the Smart Contract to update the UI with the new evidence.
</p>

## <u>Accomplishments we are proud of</u>

<p>

- Making the organisation pay the gas for user without risking the transaction owner's data immutability
</p>
