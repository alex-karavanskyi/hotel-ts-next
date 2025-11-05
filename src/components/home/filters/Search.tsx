'use client'
import styled from 'styled-components'
import { FilterName, HandleFiltersFn } from '@/shared/types/productsType'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

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
  ${containerStyles}
  .search__input {
    width: 10rem;
    padding: 1rem;
    border-color: transparent;
    border-radius: var(--radius);
    background: var(--clr-grey-10);
    letter-spacing: var(--spacing);
  }
  .search__input::placeholder {
    text-transform: capitalize;
  }

  @media (min-width: 1400px) {
    padding: 0;
  }
`

export default Search
