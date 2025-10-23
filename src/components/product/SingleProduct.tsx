'use client'
import styled from 'styled-components'
import ProductImages from './ProductImages'
import ProductInfo from '@/shared/ui/ProductInfo'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Loading, Error } from '@/layout'
import { getSingleProduct } from '@/redux/features/productSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { Breadcrumbs } from '@/shared/ui'
import { url } from '@/shared/constants/db'

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
        <section>
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
  width: 70vw;
  margin: 2rem auto;
  max-width: 1280px;
  .single__product-container {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .product-info-favorite-icon {
    width: 2rem;
    height: 2rem;
    color: var(--clr-grey-dark);
    cursor: pointer;
  }
  .product-info-price {
    margin-bottom: 1rem;
  }
  .single__product-description {
    line-height: 1.8;
    color: #acb4be;
  }

  @media (min-width: 992px) {
    .single__product-container {
      grid-template-columns: 1fr 1fr;
    }
    .product-info-favorite-icon {
      width: 2.2rem;
      height: 2.2rem;
    }
  }
`

export default SingleProduct
