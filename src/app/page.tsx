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
      <FeaturedProducts />
      <About />
      <Experience />
      <Works />
      <div className='home-page'>
        <Contact />
        <StarsCanvas />
      </div>
    </main>
  )
}

export default Home
