import styled from 'styled-components'

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

  .grid__view-skeleton-img {
    width: 100%;
    height: 500px;
    border-radius: var(--radius);
    background: var(--clr-grey-4);
    animation: pulse 1.5s infinite ease-in-out;
  }

  .grid__view-skeleton-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .grid__view-skeleton-title,
  .grid__view-skeleton-price {
    height: 18px;
    border-radius: 4px;
    background: var(--clr-grey-4);
    animation: pulse 1.5s infinite ease-in-out;
  }

  .grid__view-skeleton-title {
    width: 70%;
  }

  .grid__view-skeleton-price {
    width: 30%;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.4;
    }

    100% {
      opacity: 1;
    }
  }
`

export default GridViewSkeleton
