'use client'
import styled from 'styled-components'

import {
  Category,
  Filters,
  GridView,
  ListView,
  Pagination,
  Sort,
} from '@/components/home'
import { useAppSelector } from '@/redux/hooks'
import { device } from '@/shared/constants/device'
import { useFilters } from '@/shared/hooks/useFilters'
import { useIsMobile } from '@/shared/hooks/useIsMobile'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

const postsPerPage = 6

const ProductList = () => {
  const isMobile = useIsMobile()
  const { search, handleFilters, handleClearButton } = useFilters()

  const { pagination } = useAppSelector(store => store.pagination)

  const {
    filtered_products: products,
    grid_view,
    filters: { category, price, min_price, max_price },
  } = useAppSelector(store => store.filter)

  const { products_loading: loading, products_error: error } = useAppSelector(
    store => store.products
  )

  const currentPosts = products.slice(
    (pagination - 1) * postsPerPage,
    pagination * postsPerPage
  )

  if (isMobile) {
    if (!loading && !error && products.length < 1) {
      return (
        <Message data-cy="no-results">
          Sorry, no products matched your search...
        </Message>
      )
    }

    if (!grid_view) {
      return <ListView products={products} isLoading={loading} />
    }

    return (
      <>
        <GridView products={currentPosts} isLoading={loading} />
        <Pagination postsPerPage={postsPerPage} totalPosts={products.length} />
      </>
    )
  }

  return (
    <CatalogShell>
      <FilterPanel>
        <PanelHeading>Refine your search</PanelHeading>
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
      </FilterPanel>

      <ProductsPanel>
        <Sort handleFilters={handleFilters} />
        {!loading && !error && products.length < 1 ? (
          <Message data-cy="no-results">
            Sorry, no products matched your search...
          </Message>
        ) : !grid_view ? (
          <ListView products={products} isLoading={loading} />
        ) : (
          <>
            <GridView products={currentPosts} isLoading={loading} />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={products.length}
            />
          </>
        )}
      </ProductsPanel>
    </CatalogShell>
  )
}

const CatalogShell = styled.section`
  ${containerStyles}
  display: grid;
  gap: 1.5rem;
  padding: 1rem 1rem 2rem;

  @media ${device.tablet} {
    grid-template-columns: minmax(260px, 300px) minmax(0, 1fr);
    align-items: start;
    gap: 2rem;
    padding: 1.5rem 1rem 2.5rem;
  }

  @media ${device.desktop} {
    padding: 2rem 0 3rem;
  }
`

const FilterPanel = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 1.5rem;
  background: rgba(15, 23, 42, 0.7);
  box-shadow:
    0 20px 45px rgba(2, 6, 23, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
  position: sticky;
  top: calc(var(--navbar-height) + 1rem);
`

const PanelHeading = styled.h4`
  color: var(--clr-white);
  font-size: 1.05rem;
  text-align: center;
`

const ProductsPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Message = styled.h5`
  text-align: center;
  padding: 1rem 0 1.5rem;
  text-transform: none;
  color: var(--clr-grey-10);
  font-size: 1rem;
`

export default ProductList
