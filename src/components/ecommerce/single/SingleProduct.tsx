'use client'
import styled from 'styled-components'
import ProductImages from './ProductImages'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { useParams, useRouter } from 'next/navigation'
import { formatPrice } from '@/utils/format'
import { Loading, Error, Favorite } from '@/layout'
import { getSingeProduct } from '@/redux/features/productSlice'
import { url } from '@/constants/db'

const SingleProduct = () => {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    products,
  } = useAppSelector((store) => store.products)

  useEffect(() => {
    if (!product || product.id !== id) {
      dispatch(getSingeProduct(`${url}/${id}`))
    }
  }, [dispatch, id, product])

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
    <Wrapper>
      <div className='section section-center page'>
        <div className='single__product-container'>
          <ProductImages images={images} />
          <section>
            <h2 style={{ color: 'white' }}>
              <Favorite
                productId={sku}
                name={name}
                products={products}
                classIcon='single__product-favorite-icon'
              />
            </h2>
            <h5 className='single__product-price'>{formatPrice(price)}</h5>
            <p className='single__product-description'> {description}</p>
            <p className='single__product-info'>
              <span>SKU : </span>
              {sku}
            </p>
            <hr />
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
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
    max-width: 45em;
    color: #6c757d;
  }
  .single__product-info {
    text-transform: capitalize;
    color: #6c757d;
    span {
      font-weight: 700;
    }
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
