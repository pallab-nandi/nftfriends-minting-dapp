import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../Section';
import './index.scss';
import Button from '../Button';

export default function Status({ src, name, designation, facebookHref, linkedinHref, whatsappHref, variant, bgUrl, claimedCount, discordRole }) {

  return (
    <Section className="cs-cta cs-style1 cs-accent_bg text-center">
      <Icon icon="game-icons:glass-celebration" style={{ fontSize: '100px' }} />
      <Section tag='h2' className="cs-cta_title cs-white_color cs-font_64 cs-font_36_sm cs-m0"><p>Claimed : 1</p>
        <p>Discord Role Acquired : Not claimed</p>
      </Section>
      <Section className="cs-height_30 cs-height_lg_30" />
      <Section className="cs-cta_btns cs-center">
        <Button
          btnLink='https://etherscan.io/'
          btnText='View On Etherscan'
          variant='cs-btn_filed cs-white_btn_2'
        >
          <Icon icon="simple-icons:ethereum" />
        </Button>

        <Button
          btnLink='https://twitter.com/'
          btnText='Share On Twitter'
          variant='cs-btn_filed cs-white_btn'
        >
          <Icon icon="skill-icons:twitter" />
        </Button>
      </Section>
    </Section>
  );
}