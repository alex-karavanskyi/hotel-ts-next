'use client'
import styled from 'styled-components'

const Loading = () => {
  return (
    <Container>
      <div className='loading'>...loading</div>
    </Container>
  )
}

const Container = styled.div`
  width: 70vw;
  margin: 0 auto;
  max-width: 1280px;
  padding: 5rem 0;
  .loading {
    width: 6rem;
    height: 6rem;
    margin: 0 auto;
    margin-top: 10rem;
    border-radius: 50%;
    border: 4px solid #ccc;
    border-top-color: var(--clr-primary-5);
    animation: spinner 0.6s linear infinite;
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  @media (min-width: 992px) {
    width: 95vw;
  }
`

export default Loading
