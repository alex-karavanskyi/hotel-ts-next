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
  const url = 'https://course-api.com/react-store-products'

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProductsItems(url))
  }, [dispatch])

  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <div className='relative z-0'>
        <Contact />
        <StarsCanvas />
      </div>
    </main>
  )
}

export default Home
