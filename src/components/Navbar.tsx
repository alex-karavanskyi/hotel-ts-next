'use client'
import styled from 'styled-components'
import logo from '@/images/stone-high-resolution-logo-black-transparent.png'
import logoInverted from '@/images/stone-high-resolution-logo-white-transparent.png'
import Link from 'next/link'
import Image from 'next/image'
import { NavbarLinks } from '@/modules'
import { useAppDispatch } from '@/redux/hooks'
import { useState, useEffect } from 'react'
import { openModal } from '@/redux/features/modalSlice'

const Navbar = () => {
  const [navbar, setNavbar] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setNavbar(true)
      } else {
        setNavbar(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Wrapper>
      <nav className={navbar ? 'nav navbar-fixed' : 'nav'}>
        <Link href={`/`} className='link'>
          <Image src={navbar ? logo : logoInverted} width={100} alt='Logo' />
        </Link>
        <button className='nav-btn' onClick={() => dispatch(openModal())}>
          <i className='fas fa-bars'></i>
        </button>
        <NavbarLinks
          parentClass={navbar ? 'nav-links nav-links-color' : 'nav-links'}
        />
      </nav>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .nav-links {
    display: none;
  }
  .nav {
    position: relative;
    height: 5rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--transition);
  }
  .nav-btn {
    position: absolute;
    right: 14px;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    font-size: 2rem;
    cursor: pointer;
  }

  @media screen and (min-width: 768px) {
    .nav-btn {
      display: none;
    }
    .nav {
      height: 5rem;
      padding: 1rem;
      display: flex;
      box-align: center;
      justify-content: space-between;
      align-items: center;
      transition: var(--transition);
    }
    .navbar-fixed {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: var(--clr-white);
      box-shadow: var(--light-shadow);
      transition: all 1s linear;
      z-index: 2;
    }
    .nav-links {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      justify-items: center;
      column-gap: 2rem;
    }
    .nav-links a,
    button {
      color: rgba(255, 255, 255, 0.6);
      font-weight: bold;
      letter-spacing: var(--spacing);
      transition: var(--transition);
    }
    .nav-links button {
      background: transparent;
      cursor: pointer;
      text-transform: capitalize;
      border: none;
      outline: none;
    }
    .nav-links-color a {
      color: black;
    }
    .nav-links-color button {
      color: black;
    }
    .nav-links a:hover {
      color: var(--clr-primary-5);
      text-decoration: none;
    }
    .nav-links button:hover {
      color: var(--clr-primary-5);
      text-decoration: none;
    }
  }
`

export default Navbar
