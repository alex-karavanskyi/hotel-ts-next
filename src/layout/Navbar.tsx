'use client'
import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import styled from 'styled-components'

import pngwing_grey from '@/images/pngwing_grey.png'
import pngwing_red from '@/images/pngwing_red.png'
import { closeModal, toggleModal } from '@/redux/features/modalSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { device } from '@/shared/constants/device'
import NavbarLinks from '@/shared/ui/NavbarLinks'

const Navbar = () => {
  const [navbar, setNavbar] = useState(false)
  const dispatch = useAppDispatch()

  const isModalOpen = useAppSelector(state => state.modal.isOpen)

  useEffect(() => {
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

  const navClassName = navbar ? 'navbar navbar--scrolled' : 'navbar'
  const linksClassName = navbar
    ? 'navbar__links navbar__links--color'
    : 'navbar__links'

  return (
    <>
      <Container>
        <div className={navClassName}>
          <Link href="/">
            <Image
              alt="Logo"
              width={60}
              height={60}
              priority
              src={navbar ? pngwing_red : pngwing_grey}
            />
          </Link>
          <button
            className="navbar__btn"
            onClick={() => dispatch(toggleModal())}
            aria-label={isModalOpen ? 'Close menu' : 'Open menu'}
          >
            <HamburgerIcon />
          </button>
          <NavbarLinks parentClass={linksClassName} />
        </div>
      </Container>
      {navbar && <div style={{ height: '5rem' }} />}
    </>
  )
}

const HamburgerIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 8H24" className="line line-1" />
    <path d="M4 14H24" className="line line-2" />
    <path d="M4 20H24" className="line line-3" />
  </svg>
)

const Container = styled.nav`
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--navbar-height);
    z-index: 3000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--gradient-navbar-footer-bg);
    padding: 0 1rem;
    transition:
      background 0.3s ease,
      box-shadow 0.3s ease;
  }

  .navbar--scrolled {
    background: var(--clr-white);
    box-shadow: var(--light-shadow);
  }

  .navbar__btn {
    position: absolute;
    right: 1rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #84436c;
  }

  .navbar__btn:hover .line {
    stroke-width: 4;
  }

  .navbar__btn:hover .line-1 {
    transform: translateY(-2px) scaleX(1.1);
  }

  .navbar__btn:hover .line-2 {
    transform: scaleX(1.2);
  }

  .navbar__btn:hover .line-3 {
    transform: translateY(2px) scaleX(1.1);
  }

  .navbar__links {
    display: none;
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

  .line {
    stroke: currentColor;
    stroke-width: 3;
    stroke-linecap: round;
    transform-origin: center;
    transition:
      opacity 0.3s ease,
      stroke-width 0.3s ease,
      transform 0.3s ease;
  }

  @media ${device.mobile} {
    .navbar__btn {
      display: none;
    }

    .navbar__links {
      display: flex;
      justify-content: end;
      gap: 2rem;
    }
  }
`

export default Navbar
