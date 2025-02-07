'use client'
import Slider from './Slider'
import Link from 'next/link'
import styled from 'styled-components'
import { useEffect } from 'react'
import { Error, Loading } from '@/layout'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getProductsItems } from '@/redux/features/productSlice'
import { url } from '@/constants/db'

const Project = () => {
  const {
    products_loading: loading,
    products_error: error,
    products,
  } = useAppSelector((store) => store.products)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!products.length) {
      dispatch(getProductsItems(url))
    }
  }, [dispatch, products.length])

  if (loading) return <Loading />
  if (error) return <Error />

  return (
    <Wrapper>
      <div className='layout-section__container'>
        <p className='layout-section__introduction'>My work</p>
        <h2 className='layout-section__title'>Project.</h2>
        <p className='layout-section__text'>
          I developed an e-commerce application using React, Redux Toolkit,
          Next.js, and TypeScript, implementing key features such as product
          filtering, a favorites system, interactive sliders, a flexible
          navigation bar, pagination, and smooth animations with Framer Motion
          and React Three Fiber. The contact form was built with React Hook Form
          for validation and user-friendly interactions. Additionally, I created
          a database and organizer using Airtable, ensuring efficient data
          management and retrieval. To maintain code quality and reliability, I
          covered the application with unit and integration tests using Jest.
        </p>
        <Slider />
        <Link href='/ecommerce' className='project-featured'>
          view
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .project-featured {
    text-transform: uppercase;
    color: white;
    padding: 0.375rem 0.75rem;
    letter-spacing: var(--spacing);
    font-weight: 500;
    transition: var(--transition);
    font-size: 0.875rem;
    cursor: pointer;
    border-radius: var(--radius);
    box-shadow: 0 0 5px #007aff;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 9.25rem;

    &:hover {
      letter-spacing: 0.35rem;
      color: #007aff;
      box-shadow: 0 0 1.25rem #007aff;
    }
  }
`

export default Project
