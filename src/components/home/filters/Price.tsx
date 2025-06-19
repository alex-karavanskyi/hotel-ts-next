'use client'
import styled from 'styled-components'
import { containerStyles } from '@/utils/styles'
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

  @media (min-width: 1400px) {
    padding: 0;
  }
`

export default Price
