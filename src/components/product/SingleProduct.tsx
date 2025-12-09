'use client'
import styled from 'styled-components'
import ProductImages from './ProductImages'
import ProductInfo from '@/shared/ui/ProductInfo'
import { url } from '@/shared/constants/db'
import { device } from '@/shared/constants/device'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Loading, Error } from '@/layout'
import { getSingleProduct } from '@/redux/features/productSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { Breadcrumbs } from '@/shared/ui'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

const SingleProduct = () => {
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
  } = useAppSelector((store) => store.products)

  const { id } = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getSingleProduct(`${url}/${id}`))
  }, [dispatch, id])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }, [error, router])

  if (loading) return <Loading />
  if (error) return <Error />
  if (!product) return null

  const { description, images } = product

  return (
    <Container>
      <Breadcrumbs name={product.name} />
      <div className='single__product-container'>
        <ProductImages images={images} />
        <section className='single__product-info'>
          <ProductInfo
            product={product}
            variant='detailed'
            showHeader={true}
            showPrice={true}
            priceTag='h5'
          />
          <p className='single__product-description'>{description}</p>
          <hr />
        </section>
      </div>
    </Container>
  )
}

const Container = styled.main`
  ${containerStyles}
  padding: 1rem;
  .single__product-container {
    display: grid;
    gap: 4rem;
  }
  .single__product-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .single__product-description {
    line-height: 1.8;
    color: #acb4be;
  }
  .product-info-favorite-icon {
    width: 2rem;
    height: 2rem;
    color: var(--clr-grey-dark);
    cursor: pointer;
  }

  @media ${device.laptop} {
    .single__product-container {
      grid-template-columns: 1fr 1fr;
    }
    .product-info-favorite-icon {
      width: 2.2rem;
      height: 2.2rem;
    }
  }

  @media ${device.desktop} {
    padding-left: 0;
    padding-right: 0;
  }
`

export default SingleProduct
