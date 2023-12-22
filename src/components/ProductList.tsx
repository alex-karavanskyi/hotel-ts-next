'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { GridView, ListView } from '@/components'
import Pagination from './Pagination'
import { numberPagination } from '@/redux/features/paginationSlice'

const ProductList = () => {
  const [postsPerPage] = useState(4)
  const { filtered_products: products, grid_view } = useAppSelector(
    (store) => store.filter
  )
  const { pagination } = useAppSelector((store) => store.pagination)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsLargeScreen(mediaQuery.matches)

    const handleMediaQueryChange = (event: { matches: boolean }) => {
      setIsLargeScreen(event.matches)
    }
    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  const indexOfLastPost = pagination * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) =>
    dispatch(numberPagination(pageNumber))

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    )
  }
  if (grid_view === false) {
    return <ListView products={products} />
  }
  if (isLargeScreen) {
    return <ListView products={products} />
  }
  return (
    <>
      <GridView products={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={products.length}
        paginate={paginate}
      />
    </>
  )
}

export default ProductList
