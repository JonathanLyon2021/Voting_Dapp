$(document).ready(function () {
    const ethereumProvider = new ethers.providers.JsonRpcProvider(
		'https://ropsten.infura.io/v3/831ef999afc849de8c9bdc90783d8e98 ',
		'ropsten'
	);
    const votingContractAddress = "0x30895F95c7E81Dde93Fc28f7b712c8bF286D5eA8";
