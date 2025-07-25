'use client'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { FaSearch } from 'react-icons/fa'
import { Product } from '@/shared/types/productsType'
import { formatPrice } from '@/shared/utils/formatPrice'
import { FavoriteButton } from '@/shared/ui'

interface GridProducts {
  products: Product[]
}

const GridView: React.FC<GridProducts> = ({ products }) => {
  return (
    <Container>
      <div className='grid__view-products' role='list'>
        {products.map((product) => {
          const { id, image, name, price } = product
          return (
            <article key={id}>
              <div className='grid__view-products-images'>
                <Image
                  alt={name}
                  width={470}
                  height={500}
                  priority
                  src={image}
                  className='grid__view-images'
                />
                <Link
                  href={`/product/${id}`}
                  className='grid__view-products-link'
                >
                  <FaSearch />
                </Link>
              </div>
              <footer className='grid__view-footer'>
                <h5 className='grid__view-favorite'>
                  <FavoriteButton
                    productId={id}
                    name={name}
                    products={products}
                    classIcon='grid__view-favorite-icon'
                  />
                </h5>
                <p className='grid__view-products-price'>
                  {formatPrice(price)}
                </p>
              </footer>
            </article>
          )
        })}
      </div>
    </Container>
  )
}

const Container = styled.section`
  padding: 0 1rem;
  max-width: 1280px;
  margin: 2rem auto;
  .grid__view-products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.25rem;
  }
  .grid__view-products-images {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
  }
  .grid__view-images {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .grid__view-products-link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    opacity: 0;
    transition: var(--transition);
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .grid__view-images:hover,
  .grid__view-products-images:hover .grid__view-images {
    opacity: 0.5;
  }
  .grid__view-products-images:hover .grid__view-products-link {
    opacity: 1;
  }
  .grid__view-products-link:hover ~ .grid__view-images {
    opacity: 0.5;
  }
  .grid__view-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    color: var(--clr-grey-dark);
  }
  .grid__view-favorite,
  .grid__view-products-price {
    margin-bottom: 0;
    font-weight: 400;
  }
  .grid__view-products-price {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
  .grid__view-favorite-icon {
    vertical-align: text-top;
    cursor: pointer;
    width: 18px;
    height: 18px;
    color: var(--clr-grey-dark);
  }

  @media (min-width: 1400px) {
    padding: 0;
  }
`

export default GridView
