'use client'
import styled from 'styled-components'
import pngwing_grey from '@/images/pngwing_grey.png'
import pngwing_red from '@/images/pngwing_red.png'
import Link from 'next/link'
import Image from 'next/image'
import NavbarLinks from '@/shared/ui/NavbarLinks'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useState, useLayoutEffect, useEffect } from 'react'
import { closeModal, toggleModal } from '@/redux/features/modalSlice'

const Navbar = () => {
  const [navbar, setNavbar] = useState(false)
  const dispatch = useAppDispatch()

  const isModalOpen = useAppSelector((state) => state.modal.isOpen)

  useLayoutEffect(() => {
    const handleScroll = () => setNavbar(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        dispatch(closeModal())
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [dispatch])

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
            onClick={() => dispatch(toggleModal())}
            aria-label={isModalOpen ? 'Close menu' : 'Open menu'}
          >
            <HamburgerIcon isOpen={isModalOpen} />
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

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width='28'
    height='28'
    viewBox='0 0 28 28'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='hamburger-icon'
  >
    <path
      d='M4 8H24'
      className='line line-1'
      stroke='currentColor'
      strokeWidth='3'
      strokeLinecap='round'
    />
    <path
      d='M4 14H24'
      className='line line-2'
      stroke='currentColor'
      strokeWidth='3'
      strokeLinecap='round'
    />
    <path
      d='M4 20H24'
      className='line line-3'
      stroke='currentColor'
      strokeWidth='3'
      strokeLinecap='round'
    />
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
    z-index: 3000;
  }
  .navbar--fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--clr-white);
    box-shadow: var(--light-shadow);
    transition: all 0.3s ease;
    z-index: 3000;
  }
  .navbar__btn {
    position: absolute;
    right: 1rem;
    background: transparent;
    border: none;
    cursor: pointer;
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
  .hamburger-icon {
    width: 28px;
    height: 28px;
    color: var(--clr-primary-5);
  }
  .line {
    transition: all 0.3s ease;
    transform-origin: center;
  }
  .navbar__btn[aria-label='Close menu'] .line-1 {
    transform: translateY(6px) rotate(45deg);
  }
  .navbar__btn[aria-label='Close menu'] .line-2 {
    opacity: 0;
    transform: scaleX(0);
  }
  .navbar__btn[aria-label='Close menu'] .line-3 {
    transform: translateY(-6px) rotate(-45deg);
  }
  .navbar__btn[aria-label='Open menu']:hover .line-1 {
    stroke-width: 4;
    transform: translateY(-2px) scaleX(1.1);
  }
  .navbar__btn[aria-label='Open menu']:hover .line-2 {
    stroke-width: 4;
    transform: scaleX(1.2);
  }
  .navbar__btn[aria-label='Open menu']:hover .line-3 {
    stroke-width: 4;
    transform: translateY(2px) scaleX(1.1);
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
