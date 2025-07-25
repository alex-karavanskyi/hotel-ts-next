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
    products,
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
  }, [error])

  if (loading) return <Loading />
  if (error) return <Error />

  if (!product) return null

  const { name, price, description, images, id: sku } = product

  return (
    <Container>
      <Breadcrumbs name={name} />
      <div className='single__product-container'>
        <ProductImages images={images} />
        <section>
          <h2 style={{ color: 'white' }}>
            <FavoriteButton
              productId={sku}
              name={name}
              products={products}
              classIcon='single__product-favorite-icon'
            />
          </h2>
          <h5 className='single__product-price'>{formatPrice(price)}</h5>
          <p className='single__product-description'> {description}</p>
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
  .single__product-price {
    color: var(--clr-primary-5);
  }
  .single__product-description {
    line-height: 2;
    color: #acb4be;
  }
  .single__product-favorite-icon {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
  }

  @media (min-width: 992px) {
    .single__product-container {
      grid-template-columns: 1fr 1fr;
    }
    .single__product-price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProduct
