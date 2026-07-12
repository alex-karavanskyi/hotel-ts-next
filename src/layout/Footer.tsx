'use client'
import { useRef } from 'react'

import Link from 'next/link'

import { motion, useInView } from 'framer-motion'
import styled from 'styled-components'

import { device } from '@/shared/constants/device'
import SocialLinks from '@/shared/ui/SocialLinks'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

import {
  companyInformation,
  help,
  services,
  customerAccount,
} from '../shared/constants/footerData'

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const sections = [
    { title: 'Company Information', items: companyInformation },
    { title: 'Help', items: help },
    { title: 'Services', items: services },
    { title: 'Customer Account', items: customerAccount },
  ]

  return (
    <Container>
      <div className="footer__container" ref={ref}>
        <motion.nav
          className="footer__grid"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
        >
          {sections.map((section, index) => (
            <motion.div
              className="footer__column"
              key={section.title}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <motion.h3
                className="footer__title"
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.12 + index * 0.04,
                }}
              >
                {section.title}
              </motion.h3>
              <ul className="footer__list">
                {section.items.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{
                      duration: 0.3,
                      delay: 0.16 + index * 0.03,
                    }}
                  >
                    <Link href="/" className="footer__link">
                      {item.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.nav>
      </div>
      <SocialLinks />
    </Container>
  )
}

const Container = styled.footer`
  padding-top: 2rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  background: var(--gradient-navbar-footer-bg);

  .footer__container {
    ${containerStyles}
  }

  .footer__grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(120px, 250px));
    justify-content: start;
  }

  .footer__column {
    font-size: 0.95rem;
  }

  .footer__title {
    color: var(--clr-secondary-4);
    font-weight: 600;
    font-size: 1rem;
    text-transform: capitalize;
    margin-bottom: 1.5rem;
  }

  .footer__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer__link {
    color: var(--clr-secondary-11);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer__link:hover {
    color: var(--clr-primary-2);
  }

  @media ${device.mobile} {
    .footer__grid {
      justify-content: center;
    }
  }
`

export default Footer
