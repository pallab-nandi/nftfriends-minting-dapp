import React, { useState, createContext, useContext, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Section from '../components/Section';


export const DiscordAuthContext = createContext();

export const DiscordAuth = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleSignIn = () => {
    // Replace these values with your own
    const clientID = '1131497588185641053';
    const redirectURI = 'http://localhost:3000';

    // Generate the authorization URL
    const authorizationURL = `https://discord.com/api/oauth2/authorize?client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectURI)}&response_type=code&scope=identify`;

    // Redirect the user to the authorization URL
    window.location.href = authorizationURL;
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('userData');
    window.location.replace('/');
  };

  const handleCallback = (code) => {

    const clientID = '1131497588185641053';
    const clientSecret = 'kLBVVAgeOZVp7FGiycqbWu7peenPr3Oh';
    const redirectURI = 'http://localhost:3000';

    // Exchange the authorization code for an access token
    fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: clientID,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectURI,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const accessToken = data.access_token;

        // Use the access token to fetch the user's information
        return fetch('https://discord.com/api/users/@me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      })
      .then((response) => response.json())
      .then((data) => {
        // setUserData(data);
        // setIsLoggedIn(true);
        // localStorage.setItem('userData', JSON.stringify(data));
        const memberId = data.id;
        return fetch(`https://discord-role.cyclic.app/add-role`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ memberId })
        })
      })
      .catch(err => console.log(err));
  };

  const handleRole = async (memberId) => {
    try {
      await fetch(`https://discord-role.cyclic.app/add-role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ memberId })
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <DiscordAuthContext.Provider
      value={{ isLoggedIn, userData, handleSignIn, handleSignOut, handleCallback, setUserData, setIsLoggedIn, handleRole }}
    >
      {children}
    </DiscordAuthContext.Provider>
  );
};

export const UserInfo = () => {
  const { isLoggedIn, userData, handleRole } = useContext(DiscordAuthContext);

  if (!isLoggedIn || !userData?.username) {
    return null;
  }

  return (
    <>
      <span>
        <Section tag='span' className="cs-btn cs-btn_filed cs-accent_btn">
          <Icon icon="fluent:person-24-filled" />
          <Section tag='span'>{userData.username}</Section>
        </Section>
      </span>
    </>
  );
};

export const SignInButton = () => {
  const { isLoggedIn, handleSignIn } = useContext(DiscordAuthContext);

  if (isLoggedIn) {
    return null;
  }

  return (
    <>
      <span onClick={handleSignIn}>
        <Section tag='span' className="cs-btn cs-btn_filed cs-accent_btn">
          <Icon icon="iconoir:discord" />
          <Section tag='span'>Claim Discord Role</Section>
        </Section>
      </span>
    </>
  );
};

export const SignOutButton = () => {
  const { isLoggedIn, handleSignOut } = useContext(DiscordAuthContext);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <span onClick={handleSignOut}>
        <Section tag='span' className="cs-btn cs-btn_filed cs-accent_btn">
          <Icon icon="iconoir:discord" />
          <Section tag='span'>Sign Out</Section>
        </Section>
      </span>
    </>
  );
};