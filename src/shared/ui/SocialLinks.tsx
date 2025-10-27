'use client'
import styled from 'styled-components'
import { FaLinkedin, FaGithub, FaTelegram } from 'react-icons/fa'
import { socialLinks } from '@/shared/constants/socialLinksData'

const SocialLinks = () => (
  <Container>
    <SocialLink href={socialLinks.github} icon={<FaGithub />} />
    <SocialLink href={socialLinks.linkedin} icon={<FaLinkedin />} />
    <SocialLink href={socialLinks.telegram} icon={<FaTelegram />} />
  </Container>
)

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
}

const SocialLink = ({ href, icon }: SocialLinkProps) => (
  <li>
    <a href={href} className='social__links-icon'>
      {icon}
    </a>
  </li>
)

const Container = styled.ul`
  display: grid;
  margin-top: 3rem;
  width: 12rem;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  .social__links-icon {
    font-size: 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
  }
  .social__links-icon:hover {
    color: var(--clr-primary-5);
  }
`

export default SocialLinks
