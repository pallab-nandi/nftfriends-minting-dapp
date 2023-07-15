import { createContext, useState } from "react"
import { collectAddress } from '../utils/web3functions'

export const walletContext = createContext({
    account: '',
    setAccount: () => { }
})


const WalletContext = ({ children }) => {
    const [account, setAccount] = useState('');
    // const { account } = useContext(walletContext);

    const value = { account, setAccount }


    const walletHandle = async () => {
        await collectAddress()
            .then((data) => setAccount(data))
            .catch(err => console.log(err));
    }

    walletHandle();

    if (account == null) setAccount('');


    return (
        <walletContext.Provider value={value}>
            {children}
        </walletContext.Provider>
    )
}

export default WalletContext