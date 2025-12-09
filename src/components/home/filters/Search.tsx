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
        data-cy='search'
        type='search'
        name='text'
        placeholder='Search'
        className='search__input'
        onChange={(e) => handleFilters(FilterName.Text, e.target.value)}
        value={search}
      />
    </Container>
  )
}

const Container = styled.div`
  .search__input {
    width: 12rem;
    padding: 0.7rem 1rem;
    border-color: transparent;
    border-radius: var(--radius);
    background: var(--clr-grey-10);
    letter-spacing: var(--spacing);
    outline: none;
  }
  .search__input::placeholder {
    text-transform: capitalize;
  }

  @media ${device.desktop} {
    padding: 0;
  }
`

export default Search
