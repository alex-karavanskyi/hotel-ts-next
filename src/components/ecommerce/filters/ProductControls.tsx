'use client'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { numberPagination } from '@/redux/features/paginationSlice'
import { Search, Sort, Price, Category } from '@/components/ecommerce'
import {
  clearFilters,
  updateFilters,
  updateSort,
  loadProducts,
  filterProducts,
  sortProducts,
} from '@/redux/features/filterSlice'

const ProductControls = () => {
  const {
    filters: { text, category, min_price, price, max_price, sort },
  } = useAppSelector((store) => store.filter)

  const { products } = useAppSelector((store) => store.products)

  const dispatch = useAppDispatch()

  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const [buttonColor, setButtonColor] = useState<string>(category)
  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || ''
  )

  const debouncedUpdateFilters = useDebouncedCallback(
    (updatedParams: URLSearchParams) => {
      replace(`${window.location.pathname}?${updatedParams.toString()}`)
    },
    500
  )

  const handleFilters = (name: string, value: string | number) => {
    const updatedParams = new URLSearchParams(searchParams.toString())

    if (name === 'category') {
      setButtonColor(value as string)
      updatedParams.set('category', value as string)
    }
    if (name === 'price') {
      updatedParams.set('price', value.toString())
    }
    if (name === 'text') {
      setSearch(value as string)
      if (value === '') {
        updatedParams.delete('search')
      } else {
        updatedParams.set('search', value as string)
      }
    }
    if (name === 'sort') {
      updatedParams.set('sort', value as string)
      if (typeof value === 'string') {
        dispatch(updateSort(value))
      }
    }
    dispatch(updateFilters({ name, value }))
    dispatch(numberPagination(1))
    debouncedUpdateFilters(updatedParams)
  }

  const handleClearButton = () => {
    dispatch(clearFilters())
    dispatch(numberPagination(1))
    setButtonColor('all')
    setSearch('')
    const updatedParams = new URLSearchParams()
    replace(`${window.location.pathname}?${updatedParams.toString()}`)
  }

  useEffect(() => {
    dispatch(loadProducts(products))
  }, [products, dispatch])

  useEffect(() => {
    dispatch(filterProducts())
  }, [category, price, text, dispatch])

  useEffect(() => {
    dispatch(sortProducts())
  }, [sort, dispatch])

  return (
    <Wrapper>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='product__control-search-category'>
          <Search search={search} handleFilters={handleFilters} />
          <Category buttonColor={buttonColor} handleFilters={handleFilters} />
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
