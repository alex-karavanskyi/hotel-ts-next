'use client'
import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import styled from 'styled-components'

import { device } from '@/shared/constants/device'
import { Product } from '@/shared/types/productsType'
import ProductInfo from '@/shared/ui/ProductInfo'
import ListViewSkeleton from '@/shared/ui/skeletons/ListViewSkeleton'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

interface ListProductsProps {
  products: Product[]
  isLoading: boolean
}

const ListView = ({ products, isLoading }: ListProductsProps) => {
  const [visibleCount, setVisibleCount] = useState<number>(7)
  const visibleProducts: Product[] = products.slice(0, visibleCount)

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 7)
  }

  return (
    <Container>
      <div className="list__view-products">
        {isLoading && <ListViewSkeleton />}
        {!isLoading &&
          visibleProducts.map(product => {
            const { id, image, description } = product
            return (
              <article className="list__view-article" key={id}>
                <Image
                  alt={product.name}
                  width={300}
                  height={200}
                  priority
                  src={image}
                  className="list__view-image"
                />

                <div className="list__view-products-info">
                  <ProductInfo
                    product={product}
                    variant="compact"
                    showHeader={true}
                    showPrice={false}
                  />
                  <ProductInfo
                    product={product}
                    variant="compact"
                    showHeader={false}
                    showPrice={true}
                  />

                  <p className="list__view-products-description">
                    {description.substring(0, 150)}...
                  </p>

                  <Link
                    href={`/product/${id}`}
                    className="list__view-products-btn-details"
                  >
                    Details
                  </Link>
                </div>
              </article>
            )
          })}
      </div>
      {!isLoading && visibleCount < products.length && (
        <button className="list__view-load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </Container>
  )
}

const Container = styled.section`
  ${containerStyles}
  padding-bottom: 1rem;
  padding-left: 1rem;

  .list__view-products {
    display: grid;
    row-gap: 1.5rem;
    color: var(--clr-grey-dark);
  }

  .list__view-article {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .list__view-products-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .list__view-image {
    width: 100%;
    max-width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
  }

  .list__view-products-description {
    max-width: 45em;
    line-height: 1.6;
  }

  .list__view-products-btn-details {
    text-transform: uppercase;
    background-color: rgb(234, 140, 46, 1);
    color: var(--clr-grey-dark);
    border-radius: 2px;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
    transition: var(--transition);
    display: inline-block;
    width: max-content;
  }

  .list__view-products-btn-details:hover {
    background-color: rgb(234, 140, 46, 0.7);
  }

  .list__view-load-more-btn {
    margin: 2.5rem auto 0;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 24px;

    background: transparent;
    border: 1px solid var(--clr-primary-5);
    color: var(--clr-primary-5);

    cursor: pointer;
    transition: all 0.25s ease;

    letter-spacing: 0.5px;
    backdrop-filter: blur(3px);
  }

  .list__view-load-more-btn:hover {
    background: var(--clr-primary-5);
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgb(234, 140, 46, 0.3);
  }

  .list__view-load-more-btn:active {
    transform: translateY(0);
    box-shadow: none;
    opacity: 0.9;
  }

  .product__info-favorite-icon {
    width: 18px;
    height: 18px;
    color: var(--clr-grey-dark);
    cursor: pointer;
  }

  .product__info-price {
    font-weight: 500;
  }

  @media ${device.mobile} {
    .list__view-article,
    .list__view-skeleton-card {
      flex-direction: row;
      column-gap: 2rem;
      align-items: center;
    }
  }

  @media ${device.desktop} {
    padding-left: 0;
  }
`

export default ListView
