'use client'
import styled from 'styled-components'
import Image from 'next/image'
import Breadcrumbs from '@/shared/ui/Breadcrumbs'
import { Product } from '@/shared/types/productsType'
import { removeFavorite } from '@/redux/features/favoriteSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { useDragAndDropFavorites } from '@/shared/hooks/useFavorites'
import ProductInfo from '@/shared/ui/ProductInfo'

const Favorites = () => {
  const { favorites_products } = useAppSelector((store) => store.favorite)
  const dispatch = useAppDispatch()
  const { handleDragStart, handleDragOver, handleDragEnd } =
    useDragAndDropFavorites()

  const handleRemoveFromWishlist = (productId: Product['id']) => {
    dispatch(removeFavorite(productId))
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
              {favorites_products.map((product, index) => (
                <motion.li
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onDragOver={(e) => handleDragOver(e, index)}
                >
                  <div
                    className='favorites__grid'
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                  >
                    <Image
                      alt={product.name}
                      width={700}
                      height={700}
                      src={product.image}
                      className='favorites__image'
                    />
                    <div className='favorites__info'>
                      <ProductInfo
                        product={product}
                        variant='compact'
                        showHeader={true}
                        showPrice={true}
                        showFavorite={false}
                      />
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
    display: block;
  }
  .favorites__grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius);
    padding: 1rem;
    cursor: grab;
    transition: background 0.2s;
  }
  .favorites__grid:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  .favorites__info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .product-info-price {
    margin-top: 0.75rem;
  }
  .favorites__btn-delete {
    color: white;
    background: transparent;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    font-size: 1rem;
    align-self: flex-start;
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

  @media (min-width: 600px) {
    .favorites__grid {
      flex-direction: row;
      align-items: flex-start;
      gap: 1.5rem;
    }
    .favorites__image {
      width: 280px;
      flex-shrink: 0;
    }
    .favorites__info {
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`

export default Favorites
