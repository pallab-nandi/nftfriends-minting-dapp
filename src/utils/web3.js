import { toast } from 'react-toastify';
import { contractAddress, abi } from '../contract/constant';
import Section from '../components/Section';
import StatusCard from '../components/Status/StatusCard';
// import contract from '../contract/ABI.json';
const { ethers } = require('ethers');
// const { contractAddress, abi } = require('../contract/constant');
// const { toast } = require('react-toastify');

const contractData = async () => {
    if (window.ethereum) {
        if (window.ethereum.selectedAddress == null) {
            toast.error('Oops! your wallet is not connected!');
            return [];
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const address = accounts[0]

        return [contract, address, provider];
    } else {
        toast.error('Metamask is not installed!');
        return [];
    }
}

// const length = (await data()).length;
// const [contract, address, provider] = await data();

const fruitlistStat = async (address) => {

    const provider = new ethers.BrowserProvider(window.ethereum);
    // const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const status = await contract.fruitStatus(address);
    return status;
}

const friendlistStat = async (accounts) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    // const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const status = await contract.freindStatus(accounts);
    return status;
}

const _claimStatus = async (accounts) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    // const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const status = await contract.claimStatus(accounts);
    return status;
}

const _remainingSupply = async () => {
    if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        // const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, provider);

        const count = await contract.remainingSupply();
        return count;
    }
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}`)
    return new Promise((resolve, reject) => {
        try {
            // provider.once(transactionResponse.hash, (transactionReceipt) => {
            //     console.log(
            //         `Completed with ${transactionReceipt.confirmations} confirmations.`
            //     )
            //     resolve()
            // })
            console.log(`completed`);
            resolve();
        } catch (error) {
            reject(error)
        }
    })
}

export const _fruitClaim = async () => {
    const data = await contractData();

    if (data.length === 0) return;

    const contract = data[0];
    const address = data[1];
    const provider = data[2];

    let fruitStat = await fruitlistStat(address);
    let claimStat = await _claimStatus(address);
    let remains = await _remainingSupply();

    try {
        if (!fruitStat) {
            toast.error('You are not listed as Fruitlist!');
            return;
        }

        if (claimStat) {
            toast.warn('You have already claimed!');
            return;
        }

        if (remains <= 0) {
            toast.error('Supply is ended!');
            return;
        }

        const transactionResponse = await contract.fruitClaim({
            value: ethers.parseEther("0.2"),
        });
        await listenForTransactionMine(transactionResponse, provider);
        toast.done('Your claiming is done!');
        return (
            <Section className="cs-modal active">
                <Section className="cs-modal_in">
                    <Section className="cs-modal_container">
                        <Section className="cs-modal_container_in cs-light_bg">
                            {/* <button className="cs-close_modal cs-center cs-primary_bg" onClick={() => setModal(!modal)}>
                                <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM0.292893 10.2929C-0.0976311 10.6834 -0.0976311 11.3166 0.292893 11.7071C0.683417 12.0976 1.31658 12.0976 1.70711 11.7071L0.292893 10.2929ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L10.2929 11.7071ZM10.2929 0.292893L0.292893 10.2929L1.70711 11.7071L11.7071 1.70711L10.2929 0.292893ZM0.292893 1.70711L10.2929 11.7071L11.7071 10.2929L1.70711 0.292893L0.292893 1.70711Z" fill="white" />
                                </svg>
                            </button> */}
                            <StatusCard />
                        </Section>
                    </Section>
                </Section>
            </Section>
        )
        // return transactionResponse.hash;
        // await transactionResponse.wait(1)
    } catch (error) {
        toast.error('Something went wrong.');
        console.log(error)
    }
}

export const _friendClaim = async () => {
    const data = await contractData();

    if (data.length === 0) return;

    const contract = data[0];
    const address = data[1];
    const provider = data[2];

    const friendStat = await friendlistStat(address);
    const claimStat = await _claimStatus(address);
    const remains = await _remainingSupply();
    try {
        if (!friendStat) {
            toast.error('You are not listed as Friendlist!');
            return;
        }

        if (claimStat) {
            toast.warn('You have already claimed!');
            return;
        }

        if (remains <= 0) {
            toast.error('Supply is ended!');
            return;
        }

        const transactionResponse = await contract.friendClaim({
            value: ethers.parseEther("0.2"),
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

let supplyLeft;
export default supplyLeft = 777 - parseInt(await _remainingSupply());