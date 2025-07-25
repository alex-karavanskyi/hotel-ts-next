import { Metadata } from 'next'
import { Hero, Slider, ProductControls, ProductList } from '@/components/home'

export const metadata: Metadata = {
  title: 'E-Commerce | React App',
}

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Slider />
      <ProductControls />
      <ProductList />
    </main>
  )
}

export default HomePage
