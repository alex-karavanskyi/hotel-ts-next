'use client'
import Link from 'next/link'
import styled from 'styled-components'
import { useEffect } from 'react'
import { Error, Loading, ProductSlider } from '.'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { SectionWrapper } from '../hoc'
import { getProductsItems } from '@/redux/features/productSlice'

const FeaturedProducts = () => {
  const { products_loading: loading, products_error: error } = useAppSelector(
    (store) => store.products
  )

  const url = 'https://course-api.com/react-store-products'

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
        <h2 style={{ color: 'white' }}>featured products</h2>
        <div className='underline'></div>
      </div>
      <ProductSlider />
      <Link href='/rooms' className='btn-featured'>
        all products
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
    background: var(--clr-primary-5);
    color: var(--clr-primary-10);
    padding: 0.375rem 0.75rem;
    letter-spacing: var(--spacing);
    font-weight: 500;
    transition: var(--transition);
    font-size: 0.875rem;
    cursor: pointer;
    border-radius: var(--radius);
    border-color: transparent;
    display: flex;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    width: 148px;
  }
  .btn-featured:hover {
    color: var(--clr-primary-1);
  }
`

export default FeaturedProducts
