'use client'
import styled from 'styled-components'

import { useAppSelector } from '@/redux/hooks'
import { device } from '@/shared/constants/device'
import { NavbarLinks, SocialLinks } from '@/shared/ui'

const Sidebar = () => {
  const { isOpen } = useAppSelector(store => store.modal)

  return (
    <Container>
      <aside className={`sidebar ${isOpen ? 'sidebar--show' : ''}`}>
        <div className="sidebar__dark-overlay" />
        <div className="sidebar__content">
          <NavbarLinks parentClass="sidebar__links" />
          <SocialLinks />
        </div>
      </aside>
    </Container>
  )
}

const Container = styled.div`
  --transition: all 0.3s ease-in-out;

  .sidebar {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;

    display: flex;
    justify-content: center;
    align-items: center;

    transform: translateX(-100%);
    opacity: 0;

    background: linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #4a5568 100%);
    background-size: 200% 200%;

    transition:
      transform 0.3s ease-in-out,
      opacity 0.3s ease-in-out;
    will-change: transform, opacity;

    pointer-events: none;
  }

  .sidebar--show {
    transform: translateX(0);
    opacity: 1;
    pointer-events: auto;
    animation: gradientShift 15s ease infinite;
  }

  @keyframes gradient-shift {
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

  .sidebar__dark-overlay {
    position: absolute;
    inset: 0;
    background: rgb(0, 0, 0, 0.7);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    will-change: opacity;
  }

  .sidebar--show .sidebar__dark-overlay {
    opacity: 1;
  }

  .sidebar__content {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
  }

  .sidebar__links {
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.3s ease-in-out,
      transform 0.3s ease-in-out;
  }

  .sidebar--show .sidebar__links {
    opacity: 1;
    transform: translateY(0);
  }

  .sidebar__links a,
  .sidebar__links button {
    font-size: 2rem;
    color: var(--clr-grey-5);
    background: transparent;
    border: none;
    cursor: pointer;
    text-decoration: none;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    transition: color 0.3s ease;
  }

  .sidebar__links a:hover,
  .sidebar__links button:hover {
    color: var(--clr-primary-5);
  }

  @media ${device.mobile} {
    .sidebar__links a,
    .sidebar__links button {
      font-size: 2.4rem;
    }
  }
`

export default Sidebar
