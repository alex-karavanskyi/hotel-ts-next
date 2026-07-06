'use client'
import { useEffect } from 'react'

import { BsFillGridFill, BsList } from 'react-icons/bs'
import styled from 'styled-components'

import { setGridView, setListView } from '@/redux/features/filterSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { device } from '@/shared/constants/device'
import { FilterName, HandleFiltersFn } from '@/shared/types/productsType'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

interface SortProps {
  handleFilters: HandleFiltersFn
}

const Sort: React.FC<SortProps> = ({ handleFilters }) => {
  const {
    filtered_products: products,
    grid_view,
    sort,
  } = useAppSelector(store => store.filter)

  const { products_loading: loading } = useAppSelector(store => store.products)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const syncView = (e: StorageEvent) => {
      if (e.key === 'grid_view') {
        if (e.newValue === 'true') {
          dispatch(setGridView())
        } else {
          dispatch(setListView())
        }
      }
    }
    window.addEventListener('storage', syncView)
    return () => window.removeEventListener('storage', syncView)
  }, [dispatch])

  return (
    <Container>
      <div className="sort__container">
        <div className="sort__btn" role="group" aria-label="View mode toggle">
          <button
            type="button"
            className={`${grid_view ? 'sort__btn-active' : ''}`}
            onClick={() => dispatch(setGridView())}
            aria-label="Grid view"
            aria-pressed={grid_view}
          >
            <BsFillGridFill />
          </button>
          <button
            type="button"
            className={`${!grid_view ? 'sort__btn-active' : ''}`}
            onClick={() => dispatch(setListView())}
            aria-label="List view"
            aria-pressed={!grid_view}
          >
            <BsList />
          </button>
        </div>
        <p className="sort__title">
          {loading ? 'loading…' : `${products.length} products found`}
        </p>
        <hr />
        <div className="sort__select-wrapper">
          <label htmlFor="sort-select" className="sort__label">
            Sort by:
          </label>
          <select
            name="sort"
            id="sort"
            className="sort__select"
            value={sort}
            onChange={e => handleFilters(FilterName.Sort, e.target.value)}
          >
            <option value="price-lowest">price (lowest)</option>
            <option value="price-highest">price (highest)</option>
            <option value="name-a">name (a-z)</option>
            <option value="name-z">name (z-a)</option>
          </select>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  ${containerStyles}
  padding-left: 1rem;
  padding-right: 1rem;
  .sort__btn {
    display: none;
  }
  .sort__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .sort__title {
    text-transform: capitalize;
    color: white;
    font-weight: 500;
  }
  .sort__label {
    text-transform: capitalize;
    color: white;
    font-weight: 500;
    font-size: 0.95rem;
    margin-right: 0.5rem;
  }
  .sort__select-wrapper {
    width: max-content;
    position: relative;
  }
  .sort__select {
    appearance: none;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 77px;
    padding: 0.65rem 1rem;
    font-size: 0.95rem;
    color: var(--clr-grey-10);
    cursor: pointer;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 8px 24px rgba(2, 6, 23, 0.25);
    backdrop-filter: blur(10px);
    transition: var(--transition);
    &:hover,
    &:focus {
      border-color: rgba(255, 255, 255, 0.28);
      background: rgba(255, 255, 255, 0.14);
      box-shadow:
        0 0 0 3px rgba(255, 255, 255, 0.08),
        0 10px 30px rgba(0, 0, 0, 0.3);
      outline: none;
    }
    option {
      background-color: #111827;
      color: #f8fafc;
    }
  }

  @media ${device.tablet} {
    .sort__btn {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.3rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 999px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(10px);

      button {
        background: transparent;
        border: 1px solid transparent;
        color: rgba(248, 250, 252, 0.78);
        width: 2.1rem;
        height: 2.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        cursor: pointer;
        transition:
          background 0.25s ease,
          color 0.25s ease,
          transform 0.25s ease,
          box-shadow 0.25s ease;

        &:hover:not(.sort__btn-active) {
          background: rgba(255, 255, 255, 0.12);
          color: var(--clr-white);
          transform: translateY(-1px);
        }

        &.sort__btn-active {
          background: linear-gradient(135deg, #38bdf8, #6366f1);
          color: #f8fafc;
          box-shadow: 0 8px 18px rgba(99, 102, 241, 0.28);
          border-color: rgba(255, 255, 255, 0.24);
        }

        &.sort__btn-active:hover {
          background: linear-gradient(135deg, #60a5fa, #818cf8);
          transform: translateY(-1px);
        }
      }
    }
    .sort__container {
      display: grid;
      grid-template-columns: auto auto 1fr auto;
      align-items: center;
      column-gap: 2rem;
    }
  }

  @media ${device.desktop} {
    padding-left: 0;
    padding-right: 0;
  }
`

export default Sort
