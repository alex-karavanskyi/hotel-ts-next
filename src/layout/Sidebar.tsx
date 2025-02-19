'use client'
import styled from 'styled-components'
import city from '@/images/city_coast_skyscrapers_866257_1920x1200.jpg'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { closeModal } from '@/redux/features/modalSlice'
import { NavbarLinks, SocialLinks } from '@/layout'
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
    <Wrapper>
      <aside className={isOpen ? 'sidebar sidebar--show' : 'sidebar'}>
        <Image
          alt='city'
          src={city}
          fill
          className='img'
          priority
          placeholder='blur'
        />
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
      </aside>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .sidebar {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    transition: var(--transition);
    transform: translateX(-100%);
  }
  .sidebar--show {
    transform: translateX(0);
  }
  .sidebar img {
    max-height: 100vh;
    position: relative;
    z-index: 1;
  }
  .sidebar__dark-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    pointer-events: none;
    z-index: 1;
  }
  .sidebar__content {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .sidebar__links {
    text-align: center;
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
  }
  .sidebar__close-btn:hover {
    color: #e66b6b;
  }
  @media screen and (max-width: 768px) {
    .sidebar__close-btn {
      right: 2rem;
    }
  }
`

export default Sidebar
