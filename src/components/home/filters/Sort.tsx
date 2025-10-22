'use client'
import styled from 'styled-components'
import { HandleFiltersFn } from '@/shared/types/productsType'
import { containerStyles } from '@/shared/ui/styles/containerStyles'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { setGridView, setListView } from '@/redux/features/filterSlice'
import { useEffect } from 'react'

interface SortProps {
  handleFilters: HandleFiltersFn
}

const Sort: React.FC<SortProps> = ({ handleFilters }) => {
  const {
    filtered_products: products,
    grid_view,
    sort,
  } = useAppSelector((store) => store.filter)

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
      <div className='sort__container'>
        <div className='sort__btn'>
          <button
            type='button'
            className={`${grid_view ? 'sort__btn-active' : ''}`}
            onClick={() => dispatch(setGridView())}
          >
            <BsFillGridFill />
          </button>
          <button
            type='button'
            className={`${!grid_view ? 'sort__btn-active' : ''}`}
            onClick={() => dispatch(setListView())}
          >
            <BsList />
          </button>
        </div>
        <p className='sort__title'>{products.length} products found</p>
        <hr />
        <div className='sort__select-wrapper'>
          <select
            name='sort'
            id='sort'
            className='sort__select'
            value={sort}
            onChange={(e) => handleFilters('sort', e.target.value)}
          >
            <option value='price-lowest'>price (lowest)</option>
            <option value='price-highest'>price (highest)</option>
            <option value='name-a'>name (a-z)</option>
            <option value='name-z'>name (z-a)</option>
          </select>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  ${containerStyles}

  .sort__btn {
    display: none;
  }

  .sort__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .sort__title {
    text-transform: capitalize;
    margin-bottom: 0;
    color: white;
    font-weight: 500;
  }

  .sort__select-wrapper {
    width: max-content;
    position: relative;
  }

  .sort__select {
    appearance: none;
    background-color: #1e1e1e;
    border: 1px solid #444;
    border-radius: var(--radius);
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #f1f1f1;
    cursor: pointer;
    transition: border 0.2s ease, background-color 0.2s ease;

    &:hover,
    &:focus {
      border-color: rgba(255, 165, 0, 1);
      background-color: #2a2a2a;
      outline: none;
    }

    option {
      background-color: #1e1e1e;
      color: #f1f1f1;
    }
  }

  @media (min-width: 768px) {
    .sort__btn {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 0.5rem;

      button {
        background: #2a2a2a;
        border: none;
        color: var(--clr-white);
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius);
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover:not(.sort__btn-active) {
          background: rgba(211, 211, 211, 0.2);
        }

        &.sort__btn-active {
          background: rgba(255, 165, 0, 1);
          color: var(--clr-black);
        }

        &.sort__btn-active:hover {
          background: rgba(255, 165, 0, 0.7);
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

  @media (min-width: 1400px) {
    padding: 0;
  }
`

export default Sort
