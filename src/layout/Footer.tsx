'use client'
import styled from 'styled-components'
import Link from 'next/link'
import SocialLinks from '@/shared/ui/SocialLinks'
import {
  react,
  redux,
  html,
  css,
  javascript,
  typescript,
  cities,
} from '../shared/utils/footer'

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
    <Wrapper>
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

        <div className='footer__bottom'>
          <div className='footer__social'>
            <SocialLinks />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  background: var(--gradient-navbar-footer-bg);
  padding: 2rem 1rem 1rem;
  .footer__container {
    max-width: 1200px;
    margin: 0 auto;
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
    margin-bottom: 1rem;
    font-weight: 600;
    font-size: 1rem;
    text-transform: capitalize;
  }
  .footer__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .footer__link {
    color: rgba(255, 255, 255, 0.35);
    text-decoration: none;
    display: block;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
  }
  .footer__link:hover {
    color: var(--clr-primary-5);
  }
  .footer__bottom {
    margin-top: 3rem;
  }
  .footer__social {
    display: flex;
    justify-content: center;
    padding-bottom: 1.25rem;
  }

  @media (min-width: 640px) {
    .footer__grid {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
  }

  @media (min-width: 1200px) {
    .footer__grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`

export default Footer
