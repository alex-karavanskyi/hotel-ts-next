'use client'
import styled from 'styled-components'
import { Search, Price, Category, ClearButton, Sort } from '@/components/home'
import { useState } from 'react'
import {
  HandleClearButtonFn,
  HandleFiltersFn,
} from '@/shared/types/productsType'

interface SidebarProps {
  isSidebarOpen: boolean
  category: string
  search: string
  price: number
  min_price: number
  max_price: number
  handleFilters: HandleFiltersFn
  handleClearButton: HandleClearButtonFn
  setIsSidebarOpen: (value: boolean) => void
}

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  category,
  search,
  price,
  min_price,
  max_price,
  handleFilters,
  handleClearButton,
}: SidebarProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false)

  return (
    <>
      <Conteiner>
        <MobileFiltersToggle onClick={() => setIsSidebarOpen(true)}>
          Filters
        </MobileFiltersToggle>
        <HorizontalLine />
        <MobileFiltersToggle onClick={() => setIsSortOpen(true)}>
          Sort
        </MobileFiltersToggle>
      </Conteiner>

      {isSidebarOpen && (
        <SidebarOverlay onClick={() => setIsSidebarOpen(false)}>
          <SidebarContent side='right' onClick={(e) => e.stopPropagation()}>
            <form onSubmit={(e) => e.preventDefault()}>
              <Category buttonColor={category} handleFilters={handleFilters} />
              <Search search={search} handleFilters={handleFilters} />
              <Price
                price={price}
                min_price={min_price}
                max_price={max_price}
                handleFilters={handleFilters}
              />
              <ClearButton handleClearButton={handleClearButton} />
            </form>
          </SidebarContent>
        </SidebarOverlay>
      )}

      {isSortOpen && (
        <SidebarOverlay onClick={() => setIsSortOpen(false)}>
          <SidebarContent side='left' onClick={(e) => e.stopPropagation()}>
            <Sort handleFilters={handleFilters} />
          </SidebarContent>
        </SidebarOverlay>
      )}
    </>
  )
}

const Conteiner = styled.aside`
  display: flex;
  justify-content: space-evenly;
`
const HorizontalLine = styled.hr`
  width: 50%;
  height: 1px;
  background-color: white;
  border: none;
  margin: 0.75rem 0;
`

const MobileFiltersToggle = styled.button`
  background-color: #111;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

const SidebarOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
`

const SidebarContent = styled.div<{ side: 'left' | 'right' }>`
  position: fixed;
  top: 0;
  ${(props) => props.side}: 0;
  width: 80%;
  max-width: 320px;
  height: 100%;
  background: var(--gradient-navbar-footer-bg);
  padding: 1.5rem;
  overflow-y: auto;
`

export default Sidebar
