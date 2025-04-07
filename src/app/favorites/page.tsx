import { WishList } from '@/layout/index'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Favorites | React App',
}

const Favorites = () => {
  return (
    <main className='favorites'>
      <h2 className='favorites__title'>Wishlist</h2>
      <WishList />
    </main>
  )
}

export default Favorites
