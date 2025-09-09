'use client'
import styled from 'styled-components'
import { Search, Sort, Price, Category, ClearButton } from '@/components/home'
import {
  FilterState,
  HandleClearButtonFn,
  HandleFiltersFn,
  Product,
} from '@/shared/types/productsType'

interface FiltersProps {
  search: string
  category: Product['category']
  price: Product['price']
  min_price: FilterState['filters']['min_price']
  max_price: FilterState['filters']['max_price']
  handleFilters: HandleFiltersFn
  handleClearButton: HandleClearButtonFn
}

const Filters = ({
  category,
  search,
  price,
  min_price,
  max_price,
  handleFilters,
  handleClearButton,
}: FiltersProps) => {
  return (
    <Container>
      <form onSubmit={(e) => e.preventDefault()}>
        <Category buttonColor={category} handleFilters={handleFilters} />
        <Search search={search} handleFilters={handleFilters} />
        <Price
          price={price}
          min_price={min_price}
          max_price={max_price}
          handleFilters={handleFilters}
        />
      </form>
      <ClearButton handleClearButton={handleClearButton} />
      <Sort handleFilters={handleFilters} />
    </Container>
  )
}

const Container = styled.aside`
  margin-bottom: 3.1rem;
`

export default Filters
