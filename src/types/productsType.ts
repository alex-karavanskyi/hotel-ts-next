export type Product = {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
  images: []
}

export type ApiProduct = {
  id: string
  name: string
  price: number
  images: { url: string }[]
  image?: string | null
  description?: string
  category?: string
}

export type FilterState = {
  filtered_products: Product[]
  all_products: Product[]
  grid_view: boolean
  sort: string
  filters: {
    text: string
    category: string
    min_price: number
    max_price: number
    price: number
    [index: string]: string | number
  }
}
