import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
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
      <div className='container'>
        <div className='grid'>
          <div className='col-md-6'>
            <nav className='footer__menu'>
              <div className='grid' onClick={handleButtonClick}>
                <div className='col-sm-4'>
                  <ul className='group'>
                    <li>
                      <h3>music</h3>
                      <ul>
                        {musicItem.map((item) => {
                          return (
                            <li key={item.id}>
                              <Link to='/rooms'>{item.music}</Link>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className='col-sm-4'>
                  <ul className='group'>
                    <li>
                      <h3>discover</h3>
                      <ul>
                        {discoverItem.map((item) => {
                          return (
                            <li key={item.id}>
                              <Link to='/rooms'>{item.discover}</Link>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className='col-sm-4'>
                  <ul className='group'>
                    <li>
                      <h3>account</h3>
                      <ul>
                        {accountItem.map((item) => {
                          return (
                            <li key={item.id}>
                              <Link to='/rooms'>{item.account}</Link>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className='col-sm-4'>
                  <ul className='group'>
                    <li>
                      <h3>academy</h3>
                      <ul>
                        {academyItem.map((item) => {
                          return (
                            <li key={item.id}>
                              <Link to='/rooms'>{item.sounds}</Link>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className='col-sm-4'>
                  <ul className='group'>
                    <li>
                      <h3>sounds</h3>
                      <ul>
                        {soundsItem.map((item) => {
                          return (
                            <li key={item.id}>
                              <Link to='/rooms'>{item.sounds}</Link>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className='col-sm-4'>
                  <ul className='group'>
                    <li>
                      <h3>about</h3>
                      <ul>
                        {aboutItem.map((item) => {
                          return (
                            <li key={item.id}>
                              <Link to='/rooms'>{item.about}</Link>
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
          <div className='col-md-6' onClick={handleButtonClick}>
            <nav className='footer__menu'>
              <div className='grid'>
                <div className='col-sm-4'>
                  <ul className='group'>
                    <li>
                      <h3>cities</h3>
                      <ul>
                        {citiesItem.map((item) => {
                          return (
                            <li key={item.id}>
                              <Link to='/rooms'>{item.cities}</Link>
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
      </div>
      <div className='container container__logo'>
        <div className='grid__social'>
          <SocialLink />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  padding: 50px 0;
  background: #151720;
  .container {
    padding: 0;
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
  }
  .container__logo {
    padding-top: 80px;
  }
  .col__social {
    text-align: right;
  }
  .grid {
    display: flex;
    margin: -20px;
    flex-wrap: wrap;
    align-items: stretch;
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
  .col-sm-4 {
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
    .container {
      padding-left: 20px;
    }
  }
`

export default Footer
