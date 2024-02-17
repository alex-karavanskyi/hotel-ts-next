'use client'
import { EarthCanvas, StarsCanvas } from './canvas'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 430 })

  const containerStyle = isMobile ? {} : { backgroundColor: '#0e0f13' }

  return (
    <Wrapper style={containerStyle}>
      <div className='text-container'>
        <div>
          <h1 style={{ color: 'white', fontWeight: 'black' }}>
            Hi, I'm <span style={{ color: '#915EFF' }}>Alex</span>
          </h1>
          <p style={{ marginTop: '0.5 rem', fontWeight: '500' }}>
            I develop user <br />
            interfaces and web applications
          </p>
        </div>
      </div>
      {isMobile ? <StarsCanvas /> : <EarthCanvas />}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  .text-container {
    position: absolute;
    inset: 0px;
    top: 50px;
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
  }
`

export default Hero
