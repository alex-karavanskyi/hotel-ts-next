'use client'
import React from 'react'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  clearFilters,
  updateFilters,
  loadProducts,
  filterProducts,
} from '../app/global/features/filterSlice'
import { getUniqueValues, formatPrice } from '../helpers'

const Filters = () => {
  const { products } = useSelector((store) => store.products)
  const {
    filters: { text, category, min_price, price, max_price },
    all_products,
  } = useSelector((store) => store.filter)

  const dispatch = useDispatch()

  const categories = getUniqueValues(all_products, 'category')

  const handleFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'category') {
      value = e.target.textContent
    }
    if (name === 'price') {
      value = Number(value)
    }
    dispatch(updateFilters({ name, value }))
  }

  useEffect(() => {
    dispatch(loadProducts(products))
  }, [products, dispatch])

  useEffect(() => {
    dispatch(filterProducts())
  }, [category, min_price, price, max_price, text, dispatch])

  return (
    <Wrapper>
      <div className='content'>
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
              return (
                <button
                  key={index}
                  onClick={handleFilters}
                  type='button'
                  name='category'
                >
                  {c}
                </button>
              )
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
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
  }
  .search-input {
    padding: 0.5rem;
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
    grid-template-columns: 120px;
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
    padding-top: 30px;
  }
  .form-control-price {
    padding-left: 330px;
    padding-top: 30px;
  }
  .clear-btn {
    padding: 14px;
    margin-left: 325px;
    margin-top: 5px;
    margin-bottom: 45px;
    text-transform: capitalize;
    background: transparent;
    border: none;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .clear-btn {
      margin-left: 0;
    }
    .form-control-price {
      padding-left: 0;
    }
  }
  /* @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  } */
`

export default Filters
