'use client'
import styled from 'styled-components'
import Link from 'next/link'
import { SocialLinks } from './index'
import {
  react,
  redux,
  html,
  css,
  javascript,
  typescript,
  cities,
} from '../utils/footer'

const Footer = () => {
  return (
    <Wrapper>
      <div className='footer__container'>
        <div className='footer__grid'>
          <nav className='footer__menu'>
            <div className='footer__grid'>
              <div className='footer__grid-size'>
                <ul>
                  <li>
                    <h3 className='footer__menu-title'>react</h3>
                    <ul>
                      {react.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/ecommerce'>{item.react}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              <div className='footer__grid-size'>
                <ul>
                  <li>
                    <h3 className='footer__menu-title'>redux</h3>
                    <ul>
                      {redux.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/ecommerce'>{item.redux}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              <div className='footer__grid-size'>
                <ul>
                  <li>
                    <h3 className='footer__menu-title'>html</h3>
                    <ul>
                      {html.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/ecommerce'>{item.html}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              <div className='footer__grid-size'>
                <ul>
                  <li>
                    <h3 className='footer__menu-title'>cities</h3>
                    <ul>
                      {cities.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/ecommerce'>{item.cities}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              <div className='footer__grid-size'>
                <ul>
                  <li>
                    <h3 className='footer__menu-title'>javascript</h3>
                    <ul>
                      {javascript.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/ecommerce'>{item.javascript}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              <div className='footer__grid-size'>
                <ul>
                  <li>
                    <h3 className='footer__menu-title'>typescript</h3>
                    <ul>
                      {typescript.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/ecommerce'>{item.typescript}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              <div className='footer__grid-size'>
                <ul>
                  <li>
                    <h3 className='footer__menu-title'>css</h3>
                    <ul>
                      {css.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/ecommerce'>{item.css}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className='footer__logo'>
          <div className='footer__social-container'>
            <SocialLinks />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  background: #151720;
  padding-top: 30px;
  .footer__container {
    margin: 0 auto;
    max-width: 1200px;
  }
  .footer__logo {
    padding-top: 7rem;
  }
  .footer__grid {
    display: grid;
    grid-template-columns: repeat(4, 200px);
  }
  .footer__grid-size {
    padding: 1.25rem;
  }
  .footer__menu {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
  }
  .footer__menu-title {
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 1.25rem;
    font-weight: bold;
    font-size: 1rem;
  }
  .footer__menu ul {
    padding: 0;
    margin-bottom: 1rem;
  }
  .footer__menu a {
    color: rgba(255, 255, 255, 0.35);
    text-decoration: none;
  }
  .footer__menu a:hover {
    color: var(--clr-primary-5);
  }
  .footer__social {
    padding-top: 9rem;
  }
  .footer__social-container {
    display: flex;
    justify-content: center;
    padding-bottom: 1.25rem;
  }

  @media (max-width: 800px) {
    .footer__grid {
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    }
  }
`

export default Footer
