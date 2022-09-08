$(document).ready(function () {
    const ethereumProvider = new ethers.providers.JsonRpcProvider(
		'https://ropsten.infura.io/v3/831ef999afc849de8c9bdc90783d8e98 ',
		'ropsten'
	);
    const votingContractAddress = "0x30895F95c7E81Dde93Fc28f7b712c8bF286D5eA8";
 const votingContractABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "addCandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
 {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "index",
                    "type": "uint32"
                }
            ],
            "name": "vote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
	 {
            "inputs": [],
            "name": "candidatesCount",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
