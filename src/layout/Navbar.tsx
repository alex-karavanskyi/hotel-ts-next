'use client'
import styled from 'styled-components'
import pngwing_grey from '@/images/pngwing_grey.png'
import pngwing_red from '@/images/pngwing_red.png'
import Link from 'next/link'
import Image from 'next/image'
import { NavbarLinks } from './index'
import { useAppDispatch } from '@/redux/hooks'
import { useState, useLayoutEffect } from 'react'
import { openModal } from '@/redux/features/modalSlice'

const Navbar = () => {
  const [navbar, setNavbar] = useState(false)

  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    const handleScroll = () => setNavbar(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Container>
        <div className={navbar ? 'navbar navbar--fixed' : 'navbar'}>
          <Link href={`/`}>
            <Image
              alt='Logo'
              width={60}
              priority
              src={navbar ? pngwing_red : pngwing_grey}
            />
          </Link>
          <button className='navbar__btn' onClick={() => dispatch(openModal())}>
            <i className='fas fa-bars'></i>
          </button>
          <NavbarLinks
            isNavbarFixed={navbar}
            parentClass={
              navbar ? 'navbar__links navbar__links--color' : 'navbar__links'
            }
          />
        </div>
      </Container>
      {navbar && <div style={{ height: '5rem' }} />}
    </>
  )
}

const Container = styled.nav`
  .navbar {
    position: relative;
    height: 5rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--transition);
  }
  .navbar__btn {
    position: absolute;
    right: 1rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    font-size: 2rem;
    cursor: pointer;
  }
  .navbar--fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--clr-white);
    box-shadow: var(--light-shadow);
    transition: all 1s linear;
    z-index: 2;
  }
  .navbar__links {
    display: none;
  }

  @media (min-width: 768px) {
    .navbar__btn {
      display: none;
    }
    .navbar__links {
      display: flex;
      justify-content: end;
      gap: 2rem;
    }
    .navbar__links button {
      background: transparent;
      cursor: pointer;
      text-transform: capitalize;
      border: none;
      outline: none;
    }
    .navbar__links a,
    button {
      color: rgba(255, 255, 255, 0.6);
      font-weight: bold;
      letter-spacing: var(--spacing);
      transition: var(--transition);
    }
    .navbar__links--color a,
    button {
      color: black;
    }
    .navbar__links a:hover,
    .navbar__links button:hover {
      color: var(--clr-primary-5);
      text-decoration: none;
    }
  }
`

export default Navbar
