type ProductFilters = {
  text: string
  category: string
  price: number
  min_price: number
  max_price: number
  [key: string]: string | number
}

export type FilterState = {
  filtered_products: Product[]
  all_products: Product[]
  grid_view: boolean
  sort: string
  filters: ProductFilters
}

export type FilterFields = {
  category: string
  price: number
  min_price: number
  max_price: number
}

export type Product = {
  id: string
  name: string
  description: string
  image: string
  images: string[]
  price: number
  category: string
}

export enum FilterName {
  Category = 'category',
  Price = 'price',
  Text = 'text',
  Sort = 'sort',
}

export type HandleFiltersFn = <T extends string | number>(
  name: FilterName,
  value: T
) => void

export type HandleClearButtonFn = () => void
