import React from 'react'
import Section from '../Section';
import Status from './index';
import { Icon } from '@iconify/react';
import Button from '../Button';
import Spacing from '../Spacing'

export default function StatusCard({ sliderItemBg, sliderItemVariant }) {


  return (
    <Section className="cs-wallet_secton text-center">
      <Section tag='h2' className="cs-font_22 text-uppercase cs-normal cs-m0">Claimed : 1</Section>
      <Section className="cs-height_25 cs-height_lg_25" />
      <ul className="cs-list cs-style1 cs-mp0">
        <Icon icon="game-icons:glass-celebration" style={{ fontSize: '100px' }} />
      </ul>
      <Section className="cs-height_15 cs-height_lg_15" />
      <Section tag='p' className="cs-m0">Discord Role Acquired : Not claimed</Section>
      <Spacing lg='25' md='25' />
      <Button
        btnLink='https://etherscan.io/'
        btnText='View On Etherscan'
        variant='cs-btn_filed cs-white_btn_2'
      >
        <Icon icon="simple-icons:ethereum" />
      </Button>
      <Spacing lg='25' md='25' />
      <Button
        btnLink='https://twitter.com/'
        btnText='Share On Twitter'
        variant='cs-btn_filed cs-white_btn'
      >
        <Icon icon="skill-icons:twitter" />
      </Button>
    </Section>
  )
}
