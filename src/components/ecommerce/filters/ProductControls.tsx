'use client'
import styled from 'styled-components'
import { useFilters } from '@/hooks/useFilters'
import { Search, Sort, Price, Category } from '@/components/ecommerce'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  loadProducts,
  filterProducts,
  sortProducts,
} from '@/redux/features/filterSlice'

const ProductControls = () => {
  const { search, handleFilters, handleClearButton } = useFilters()
  const { products } = useAppSelector((store) => store.products)
  const {
    filters: { category, price, text, min_price, max_price },
    sort,
  } = useAppSelector((store) => store.filter)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadProducts(products))
  }, [products, dispatch])

  useEffect(() => {
    dispatch(filterProducts())
    dispatch(sortProducts())
  }, [category, price, text, sort, dispatch])

  return (
    <Wrapper>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='product__control-search-category'>
          <Search search={search} handleFilters={handleFilters} />
          <Category buttonColor={category} handleFilters={handleFilters} />
        </div>
        <Price
          price={price}
          min_price={min_price}
          max_price={max_price}
          handleFilters={handleFilters}
        />
      </form>
      <button
        type='button'
        className='product__control-clear-btn'
        onClick={handleClearButton}
      >
        clear filters
      </button>
      <Sort handleFilters={handleFilters} />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-bottom: 3.1rem;
  .product__control-search-category {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .product__control-clear-btn {
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-transform: capitalize;
    background: transparent;
    border: none;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-dark);
    cursor: pointer;
  }
`

export default ProductControls
