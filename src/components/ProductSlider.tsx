'use client'
import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { formatPrice } from '../helpers'
import { useSwipeable } from 'react-swipeable'
import { useAppSelector } from '@/redux/hooks'
import Image from 'next/image'

export const ProductSlider = () => {
  const { featured_products: featured } = useAppSelector(
    (store) => store.products
  )
  const [activeIndex, setActiveIndex] = useState(0)

  const goToNext = useCallback(() => {
    const isLastSlide = activeIndex === featured.length - 1
    const newIndex = isLastSlide ? 0 : activeIndex + 1
    setActiveIndex(newIndex)
  }, [activeIndex, featured.length])

  const goToPrevious = () => {
    const isFirstSlide = activeIndex === 0
    const newIndex = isFirstSlide ? featured.length - 1 : activeIndex - 1
    setActiveIndex(newIndex)
  }

  const goToSlide = (slideIndex: number) => {
    setActiveIndex(slideIndex)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  useEffect(() => {
    let sliderId = setInterval(() => {
      goToNext()
    }, 5000)

    return () => clearInterval(sliderId)
  }, [activeIndex, goToNext])

  return (
    <Wrapper {...handlers}>
      <div className='section-center'>
        {featured.map((item, personIndex) => {
          const { image, name, price, id } = item
          let position =
            personIndex === activeIndex
              ? 'activeSlide'
              : personIndex === activeIndex - 1 ||
                (activeIndex === 0 && personIndex === featured.length - 1)
              ? 'lastSlide'
              : 'nextSlide'

          return (
            <article key={id} className={position}>
              <Link href={`/rooms/${id}`}>
                <Image
                  alt='img'
                  className='person-img'
                  src={image}
                  width={700}
                  height={700}
                />
              </Link>
              <h4 style={{ color: 'white' }}>{name}</h4>
              <p style={{ color: 'white' }}>{formatPrice(price)}</p>
            </article>
          )
        })}
      </div>
      <div className='indicators'>
        {featured.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`${
              slideIndex === activeIndex
                ? 'indicator-symbol-active'
                : 'indicator-symbol'
            }`}
          >
            ●
          </div>
        ))}
      </div>
      <button className='prev' onClick={goToPrevious}>
        <FiChevronLeft />
      </button>
      <button className='next' onClick={goToNext}>
        <FiChevronRight />
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 30px;
  margin-top: 30px;
  .section-center {
    height: 800px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .indicators {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 8px;
    cursor: pointer;
  }

  .indicator-symbol {
    color: #26343f;
    width: 1.5rem;
  }

  .indicator-symbol-active {
    color: #ffffff;
    width: 1.5rem;
  }
  .person-img {
    border-radius: 10%;
    margin-bottom: 2rem;
    width: 700px;
    height: 700px;
    border: 3px solid var(--clr-grey-8);
    box-shadow: var(--dark-shadow);
  }
  article h4 {
    text-transform: uppercase;
    color: var(--clr-primary-5);
    margin-bottom: 1.5rem;
  }

  .prev,
  .next {
    position: absolute;
    top: 550px;
    transform: translateY(-50%);
    background: var(--clr-grey-5);
    width: 1.25rem;
    height: 1.25rem;
    display: grid;
    place-items: center;
    border-color: transparent;
    font-size: 1rem;
    border-radius: var(--radius);
    cursor: pointer;
    transition: var(--transition);
  }
  .prev:hover,
  .next:hover {
    background: var(--clr-primary-5);
  }
  .prev {
    left: 90px;
  }
  .next {
    right: 90px;
  }

  .text {
    max-width: 45em;
  }
  .prev,
  .next {
    width: 4rem;
    height: 4rem;
    font-size: 1.5rem;
  }
  article {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: var(--transition);
  }
  article.activeSlide {
    opacity: 1;
    transform: translateX(0);
  }
  article.lastSlide {
    transform: translateX(-100%);
  }
  article.nextSlide {
    transform: translateX(100%);
  }
  @media (max-width: 1024px) {
    .prev,
    .next {
      display: none;
    }
  }
  @media (max-width: 768px) {
    .section-center {
      height: 600px;
    }
    .person-img {
      width: 500px;
      height: 500px;
    }
  }
  @media (max-width: 430px) {
    .section-center {
      height: 370px;
    }

    .person-img {
      border-radius: 5%;
    }
    .person-img {
      object-fit: cover;
      width: 270px;
      height: 270px;
    }
  }
`

export default ProductSlider
