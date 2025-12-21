'use client'
import { useEffect, useState } from 'react'

import { Category, Filters, Sidebar, Sort } from '@/components/home/'
import {
  filterProducts,
  loadProducts,
  sortProducts,
} from '@/redux/features/filterSlice'
import { getProductsItems } from '@/redux/features/productSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { url } from '@/shared/constants/db'
import { useFilters } from '@/shared/hooks/useFilters'
import { useIsMobile } from '@/shared/hooks/useIsMobile'

const ProductControls = () => {
  const isMobile = useIsMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { search, handleFilters, handleClearButton } = useFilters()
  const { products, products_loading: loading } = useAppSelector(
    store => store.products
  )
  const {
    filters: { category, price, text, min_price, max_price },
    sort,
  } = useAppSelector(store => store.filter)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProductsItems(url))
  }, [dispatch])

  useEffect(() => {
    if (products.length > 0) {
      dispatch(loadProducts(products))
      dispatch(filterProducts())
      dispatch(sortProducts())
    }
  }, [products, dispatch])

  useEffect(() => {
    dispatch(filterProducts())
    dispatch(sortProducts())
  }, [category, price, text, sort, dispatch])

  return (
    <>
      {isMobile && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          category={category}
          search={search}
          price={price}
          min_price={min_price}
          max_price={max_price}
          handleFilters={handleFilters}
          handleClearButton={handleClearButton}
        />
      )}
      {!isMobile && (
        <>
          <Category
            buttonColor={category}
            handleFilters={handleFilters}
            loading={loading}
          />
          <Filters
            category={category}
            search={search}
            price={price}
            min_price={min_price}
            max_price={max_price}
            handleFilters={handleFilters}
            handleClearButton={handleClearButton}
          />
          <Sort handleFilters={handleFilters} />
        </>
      )}
    </>
  )
}

export default ProductControls
