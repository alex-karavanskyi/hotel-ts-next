'use client'
import styled from 'styled-components'
import {
  HandleFiltersFn,
  FilterState,
  Product,
} from '@/shared/types/productsType'
import { containerStyles } from '@/shared/utils/containerStyles'
import { formatPrice } from '@/shared/utils/formatPrice'

interface PriceProps {
  price: Product['price']
  min_price: FilterState['filters']['min_price']
  max_price: FilterState['filters']['max_price']
  handleFilters: HandleFiltersFn
}

const Price: React.FC<PriceProps> = ({
  price,
  min_price,
  max_price,
  handleFilters,
}) => {
  return (
    <Container>
      <h5>price</h5>
      <p>{formatPrice(price)}</p>
      <input
        type='range'
        name='price'
        min={min_price}
        max={max_price}
        value={price}
        onChange={(e) => handleFilters('price', Number(e.target.value))}
      />
    </Container>
  )
}

const Container = styled.div`
  ${containerStyles}
  color: var(--clr-grey-dark);
  h5 {
    font-size: 1rem;
  }

  @media (min-width: 1400px) {
    padding: 0;
  }
`

export default Price
