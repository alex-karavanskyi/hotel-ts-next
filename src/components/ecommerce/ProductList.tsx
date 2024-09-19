'use client'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { GridView, ListView, Pagination } from '@/components/ecommerce'

const ProductList = () => {
  const [postsPerPage] = useState(6)
  const { filtered_products: products, grid_view } = useAppSelector(
    (store) => store.filter
  )
  const { pagination } = useAppSelector((store) => store.pagination)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsLargeScreen(mediaQuery.matches)

    const handleMediaQueryChange = (event: { matches: boolean }) => {
      setIsLargeScreen(event.matches)
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange)
    return () =>
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
  }, [isLargeScreen])

  const indexOfLastPost = pagination * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost)

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
  if (grid_view === false) {
    return <ListView products={products} />
  }
  if (isLargeScreen) {
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
