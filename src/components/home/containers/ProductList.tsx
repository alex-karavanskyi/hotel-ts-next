'use client'
import { GridView, ListView, Pagination } from '@/components/home'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useIsMobile } from '@/shared/hooks/useIsMobile'

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

export default ProductList
