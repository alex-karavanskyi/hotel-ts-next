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
    <Container>
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
    </Container>
  )
}

const Container = styled.div`
  .product__images {
    width: 100%;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .product__images-gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 0.5rem;

    img {
      cursor: pointer;
      width: 100%;
      object-fit: fill;
      border-radius: var(--radius);
    }
  }
  .product__images--active {
    border: 2px solid var(--clr-primary-5);
  }
`

export default ProductImages
