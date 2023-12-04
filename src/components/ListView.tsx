'use client'
import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { formatPrice } from '../helpers'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { useAppSelector, useAppDispatch } from '@/app/redux/hooks'
import { addFavorite, removeFavorite } from '@/app/redux/features/productSlice'
import Products from '@/app/redux/modals/productsType'
import Image from 'next/image'
import Favorite from './Favorite'

interface ListProducts {
  products: Products[]
}

const ListView: React.FC<ListProducts> = ({ products }) => {
  return (
    <Wrapper>
      {products.map((product) => {
        const { id, image, name, price, description } = product
        return (
          <article key={id}>
            <Image src={image} alt={name} width={700} height={700} />
            <div>
              <h4>
                <Favorite id={id} name={name} />
              </h4>
              <h5 className='price'>{formatPrice(price)}</h5>
              <p>{description.substring(0, 150)}...</p>
              <Link href={`/rooms/${id}`} className='btn-details'>
                Details
              </Link>
            </div>
          </article>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
  max-width: 1450px;
  margin: auto;
  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn-details {
    text-transform: uppercase;
    background: var(--clr-primary-5);
    color: var(--clr-primary-10);
    transition: var(--transition);
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
  }
  .btn-details:hover {
    color: var(--clr-primary-1);
    background: var(--clr-primary-7);
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`

export default ListView
