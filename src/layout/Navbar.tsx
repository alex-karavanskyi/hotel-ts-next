'use client'
import styled from 'styled-components'
import pngwing_grey from '@/images/pngwing_grey.png'
import pngwing_red from '@/images/pngwing_red.png'
import Link from 'next/link'
import Image from 'next/image'
import NavbarLinks from '@/shared/ui/NavbarLinks'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
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
              height={60}
              priority
              src={navbar ? pngwing_red : pngwing_grey}
            />
          </Link>
          <button
            className='navbar__btn'
            onClick={() => dispatch(openModal())}
            aria-label='Open menu'
          >
            <HamburgerIcon />
          </button>
          <NavbarLinks
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

const HamburgerIcon = () => (
  <svg
    width='28'
    height='28'
    viewBox='0 0 28 28'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='hamburger-icon'
  >
    <path d='M4 8H24' className='line line-1' />
    <path d='M4 14H24' className='line line-2' />
    <path d='M4 20H24' className='line line-3' />
  </svg>
)

const Container = styled.nav`
  --transition: all 0.3s ease;
  .navbar {
    position: relative;
    height: 5rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--gradient-navbar-footer-bg);
    transition: var(--transition);
    z-index: 10;
  }
  .navbar--fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--clr-white);
    box-shadow: var(--light-shadow);
    transition: all 0.3s ease;
    z-index: 10;
  }
  .navbar__btn {
    position: absolute;
    right: 1rem;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 11;
    color: var(--clr-primary-5);
    transition: color 0.3s ease;
  }
  .navbar__btn:hover {
    color: var(--clr-primary-5);
  }
  .hamburger-icon {
    width: 28px;
    height: 28px;
  }
  .line {
    stroke: currentColor;
    stroke-width: 3;
    stroke-linecap: round;
    transform-origin: center;
    transition: all 0.3s ease;
  }
  .navbar__btn:hover .line-1 {
    stroke-width: 4;
    transform: translateY(-2px) scaleX(1.1);
  }
  .navbar__btn:hover .line-2 {
    stroke-width: 4;
    transform: scaleX(1.2);
  }
  .navbar__btn:hover .line-3 {
    stroke-width: 4;
    transform: translateY(2px) scaleX(1.1);
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
    .navbar__links button {
      color: rgba(255, 255, 255, 0.5);
      font-weight: bold;
      letter-spacing: var(--spacing);
      transition: var(--transition);
    }
    .navbar__links--color a,
    .navbar__links--color button {
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
