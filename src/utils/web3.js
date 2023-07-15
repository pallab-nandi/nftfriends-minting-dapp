// import contract from '../contract/ABI.json';
const { ethers } = require('ethers');
const { contractAddress, abi } = require('../contract/constant');
const { toast } = require('react-toastify');


const data = async () => {
    if (window.ethereum) {
        if (window.ethereum.selectedAddress == null) {
            toast.error('Wallet is not connected!');
            return [];
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const accounts = await window.ethereum.request({ method: "eth_accounts" });

        return [contract, accounts[0], provider];
    } else {
        toast.error('Metamask is not installed!');
        return [];
    }
}

const _fruitStatus = async () => {
    if ((await data()).length) {
        const contract = await data()[0];
        const accounts = await data()[1];

        const status = await contract.fruitStatus(accounts);
        return status;
    }
}

const _friendStatus = async () => {
    if ((await data()).length) {
        const contract = await data()[0];
        const accounts = await data()[1];

        const status = await contract.friendStatus(accounts);
        return status;
    }
}

const _claimStatus = async () => {
    if ((await data()).length) {
        const contract = await data()[0];
        const accounts = await data()[1];

        const status = await contract.claimStatus(accounts);
        return status;
    }
}

const _remainingSupply = async () => {
    if ((await data()).length) {
        const contract = await data()[0];

        const count = await contract.remainingSupply();
        return count;
    }
}

const _fruitClaim = async () => {
    if ((await data()).length === 0) return;
    const contract = await data()[0];
    const accounts = await data()[1];
    const provider = await data()[2];

    try {
        if (!_fruitStatus) {
            toast.error('You are not listed as Fruitlist!');
            return;
        }

        if (_claimStatus) {
            toast.warn('You have already claimed!');
            return;
        }

        if (_remainingSupply <= 0) {
            toast.error('Supply is ended!');
            return;
        }

        const transactionResponse = await contract.fruitClaim({
            value: ethers.utils.parseEther(0.2),
        });
        await listenForTransactionMine(transactionResponse, provider);
        toast.done('Your claiming is done!');
        return transactionResponse.hash;
        // await transactionResponse.wait(1)
    } catch (error) {
        toast.error('Something went wrong.');
        console.log(error)
    }
}

const _friendClaim = async () => {
    if ((await data()).length === 0) return;
    const contract = await data()[0];
    const accounts = await data()[1];
    const provider = await data()[2];

    try {
        if (!_friendStatus) {
            toast.error('You are not listed as Friendlist!');
            return;
        }

        if (_claimStatus) {
            toast.warn('You have already claimed!');
            return;
        }

        if (_remainingSupply <= 0) {
            toast.error('Supply is ended!');
            return;
        }

        const transactionResponse = await contract.friendClaim({
            value: ethers.utils.parseEther(0.2),
        });
        await listenForTransactionMine(transactionResponse, provider);
        toast.done('Your claiming is done!');
        return transactionResponse.hash;
        // await transactionResponse.wait(1)
    } catch (error) {
        toast.error('Something went wrong.');
        console.log(error)
    }
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}`)
    return new Promise((resolve, reject) => {
        try {
            provider.once(transactionResponse.hash, (transactionReceipt) => {
                console.log(
                    `Completed with ${transactionReceipt.confirmations} confirmations.`
                )
                resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    _fruitClaim,
    _friendClaim
}