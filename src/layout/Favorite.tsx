'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addFavorite, removeFavorite } from '@/redux/features/favoriteSlice'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { Product } from '@/types/productsType'

interface ListProducts {
  name: string
  products: Product[]
  productId: string
  classIcon: string
}

const Favorite: React.FC<ListProducts> = ({
  name,
  products,
  productId,
  classIcon,
}) => {
  const { favorites_products } = useAppSelector((store) => store.favorite)

  const dispatch = useAppDispatch()

  const handleAddToFavorite = (productId: string, products: Product[]) => {
    dispatch(addFavorite({ productId, products }))
  }
  const handleremoveToFavorite = (productId: string) => {
    dispatch(removeFavorite({ productId }))
  }

  const wishList = favorites_products.some((item) => item.id === productId)

  return (
    <div>
      {name}{' '}
      {wishList ? (
        <MdFavorite
          onClick={() => handleremoveToFavorite(productId)}
          color='red'
          className={classIcon}
        />
      ) : (
        <MdFavoriteBorder
          onClick={() => handleAddToFavorite(productId, products)}
          className={classIcon}
        />
      )}
    </div>
  )
}

export default Favorite
