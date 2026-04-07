'use client'
import { useEffect } from 'react'

import { useParams } from 'next/navigation'

import styled from 'styled-components'

import { Error, Loading } from '@/layout'
import { getSingleProduct } from '@/redux/features/productSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { url } from '@/shared/constants/db'
import { device } from '@/shared/constants/device'
import { Breadcrumbs } from '@/shared/ui'
import ProductInfo from '@/shared/ui/ProductInfo'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

import ProductImages from './ProductImages'

const SingleProduct = () => {
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
  } = useAppSelector(store => store.products)

  const { id } = useParams()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getSingleProduct(`${url}/${id}`))
  }, [dispatch, id])

  if (loading) return <Loading />
  if (error) {
    return (
      <Error
        message="Oops! Something went wrong. Try again later."
        redirectTo="/"
        redirectDelay={3000}
      />
    )
  }
  if (!product) return null

  const { description, images } = product

  return (
    <Container>
      <Breadcrumbs name={product.name} />
      <div className="single__product-container">
        <ProductImages images={images} />
        <section className="single__product-info">
          <ProductInfo
            product={product}
            variant="detailed"
            showHeader={true}
            showPrice={true}
            priceTag="h5"
          />
          <p className="single__product-description">{description}</p>
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

  .product__info-favorite-icon {
    width: 2rem;
    height: 2rem;
    color: var(--clr-grey-dark);
    cursor: pointer;
  }

  @media ${device.laptop} {
    .single__product-container {
      grid-template-columns: 1fr 1fr;
    }

    .product__info-favorite-icon {
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
