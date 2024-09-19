'use client'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import Products from '@/types/productsType'
import { Favorite } from '@/modules'
import { formatPrice } from '@/utils/helpers'

interface ListProducts {
  products: Products[]
}

const ListView: React.FC<ListProducts> = ({ products }) => {
  return (
    <Wrapper>
      <div className='list__view-products'>
        {products.map((product) => {
          const { id, image, name, price, description } = product
          return (
            <article className='list__view-article' key={id}>
              <Image
                className='list__view-image'
                src={image}
                alt={name}
                width={300}
                height={200}
              />
              <div>
                <h4 className='list__view-products-favorite'>
                  <Favorite
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
                  href={`/ecommerce/${id}`}
                  className='list__view-products-btn-details'
                >
                  Details
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  max-width: 1450px;
  margin: auto;
  .list__view-products {
    display: grid;
    row-gap: 3rem;
  }
  .list__view-products-price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  .list__view-products-favorite {
    margin-bottom: 0.5rem;
  }
  .list__view-products-description {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .list__view-products-btn-details {
    text-transform: uppercase;
    background: var(--clr-primary-5);
    color: var(--clr-primary-10);
    transition: var(--transition);
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
  }
  .list__view-products-btn-details:hover {
    color: var(--clr-primary-1);
  }
  .list__view-image {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  .list__view-favorite-icon {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }

  @media (min-width: 992px) {
    .list__view-article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
  @media (max-width: 990px) {
    margin-left: 1rem;
    padding-bottom: 2.8rem;
  }
`

export default ListView
