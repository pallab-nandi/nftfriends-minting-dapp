import React from 'react'
import Section from '../Section'

export default function SectionHeading({ title, subtitle }) {
  return (
    <Section className="cs-seciton_heading cs-style1">
      {/* <Section tag='h3' className="cs-section_title cs-font_16 cs-font_14_sm cs-gradient_color text-uppercase">{subtitle}</Section> */}
      <Section tag='h2' style={{ color: '#00d4ff' }} className="cs-section_subtitle cs-m0 cs-font_30 cs-font_14_sm">{title}</Section>
    </Section>
  )
}
