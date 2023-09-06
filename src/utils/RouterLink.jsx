'use client'
import React from 'react'
import { Link } from 'react-router-dom'
import { handleButtonClick } from '../helpers'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { closeModal } from '../app/global/features/modalSlice'
import { useDispatch } from 'react-redux'

const RouterLink = ({ parentClass }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = (target) => {
    navigate(`/#${target}`, {
      scrollOptions: { behavior: 'smooth', block: 'start' },
    })
  }

  return (
    <Wrapper>
      <ul className={parentClass} onClick={handleButtonClick}>
        <li onClick={() => dispatch(closeModal())}>
          <Link to='/'>home</Link>
        </li>
        <li onClick={() => dispatch(closeModal())}>
          <Link to='/rooms'>rooms</Link>
        </li>
        <li onClick={() => dispatch(closeModal())}>
          <Link to='/favorite'>favorite</Link>
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
