import { Metadata } from 'next'
import { Slider, ProductControls, ProductList } from '@/components/home'

export const metadata: Metadata = {
  title: 'E-Commerce | React App',
}

const HomePage = () => {
  return (
    <>
      <Slider />
      <ProductControls />
      <ProductList />
    </>
  )
}

export default HomePage
