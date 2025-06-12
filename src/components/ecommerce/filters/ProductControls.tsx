'use client'
import styled from 'styled-components'
import { useFilters } from '@/hooks/useFilters'
import {
  Search,
  Sort,
  Price,
  Category,
  ClearButton,
} from '@/components/ecommerce'
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
    <Container>
      <form onSubmit={(e) => e.preventDefault()}>
        <Category buttonColor={category} handleFilters={handleFilters} />
        <Search search={search} handleFilters={handleFilters} />
        <Price
          price={price}
          min_price={min_price}
          max_price={max_price}
          handleFilters={handleFilters}
        />
      </form>
      <ClearButton handleClearButton={handleClearButton} />
      <Sort handleFilters={handleFilters} />
    </Container>
  )
}

const Container = styled.aside`
  margin-bottom: 3.1rem;
`

export default ProductControls
