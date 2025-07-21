'use client'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { closeModal } from '@/redux/features/modalSlice'
import { NavbarLinks, SocialLinks } from '@/shared/ui'
import { useLayoutEffect } from 'react'

const Sidebar = () => {
  const { isOpen } = useAppSelector((store) => store.modal)
  const dispatch = useAppDispatch()

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
          <button
            className='sidebar__close-btn'
            onClick={() => dispatch(closeModal())}
          >
            <i className='fas fa-times'></i>
          </button>
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
  button {
    font-size: 2rem;
    transition: var(--transition);
    color: var(--clr-grey-5);
    letter-spacing: var(--spacing);
    display: inline-block;
    text-decoration: none;
    margin-bottom: 1.5rem;
  }
  .sidebar__links button {
    background: transparent;
    cursor: pointer;
    text-transform: capitalize;
    border: none;
    outline: none;
  }
  .sidebar__links a:hover {
    color: var(--clr-primary-5);
  }
  .sidebar__links button:hover {
    color: var(--clr-primary-5);
  }
  .sidebar__close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 3rem;
    background: transparent;
    border: transparent;
    transition: var(--transition);
    color: #bb2525;
    cursor: pointer;
    z-index: 4;
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
  .sidebar--show .sidebar__close-btn {
    opacity: 1;
    transform: scale(1);
  }
  .sidebar__close-btn:hover {
    color: #e66b6b;
  }

  @media (min-width: 768px) {
    .sidebar__close-btn {
      right: 2rem;
    }
  }
`

export default Sidebar
