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

  const url = '/api'

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
      <div className='featured__products-container'>
        <h2 style={{ color: 'white' }}>E-Commerce</h2>
        <div className='featured__products-underline'></div>
      </div>
      <Slider />
      <Link href='/ecommerce' className='featured__products-featured'>
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
  .featured__products-container {
    text-align: center;
  }
  .featured__products-underline {
    width: 6rem;
    height: 0.25rem;
    background: #49a6e9;
    background: var(--clr-primary-5);
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
  .featured__products-featured {
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
    width: 148px;
  }
  .featured__products-featured:hover {
    letter-spacing: 0.35rem;
    color: #007aff;
    box-shadow: 0 0 20px #007aff;
  }
`

export default FeaturedProducts
