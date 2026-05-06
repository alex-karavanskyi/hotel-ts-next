'use client'
import { useEffect, useState } from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'
import styled from 'styled-components'

import { Product } from '@/shared/types/productsType'

interface ProductImagesProps {
  images: Product['images']
  onChatOpen?: () => void
}

const ProductImages: React.FC<ProductImagesProps> = ({
  images = [],
  onChatOpen,
}) => {
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
      <ImageWrapper>
        <Image
          alt="main product image"
          width={564}
          height={500}
          priority
          className="product__images"
          src={mainImage}
        />
        {onChatOpen && (
          <ChatButton
            onClick={onChatOpen}
            title="Open the assistant chat"
            aria-label="Open chat"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </ChatButton>
        )}
      </ImageWrapper>
      {images.length > 1 && (
        <motion.div
          className="product__images-gallery"
          initial="hidden"
          animate="visible"
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

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: var(--radius);
  overflow: hidden;
`

const ChatButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 2px solid white;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 640px) {
    width: 3rem;
    height: 3rem;
    top: 0.75rem;
    right: 0.75rem;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`

export default ProductImages
