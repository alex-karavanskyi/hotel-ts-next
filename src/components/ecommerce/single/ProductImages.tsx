'use client'
import styled from 'styled-components'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface ProductImagesProps {
  images: string[]
}

const ProductImages: React.FC<ProductImagesProps> = ({ images = [] }) => {
  const [mainImage, setMainImage] = useState(images[0] || null)

  useEffect(() => {
    setMainImage(images[0] || null)
  }, [images])

  if (!mainImage) return null

  return (
    <Wrapper>
      <Image
        alt='main product image'
        width={564}
        height={500}
        priority
        className='product__images'
        src={mainImage}
      />
      {images.length > 1 && (
        <div className='product__images-gallery'>
          {images.map((image, index) => (
            <Image
              key={index}
              alt={`thumbnail ${index}`}
              width={100}
              height={75}
              src={image}
              onClick={() => setMainImage(image)}
              className={image === mainImage ? 'product__images--active' : ''}
            />
          ))}
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .product__images {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .product__images-gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      cursor: pointer;
    }
  }
  .product__images--active {
    border: 2px solid var(--clr-primary-5);
  }
`

export default ProductImages
