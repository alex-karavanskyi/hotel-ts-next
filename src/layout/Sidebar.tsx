'use client'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { NavbarLinks, SocialLinks } from '@/shared/ui'
import { useLayoutEffect } from 'react'

const Sidebar = () => {
  const { isOpen } = useAppSelector((store) => store.modal)

  useLayoutEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <Container>
      <div className={isOpen ? 'sidebar sidebar--show' : 'sidebar'}>
        <div className='sidebar__dark-overlay'></div>
        <div className='sidebar__content'>
          <NavbarLinks parentClass='sidebar__links' />
          <SocialLinks />
        </div>
      </div>
    </Container>
  )
}

const Container = styled.aside`
  --transition: all 0.3s ease-in-out;
  .sidebar {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    z-index: 1000;
    transform: translateX(-100%);
    opacity: 0;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    background: linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #4a5568 100%);
    background-size: 200% 200%;
    animation: gradientShift 15s ease infinite;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  .sidebar--show {
    transform: translateX(0);
    opacity: 1;
  }
  .sidebar__dark-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    pointer-events: none;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  .sidebar--show .sidebar__dark-overlay {
    opacity: 1;
  }
  .sidebar__content {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
  }
  .sidebar__links {
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
  .sidebar--show .sidebar__links {
    opacity: 1;
    transform: translateY(0);
  }
  .sidebar__links a,
  .sidebar__links button {
    font-size: 2rem;
    transition: var(--transition);
    color: var(--clr-grey-5);
    letter-spacing: var(--spacing);
    display: inline-block;
    text-decoration: none;
    margin-bottom: 1.5rem;
    background: transparent;
    cursor: pointer;
    text-transform: capitalize;
    border: none;
    outline: none;
  }
  .sidebar__links a:hover,
  .sidebar__links button:hover {
    color: var(--clr-primary-5);
  }
  .sidebar__close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 4;
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    color: #bb2525;
  }
  .sidebar--show .sidebar__close-btn {
    opacity: 1;
    transform: scale(1);
  }
  .sidebar__close-btn:hover {
    color: #e66b6b;
  }
  .sidebar__close-btn:hover .close-icon {
    transform: rotate(90deg);
  }
  .close-icon {
    width: 28px;
    height: 28px;
    color: currentColor;
    transition: transform 0.3s ease, color 0.3s ease;
  }

  @media (min-width: 768px) {
    .sidebar__close-btn {
      right: 2rem;
    }
  }
`

export default Sidebar
