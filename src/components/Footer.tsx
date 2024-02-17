'use client'
import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { SocialLink } from '../utils'
import {
  musicItem,
  discoverItem,
  accountItem,
  academyItem,
  soundsItem,
  aboutItem,
  citiesItem,
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
                    <h3>music</h3>
                    <ul>
                      {musicItem.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/rooms'>{item.music}</Link>
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
                    <h3>discover</h3>
                    <ul>
                      {discoverItem.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/rooms'>{item.discover}</Link>
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
                    <h3>account</h3>
                    <ul>
                      {accountItem.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/rooms'>{item.account}</Link>
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
                      {citiesItem.map((item) => {
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
                    <h3>sounds</h3>
                    <ul>
                      {soundsItem.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/rooms'>{item.sounds}</Link>
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
                    <h3>about</h3>
                    <ul>
                      {aboutItem.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/rooms'>{item.about}</Link>
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
                    <h3>academy</h3>
                    <ul>
                      {academyItem.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href='/rooms'>{item.academy}</Link>
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
            <SocialLink />
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
  @media (max-width: 430px) {
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 110px);
    }
  }
`

export default Footer
