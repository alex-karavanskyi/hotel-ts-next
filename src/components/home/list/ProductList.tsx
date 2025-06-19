'use client'
import { useEffect, useState } from 'react'
import { GridView, ListView, Pagination } from '@/components/home'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getProductsItems } from '@/redux/features/productSlice'
import { url } from '@/constants/db'

const ProductList = () => {
  const [postsPerPage] = useState(6)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const { filtered_products: products, grid_view } = useAppSelector(
    (store) => store.filter
  )
  const { pagination } = useAppSelector((store) => store.pagination)

  const currentPosts = products.slice(
    (pagination - 1) * postsPerPage,
    pagination * postsPerPage
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProductsItems(url))
  }, [dispatch])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsLargeScreen(mediaQuery.matches)

    const handleMediaQueryChange = (event: { matches: boolean }) => {
      setIsLargeScreen(event.matches)
    }
    mediaQuery.addEventListener('change', handleMediaQueryChange)
    return () =>
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
  }, [])

  if (products.length < 1) {
    return (
      <h5
        style={{
          textTransform: 'none',
          margin: 0,
          paddingBottom: '1rem',
          textAlign: 'center',
        }}
      >
        Sorry, no products matched your search...
      </h5>
    )
  }

  if (!grid_view || isLargeScreen) {
    return <ListView products={products} />
  }

  return (
    <>
      <GridView products={currentPosts} />
      <Pagination postsPerPage={postsPerPage} totalPosts={products.length} />
    </>
  )
}

export default ProductList
