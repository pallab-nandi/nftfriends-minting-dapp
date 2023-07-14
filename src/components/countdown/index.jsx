import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from '@iconify/react'
import Button from '../Button'
import Spacing from '../Spacing'

const Countdown = ({ targetDate }) => {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    ended: false // Added a new property to track countdown end
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
      <div className="row">
        <div className="col-md-3">
          <h1>{countdown.days}</h1>
          <p>Days</p>
        </div>
        <div className="col-md-3">
          <h1>{countdown.hours}</h1>
          <p>Hours</p>
        </div>
        <div className="col-md-3">
          <h1>{countdown.minutes}</h1>
          <p>Minutes</p>
        </div>
        <div className="col-md-3">
          <h1>{countdown.seconds}</h1>
          <p>Seconds</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
          <Spacing lg='25' md='25' />
          {!countdown.ended && (
            <Button
              variant='cs-btn_filed cs-accent_btn'
              btnLink='https://getbootstrap.com/docs/5.3/getting-started/rtl/#ltr-and-rtl-at-the-same-time'
              btnText='Preclaim'
            >
              <Icon icon="simple-icons:ethereum" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Countdown;