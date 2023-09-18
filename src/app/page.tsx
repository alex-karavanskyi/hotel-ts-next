'use client'
import React from 'react'
import FeaturedProducts from '../components/FeaturedProducts'
import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Tech from '../components/Tech'
import Works from '../components/Works'
import Feedbacks from '../components/Feedbacks'
import Contact from '../components/Contact'
import { StarsCanvas } from '../components/canvas'
import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

const Home = () => {
  const location = useRouter()
  const aboutRef = useRef<null | HTMLDivElement>(null)
  const contactRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (location.pathname === '#about' && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    if (location.pathname === '#contact' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <About ref={aboutRef} />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <div className='relative z-0'>
        <Contact ref={contactRef} />
        <StarsCanvas />
      </div>
    </main>
  )
}

export default Home
