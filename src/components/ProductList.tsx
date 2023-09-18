'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/app/redux/hooks'
import { GridView, ListView } from '@/components'

const ProductList = () => {
  const { filtered_products: products, grid_view } = useAppSelector(
    (store) => store.filter
  )
  const [isLargeScreen, setIsLargeScreen] = useState(false)

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
  return <GridView products={products} />
}

export default ProductList
