'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { closeModal } from '../app/redux/features/modalSlice'
import { useAppDispatch } from '../app/redux/hooks'

const RouterLink: React.FC<{ parentClass?: string }> = ({ parentClass }) => {
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

export default RouterLink
