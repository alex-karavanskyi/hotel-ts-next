'use client'
import styled from 'styled-components'
import Image from 'next/image'
import { useState } from 'react'

const ProductImages = ({ images = [{ url: '' }] }) => {
  const [main, setMain] = useState(images[0])
  return (
    <Wrapper>
      <Image
        src={main.url}
        alt='main'
        className='product__images'
        width={700}
        height={700}
      />
      <div className='product__images-gallery'>
        {images.map((image, index) => {
          return (
            <Image
              src={image.url}
              alt='Image'
              key={index}
              onClick={() => setMain(images[index])}
              className={`${
                image.url === main.url ? 'product__images--active' : null
              }`}
              width={70}
              height={70}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .product__images {
    width: 100%;
    display: block;
    height: 600px;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .product__images-gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .product__images--active {
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .product__images {
      height: 300px;
    }
    .product__images-gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .product__images {
      height: 500px;
    }
    .product__images-gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
