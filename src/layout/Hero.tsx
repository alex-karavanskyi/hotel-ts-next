'use client'
import styled from 'styled-components'

const Hero = () => {
  return (
    <Container>
      <h1>E-COMMERCE</h1>
      <div>
        REFINED, SOPHISTICATED, SMART AND SIMPLE, YET FLAMBOYANT AND
        PROVOCATIVE, ALL AT THE SAME TIME. UNIVERSALLY APPEALING HOTEL ROOMS ARE
        THOUGHTFULLY DESIGNED, DOWN TO EVERY LAST FINISH AND DETAIL, WITH
        DISTINCT ZONES FOR SLEEPING, RELAXING, WORKING AND ENTERTAINING. WE'VE
        INTEGRATED SEAMLESS SMART HOTEL TECHNOLOGY SO EVERYTHING YOU NEED IS
        WITHIN ARM'S REACH AND RIGHT AT YOUR FINGERTIPS. A STAY AT NYC'S PUBLIC
        HOTEL OFFERS ALL THE COMFORTS OF HOME, BUT BETTER.
      </div>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 1rem;
  margin: 2rem auto;
  max-width: 1280px;
  color: var(--clr-grey-dark);

  @media (min-width: 1400px) {
    padding: 0;
  }
`

export default Hero
