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
import { useRef, useEffect, useLayoutEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAppDispatch } from '@/app/redux/hooks'
import { getProductsItems } from '@/app/redux/features/productSlice'

const Home = () => {
  const router = useRouter()
  const aboutRef = useRef<null | HTMLDivElement>(null)
  const contactRef = useRef<null | HTMLDivElement>(null)

  const url = 'https://course-api.com/react-store-products'

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProductsItems(url))
  }, [dispatch])

  useEffect(() => {
    if (aboutRef.current) {
      router.push('/about')
    }
    if (contactRef.current) {
      router.push('/#contact')
    }
  }, [aboutRef, contactRef])

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
