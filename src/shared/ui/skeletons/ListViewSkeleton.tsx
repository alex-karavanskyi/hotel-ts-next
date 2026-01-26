import styled from 'styled-components'

import { skeletonBaseStyles } from '@/shared/ui/styles/containerStyles'

const ListViewSkeleton = () => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Container key={i}>
      <div className="list__view-skeleton-img" />
      <div className="list__view-skeleton-info">
        <div className="list__view-skeleton-title" />
        <div className="list__view-skeleton-price" />
        <div className="list__view-skeleton-desc" />
        <div className="list__view-skeleton-btn" />
      </div>
    </Container>
  ))
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .list__view-skeleton-img,
  .list__view-skeleton-title,
  .list__view-skeleton-price,
  .list__view-skeleton-desc,
  .list__view-skeleton-btn {
    ${skeletonBaseStyles}
  }

  .list__view-skeleton-img {
    width: 100%;
    max-width: 300px;
    height: 200px;
  }

  .list__view-skeleton-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .list__view-skeleton-title {
    height: 20px;
    width: 50%;
  }

  .list__view-skeleton-price {
    height: 20px;
    width: 25%;
  }

  .list__view-skeleton-desc {
    height: 60px;
    width: 100%;
  }

  .list__view-skeleton-btn {
    height: 36px;
    width: 120px;
    border-radius: 6px;
  }
`

export default ListViewSkeleton
