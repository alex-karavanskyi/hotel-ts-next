import { Metadata } from 'next'

import { ProductControls, ProductList, Slider } from '@/components/home'

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
