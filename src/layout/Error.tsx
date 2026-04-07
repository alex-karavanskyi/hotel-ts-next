'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import styled from 'styled-components'

import { containerStyles } from '@/shared/ui/styles/containerStyles'

interface ErrorProps {
  message?: string
  redirectTo?: string
  redirectDelay?: number
}

const Error: React.FC<ErrorProps> = ({
  message = 'Something went wrong',
  redirectTo,
  redirectDelay = 3000,
}) => {
  const router = useRouter()

  useEffect(() => {
    if (redirectTo) {
      const timer = setTimeout(() => {
        router.replace(redirectTo)
      }, redirectDelay)

      return () => clearTimeout(timer)
    }
  }, [redirectTo, redirectDelay, router])

  return (
    <ErrorWrapper>
      <ErrorTitle>{message}</ErrorTitle>

      {redirectTo && (
        <RedirectText>
          You will be redirected in {Math.floor(redirectDelay / 1000)}{' '}
          seconds...
        </RedirectText>
      )}
    </ErrorWrapper>
  )
}

const ErrorWrapper = styled.div`
  ${containerStyles}
  width: 70vw;
  padding: 5rem 0;
  text-align: center;
`

const ErrorTitle = styled.h2`
  color: white;
  margin-bottom: 1rem;
`

const RedirectText = styled.p`
  color: #acb4be;
  font-size: 1rem;
  opacity: 0.9;
`

export default Error
