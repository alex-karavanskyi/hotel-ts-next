export type Product = {
  id: string
  name: string
  price: number
  images: string[]
  image: string
  description: string
  category: string
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

export type HandleFiltersFn = (name: string, value: string | number) => void
export type HandleClearButtonFn = () => void
