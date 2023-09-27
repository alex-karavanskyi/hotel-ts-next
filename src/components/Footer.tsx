import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { SocialLink } from '../utils'
import { handleButtonClick } from '../helpers'
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
      <div className='grid'>
        <div className='col-md-6'>
          <nav className='footer__menu'>
            <div className='grid' onClick={handleButtonClick}>
              <div className='size'>
                <ul className='group'>
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
                <ul className='group'>
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
                <ul className='group'>
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
                <ul className='group'>
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
                <ul className='group'>
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
                <ul className='group'>
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
                <ul className='group'>
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
      </div>
      <div className='container__logo'>
        <div className='grid__social'>
          <SocialLink />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  padding: 50px 350px;
  background: #151720;
  .container__logo {
    padding-top: 80px;
  }
  .col__social {
    text-align: right;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 200px);
  }
  .grid__social {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .footer__menu {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
  }
  .footer__menu ul {
    padding: 0;
    margin-bottom: 15px;
  }
  .size {
    padding: 20px;
  }
  .footer__menu h3 {
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 15px;
  }
  .footer__menu a {
    color: rgba(255, 255, 255, 0.35);
    text-decoration: none;
  }
  .footer__menu a:hover {
    color: var(--clr-primary-5);
  }
  @media screen and (max-width: 1330px) {
    padding: 0;
    .container__logo {
      padding-top: 10px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 130px);
    }
    .grid__social {
      margin-bottom: 50px;
    }
  }
`

export default Footer
