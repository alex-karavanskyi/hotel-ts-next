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
    <Container>
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
    </Container>
  )
}

const Container = styled.div`
  .wishlist__empty {
    display: flex;
    justify-content: center;
    margin-left: 0;
    height: 200px;
  }
  .wishlist__image {
    width: 100%;
    display: block;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  .wishlist__grid {
    display: block;
    margin-bottom: 10px;
  }
  .wishlist__btn-delete {
    color: white;
    cursor: pointer;
    text-decoration: underline;
    background: transparent;
    border: none;
    margin-left: 0px;
  }
  .wishlist__btn-delete:hover {
    text-decoration: none;
  }
  .wishlist__product {
    margin-left: 0px;
  }

  h3,
  p {
    color: white;
  }

  @media (min-width: 400px) {
    .wishlist__empty {
      margin-left: 1.9rem;
      justify-content: flex-start;
    }
    .wishlist__image {
      width: 300px;
    }
    .wishlist__grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      align-items: center;
      margin-left: 1.9rem;
    }
    .wishlist__btn-delete {
      margin-left: 1rem;
    }
    .wishlist__product {
      margin-left: 1rem;
    }
  }
`

export default WishList
