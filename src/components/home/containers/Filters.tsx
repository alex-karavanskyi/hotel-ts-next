'use client'
import styled from 'styled-components'
import {
  HandleClearButtonFn,
  HandleFiltersFn,
} from '@/shared/types/productsType'
import { Search, Sort, Price, Category, ClearButton } from '@/components/home'

interface FiltersProps {
  category: string
  search: string
  price: number
  min_price: number
  max_price: number
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
