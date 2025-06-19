'use client'
import styled from 'styled-components'
import { getUniqueValues } from '@/utils/format'
import { useAppSelector } from '@/redux/hooks'

interface CategoryProps {
  buttonColor: string
  handleFilters: (filterType: string, value: string) => void
}

const Category: React.FC<CategoryProps> = ({ buttonColor, handleFilters }) => {
  const { all_products } = useAppSelector((store) => store.filter)
  const categories = getUniqueValues(all_products, 'category')

  return (
    <Container>
      {categories.map((c, index) => (
        <CategoryButton
          key={index}
          $isActive={buttonColor === c}
          onClick={() => handleFilters('category', c)}
          type='button'
        >
          {c}
        </CategoryButton>
      ))}
    </Container>
  )
}

const Container = styled.nav`
  padding: 0 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const CategoryButton = styled.button<{ $isActive: boolean }>`
  display: grid;
  grid-template-columns: 7.3rem;
  text-transform: capitalize;
  background: transparent;
  border: ${({ $isActive }) =>
    $isActive ? 'solid 2px orange' : 'var(--clr-grey-5)'};
  letter-spacing: var(--spacing);
  color: var(--clr-grey-dark);
  font-family: var(--font-main);
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  padding: 1rem;
  &:hover {
    border-color: orange;
  }
`

export default Category
