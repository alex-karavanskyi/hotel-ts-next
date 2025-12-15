'use client'
import styled from 'styled-components'
import { device } from '@/shared/constants/device'
import { motion } from 'framer-motion'
import { FilterName, HandleFiltersFn } from '@/shared/types/productsType'
import { getUniqueValues } from '@/shared/utils/formatPrice'
import { useAppSelector } from '@/redux/hooks'

interface CategoryProps {
  buttonColor: string
  handleFilters: HandleFiltersFn
  loading: boolean
}

const Category: React.FC<CategoryProps> = ({
  buttonColor,
  handleFilters,
  loading,
}) => {
  const { all_products } = useAppSelector((store) => store.filter)
  const categories = getUniqueValues(all_products, 'category')

  return (
    <Container>
      {loading ? (
        <SkeletonList />
      ) : (
        categories.map((c, index) => (
          <CategoryButton
            data-cy='category'
            key={index}
            $isActive={buttonColor === c}
            onClick={() => handleFilters(FilterName.Category, c)}
            type='button'
            whileTap={{ scale: 0.95 }}
            animate={{ opacity: buttonColor === c ? 1 : 0.85 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {c}
          </CategoryButton>
        ))
      )}
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;

  @media ${device.tablet} {
    justify-content: center;
    padding-top: 2rem;
  }
`

// ─── CATEGORY BUTTON ───────────────────────────────────────────────

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

// ─── SKELETONS ───────────────────────────────────────────────

const SkeletonList = () => (
  <>
    <SkeletonButton />
    <SkeletonButton />
    <SkeletonButton />
    <SkeletonButton />
    <SkeletonButton />
  </>
)

const SkeletonButton = styled.div`
  width: 115px;
  height: 52px;
  border-radius: 8px;
  background: linear-gradient(90deg, #e0e0e0 0%, #f5f5f5 50%, #e0e0e0 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`

export default Category
