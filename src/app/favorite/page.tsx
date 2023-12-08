'use client'
import React from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { formatPrice } from '@/helpers'
import { removeFavorite } from '@/redux/features/productSlice'
import styled from 'styled-components'
import Image from 'next/image'

const Favorite = () => {
  const wishlist = useAppSelector((state) => state.products.favorites_products)
  const dispatch = useAppDispatch()

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFavorite({ productId }))
  }

  return (
    <Wrapper>
      <h2>Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className='empty'>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlist.map((product) => (
            <li key={product.id}>
              <div className='grid-center'>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={700}
                  height={700}
                />
                <div>
                  <h3>{product.name}</h3>
                  <p>{formatPrice(product.price)}</p>
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className='btn-delete'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 2rem;
  max-width: 1243px;
  margin: auto;
  .grid-center {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
  }
  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  .btn-delete {
    color: white;
    cursor: pointer;
    text-decoration: underline;
    background: transparent;
    border: none;
  }
  .btn-delete:hover {
    text-decoration: none;
  }
  .empty {
    height: 200px;
  }
  h2,
  h3,
  p {
    color: white;
  }
  @media screen and (max-width: 390px) {
    .grid-center {
      display: block;
      margin-left: 30px;
      margin-bottom: 10px;
    }
    h2,
    .empty {
      display: flex;
      justify-content: center;
    }
  }
`

export default Favorite
