'use client'
import styled, { keyframes } from 'styled-components'

const Loading = () => {
  return (
    <Container>
      <div className='pulse-ring' />
    </Container>
  )
}

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 20px rgba(0, 240, 255, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 240, 255, 0);
  }
`

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .pulse-ring {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle, #2d3748 30%, #00161a 100%);
    animation: ${pulse} 1.5s infinite;
    box-shadow: 0 0 15px #2d3748, inset 0 0 10px #2d3748;
  }
`
export default Loading
