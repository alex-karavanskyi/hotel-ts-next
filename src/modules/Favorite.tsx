'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addFavorite, removeFavorite } from '@/redux/features/productSlice'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

type HandleProduct = string

interface ListProducts {
  id: string
  name: string
}

const Favorite: React.FC<ListProducts> = ({ id, name }) => {
  const dispatch = useAppDispatch()

  const isFavorite = useAppSelector(
    (state) => state.products.favorites_products
  )

  const handleAddToFavorite = (productId: HandleProduct) => {
    dispatch(addFavorite({ productId }))
  }
  const handleremoveToFavorite = (productId: HandleProduct) => {
    dispatch(removeFavorite({ productId }))
  }
  const wishList = isFavorite.some((item) => item.id === id)

  return (
    <>
      {name}{' '}
      {wishList ? (
        <MdFavorite
          onClick={() => handleremoveToFavorite(id)}
          color='red'
          style={{ cursor: 'pointer' }}
        />
      ) : (
        <MdFavoriteBorder
          onClick={() => handleAddToFavorite(id)}
          style={{ cursor: 'pointer' }}
        />
      )}
    </>
  )
}

export default Favorite
