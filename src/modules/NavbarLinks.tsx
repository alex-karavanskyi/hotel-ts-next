'use client'
import Link from 'next/link'
import styled from 'styled-components'
import { closeModal } from '@/redux/features/modalSlice'
import { useAppDispatch } from '@/redux/hooks'
import { useState } from 'react'

const NavbarLinks: React.FC<{
  parentClass?: string
  isNavbarFixed?: boolean
}> = ({ parentClass, isNavbarFixed }) => {
  const dispatch = useAppDispatch()
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false)

  const handleMouseEnter = () => {
    setIsSubmenuVisible(true)
  }

  const handleMouseLeave = () => {
    setIsSubmenuVisible(false)
  }

  return (
    <Wrapper>
      <ul className={parentClass}>
        <li onClick={() => dispatch(closeModal())}>
          <Link href='/'>home</Link>
        </li>
        <li onClick={() => dispatch(closeModal())}>
          <Link href='/#about'>about</Link>
        </li>
        <li onClick={() => dispatch(closeModal())}>
          <Link href='/#contact'>contact</Link>
        </li>
        <DropdownItem
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => dispatch(closeModal())}
        >
          <Link href='/rooms'>e-commerce</Link>
          <Triangle
            isSubmenuVisible={isSubmenuVisible}
            isNavbarFixed={isNavbarFixed}
          />
          <Submenu isSubmenuVisible={isSubmenuVisible}>
            <li onClick={() => dispatch(closeModal())}>
              <Link href='/favorites'>favorites</Link>
            </li>
          </Submenu>
        </DropdownItem>
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    position: relative;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
`

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;
`

const Submenu = styled.ul<{ isSubmenuVisible: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  max-height: ${({ isSubmenuVisible }) => (isSubmenuVisible ? '200px' : '0')};
  opacity: ${({ isSubmenuVisible }) => (isSubmenuVisible ? 1 : 0)};
  transform: ${({ isSubmenuVisible }) =>
    isSubmenuVisible ? 'translateY(0)' : 'translateY(-10px)'};
  transition: max-height 0.2s ease, opacity 0.2s ease, transform 0.2s ease;

  li {
    padding-top: 7px;
  }
`

const Triangle = styled.div<{
  isSubmenuVisible: boolean
  isNavbarFixed?: boolean
}>`
  width: 0;
  height: 0;
  margin-left: 8px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid
    ${({ isNavbarFixed }) => (isNavbarFixed ? 'black' : 'white')};
  transform: ${({ isSubmenuVisible }) =>
    isSubmenuVisible ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease, border-top-color 0.2s ease;
`

export default NavbarLinks
