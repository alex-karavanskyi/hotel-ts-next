'use client'
import styled from 'styled-components'

import {
  FilterFields,
  FilterName,
  HandleFiltersFn,
} from '@/shared/types/productsType'
import { formatPrice } from '@/shared/utils/formatPrice'

interface PriceProps extends Pick<
  FilterFields,
  'price' | 'min_price' | 'max_price'
> {
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
      <div className="price__header">
        <h5>price</h5>
        <p>{formatPrice(price)}</p>
      </div>
      <input
        type="range"
        name="price"
        min={min_price}
        max={max_price}
        value={price}
        className="price__input"
        style={{
          background: `linear-gradient(
      to right,
      #ff680a 0%,
      #ff680a ${((price - min_price) / (max_price - min_price)) * 100}%,
      #d1d5db ${((price - min_price) / (max_price - min_price)) * 100}%,
      #d1d5db 100%
    )`,
        }}
        onChange={e => handleFilters(FilterName.Price, Number(e.target.value))}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  color: var(--clr-grey-dark);
  .price__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h5 {
    font-size: 0.95rem;
    color: var(--clr-white);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  p {
    color: var(--clr-white);
    font-weight: 600;
  }
  .price__input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 999px;
    outline: none;
  }
  .price__input::-webkit-slider-runnable-track {
    height: 6px;
    background: transparent;
  }
  .price__input::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    margin-top: -6px;
    border-radius: 50%;
    background: #ff680a;
    border: none;
    cursor: pointer;
  }
`

export default Price
