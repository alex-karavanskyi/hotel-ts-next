'use client'
import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { fadeIn } from '../../utils/motion'
import Image from 'next/image'
import styled from 'styled-components'

const ServiceCard = ({ index, title, icon }) => (
  <Wrapper>
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div
        variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className='rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col box-color'
        >
          <Image
            src={icon}
            alt='web-development'
            className='w-16 h-16 object-contain'
          />

          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  </Wrapper>
)

const Wrapper = styled.div`
  .box-color {
    background: rgb(9, 63, 66);
    background: linear-gradient(
      90deg,
      rgba(9, 63, 66, 1) 0%,
      rgba(10, 29, 51, 1) 53%
    );
  }
`

export default ServiceCard
