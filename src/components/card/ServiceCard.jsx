'use client'
import Image from 'next/image'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { fadeIn } from '@/utils/motion'

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='box-color'>
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className='service-container'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='box-color'
      >
        <Image src={icon} alt='web-development' className='service-img' />
        <h3>{title}</h3>
      </div>
    </motion.div>
  </Tilt>
)

export default ServiceCard
