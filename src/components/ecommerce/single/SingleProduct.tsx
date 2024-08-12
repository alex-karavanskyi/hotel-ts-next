'use client'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { useParams, useRouter } from 'next/navigation'
import { formatPrice } from '@/utils/helpers'
import { Loading, Error } from '@/components'
import { ProductImages, Favorite } from '@/modules'
import { getSingeProduct } from '@/redux/features/productSlice'
import { url } from '@/constants/db'

const SingleProduct = () => {
  const { id } = useParams()
  const navigate = useRouter()
  const dispatch = useAppDispatch()
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    products,
  } = useAppSelector((store) => store.products)

  useEffect(() => {
    dispatch(getSingeProduct(`${url}/${id}`))
  }, [dispatch, id])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate.push('/')
      }, 3000)
    }
  }, [error])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  const { name, price, description, images, id: sku } = product

  return (
    <Wrapper>
      <div className='section section-center page'>
        <div className='single__product-container'>
          <ProductImages images={images} />
          <section>
            <h2 style={{ color: 'white' }}>
              <Favorite productId={sku} name={name} products={products} />
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

const Wrapper = styled.main`
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
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    color: #6c757d;

    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .single__product-container {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .single__product-price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProduct
