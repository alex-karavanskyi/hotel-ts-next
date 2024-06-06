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
        <div className='form-control-container'>
          <input
            type='text'
            name='text'
            placeholder='search'
            className='search-input'
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
        <div className='form-control-price'>
          <h5>price</h5>
          <p className='price'>{formatPrice(price)}</p>
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
        className='clear-btn'
        onClick={() => dispatch(clearFilters())}
      >
        clear filters
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 0 auto;
  margin-bottom: 50px;
  max-width: 1248px;
  .search-input {
    padding-left: 0.5rem;
    margin-right: 1rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  .form-control-container button {
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
  .form-control-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .form-control-price {
    padding-top: 30px;
    margin-left: 14px;
  }
  .clear-btn {
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
