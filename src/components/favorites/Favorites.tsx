'use client'
import styled from 'styled-components'
import Image from 'next/image'
import Breadcrumbs from '@/shared/ui/Breadcrumbs'
import ProductInfo from '@/shared/ui/ProductInfo'
import { device } from '@/shared/constants/device'
import { Product } from '@/shared/types/productsType'
import { removeFavorite } from '@/redux/features/favoriteSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { useDragAndDropFavorites } from '@/shared/hooks/useFavorites'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

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
      <div className='favorites__breadcrumbs'>
        <Breadcrumbs name='Favorites' />
      </div>
      <h2 className='favorites__title'>Wishlist</h2>

      {favorites_products.length === 0 ? (
        <p className='favorites__empty'>Your wishlist is empty.</p>
      ) : (
        <motion.ul layout initial={false} className='favorites__list'>
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
    </Container>
  )
}

const Container = styled.div`
  ${containerStyles}
  padding-top: 1rem;
  padding-bottom: 1rem;
  .favorites__breadcrumbs {
    padding-left: 1rem;
  }
  .favorites__title {
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
    color: white;
  }
  .favorites__empty {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 200px;
    color: white;
  }
  .favorites__list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .favorites__grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius);
    padding: 1rem;
    cursor: grab;
    transition: background 0.2s;
  }
  .favorites__grid:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  .favorites__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    display: block;
  }
  .favorites__info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .favorites__btn-delete {
    color: #ff6b6b;
    background: transparent;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    font-size: 1rem;
    align-self: flex-start;
    padding: 0;
  }
  .favorites__btn-delete:hover {
    text-decoration: none;
  }

  h3,
  p {
    color: white;
  }

  @media ${device.mobile} {
    .favorites__grid {
      flex-direction: row;
      align-items: flex-start;
      gap: 1.5rem;
    }
    .favorites__image {
      width: 280px;
      height: auto;
      aspect-ratio: 1;
      flex-shrink: 0;
    }
    .favorites__info {
      flex: 1;
    }
  }

  @media ${device.desktop} {
    .favorites__breadcrumbs {
      padding-left: 0;
    }
  }
`

export default Favorites
