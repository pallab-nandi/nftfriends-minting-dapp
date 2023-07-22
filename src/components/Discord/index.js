import React from "react";
import { Icon } from '@iconify/react';
import Section from '../Section';


export const Discord = () => {
  return (
    <>
      <span>
        <Section tag='span' className="cs-btn cs-btn_filed cs-accent_btn">
          <Icon icon="iconoir:discord" />
          <Section tag='span'>Login</Section>
        </Section>
      </span>
    </>
  )
}