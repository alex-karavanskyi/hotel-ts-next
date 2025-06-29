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
  const [$isSubmenuVisible, set$isSubmenuVisible] = useState(false)

  const dispatch = useAppDispatch()

  const toggleSubmenu = (isVisible: boolean) => set$isSubmenuVisible(isVisible)

  return (
    <Container>
      <ul className={parentClass}>
        <li onClick={() => dispatch(closeModal())}>
          <Link href='/contact'>contact</Link>
        </li>
        <li onClick={() => dispatch(closeModal())}>
          <Link href='/favorites'>favorites</Link>
        </li>
        {/* <DropdownItem
          onMouseEnter={() => toggleSubmenu(true)}
          onMouseLeave={() => toggleSubmenu(false)}
          onClick={() => dispatch(closeModal())}
        >
          <Link href='/ecommerce'>e-commerce</Link>
          <Triangle
            $isSubmenuVisible={$isSubmenuVisible}
            color={isNavbarFixed ? 'black' : 'white'}
          />
          <Submenu $isSubmenuVisible={$isSubmenuVisible}>
            <li onClick={() => dispatch(closeModal())}>
              <Link href='/favorites'>favorites</Link>
            </li>
          </Submenu>
        </DropdownItem> */}
      </ul>
    </Container>
  )
}

const Container = styled.nav`
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

const Submenu = styled.ul<{ $isSubmenuVisible: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  max-height: ${({ $isSubmenuVisible }) => ($isSubmenuVisible ? '200px' : '0')};
  opacity: ${({ $isSubmenuVisible }) => ($isSubmenuVisible ? 1 : 0)};
  transform: ${({ $isSubmenuVisible }) =>
    $isSubmenuVisible ? 'translateY(0)' : 'translateY(-10px)'};
  transition: max-height 0.2s ease, opacity 0.2s ease, transform 0.2s ease;

  li {
    padding-top: 7px;
  }
`

const Triangle = styled.div<{ $isSubmenuVisible: boolean; color: string }>`
  width: 0;
  height: 0;
  margin-left: 0.5rem;
  border-left: 0.3rem solid transparent;
  border-right: 0.3rem solid transparent;
  border-top: 0.3rem solid ${({ color }) => color};
  transform: ${({ $isSubmenuVisible }) =>
    $isSubmenuVisible ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease, border-top-color 0.2s ease;
`

export default NavbarLinks
