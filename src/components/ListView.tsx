'use client'
import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { formatPrice } from '../helpers'
import { handleButtonClick } from '../helpers'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { useAppSelector, useAppDispatch } from '@/app/redux/hooks'
import { addFavorite, removeFavorite } from '@/app/redux/features/productSlice'
import Products from '@/app/redux/modals/productsType'

interface ListProducts {
  products: Products[]
}

type HandleProduct = string

const ListView: React.FC<ListProducts> = ({ products }) => {
  const dispatch = useAppDispatch()

  const handleAddToFavorite = (productId: HandleProduct) => {
    dispatch(addFavorite({ productId }))
  }
  const handleremoveToFavorite = (productId: HandleProduct) => {
    dispatch(removeFavorite({ productId }))
  }
  const isFavorite = useAppSelector(
    (state) => state.products.favorites_products
  )
  return (
    <Wrapper>
      {products.map((product) => {
        const { id, image, name, price, description } = product
        const wishList = isFavorite.some((item) => item.id === id)
        return (
          <article key={id}>
            <img src={image} alt={name} />
            <div>
              <h4>
                {name}{' '}
                {wishList ? (
                  <MdFavorite
                    onClick={() => handleremoveToFavorite(id)}
                    color='red'
                  />
                ) : (
                  <MdFavoriteBorder onClick={() => handleAddToFavorite(id)} />
                )}
              </h4>
              <h5 className='price'>{formatPrice(price)}</h5>
              <p>{description.substring(0, 150)}...</p>
              <Link
                href={`/rooms/${id}`}
                className='btn'
                onClick={handleButtonClick}
              >
                Details
              </Link>
            </div>
          </article>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
  max-width: 1450px;
  margin: auto;
  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`

export default ListView
