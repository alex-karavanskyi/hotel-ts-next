type Products = {
  id: string
  name: string
  price: number
  image: string
  colors: string[]
  company: string
  shipping: boolean
  description: string
  category: string
  images?: [
    {
      id: string
      width: number
      height: number
      url: string
      filename: string
      size: number
      type: string
      thumbnails: {
        small: {
          url: string
          width: number
          height: number
        }
        large: {
          url: string
          width: number
          height: number
        }
        full: {
          url: string
          width: number
          height: number
        }
      }
    }
  ]
  stock?: number
  featured?: boolean
  reviews?: number
  stars?: number
}

export default Products
