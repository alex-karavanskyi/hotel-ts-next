'use client'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { formatPrice } from '../helpers'
import { FaSearch } from 'react-icons/fa'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { handleButtonClick } from '../helpers'
import { useDispatch, useSelector } from 'react-redux'
import {
  addFavorite,
  removeFavorite,
} from '../app/global/features/productSlice'

const GridView = ({ products }) => {
  const dispatch = useDispatch()

  const handleAddToFavorite = (productId) => {
    dispatch(addFavorite({ productId }))
  }
  const handleremoveToFavorite = (productId) => {
    dispatch(removeFavorite({ productId }))
  }
  const isFavorite = useSelector((state) => state.products.favorites_products)

  return (
    <Wrapper>
      <div className='products-container'>
        {products.map((product) => {
          const { id, image, name, price } = product
          const wishList = isFavorite.some((item) => item.id === id)
          return (
            <article key={id}>
              <div className='container'>
                <img src={image} alt={name} />
                <Link
                  to={`/rooms/${id}`}
                  className='link'
                  onClick={handleButtonClick}
                >
                  <FaSearch />
                </Link>
              </div>
              <footer>
                <h5>
                  {name}{' '}
                  {wishList ? (
                    <MdFavorite
                      onClick={() => handleremoveToFavorite(id)}
                      color='red'
                      className='cursor-pointer'
                    />
                  ) : (
                    <MdFavoriteBorder
                      onClick={() => handleAddToFavorite(id)}
                      className='cursor-pointer'
                    />
                  )}
                </h5>
                <p>{formatPrice(price)}</p>
              </footer>
            </article>
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .products-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 1450px;
    margin: auto;
    padding-bottom: 32px;
  }

  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
    padding: 0px;
  }
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
    height: 500px;
  }
  .link {
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
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }

  @media screen and (max-width: 768px) {
    .products-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`

export default GridView
