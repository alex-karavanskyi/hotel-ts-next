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
