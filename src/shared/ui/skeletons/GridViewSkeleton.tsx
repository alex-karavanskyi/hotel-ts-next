import styled from 'styled-components'

import { skeletonBaseStyles } from '@/shared/ui/styles/containerStyles'

const GridViewSkeleton = () => {
  return Array.from({ length: 6 }).map((_, i) => (
    <Container key={i}>
      <div className="grid__view-skeleton-img" />
      <div className="grid__view-skeleton-info">
        <div className="grid__view-skeleton-title" />
        <div className="grid__view-skeleton-price" />
      </div>
    </Container>
  ))
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  .grid__view-skeleton-img,
  .grid__view-skeleton-title,
  .grid__view-skeleton-price {
    ${skeletonBaseStyles}
  }

  .grid__view-skeleton-img {
    width: 100%;
    height: 500px;
  }

  .grid__view-skeleton-title,
  .grid__view-skeleton-price {
    height: 18px;
  }

  .grid__view-skeleton-title {
    width: 70%;
  }

  .grid__view-skeleton-price {
    width: 30%;
  }

  .grid__view-skeleton-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
`

export default GridViewSkeleton
