'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { GridView, ListView } from '../components'

const ProductList = () => {
  const { filtered_products: products, grid_view } = useSelector(
    (store) => store.filter
  )
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsLargeScreen(mediaQuery.matches)

    const handleMediaQueryChange = (event) => {
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
    return <ListView products={products}>product list</ListView>
  }
  return <GridView products={products}>product list</GridView>
}

export default ProductList
