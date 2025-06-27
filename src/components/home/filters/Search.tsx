'use client'
import styled from 'styled-components'
import { containerStyles } from '@/utils/styles'

interface SearchProps {
  search: string
  handleFilters: (filterType: string, value: string) => void
}

const Search: React.FC<SearchProps> = ({ search, handleFilters }) => {
  return (
    <Container>
      <input
        type='search'
        name='text'
        placeholder='Search'
        className='search__input'
        onChange={(e) => handleFilters('text', e.target.value)}
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
