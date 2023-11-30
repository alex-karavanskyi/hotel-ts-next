'use client'
import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Error, Loading, ProductSlider } from '.'
import { useAppSelector } from '@/app/redux/hooks'
import { SectionWrapper } from '../hoc'

const FeaturedProducts = () => {
  const { products_loading: loading, products_error: error } = useAppSelector(
    (store) => store.products
  )

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  return (
    <Wrapper>
      <div className='title'>
        <h2 className='text-white'>featured products</h2>
        <div className='underline'></div>
      </div>
      <ProductSlider />
      <Link href='/rooms' className='btn'>
        all products
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
`

export default SectionWrapper(FeaturedProducts, 'featured')
