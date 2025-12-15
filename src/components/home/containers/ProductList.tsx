'use client'
import styled from 'styled-components'
import { GridView, ListView, Pagination } from '@/components/home'
import { useAppSelector } from '@/redux/hooks'
import { useIsMobile } from '@/shared/hooks/useIsMobile'
import { useEffect, useState } from 'react'

const postsPerPage = 6

const ProductList = () => {
  const isMobile = useIsMobile()

  const { pagination } = useAppSelector((store) => store.pagination)

  const { filtered_products: products, grid_view } = useAppSelector(
    (store) => store.filter
  )

  const { products_loading: loading, products_error: error } = useAppSelector(
    (store) => store.products
  )

  const currentPosts = products.slice(
    (pagination - 1) * postsPerPage,
    pagination * postsPerPage
  )

  if (!loading && !error && products.length < 1) {
    return (
      <Message data-cy='no-results'>
        Sorry, no products matched your search...
      </Message>
    )
  }

  if (!grid_view || isMobile) {
    return <ListView products={products} isLoading={loading} />
  }

  return (
    <>
      <GridView products={currentPosts} isLoading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={products.length} />
    </>
  )
}

const Message = styled.h5`
  text-align: center;
  padding-bottom: 1rem;
  text-transform: none;
  color: white;
  font-size: 1rem;
`
export default ProductList
