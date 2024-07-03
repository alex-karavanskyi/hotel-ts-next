'use client'
import styled from 'styled-components'
import { useEffect, useState, memo } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { getUniqueValues, formatPrice } from '@/utils/helpers'
import { numberPagination } from '@/redux/features/paginationSlice'
import {
  clearFilters,
  updateFilters,
  loadProducts,
  filterProducts,
} from '@/redux/features/filterSlice'

type HandleValue = string | number

const Filters = () => {
  const {
    filters: { text, category, min_price, price, max_price },
    all_products,
  } = useAppSelector((store) => store.filter)
  const [buttonColor, setButtonColor] = useState<string>(category)
  const { products } = useAppSelector((store) => store.products)

  const dispatch = useAppDispatch()

  const categories = getUniqueValues(all_products, 'category')

  const handleFilters = (
    e: React.FormEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    let name = e.currentTarget.name
    let value: HandleValue = e.currentTarget.value
    if (name === 'category') {
      value = e.currentTarget.textContent || ''
      setButtonColor(value)
    }
    if (name === 'price') {
      value = Number(value)
    }
    dispatch(updateFilters({ name, value }))
    dispatch(numberPagination(1))
  }

  useEffect(() => {
    dispatch(loadProducts(products))
  }, [products, dispatch])

  useEffect(() => {
    dispatch(filterProducts())
  }, [category, price, text, dispatch])

  return (
    <Wrapper>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='filters__search'>
          <input
            type='text'
            name='text'
            placeholder='search'
            className='filters__search-input'
            value={text}
            onChange={handleFilters}
          />
          {categories.map((c, index) => {
            if (typeof c === 'string') {
              return (
                <button
                  key={index}
                  onClick={handleFilters}
                  type='button'
                  name='category'
                  style={{
                    border:
                      buttonColor === c
                        ? 'solid 2px black'
                        : 'var(--clr-grey-5)',
                  }}
                >
                  {c}
                </button>
              )
            }
            return null
          })}
        </div>
        <div className='filters__control-price'>
          <h5>price</h5>
          <p>{formatPrice(price)}</p>
          <input
            type='range'
            name='price'
            min={min_price}
            max={max_price}
            value={price}
            onChange={handleFilters}
          />
        </div>
      </form>
      <button
        type='button'
        className='filters__clear-btn'
        onClick={() => dispatch(clearFilters())}
      >
        clear filters
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 0 auto;
  max-width: 1248px;
  margin-bottom: 50px;
  .filters__search {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .filters__search button {
    display: grid;
    grid-template-columns: 118px;
    text-transform: capitalize;
    background: transparent;
    border: none;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
    padding: 14px;
  }
  .filters__search-input {
    padding-left: 0.5rem;
    margin-right: 1rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .filters__search-input::placeholder {
    text-transform: capitalize;
  }
  .filters__control-price {
    padding-top: 30px;
    margin-left: 14px;
  }
  .filters__clear-btn {
    padding-top: 14px;
    margin-left: 14px;
    text-transform: capitalize;
    background: transparent;
    border: none;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`

export default memo(Filters)
