'use client'
import styled from 'styled-components'

import { ClearButton, Price, Search } from '@/components/home'
import { device } from '@/shared/constants/device'
import {
  FilterFields,
  HandleClearButtonFn,
  HandleFiltersFn,
} from '@/shared/types/productsType'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

interface FiltersProps extends FilterFields {
  search: string
  handleFilters: HandleFiltersFn
  handleClearButton: HandleClearButtonFn
}

const Filters: React.FC<FiltersProps> = ({
  search,
  price,
  min_price,
  max_price,
  handleFilters,
  handleClearButton,
}) => {
  return (
    <Container>
      <Search search={search} handleFilters={handleFilters} />
      <Price
        price={price}
        min_price={min_price}
        max_price={max_price}
        handleFilters={handleFilters}
      />
      <ClearButton handleClearButton={handleClearButton} />
    </Container>
  )
}

const Container = styled.aside`
  ${containerStyles}
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 1rem;

  @media ${device.desktop} {
    padding-left: 0;
  }
`

export default Filters
