'use client'
import styled from 'styled-components'
import { HandleFiltersFn } from '@/shared/types/productsType'
import { getUniqueValues } from '@/shared/utils/formatPrice'
import { useAppSelector } from '@/redux/hooks'
import { motion } from 'framer-motion'

interface CategoryProps {
  buttonColor: string
  handleFilters: HandleFiltersFn
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
          whileTap={{ scale: 0.95 }}
          animate={{ opacity: buttonColor === c ? 1 : 0.85 }}
          transition={{ type: 'spring', stiffness: 300 }}
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
  gap: 0.5rem;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`

const CategoryButton = styled(motion.button)<{ $isActive: boolean }>`
  grid-template-columns: 7.3rem;
  text-transform: capitalize;
  background: transparent;
  border: ${({ $isActive }) =>
    $isActive ? 'solid 2px orange' : '2px solid var(--clr-grey-5)'};
  color: ${({ $isActive }) => ($isActive ? 'orange' : 'var(--clr-grey-dark)')};
  font-family: var(--font-main);
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: ${({ $isActive }) =>
    $isActive ? '0 0 8px rgba(255,165,0,0.4)' : 'none'};
  transition: all 0.25s ease;

  &:hover {
    border-color: orange;
    opacity: 1;
  }
`

export default Category
