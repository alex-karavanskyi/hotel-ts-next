'use client'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/shared/types/productsType'
import { FavoriteButton } from '@/shared/ui'
import { formatPrice } from '@/shared/utils/format'

interface ListProducts {
  products: Product[]
}

const ListView: React.FC<ListProducts> = ({ products }) => {
  return (
    <Container>
      <div className='list__view-products'>
        {products.map((product) => {
          const { id, image, name, price, description } = product
          return (
            <article className='list__view-article' key={id}>
              <Image
                alt={name}
                width={300}
                height={200}
                priority
                src={image}
                className='list__view-image'
              />
              <div>
                <h4 className='list__view-products-favorite'>
                  <FavoriteButton
                    productId={id}
                    name={name}
                    products={products}
                    classIcon='list__view-favorite-icon'
                  />
                </h4>
                <h5 className='list__view-products-price'>
                  {formatPrice(price)}
                </h5>
                <p className='list__view-products-description'>
                  {description.substring(0, 150)}...
                </p>
                <Link
                  href={`/product/${id}`}
                  className='list__view-products-btn-details'
                >
                  Details
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </Container>
  )
}

const Container = styled.section`
  padding: 0 1rem;
  margin: 2rem auto;
  max-width: 1280px;
  .list__view-products {
    display: grid;
    row-gap: 3rem;
    color: var(--clr-grey-dark);
  }
  .list__view-article {
    display: flex;
    flex-direction: column;
  }
  .list__view-image {
    width: 100%;
    max-width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  .list__view-products-favorite {
    margin-bottom: 0.5rem;
  }
  .list__view-favorite-icon {
    cursor: pointer;
    width: 18px;
    height: 18px;
    color: var(--clr-grey-dark);
  }
  .list__view-products-price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
    font-weight: 500;
  }
  .list__view-products-description {
    max-width: 45em;
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  .list__view-products-btn-details {
    text-transform: uppercase;
    background-color: rgba(234, 140, 46, 1);
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
    background-color: rgba(234, 140, 46, 0.7);
  }

  @media (min-width: 768px) {
    .list__view-article {
      flex-direction: row;
      column-gap: 2rem;
      align-items: center;
    }
  }

  @media (min-width: 1400px) {
    padding: 0;
  }
`

export default ListView
