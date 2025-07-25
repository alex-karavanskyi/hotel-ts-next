'use client'
import styled from 'styled-components'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { FaTelegram } from 'react-icons/fa'

const SocialLinks = () => {
  return (
    <Container>
      <li>
        <a
          href='https://github.com/alex-karavanskyi'
          className='social__links-icon'
        >
          <FaGithub />
        </a>
      </li>
      <li>
        <a
          href='https://linkedin.com/in/oleksandr-karavanskyi-710770309'
          className='social__links-icon'
        >
          <FaLinkedin />
        </a>
      </li>
      <li>
        <a href='https://t.me/alex_karavanskyi' className='social__links-icon'>
          <FaTelegram />
        </a>
      </li>
    </Container>
  )
}

const Container = styled.ul`
  display: grid;
  margin-top: 3rem;
  width: 12rem;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  .social__links-icon {
    font-size: 1.5rem;
    color: var(--clr-grey-3);
    -webkit-transition: var(--transition);
    transition: var(--transition);
  }
  .social__links-icon:hover {
    color: var(--clr-primary-5);
  }
`

export default SocialLinks
