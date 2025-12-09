'use client'
import styled from 'styled-components'
import { Search, Price, Category, ClearButton, Sort } from '@/components/home'
import { useState } from 'react'
import {
  FilterFields,
  HandleClearButtonFn,
  HandleFiltersFn,
} from '@/shared/types/productsType'

interface SidebarProps extends FilterFields {
  isSidebarOpen: boolean
  search: string
  handleFilters: HandleFiltersFn
  handleClearButton: HandleClearButtonFn
  setIsSidebarOpen: (value: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  search,
  category,
  price,
  min_price,
  max_price,
  handleFilters,
  handleClearButton,
  setIsSidebarOpen,
}) => {
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
            <Category buttonColor={category} handleFilters={handleFilters} />
            <Search search={search} handleFilters={handleFilters} />
            <Price
              price={price}
              min_price={min_price}
              max_price={max_price}
              handleFilters={handleFilters}
            />
            <ClearButton handleClearButton={handleClearButton} />
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
  padding-top: 1rem;
  padding-bottom: 1rem;
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
  ${(props) => props.side}: 0;
  position: fixed;
  top: var(--navbar-height);
  width: 50%;
  height: 100%;
  background: var(--gradient-navbar-footer-bg);
  padding-left: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export default Sidebar
