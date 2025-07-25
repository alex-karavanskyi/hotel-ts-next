'use client'
import styled, { keyframes } from 'styled-components'
import { useState } from 'react'
import { containerStyles } from '@/shared/utils/containerStyles'
import { HandleClearButtonFn } from '@/shared/types/productsType'

interface ClearButtonProps {
  handleClearButton: HandleClearButtonFn
}

const ClearButton: React.FC<ClearButtonProps> = ({ handleClearButton }) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    handleClearButton()
    setTimeout(() => setClicked(false), 300)
  }

  return (
    <Container>
      <button
        type='button'
        className={`clear__btn ${clicked ? 'animate' : ''}`}
        onClick={handleClick}
      >
        clear filters
      </button>
    </Container>
  )
}

const pop = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.12);
  }
  100% {
    transform: scale(1);
  }
`

const Container = styled.div`
  ${containerStyles}
  .clear__btn {
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-transform: capitalize;
    background: transparent;
    border: none;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-dark);
    font-family: var(--font-main);
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  .clear__btn.animate {
    animation: ${pop} 0.3s ease;
  }

  @media (min-width: 1400px) {
    padding: 0;
  }
`

export default ClearButton
