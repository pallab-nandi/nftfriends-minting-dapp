import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from '@iconify/react';
import Spacing from '../Spacing';
import Section from '../Section';
import FunFact from '../FunFact';
import { _fruitClaim } from '../../utils/web3';
import TwentyFourHourCountdown from './twofourCountdown';
import { DiscordAuthContext } from '../../contexts/discordContext';
import { toast } from 'react-toastify';

const Countdown = ({ onTransactionComplete }) => {
  const [countdown, setCountdown] = useState({
    days: 2,
    hours: 0,
    minutes: 0,
    seconds: 10,
  });

  const { userData, handleRole } = useContext(DiscordAuthContext)

  const [countdownFinished, setCountdownFinished] = useState(false);

  const updateCountdown = () => {
    setCountdown((prevCountdown) => {
      const totalSeconds = prevCountdown.days * 86400 + prevCountdown.hours * 3600 + prevCountdown.minutes * 60 + prevCountdown.seconds;
      if (totalSeconds > 0) {
        const remainingSeconds = totalSeconds - 1;
        const updatedDays = Math.floor(remainingSeconds / 86400);
        const updatedHours = Math.floor((remainingSeconds % 86400) / 3600);
        const updatedMinutes = Math.floor((remainingSeconds % 3600) / 60);
        const updatedSeconds = remainingSeconds % 60;

        return {
          days: updatedDays,
          hours: updatedHours,
          minutes: updatedMinutes,
          seconds: updatedSeconds,
        };
      } else {
        setCountdownFinished(true); // Countdown has finished
        return prevCountdown;
      }
    });
  };

  const useClaimHandle = async () => {

    if (!userData?.username) {
      toast.warn('Discord is not logged in!')
      return;
    }

    const tx = await _fruitClaim();
    if (tx) {
      // handleRole(userData.id);
      onTransactionComplete(tx);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!countdownFinished) {
    return (
      <div className="container">
        <FunFact title='Fruit List Timer' />
        <Spacing lg='25' md='25' />
        <div style={{ color: 'goldenrod' }} className="row">
          <div className="col-md-3">
            <h1 style={{ color: 'goldenrod' }}>{countdown.days}</h1>
            <p className='cs_size-20'>Days</p>
          </div>
          <div className="col-md-3">
            <h1 style={{ color: 'goldenrod' }}>{countdown.hours}</h1>
            <p className='cs_size-20'>Hours</p>
          </div>
          <div className="col-md-3">
            <h1 style={{ color: 'goldenrod' }}>{countdown.minutes}</h1>
            <p className='cs_size-20'>Minutes</p>
          </div>
          <div className="col-md-3">
            <h1 style={{ color: 'goldenrod' }}>{countdown.seconds}</h1>
            <p className='cs_size-20'>Seconds</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <Spacing lg="25" md="25" />
            <span onClick={useClaimHandle}>
              <Section tag='span' className="cs-btn cs-btn_filed cs-accent_btn">
                <Icon icon="simple-icons:ethereum" />
                <Section tag='span'>{'Claim'}</Section>
              </Section>
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return <TwentyFourHourCountdown />;
  }
};

export default Countdown;