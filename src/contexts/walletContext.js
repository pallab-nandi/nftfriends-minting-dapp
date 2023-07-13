/* import { createContext, useState } from "react"
import { isWalletConnected, connectWallet } from '../utils/web3functions'

export const walletContext = createContext({
    account:'',
    setAccount:() => {}
})


const WalletContext = ({ children }) => {
    const [account, setAccount] = useState('')
    const [mint, setMint] = useState(false)
    const value = { account, setAccount, mint, setMint }
    const handleConnection = () => {
        if( isWalletConnected() ){
            const handleWalletConnect = async () => {
                let accounts = await connectWallet();
                if( accounts.length ){
                    setAccount(accounts[0])
                }
            }
            
            handleWalletConnect()
        }
    }

    handleConnection();
    
    return (
        <walletContext.Provider value={value}>
            {children}
        </walletContext.Provider>
    )
}

export default WalletContext

 */