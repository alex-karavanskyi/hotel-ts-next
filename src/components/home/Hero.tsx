'use client'
import styled from 'styled-components'
import { StarsCanvas, LaptopCanvas } from '@/canvas'
import { useMediaQuery } from 'react-responsive'

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 570 })

  const containerStyle = isMobile ? {} : { backgroundColor: '#0e0f13' }

  return (
    <Wrapper style={containerStyle}>
      <div className='hero__container'>
        <div>
          <h1 style={{ color: 'white', fontWeight: 'black' }}>
            Hi, I'm <span style={{ color: '#915EFF' }}>Alex</span>
          </h1>
          <p className='layout-section__text'>
            I'm a web developer with a strong knowledge of React.js, Next.js,
            and JavaScript. I specialize in building modern, fast, and
            user-friendly web applications, focusing on clean code and best
            practices.
          </p>
        </div>
      </div>
      {isMobile ? <StarsCanvas /> : <LaptopCanvas />}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  width: 70%;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 570px) {
    height: 50vh;
  }
  .hero__container {
    position: absolute;
    inset: 0px;
    top: 3.1rem;
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (max-width: 430px) {
    .hero__container {
      text-align: center;
    }
  }
`

export default Hero
