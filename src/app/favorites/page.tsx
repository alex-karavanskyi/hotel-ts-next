'use client'
import styled from 'styled-components'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { formatPrice } from '@/utils/helpers'
import { removeFavorite } from '@/redux/features/favoriteSlice'

const Favorite = () => {
  const { favorites_products } = useAppSelector((store) => store.favorite)

  const dispatch = useAppDispatch()

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFavorite({ productId }))
  }

  return (
    <Wrapper>
      <h2 className='wish-list'>Wishlist</h2>
      {favorites_products.length === 0 ? (
        <p className='empty'>Your wishlist is empty.</p>
      ) : (
        <ul>
          {favorites_products.map((product) => (
            <li key={product.id}>
              <div className='grid-center'>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={700}
                  height={700}
                />
                <div>
                  <h3 className='list-margin'>{product.name}</h3>
                  <p className='list-margin'>{formatPrice(product.price)}</p>
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
    margin-left: 30px;
  }
  .list-margin {
    margin-left: 14px;
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
    margin-left: 14px;
  }
  .btn-delete:hover {
    text-decoration: none;
  }
  .empty {
    height: 200px;
    margin-left: 30px;
  }
  .wish-list {
    padding-top: 15px;
    margin-left: 30px;
  }
  h2,
  h3,
  p {
    color: white;
  }
  @media (max-width: 430px) {
    .grid-center {
      display: block;
      margin-bottom: 10px;
    }
    h2,
    .empty {
      display: flex;
      justify-content: center;
      margin-left: 0;
    }
    .wish-list {
      margin-left: 0;
    }
    .btn-delete {
      margin-left: 0px;
    }
    .list-margin {
      margin-left: 0px;
    }
  }
`

export default Favorite
