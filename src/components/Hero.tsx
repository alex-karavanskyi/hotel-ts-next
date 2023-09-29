'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { EarthCanvas, StarsCanvas } from './canvas'
import { useMediaQuery } from 'react-responsive'

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 390 })

  const containerStyle = isMobile ? {} : { backgroundColor: '#0e0f13' }

  return (
    <section
      className={`relative w-full h-screen mx-auto max-[390px]:h-[70vh]`}
      style={containerStyle}
    >
      <div
        className={`absolute inset-0 top-[50px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>Alex</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I develop 3D visuals, user <br className='sm:block hidden' />
            interfaces and web applications
          </p>
        </div>
      </div>
      {isMobile ? <StarsCanvas /> : <EarthCanvas />}
    </section>
  )
}

export default Hero
