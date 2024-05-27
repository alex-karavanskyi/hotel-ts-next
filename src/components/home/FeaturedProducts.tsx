'use client'
import Link from 'next/link'
import styled from 'styled-components'
import { useEffect } from 'react'
import { Error, Loading } from '..'
import { Slider } from '@/modules'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getProductsItems } from '@/redux/features/productSlice'

const FeaturedProducts = () => {
  const { products_loading: loading, products_error: error } = useAppSelector(
    (store) => store.products
  )

  const url = 'https://www.course-api.com/react-store-products'

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProductsItems(url))
  }, [dispatch])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  return (
    <Wrapper>
      <div className='title'>
        <h2 style={{ color: 'white' }}>E-Commerce</h2>
        <div className='underline'></div>
      </div>
      <Slider />
      <Link href='/rooms' className='btn-featured'>
        view
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  .btn-featured {
    text-transform: uppercase;
    color: white;
    padding: 0.375rem 0.75rem;
    letter-spacing: var(--spacing);
    font-weight: 500;
    transition: var(--transition);
    font-size: 0.875rem;
    cursor: pointer;
    /* border: 1pxpx solid red; */
    border-radius: var(--radius);
    box-shadow: 0 0 5px #007aff;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 148px;
  }
  .btn-featured:hover {
    letter-spacing: 0.35rem;
    color: #007aff;
    box-shadow: 0 0 20px #007aff;
  }
`

export default FeaturedProducts
