import { Project, Hero, Skills, Contact } from '@/components/home'
import { StarsCanvas } from '@/canvas'

const Home = () => {
  return (
    <main>
      <div className='home__contact-container'>
        <Hero />
        <StarsCanvas />
      </div>
      <Skills />
      <Project />
      <div className='home__contact-container'>
        <Contact />
        <StarsCanvas />
      </div>
    </main>
  )
}

export default Home
