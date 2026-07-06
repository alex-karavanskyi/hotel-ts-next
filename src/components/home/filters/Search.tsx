'use client'
import styled from 'styled-components'

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
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 77px;
    background: rgba(255, 255, 255, 0.08);
    color: var(--clr-grey-10);
    letter-spacing: var(--spacing);
    outline: none;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    transition: var(--transition);
  }

  .search__input::placeholder {
    color: rgba(241, 245, 249, 0.7);
    text-transform: capitalize;
  }

  .search__input:hover,
  .search__input:focus {
    border-color: rgba(255, 255, 255, 0.24);
    background: rgba(255, 255, 255, 0.14);
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.16);
  }
`

export default Search
