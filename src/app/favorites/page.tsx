import { Metadata } from 'next'
import Favorites from '@/components/favorites/Favorites'

export const metadata: Metadata = {
  title: 'Favorites | React App',
}

const FavoritesPage = () => {
  return (
    <main>
      <Favorites />
    </main>
  )
}

export default FavoritesPage
