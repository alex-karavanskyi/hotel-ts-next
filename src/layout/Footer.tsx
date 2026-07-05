'use client'
import { useRef } from 'react'

import Link from 'next/link'

import { motion, useInView } from 'framer-motion'
import styled from 'styled-components'

import SocialLinks from '@/shared/ui/SocialLinks'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

import {
  cities,
  css,
  html,
  javascript,
  react,
  redux,
  typescript,
} from '../shared/constants/footerData'

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const sections = [
    { title: 'react', items: react, key: 'react' },
    { title: 'redux', items: redux, key: 'redux' },
    { title: 'html', items: html, key: 'html' },
    { title: 'cities', items: cities, key: 'cities' },
    { title: 'javascript', items: javascript, key: 'javascript' },
    { title: 'typescript', items: typescript, key: 'typescript' },
    { title: 'css', items: css, key: 'css' },
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
          {sections.map((section, sectionIndex) => (
            <motion.div
              className="footer__column"
              key={section.key}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, delay: sectionIndex * 0.05 }}
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
                  delay: 0.12 + sectionIndex * 0.04,
                }}
              >
                {section.title}
              </motion.h3>
              <ul className="footer__list">
                {section.items.map((item, itemIndex) => (
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
                      delay: 0.16 + itemIndex * 0.03,
                    }}
                  >
                    <Link href="/" className="footer__link">
                      {(item as Record<string, string | number>)[section.key]}
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
    grid-template-columns: repeat(auto-fit, minmax(120px, 2fr));
  }

  .footer__column {
    font-size: 0.95rem;
  }

  .footer__title {
    color: rgb(255, 255, 255, 0.6);
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
    color: rgb(255, 255, 255, 0.35);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer__link:hover {
    color: var(--clr-primary-5);
  }
`

export default Footer
