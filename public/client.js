$(document).ready(function () {
    const ethereumProvider = ethers.providers.getDefaultProvider('ropsten');
    const votingContractAddress = 0x945a00eAfAc2cB333cCceaE648B691BAB025C07D;
    const votingContractABI = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "addCandidate",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "index",
                    "type": "uint32"
                }
            ],
            "name": "vote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "candidatesCount",
            "outputs": [
                {
                    "name": "",
                    "type": "uint32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "index",
                    "type": "uint32"
                }
            ],
            "name": "getCandidate",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "index",
                    "type": "uint32"
                }
            ],
            "name": "getVotes",
            "outputs": [
                {
                    "name": "",
                    "type": "uint32"
                }
            ],
            "payable": false,
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

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
        const loggedIn = sessionStorage.jsonWallet;
        if (loggedIn) {
            $('.show-after-login').show();
            $('.hide-after-login').hide();
        } else {
            $('.show-after-login').hide();
            $('.hide-after-login').show();
        }
        if (viewName === 'viewHome')
            loadVotingResults();
    }

    // Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function() { $("#ajaxLoadingBox").fadeIn(200) },
        ajaxStop: function() { $("#ajaxLoadingBox").fadeOut(200) }
    });

    function showInfo(message) {
        $('#infoBox>p').html(message);
        $('#infoBox').show();
        $('#infoBox>header').click(function () {
            $('#infoBox').hide();
        });
    }

    function showError(errorMsg, err) {
        let msgDetails = "";
        if (err && err.responseJSON)
            msgDetails = err.responseJSON.errorMsg;
        $('#errorBox>p').html('Error: ' + errorMsg + msgDetails);
        $('#errorBox').show();
        $('#errorBox>header').click(function () {
            $('#errorBox').hide();
        });
    }

    function showProgressBox(percent) {
        let msg = "Wallet encryption / decryption ... " +
            Math.round(percent * 100) + "% complete";
        $('#progressBox').html(msg).show(100);
    }

    function hideProgressProgress() {
        $('#progressBox').hide(100);
    }

    async function login() {
        let username = $('#usernameLogin').val();
        let walletPassword = $('#passwordLogin').val();
        let backendPassword = CryptoJS.HmacSHA256(jsonWallet,username, walletPassword).toString();
        try{
            let result = await $.ajax({
                type: 'POST',
                url:`/login`,
                data: JSON.stringify({username, password: backendPassword}),
                contentType: 'application/json'
            });
            sessionStorage['username'] = username;
            sessionStorage['jsonWallet'] = result.jsonWallet;
            showView("viewHome");
            showInfo(`User "${username}" logged in successfully.`);
        }    
        catch(err){
            showError("CANNOT LOGIN USER" , err);

        }
    }

    async function register() {
        let username = $('#usernameRegister').val();
        let walletPassword = $('#passwordRegister').val();
        try{
            let wallet = ethers.Wallet.createRandom();
            let jsonWallet = await wallet.encrypt(walletPassword, {}, showProgressBox);
            let backendPassword = CryptoJS.HmacSHA256(jsonWallet,username, walletPassword).toString();
            let result = await $.ajax({
                type: 'POST',
                url:`/register`,
                data: JSON.stringify({username, password: backendPassword, jsonWallet}),
                contentType: 'application/json'
            });
            sessionStorage['username'] = username;
            sessionStorage['jsonWallet'] = jsonWallet;
            showView("viewHome");
            showInfo(`User "${username}" registered successfully. PLease save your mnemonics: <b>${wallet.mnemonic}</b>`);
        }    
        catch(err){
            showError("CANNOT REGISTER USER" , err);

        }
        finally{
            hideProgressProgress();
        }
    }

    async function loadVotingResults() {
        try{
            let candidates = [];
            let canidatesCount = await votingContract.canidatesCount();
            for (let index = 0; index < canidatesCount; index++) {
                let candidate = await votingContract.getCandidate(index);
                let votes = await votingContract.getVotes(index);
                candidates.push({candidate, votes});
            }
            let votingResultsUl = $('#votingResults').empty();
            for(let index = 0; index < canidatesCount; index++) {
                let canidate = canidates[index];
                let li = $('<li>').html(`${canidate.candidate} -> ${canidate.votes} votes`);
                if(sessionStorage['username']){
                    let button = $(`<input type="button" value="Vote"`);
                    button.click(function () {
                        vote(index, canidate.candidate);
                    });
                    li.append(button);
                }
                    li.appendTo(votingResultsUl);
            }        

        }
        catch(err){
            showError(err);
        }
    }

    async function vote(candidateIndex, candidateName) {
        try{
            let jsonWallet = sessionStorage['jsonWallet'];
            let walletPassword = prompt("Enter your wallet password");
            let wallet = await ethers.Wallet.fromEncryptedWallet(jsonWallet, walletPassword, showProgressBox);
            let privateKey = wallet.privateKey;
            const votingContract = new ethers.Contract(votingContractAddress, votingContractABI, new ethers.Contract(privateKey, ethereumProvider));
            let votingResult = await votingContract.vote(candidateIndex);
            let transHash = votingResult.hash;
            showInfo(`Voted for: ${candidateName}.` + `See the transaction: <a href="https://ropsten.etherscan.io/tx/${transHash}" target="_blank">${transHash}</a>`);
        }
        catch(err){
            showError(err);
        }   
        finally{
            hideProgressProgress();
        }
       
    }

    function logout() {
       sessionStorage.clear();
         showView("viewHome");
    }

});


