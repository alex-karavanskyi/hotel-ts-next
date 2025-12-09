'use client'
import styled from 'styled-components'
import { device } from '@/shared/constants/device'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

const Hero = () => {
  return (
    <Container>
      <h1 className='hero__title'>E-COMMERCE</h1>
    </Container>
  )
}

const Container = styled.div`
  ${containerStyles}
  color: var(--clr-grey-dark);
  .hero__title {
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  @media ${device.desktop} {
    padding: 0;
  }
`

export default Hero
