type Products = {
  id: string
  name: string
  price: number
  image: string
  colors: string[]
  company: string
  description: string
  category: string
  shipping?: boolean
  featured?: boolean
  stock?: number
  reviews?: number
  stars?: number
}

export default Products
