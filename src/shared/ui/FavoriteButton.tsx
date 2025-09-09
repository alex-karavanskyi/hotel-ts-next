'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { toggleFavorite } from '@/redux/features/favoriteSlice'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { Product } from '@/shared/types/productsType'

interface FavoriteButtonProps {
  product: Product
  classIcon?: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  product,
  classIcon,
}) => {
  const { favorites_products } = useAppSelector((store) => store.favorite)
  const dispatch = useAppDispatch()

  const isFavorite = favorites_products.some((p) => p.id === product.id)

  const handleClick = () => {
    dispatch(toggleFavorite(product))
  }

  return isFavorite ? (
    <MdFavorite onClick={handleClick} color='red' className={classIcon} />
  ) : (
    <MdFavoriteBorder onClick={handleClick} className={classIcon} />
  )
}

export default FavoriteButton
