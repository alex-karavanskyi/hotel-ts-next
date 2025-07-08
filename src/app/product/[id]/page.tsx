import { Metadata } from 'next'
import SingleProduct from '@/components/product/SingleProduct'

export const metadata: Metadata = {
  title: 'Product | React App',
}

const ProductSinglePage = () => {
  return <SingleProduct />
}

export default ProductSinglePage
