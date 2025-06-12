'use client'
import styled from 'styled-components'

const Error = () => {
  return (
    <Container>
      <h2 style={{ color: 'white' }}>there was an error...</h2>
    </Container>
  )
}

const Container = styled.div`
  width: 70vw;
  margin: 0 auto;
  max-width: 1280px;
  padding: 5rem 0;
  text-align: center;

  @media (min-width: 992px) {
    width: 95vw;
  }
`

export default Error
