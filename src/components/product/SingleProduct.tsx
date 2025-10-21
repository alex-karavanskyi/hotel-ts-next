'use client'
import styled from 'styled-components'
import ProductImages from './ProductImages'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Loading, Error } from '@/layout'
import { getSingleProduct } from '@/redux/features/productSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { FavoriteButton, Breadcrumbs } from '@/shared/ui'
import { formatPrice } from '@/shared/utils/formatPrice'
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

  const { name, price, description, images } = product

  return (
    <Container>
      <Breadcrumbs name={name} />
      <div className='single__product-container'>
        <ProductImages images={images} />
        <section>
          <div className='single__product-header'>
            <h5 className='single__product-name'>{name}</h5>
            <FavoriteButton
              product={product}
              classIcon='single__product-favorite-icon'
            />
          </div>
          <h5 className='single__product-price'>{formatPrice(price)}</h5>
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
  .single__product-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  .single__product-name {
    color: var(--clr-grey-dark);
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }
  .single__product-favorite-icon {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    color: var(--clr-grey-dark);
  }
  .single__product-price {
    color: var(--clr-primary-5);
    font-size: 1.25rem;
    margin-bottom: 1rem;
    letter-spacing: var(--spacing);
  }
  .single__product-description {
    line-height: 1.8;
    color: #acb4be;
  }

  @media (min-width: 992px) {
    .single__product-container {
      grid-template-columns: 1fr 1fr;
    }
    .single__product-name {
      font-size: 2rem;
    }
    .single__product-favorite-icon {
      width: 2.2rem;
      height: 2.2rem;
    }
  }
`

export default SingleProduct
