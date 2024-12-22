'use client'
import styled from 'styled-components'
import { formatPrice } from '@/utils/format'

interface PriceProps {
  price: number
  min_price: number
  max_price: number
  handleFilters: (name: string, value: number) => void
}

const Price: React.FC<PriceProps> = ({
  price,
  min_price,
  max_price,
  handleFilters,
}) => {
  return (
    <Wrapper>
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
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding-top: 1.9rem;
  color: var(--clr-grey-dark);
`
export default Price
