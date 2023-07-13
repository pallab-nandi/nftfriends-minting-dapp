import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Section from '../Section'
import { isMetaMaskInstalled, connectWallet } from '../../utils/web3functions'
import { toast } from 'react-toastify'
import { walletContext } from '../../contexts/walletContext'

export default function ConnectCard() {
  const { setAccount } = useContext(walletContext)

  const handleConnectWallet = async (e) => {
    e.preventDefault();
    if( !isMetaMaskInstalled() ){
      toast.error("Metamask isn't installed!");
    }else{
      let accounts = await connectWallet();
      if( accounts.length ){
        setAccount(accounts[0])
        localStorage.setItem('isWalletConnected', true)
      }else{
        toast.error("Can't connect t your metamask!");
      }
    }
  }

  return (
    <Section className="cs-wallet_secton text-center">
      <Section tag='h2' className="cs-font_22 text-uppercase cs-normal cs-m0">Connect Wallet</Section>
      <Section className="cs-height_25 cs-height_lg_25" />
      <ul className="cs-list cs-style1 cs-mp0">
        <li><Link to="/" onClick={handleConnectWallet}><img src="/images/metamask.svg" alt="Logo" /></Link></li>
        <li><Link to="/"><img src="/images/coinbase.svg" alt="Logo" /></Link></li>
        <li><Link to="/"><img src="/images/trustwallet.svg" alt="Logo" /></Link></li>
        <li><Link to="/"><img src="/images/walletconnect.svg" alt="Logo" /></Link></li>
      </ul>
      <Section className="cs-height_15 cs-height_lg_15" />
      <Section tag='p' className="cs-m0">Wallet are many variations of pass <br />ges of availabl.</Section>
    </Section>
  )
}
