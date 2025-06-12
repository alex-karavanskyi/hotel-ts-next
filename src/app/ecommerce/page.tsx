import { ProductControls, ProductList } from '@/components/ecommerce'
import { Metadata } from 'next'
import { Hero } from '@/layout'

export const metadata: Metadata = {
  title: 'E-Commerce | React App',
}

const Ecommerce = () => {
  return (
    <main>
      <Hero />
      <ProductControls />
      <ProductList />
    </main>
  )
}

export default Ecommerce
