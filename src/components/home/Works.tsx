'use client'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/hoc'
import { projects } from '@/constants'
import { fadeIn, textVariant } from '@/utils/motion'
import { ProjectCard } from '@/components/card'

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant(0.1)}>
        <p>My work</p>
        <h2 style={{ color: 'white', fontWeight: '900' }}>Projects.</h2>
      </motion.div>

      <div style={{ display: 'flex', width: '100%' }}>
        <motion.p variants={fadeIn('', '', 0.1, 1)} className='works'>
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='works__project-card-container'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Works)
