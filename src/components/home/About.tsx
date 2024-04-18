'use client'
import { motion } from 'framer-motion'
import { services } from '@/constants'
import { fadeIn, textVariant } from '@/utils/motion'
import { ServiceCard } from '@/components/card'

const About = () => {
  return (
    <div id='about' className='about-container'>
      <motion.div variants={textVariant(0.1)}>
        <p className='introduction'>Introduction</p>
        <h2 className='head-text'>Overview.</h2>
      </motion.div>

      <motion.p variants={fadeIn('', '', 0.1, 1)} className='about-text'>
        I'm a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React and Next.js. I'm a
        quick learner and collaborate closely with clients to create efficient,
        scalable, and user-friendly solutions that solve real-world problems.
        Let's work together to bring your ideas to life!
      </motion.p>
      <div className='grid-card'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  )
}

export default About
