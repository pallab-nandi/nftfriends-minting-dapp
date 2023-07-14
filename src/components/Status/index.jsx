import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Section from '../Section'
import './index.scss'

export default function Status({ src, name, designation, facebookHref, linkedinHref, whatsappHref, variant, bgUrl }) {
  return (
    <Section className={`cs-team cs-style1 ${variant ? variant : ''} text-center cs-light_bg`}>

    </Section>
  )
}
