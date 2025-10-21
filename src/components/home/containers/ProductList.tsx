'use client'
import { GridView, ListView, Pagination } from '@/components/home'
import { useAppSelector } from '@/redux/hooks'
import { useIsMobile } from '@/shared/hooks/useIsMobile'
import styled from 'styled-components'

const postsPerPage = 6

const ProductList = () => {
  const isMobile = useIsMobile()
  const { filtered_products: products, grid_view } = useAppSelector(
    (store) => store.filter
  )

  const { pagination } = useAppSelector((store) => store.pagination)

  const currentPosts = products.slice(
    (pagination - 1) * postsPerPage,
    pagination * postsPerPage
  )

  if (products.length < 1) {
    return (
      <Message data-cy='no-results'>
        Sorry, no products matched your search...
      </Message>
    )
  }

  if (!grid_view || isMobile) {
    return <ListView products={products} />
  }

  return (
    <>
      <GridView products={currentPosts} />
      <Pagination postsPerPage={postsPerPage} totalPosts={products.length} />
    </>
  )
}

const Message = styled.h5`
  text-align: center;
  margin: 0;
  padding-bottom: 1rem;
  text-transform: none;
  color: white;
  font-size: 1rem;
`
export default ProductList
