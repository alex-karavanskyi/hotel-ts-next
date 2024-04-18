import { motion } from 'framer-motion'
import { staggerContainer } from '@/utils/motion'

const StarWrapper = (Component) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer(0.1, 0.1)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className='section-container'
      >
        <Component />
      </motion.section>
    )
  }

export default StarWrapper
