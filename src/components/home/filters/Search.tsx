'use client'
import styled from 'styled-components'

import { device } from '@/shared/constants/device'
import { FilterName, HandleFiltersFn } from '@/shared/types/productsType'

interface SearchProps {
  search: string
  handleFilters: HandleFiltersFn
}

const Search: React.FC<SearchProps> = ({ search, handleFilters }) => {
  return (
    <Container>
      <input
        data-cy="search"
        type="search"
        name="text"
        placeholder="Search"
        className="search__input"
        onChange={e => handleFilters(FilterName.Text, e.target.value)}
        value={search}
      />
    </Container>
  )
}

const Container = styled.div`
  .search__input {
    width: 12rem;
    padding: 0.8rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 77px;
    background: rgba(255, 255, 255, 0.08);
    color: var(--clr-grey-10);
    letter-spacing: var(--spacing);
    outline: none;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 8px 24px rgba(2, 6, 23, 0.25);
    backdrop-filter: blur(10px);
    transition: var(--transition);
  }

  .search__input::placeholder {
    color: rgba(241, 245, 249, 0.75);
    text-transform: capitalize;
  }

  .search__input:hover,
  .search__input:focus {
    border-color: rgba(255, 255, 255, 0.28);
    background: rgba(255, 255, 255, 0.14);
    box-shadow:
      0 0 0 3px rgba(255, 255, 255, 0.08),
      0 10px 30px rgba(0, 0, 0, 0.3);
  }

  @media ${device.desktop} {
    padding: 0;
  }
`

export default Search
