import React, { useContext, useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import { Link, redirect } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
import Modal from '../Modal';
import ModeSwitch from '../ModeSwitch';
import Section from '../Section';
// import DropDown from './DropDown';
import './header.scss'
import { walletContext } from '../../contexts/walletContext'
import { DiscordAuthContext, SignInButton, SignOutButton, UserInfo } from "../../contexts/discordContext";


export default function Header() {
  const { account } = useContext(walletContext)
  const { handleCallback } = useContext(DiscordAuthContext);

  useEffect(() => {
    const params = window.location.search;
    const code = params.slice(6);

    // const data = window.localStorage.getItem('userData');

    // setUserData(JSON.parse(data));
    // setIsLoggedIn(true);

    if (code) {
      handleCallback(code);
    }
  }, [])

  return (
    <>
      <Section tag='header' className="cs-site_header cs-style1 cs-sticky-header cs-primary_color">
        <Section className="cs-main_header">
          <Section className="container">
            <Section className="cs-main_header_in">
              <Section className="cs-main_header_left">
                <Link to='/' className="cs-site_branding cs-accent_color">
                  <img src="/images/logo.svg" alt="Logo" className="cs-hide_dark" />
                  <img src="/images/logo_white.svg" alt="Logo" className="cs-hide_white" />
                </Link>
              </Section>
              <Section className="cs-main_header_center">
                {/* <UserInfo /> */}
                {/*<Section className="cs-nav">
                  <ul className="cs-nav_list" style={{ display: `${mobileToggle ? 'block' : 'none'}` }}>
                    {/* <li><ScrollLink to="hero" spy={true} smooth={true} offset={-80} duration={500} onClick={() => setMobileToggle(false)}>Home</ScrollLink></li>
                    <li><ScrollLink to="about" spy={true} smooth={true} offset={-80} duration={500} onClick={() => setMobileToggle(false)}>About</ScrollLink></li>
                    <li><ScrollLink to="roadmap" spy={true} smooth={true} offset={-80} duration={500} onClick={() => setMobileToggle(false)}>Roadmap</ScrollLink></li>
                    <li><ScrollLink to="team" spy={true} smooth={true} offset={-80} duration={500} onClick={() => setMobileToggle(false)}>Team</ScrollLink></li>
                    <li><ScrollLink to="faq" spy={true} smooth={true} offset={-80} duration={500} onClick={() => setMobileToggle(false)}>FAQ</ScrollLink></li>
                    <li><ScrollLink to="contact" spy={true} smooth={true} offset={-80} duration={500} onClick={() => setMobileToggle(false)}>Contact</ScrollLink></li>
                  </ul>
                  <span className={mobileToggle ? "cs-munu_toggle cs-toggle_active" : "cs-munu_toggle"} onClick={() => setMobileToggle(!mobileToggle)}><span></span></span>
                </Section>*/}
              </Section>
              <Section className="cs-main_header_right">
                <Section className="cs-toolbox">
                  <ModeSwitch />
                  {/* <SignInButton /> */}
                  {/* <SignOutButton /> */}
                  {account === '' ?
                    <Modal modalType='connect' btnText='Connect' btnIcon /> :
                    <Section tag='span' className="cs-btn cs-btn_filed cs-accent_btn">
                      <Icon icon="ion:wallet-outline" />
                      <Section tag='span'>{`${account.substring(0, 5)}...${account.substring(account.length - 4, account.length)}`}</Section>
                    </Section>}
                </Section>
              </Section>
            </Section>
          </Section>
        </Section>
      </Section>
    </>
  )
}
