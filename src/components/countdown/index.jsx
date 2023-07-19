import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from '@iconify/react'
import Button from '../Button'
import Spacing from '../Spacing'
import Section from '../Section';

const Countdown = ({ targetDate, onClick }) => {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    ended: false
  });

  useEffect(() => {
    const countDownDate = new Date(targetDate).getTime();

    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance <= 0) {
        clearInterval(countdownInterval);
        setCountdown({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
          ended: true // Countdown has ended
        });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({
          days: ("0" + days).slice(-2),
          hours: ("0" + hours).slice(-2),
          minutes: ("0" + minutes).slice(-2),
          seconds: ("0" + seconds).slice(-2),
          ended: false // Countdown is ongoing
        });
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [targetDate]);

  if (countdown.ended) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Preclaim Ended</h1>
            <p>Event has already occurred</p>
            <Spacing lg='25' md='25' />
            <Button
              btnText='Ended'
            >
              <Icon icon="ri:lock-line" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
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
          {/* {!countdown.ended && (
            <span onClick={onClick}>
              <Section tag='span' className="cs-btn cs-btn_filed cs-accent_btn">
                <Icon icon="simple-icons:ethereum" />
                <Section tag='span'>{'Preclaim'}</Section>
              </Section>
            </span>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Countdown;