'use client'
import styled from 'styled-components'
import { services } from '@/utils/tech'
import { ServiceCard } from '@/card'

const Skills = () => {
  return (
    <Wrapper>
      <div id='about' className='layout-section__container'>
        <div>
          <p className='layout-section__introduction'>Introduction</p>
          <h2 className='layout-section__title'>Skills.</h2>
        </div>

        <p className='layout-section__text'>
          I have strong expertise in React.js, including component-based
          development, state management with Redux, and performance
          optimization. I'm proficient in Next.js, working with SSR, SSG, ISR,
          API handling, and routing. My knowledge of TypeScript allows me to
          write strongly typed, scalable, and maintainable code. I have
          experience with Styled Components, Material UI and Tailwind CSS for
          responsive design and styling. Additionally, I'm skilled in
          integrating REST APIs and GraphQL for backend communication.
        </p>
        <div className='about__grid-card'>
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .about__grid-card {
    margin-top: 5rem;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }
  @media (max-width: 430px) {
    .about__grid-card {
      grid-template-columns: repeat(1, minmax(0, 300px));
      justify-content: center;
    }
  }
`

export default Skills
