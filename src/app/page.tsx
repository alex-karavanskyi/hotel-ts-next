import {
  FeaturedProducts,
  Hero,
  About,
  Experience,
  Works,
  Contact,
} from '@/components/home'
import { StarsCanvas } from '@/components/canvas'

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Works />
      <FeaturedProducts />
      <div className='home-page'>
        <Contact />
        <StarsCanvas />
      </div>
    </main>
  )
}

export default Home
