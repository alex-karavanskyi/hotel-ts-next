'use client'
import styled from 'styled-components'

const Hero = () => {
  return (
    <Container>
      <h1 className='hero__title'>E-COMMERCE</h1>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 1rem;
  margin: 2rem auto;
  max-width: 1280px;
  color: var(--clr-grey-dark);
  .hero__title {
    text-align: center;
  }

  @media (min-width: 1400px) {
    padding: 0;
  }
`

export default Hero
