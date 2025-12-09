'use client'
import styled from 'styled-components'
import { device } from '@/shared/constants/device'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

const Error = () => {
  return (
    <Container>
      <h2 style={{ color: 'white' }}>there was an error...</h2>
    </Container>
  )
}

const Container = styled.div`
  ${containerStyles}
  width: 70vw;
  padding: 5rem 0;
  text-align: center;

  @media ${device.laptop} {
    width: 95vw;
  }
`

export default Error
