'use client'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import ProductInfo from '@/shared/ui/ProductInfo'
import { device } from '@/shared/constants/device'
import { FaSearch } from 'react-icons/fa'
import { Product } from '@/shared/types/productsType'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

interface GridProducts {
  products: Product[]
}

const GridView: React.FC<GridProducts> = ({ products }) => {
  return (
    <Container>
      <div className='grid__view-products' role='list'>
        {products.map((product) => {
          const { id, image } = product
          return (
            <article key={id} className='grid__view-product'>
              <div className='grid__view-products-images'>
                <Image
                  alt={product.name}
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
                <ProductInfo
                  product={product}
                  variant='compact'
                  showHeader={true}
                  showPrice={false}
                />
                <ProductInfo
                  product={product}
                  variant='compact'
                  showHeader={false}
                  showPrice={true}
                />
              </footer>
            </article>
          )
        })}
      </div>
    </Container>
  )
}

const Container = styled.section`
  ${containerStyles}
  padding-left: 1rem;
  padding-right: 1rem;
  .grid__view-products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
  }
  .grid__view-product {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
    gap: 1rem;
  }
  .product-info-favorite-icon {
    width: 18px;
    height: 18px;
    color: var(--clr-grey-dark);
    cursor: pointer;
  }
  .product-info-price {
    font-weight: 500;
  }

  @media ${device.desktop} {
    padding: 0;
  }
`

export default GridView
