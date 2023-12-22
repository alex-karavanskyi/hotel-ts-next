import React from 'react'
import FeaturedProducts from '../components/FeaturedProducts'
import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Works from '../components/Works'
import Contact from '../components/Contact'
import { StarsCanvas } from '../components/canvas'

const Home = () => {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <About />
      <Experience />
      <Works />
      <div className='relative z-0'>
        <Contact />
        <StarsCanvas />
      </div>
    </main>
  )
}

export default Home
