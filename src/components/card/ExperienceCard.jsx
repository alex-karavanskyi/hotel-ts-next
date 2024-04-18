'use client'
import 'react-vertical-timeline-component/style.min.css'
import Image from 'next/image'
import { VerticalTimelineElement } from 'react-vertical-timeline-component'

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: '#1d1836',
        color: '#fff',
      }}
      contentArrowStyle={{ borderRight: '7px solid  #232631' }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='experience-center'>
          <Image
            src={experience.icon}
            alt={experience.company_name}
            className='experience-img'
          />
        </div>
      }
    >
      <div>
        <h3 className='experience-title'>{experience.title}</h3>
      </div>

      <ul className='experience-points'>
        {experience.points.map((point, index) => (
          <li key={`experience-point-${index}`}>{point}</li>
        ))}
      </ul>
    </VerticalTimelineElement>
  )
}

export default ExperienceCard
