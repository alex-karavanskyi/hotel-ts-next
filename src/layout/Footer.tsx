'use client'
import styled from 'styled-components'
import Link from 'next/link'
import SocialLinks from '@/shared/ui/SocialLinks'
import { device } from '@/shared/constants/device'
import { containerStyles } from '@/shared/ui/styles/containerStyles'
import {
  react,
  redux,
  html,
  css,
  javascript,
  typescript,
  cities,
} from '../shared/constants/footerData'

const Footer = () => {
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
      <div className='footer__container'>
        <nav className='footer__grid'>
          {sections.map((section) => (
            <div className='footer__column' key={section.key}>
              <h3 className='footer__title'>{section.title}</h3>
              <ul className='footer__list'>
                {section.items.map((item) => (
                  <li key={item.id}>
                    <Link href='/' className='footer__link'>
                      {(item as Record<string, string | number>)[section.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
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
  }
  .footer__column {
    font-size: 0.95rem;
  }
  .footer__title {
    color: rgba(255, 255, 255, 0.6);
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
    color: rgba(255, 255, 255, 0.35);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  .footer__link:hover {
    color: var(--clr-primary-5);
  }

  @media ${device.mobile} {
    padding-left: 1rem;
    .footer__grid {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
  }

  @media ${device.desktop} {
    padding-left: 0;
    .footer__grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`

export default Footer
