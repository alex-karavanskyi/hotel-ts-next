'use client'
import Link from 'next/link'
import styled from 'styled-components'
import { closeModal } from '@/redux/features/modalSlice'
import { useAppDispatch } from '@/redux/hooks'

const NavbarLinks: React.FC<{ parentClass?: string }> = ({ parentClass }) => {
  const dispatch = useAppDispatch()

  return (
    <Wrapper>
      <ul className={parentClass}>
        <li onClick={() => dispatch(closeModal())}>
          <Link href='/'>home</Link>
        </li>
        <li onClick={() => dispatch(closeModal())}>
          <Link href='/rooms'>rooms</Link>
        </li>
        <li onClick={() => dispatch(closeModal())}>
          <Link href='/favorite'>favorite</Link>
        </li>
        <li onClick={() => dispatch(closeModal())}>
          <Link href='/#about'>about</Link>
        </li>
        <li onClick={() => dispatch(closeModal())}>
          <Link href='/#contact'>contact</Link>
        </li>
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ul {
    margin: 0px;
  }
`

export default NavbarLinks
