import styled from 'styled-components'

const SocialLinks = () => {
  return (
    <StyledSocial>
      <li>
        <a
          href='https://https://github.com/alexfront2007'
          className='social-icon'
        >
          <i className='fab fa-github'></i>
        </a>
      </li>
      <li>
        <a
          href='www.linkedin.com/in/oleksandr-karavanskyi-710770309'
          className='social-icon'
        >
          <i className='fab fa-linkedin'></i>
        </a>
      </li>
      <li>
        <a href='https://www.instagram.com' className='social-icon'>
          <i className='fab fa-instagram'></i>
        </a>
      </li>
    </StyledSocial>
  )
}

const StyledSocial = styled.ul`
  display: grid;
  margin-top: 3rem;
  width: 12rem;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  .social-icon {
    font-size: 1.5rem;
    color: var(--clr-grey-3);
    -webkit-transition: var(--transition);
    transition: var(--transition);
  }
  .social-icon:hover {
    color: var(--clr-primary-5);
  }
`

export default SocialLinks
