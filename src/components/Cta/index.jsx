import { Icon } from '@iconify/react'
import React from 'react'
import Button from '../Button'
import Section from '../Section'
import './cta.scss'

export default function Cta() {
  return (
    <Section className="cs-cta cs-style1 cs-accent_bg text-center">
      <Section tag='h2' className="cs-cta_title cs-white_color cs-font_64 cs-font_36_sm cs-m0">Join our community for<br />First Access</Section>
      <Section className="cs-height_10 cs-height_lg_10" />
      {/* <Section className="cs-cta_subtitle cs-white_color">There are many variations of passages of Lorem Ipsum available, but the <br />majority have suffered alteration in some form.</Section> */}
      <Section className="cs-height_30 cs-height_lg_30" />
      <Section className="cs-cta_btns cs-center">
        <Button
          btnLink='/'
          btnText='Join Our Discord'
          variant='cs-btn_filed cs-white_btn_2'
        >
          <Icon icon="la:discord" />

        </Button>
        <Button
          btnLink='/'
          btnText='Follow Us On Twitter'
          variant='cs-btn_filed cs-white_btn'
        >
          <Icon icon="skill-icons:twitter" />
        </Button>
      </Section>
    </Section>
  )
}
