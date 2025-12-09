'use client'
import styled from 'styled-components'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Product } from '@/shared/types/productsType'
import { useState, useEffect } from 'react'

interface ProductImagesProps {
  images: Product['images']
}

const ProductImages: React.FC<ProductImagesProps> = ({ images = [] }) => {
  const [mainImage, setMainImage] = useState<string>(images[0] ?? '')

  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0])
    }
  }, [images])

  const galleryVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

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
        <motion.div
          className='product__images-gallery'
          initial='hidden'
          animate='visible'
          variants={galleryVariants}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={() => setMainImage(image)}
            >
              <Image
                alt={`thumbnail ${index}`}
                width={100}
                height={75}
                src={image}
                className={image === mainImage ? 'product__images--active' : ''}
              />
            </motion.div>
          ))}
        </motion.div>
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 0.5rem;

    div {
      cursor: pointer;
      border-radius: var(--radius);
      overflow: hidden;

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        display: block;
        transition: transform 0.2s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }
  }
  .product__images--active {
    border: 2px solid var(--clr-primary-5);
  }
`

export default ProductImages
