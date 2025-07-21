'use client'
import Link from 'next/link'
import styled from 'styled-components'
import { closeModal } from '@/redux/features/modalSlice'
import { useAppDispatch } from '@/redux/hooks'
import { motion } from 'framer-motion'

const NavbarLinks: React.FC<{ parentClass?: string }> = ({ parentClass }) => {
  const dispatch = useAppDispatch()

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <Container>
      <motion.ul
        className={parentClass}
        variants={listVariants}
        initial='hidden'
        animate='visible'
      >
        {['contact', 'favorites'].map((link) => (
          <motion.li
            key={link}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            onClick={() => dispatch(closeModal())}
          >
            <Link href={`/${link}`}>{link}</Link>
          </motion.li>
        ))}
      </motion.ul>
    </Container>
  )
}

const Container = styled.nav`
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    gap: 2rem;
  }

  li {
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;

    a {
      text-decoration: none;
      font-weight: bold;
      letter-spacing: var(--spacing);
      color: rgba(255, 255, 255, 0.5);
      position: relative;
    }

    a::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0%;
      height: 2px;
      background-color: var(--clr-primary-5);
      transition: width 0.3s ease;
    }

    &:hover a::after {
      width: 100%;
    }

    &:hover a {
      color: var(--clr-primary-5);
    }
  }

  .navbar__links--color a {
    color: black;
  }

  .navbar__links--color li:hover a {
    color: var(--clr-primary-5);
  }
`

export default NavbarLinks
