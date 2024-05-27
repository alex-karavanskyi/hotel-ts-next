'use client'
import styled from 'styled-components'
import Link from 'next/link'
import { SocialLinks } from '@/modules'
import {
  react,
  redux,
  html,
  css,
  javascript,
  typescript,
  cities,
} from '../constants/footerItems'

const Footer = () => {
  return (
    <Wrapper>
      <div className='container'>
        <div className='grid'>
          <nav className='footer-menu'>
            <div className='grid'>
              <div className='size'>
                <ul>
                  <li>
                    <h3>react</h3>
                    <ul>
                      {react.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/rooms'>{item.react}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              <div className='size'>
                <ul>
                  <li>
                    <h3>redux</h3>
                    <ul>
                      {redux.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/rooms'>{item.redux}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              <div className='size'>
                <ul>
                  <li>
                    <h3>html</h3>
                    <ul>
                      {html.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/rooms'>{item.html}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              <div className='size'>
                <ul>
                  <li>
                    <h3>cities</h3>
                    <ul>
                      {cities.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/rooms'>{item.cities}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              <div className='size'>
                <ul>
                  <li>
                    <h3>javascript</h3>
                    <ul>
                      {javascript.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/rooms'>{item.javascript}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              <div className='size'>
                <ul>
                  <li>
                    <h3>typescript</h3>
                    <ul>
                      {typescript.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/rooms'>{item.typescript}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
              <div className='size'>
                <ul>
                  <li>
                    <h3>css</h3>
                    <ul>
                      {css.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/rooms'>{item.css}</Link>
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
        <div className='container-logo'>
          <div className='grid-social'>
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
  .container {
    margin: 0 auto;
    max-width: 1200px;
  }

  .container-logo {
    padding-top: 143px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 200px);
  }
  .grid-social {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
  .footer-menu {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
  }
  .footer-menu ul {
    padding: 0;
    margin-bottom: 15px;
  }
  .size {
    padding: 20px;
  }
  .footer-menu h3 {
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 15px;
  }
  .footer-menu a {
    color: rgba(255, 255, 255, 0.35);
    text-decoration: none;
  }
  .footer-menu a:hover {
    color: var(--clr-primary-5);
  }

  @media (max-width: 800px) {
    .grid {
      display: grid;
      grid-template-columns: repeat(6, 110px);
    }
  }
  @media (max-width: 660px) {
    .grid {
      display: grid;
      grid-template-columns: repeat(5, 110px);
    }
  }
  @media (max-width: 550px) {
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 110px);
    }
  }
  @media (max-width: 440px) {
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 110px);
    }
  }
`

export default Footer
