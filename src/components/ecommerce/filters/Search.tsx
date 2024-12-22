'use client'
import styled from 'styled-components'

interface SearchProps {
  search: string
  handleFilters: (filterType: string, value: string) => void
}

const Search: React.FC<SearchProps> = ({ search, handleFilters }) => {
  return (
    <Wrapper>
      <input
        type='text'
        name='text'
        placeholder='Search'
        className='search__input'
        onChange={(e) => handleFilters('text', e.target.value)}
        value={search}
      />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .search__input {
    padding: 1rem;
    margin-right: 1rem;
    border-color: transparent;
    border-radius: var(--radius);
    background: var(--clr-grey-10);
    letter-spacing: var(--spacing);
  }
  .search__input::placeholder {
    text-transform: capitalize;
  }
`

export default Search
