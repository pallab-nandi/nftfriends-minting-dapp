import { Icon } from '@iconify/react';
import React from 'react';
import Section from '../Section';
import Spacing from '../Spacing';

export default function ContactInfo() {
  return (
    <Section className="cs-contact_info">
      <Section tag="h2" className="cs-info_title">
        Contact Info
      </Section>
      <Spacing lg="30" md="30" />
      <Section className="cs-info_box">
        <Section className="cs-info_box_icon">
          <Icon icon="fa6-solid:phone" />
        </Section>
        <Section className="cs-info_box_right">
          <Section tag="h3">Call anytime</Section>
          <Section tag="p">
            <span className="cs-medium">Mobile:</span> +99 098 234 123
          </Section>
          <Section tag="p">
            <span className="cs-medium">Hotline:</span> 16234
          </Section>
        </Section>
      </Section>
      <Spacing lg="20" md="20" />
      <Section className="cs-info_box">
        <Section className="cs-info_box_icon">
          <Icon icon="fa-solid:envelope" />
        </Section>
        <Section className="cs-info_box_right">
          <Section tag="h3">Email us</Section>
          <Section tag="p">
            <span className="cs-medium">Support:</span> support@gmail.com
          </Section>
          <Section tag="p">
            <span className="cs-medium">Info:</span> hey@gmail.com
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
