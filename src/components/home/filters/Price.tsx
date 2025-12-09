'use client'
import styled from 'styled-components'
import { device } from '@/shared/constants/device'
import { formatPrice } from '@/shared/utils/formatPrice'
import {
  FilterFields,
  FilterName,
  HandleFiltersFn,
} from '@/shared/types/productsType'

interface PriceProps
  extends Pick<FilterFields, 'price' | 'min_price' | 'max_price'> {
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
        className='price__input'
        onChange={(e) =>
          handleFilters(FilterName.Price, Number(e.target.value))
        }
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: var(--clr-grey-dark);
  h5 {
    font-size: 1rem;
  }
  .price__input {
    width: 7rem;
  }

  @media ${device.desktop} {
    padding: 0;
  }
`

export default Price
