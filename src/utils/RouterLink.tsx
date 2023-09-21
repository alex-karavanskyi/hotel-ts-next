'use client'
import React from 'react'
import Link from 'next/link'
import { handleButtonClick } from '../helpers'
import styled from 'styled-components'
import { closeModal } from '../app/redux/features/modalSlice'
import { useAppDispatch } from '../app/redux/hooks'
import { useRouter } from 'next/router'

const RouterLink: React.FC<{ parentClass?: string }> = ({ parentClass }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleClick = (target: string) => {
    router.push(`/#${target}`, undefined, {
      scrollOptions: { behavior: 'smooth', block: 'start' },
    })
  }

  return (
    <Wrapper>
      <ul className={parentClass} onClick={handleButtonClick}>
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
          <button onClick={() => handleClick('about')}>about</button>
          {/* <Link href='/#about'>about</Link> */}
        </li>
        <li onClick={() => dispatch(closeModal())}>
          <button onClick={() => handleClick('contact')}>contact</button>
          {/* <Link href='/#contact'>contact</Link> */}
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
