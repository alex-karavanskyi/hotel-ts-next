'use client'
import styled from 'styled-components'
import { Search, Sort, Price, Category, ClearButton } from '@/components/home'
import {
  FilterFields,
  HandleClearButtonFn,
  HandleFiltersFn,
} from '@/shared/types/productsType'

interface FiltersProps extends FilterFields {
  search: string
  handleFilters: HandleFiltersFn
  handleClearButton: HandleClearButtonFn
}

const Filters: React.FC<FiltersProps> = ({
  category,
  search,
  price,
  min_price,
  max_price,
  handleFilters,
  handleClearButton,
}) => {
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
