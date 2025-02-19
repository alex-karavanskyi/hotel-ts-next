export type Products = {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
  images: []
}

export type FilterState = {
  filtered_products: Products[]
  all_products: Products[]
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
