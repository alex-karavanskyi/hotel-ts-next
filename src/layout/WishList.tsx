'use client'
import styled from 'styled-components'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { formatPrice } from '@/utils/format'
import { removeFavorite } from '@/redux/features/favoriteSlice'

const WishList = () => {
  const { favorites_products } = useAppSelector((store) => store.favorite)

  const dispatch = useAppDispatch()

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFavorite({ productId }))
  }

  return (
    <Wrapper>
      {favorites_products.length === 0 ? (
        <p className='wishlist__empty'>Your wishlist is empty.</p>
      ) : (
        <ul>
          {favorites_products.map((product) => (
            <li key={product.id}>
              <div className='wishlist__grid'>
                <Image
                  alt={product.name}
                  width={700}
                  height={700}
                  src={product.image}
                  className='wishlist__image'
                />
                <div>
                  <h3 className='wishlist__product'>{product.name}</h3>
                  <p className='wishlist__product'>
                    {formatPrice(product.price)}
                  </p>
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className='wishlist__btn-delete'
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
  .wishlist__empty {
    height: 200px;
    margin-left: 1.9rem;
  }
  .wishlist__image {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  .wishlist__grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    margin-left: 1.9rem;
  }
  .wishlist__product {
    margin-left: 1rem;
  }
  .wishlist__btn-delete {
    color: white;
    cursor: pointer;
    text-decoration: underline;
    background: transparent;
    border: none;
    margin-left: 1rem;
  }
  .wishlist__btn-delete:hover {
    text-decoration: none;
  }
  h3,
  p {
    color: white;
  }
  @media (max-width: 430px) {
    h2,
    .wishlist__empty {
      display: flex;
      justify-content: center;
      margin-left: 0;
    }
    .wishlist__grid {
      display: block;
      margin-bottom: 10px;
    }
    .wishlist__btn-delete {
      margin-left: 0px;
    }
    .wishlist__product {
      margin-left: 0px;
    }
  }
`

export default WishList
