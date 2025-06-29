'use client'
import styled from 'styled-components'

const SocialLinks = () => {
  return (
    <Container>
      <li>
        <a
          href='https://github.com/alex-karavanskyi'
          className='social__links-icon'
        >
          <i className='fab fa-github'></i>
        </a>
      </li>
      <li>
        <a
          href='www.linkedin.com/in/oleksandr-karavanskyi-710770309'
          className='social__links-icon'
        >
          <i className='fab fa-linkedin'></i>
        </a>
      </li>
      <li>
        <a href='https://www.instagram.com' className='social__links-icon'>
          <i className='fab fa-instagram'></i>
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
