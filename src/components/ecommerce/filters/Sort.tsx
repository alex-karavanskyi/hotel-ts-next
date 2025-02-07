'use client'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import { setGridView, setListView } from '@/redux/features/filterSlice'

interface SortProps {
  handleFilters: (filterType: string, value: string) => void
}

const Sort: React.FC<SortProps> = ({ handleFilters }) => {
  const {
    filtered_products: products,
    grid_view,
    sort,
  } = useAppSelector((store) => store.filter)

  const dispatch = useAppDispatch()

  return (
    <Wrapper>
      <div className='sort__container'>
        <div className='sort__btn'>
          <button
            type='button'
            className={`${grid_view ? 'sort__btn-active' : null}`}
            onClick={() => dispatch(setGridView())}
          >
            <BsFillGridFill />
          </button>
          <button
            type='button'
            className={`${!grid_view ? 'sort__btn-active' : null}`}
            onClick={() => dispatch(setListView())}
          >
            <BsList />
          </button>
        </div>
        <p className='sort__title'>{products.length} products found</p>
        <hr />
        <form>
          <select
            name='sort'
            id='sort'
            className='sort__input'
            value={sort}
            onChange={(e) => handleFilters('sort', e.target.value)}
          >
            <option value='price-lowest'>price (lowest)</option>
            <option value='price-highest'>price (highest)</option>
            <option value='name-a'>name (a-z)</option>
            <option value='name-z'>name (z-a)</option>
          </select>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 2rem;
  .sort__container {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    align-items: center;
    column-gap: 2rem;
  }
  .sort__btn {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;

    button {
      background: transparent;
      border: none;
      color: var(--clr-white);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.3s ease;
      &:hover:not(.sort__btn-active) {
        background: rgba(211, 211, 211, 0.2);
      }
      &.sort__btn-active:hover {
        background: rgba(255, 165, 0, 0.7);
      }
      svg {
        font-size: 1rem;
      }
    }
    .sort__btn-active {
      background: rgba(255, 165, 0, 1);

      color: var(--clr-black);
    }
  }
  .sort__input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  .sort__title {
    text-transform: capitalize;
    margin-bottom: 0;
    color: var(--clr-grey-dark);
  }
  @media (max-width: 1500px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  @media (max-width: 768px) {
    .sort__btn {
      display: none;
    }
    .sort__container {
      display: flex;
      justify-content: space-between;
    }
  }
  @media (max-width: 576px) {
    .sort__btn {
      width: 3.1rem;
    }
  }
`

export default Sort
