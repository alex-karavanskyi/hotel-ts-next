'use client'
import styled from 'styled-components'

import { device } from '@/shared/constants/device'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

const Error = () => {
  return <ErrorTitle>there was an error...</ErrorTitle>
}

const ErrorTitle = styled.h2`
  ${containerStyles}
  width: 70vw;
  padding: 5rem 0;
  text-align: center;
  color: white;

  @media ${device.laptop} {
    width: 95vw;
  }
`

export default Error
