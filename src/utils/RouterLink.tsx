'use client'
import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { handleButtonClick } from '../helpers'
import { useRouter } from 'next/navigation'
import { closeModal } from '@/app/redux/features/modalSlice'
import { useDispatch } from 'react-redux'
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context'

type MyNavigateOptions = NavigateOptions & {
  scrollOptions: {
    behavior: string
    block: string
  }
}

const RouterLink = ({ parentClass }: any) => {
  const navigate = useRouter()
  const dispatch = useDispatch()

  const options: MyNavigateOptions = {
    scrollOptions: {
      behavior: 'smooth',
      block: 'center',
    },
  }

  const handleClick = (target: string) => {
    navigate.push(`/#${target}`, options)
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
        </li>
        <li onClick={() => dispatch(closeModal())}>
          <button onClick={() => handleClick('contact')}>contact</button>
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
