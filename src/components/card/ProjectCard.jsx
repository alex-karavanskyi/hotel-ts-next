'use client'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { github } from '@/assets'
import { fadeIn } from '@/utils/motion'
import Image from 'next/image'

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='project-container'
      >
        <div className='project-card'>
          <Image src={image} alt='project_image' className='project-img' />

          <div className='project-flex'>
            <div
              onClick={() => window.open(source_code_link, '_blank')}
              className='project-github-container'
            >
              <Image
                src={github}
                alt='source code'
                className='project-github-img'
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <h3 className='project-name'>{name}</h3>
          <p className='project-description'>{description}</p>
        </div>

        <div className='project-tags'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`${tag.color}`}
              style={{ fontSize: '14px' }}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  )
}

export default ProjectCard
