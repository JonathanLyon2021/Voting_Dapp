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
{
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "index",
                    "type": "uint32"
                }
            ],
            "name": "getCandidate",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
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
            "name": "getVotes",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
const votingContract = new ethers.Contract(votingContractAddress, votingContractABI, ethereumProvider);
	 showView("viewHome");

    $('#linkHome').click(function () {
        showView("viewHome");
    });

    $('#linkLogin').click(function () {
        showView("viewLogin");
    });

    $('#linkRegister').click(function () {
        showView("viewRegister");
    });

    $('#linkLogout').click(logout);

    $('#buttonLogin').click(login);
    $('#buttonRegister').click(register);

	
