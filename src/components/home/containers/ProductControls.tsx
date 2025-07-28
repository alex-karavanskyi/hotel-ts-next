'use client'
import { useState, useEffect } from 'react'
import { Sidebar, Filters } from '@/components/home/'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useFilters } from '@/shared/hooks/useFilters'
import { useIsMobile } from '@/shared/hooks/useIsMobile'
import { getProductsItems } from '@/redux/features/productSlice'
import { url } from '@/shared/constants/db'
import { Loading, Error } from '@/layout'
import {
  loadProducts,
  filterProducts,
  sortProducts,
} from '@/redux/features/filterSlice'

const ProductControls = () => {
  const isMobile = useIsMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { search, handleFilters, handleClearButton } = useFilters()
  const {
    products,
    products_loading: loading,
    products_error: error,
  } = useAppSelector((store) => store.products)
  const {
    filters: { category, price, text, min_price, max_price },
    sort,
  } = useAppSelector((store) => store.filter)
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

  if (loading) return <Loading />
  if (error) return <Error />

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
        <Filters
          category={category}
          search={search}
          price={price}
          min_price={min_price}
          max_price={max_price}
          handleFilters={handleFilters}
          handleClearButton={handleClearButton}
        />
      )}
    </>
  )
}

export default ProductControls
