import styled from 'styled-components'

const SocialLinks = () => {
  return (
    <StyledSocial>
      <li>
        <a href='https://www.facebook.com' className='social-icon'>
          <i className='fab fa-facebook'></i>
        </a>
      </li>
      <li>
        <a href='https://www.linkedin.com' className='social-icon'>
          <i className='fab fa-linkedin'></i>
        </a>
      </li>
      <li>
        <a href='https://www.squarespace.com' className='social-icon'>
          <i className='fab fa-squarespace'></i>
        </a>
      </li>
      <li>
        <a href='https://www.behance.com' className='social-icon'>
          <i className='fab fa-behance'></i>
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
  width: 20rem;
  justify-items: center;
  grid-template-columns: repeat(5, 1fr);

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
