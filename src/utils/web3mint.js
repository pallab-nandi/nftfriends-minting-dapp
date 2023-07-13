/* import contract from '../contract/ABI.json';
import { ethers } from 'ethers';
import { isMetaMaskInstalled, ethereum } from '../utils/web3functions';



export const mint = async (mint_amount) => {
    if(isMetaMaskInstalled()){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0x9582Cb891566e6147E4e949482d71673dB5EE9da";
        const nftContract = new ethers.Contract(contractAddress, contract, signer);

        let txnHash = await nftContract.mint(mint_amount, {
            gasLimit: "285000",
            value: ethers.utils.parseEther((0.001 * mint_amount).toString())
        })
        return txnHash
    }
} */