'use client'
import styled from 'styled-components'
import Image from 'next/image'
import Breadcrumbs from '@/shared/ui/Breadcrumbs'
import { formatPrice } from '@/shared/utils/formatPrice'
import { removeFavorite } from '@/redux/features/favoriteSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { motion, AnimatePresence } from 'framer-motion'

const Favorites = () => {
  const { favorites_products } = useAppSelector((store) => store.favorite)
  const dispatch = useAppDispatch()

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFavorite({ productId }))
  }

  return (
    <Container>
      <div className='favorites__content'>
        <Breadcrumbs name='Favorites' />
        <h2 className='favorites__title'>Wishlist</h2>
        {favorites_products.length === 0 ? (
          <p className='favorites__empty'>Your wishlist is empty.</p>
        ) : (
          <motion.ul layout initial={false}>
            <AnimatePresence>
              {favorites_products.map((product) => (
                <motion.li
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='favorites__grid'>
                    <Image
                      alt={product.name}
                      width={700}
                      height={700}
                      src={product.image}
                      className='favorites__image'
                    />
                    <div>
                      <h3 className='favorites__product'>{product.name}</h3>
                      <p className='favorites__product'>
                        {formatPrice(product.price)}
                      </p>
                      <button
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className='favorites__btn-delete'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 1rem;
  max-width: 1280px;
  margin: 2rem auto;
  .favorites__content {
    margin-left: 1.9rem;
  }
  .favorites__title {
    padding-top: 15px;
    color: white;
  }
  .favorites__empty {
    display: flex;
    justify-content: flex-start;
    height: 200px;
    color: white;
  }
  .favorites__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
    display: block;
  }
  .favorites__grid {
    display: block;
    margin-bottom: 10px;
  }
  .favorites__product {
    margin: 0;
    color: white;
  }
  .favorites__btn-delete {
    color: white;
    background: transparent;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    font-size: 1rem;
    margin: 0;
    padding: 0;
  }
  .favorites__btn-delete:hover {
    text-decoration: none;
  }

  h3,
  p {
    color: white;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 1rem;
  }

  @media (min-width: 400px) {
    .favorites__image {
      width: 300px;
    }
    .favorites__grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      align-items: center;
    }
    .favorites__product,
    .favorites__btn-delete {
      margin-left: 1rem;
    }
  }
`

export default Favorites
