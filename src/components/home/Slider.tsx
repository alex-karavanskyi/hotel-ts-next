'use client'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import { useAppSelector } from '@/redux/hooks'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'

export const Slider = () => {
  const { products } = useAppSelector((state) => state.products)

  return (
    <SliderWrapper>
      <ArrowButton className='swiper-button-prev'>
        <FiChevronLeft />
      </ArrowButton>

      <StyledSwiper
        effect='coverflow'
        grabCursor
        centeredSlides
        loop
        slidesPerView='auto'
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
      >
        {products.slice(0, 5).map(({ id, image }) => (
          <SwiperSlide key={id}>
            <StyledImage
              alt='product image'
              src={image}
              width={700}
              height={700}
            />
          </SwiperSlide>
        ))}
      </StyledSwiper>

      <ArrowButton className='swiper-button-next'>
        <FiChevronRight />
      </ArrowButton>

      <PaginationWrapper>
        <div className='swiper-pagination' />
      </PaginationWrapper>
    </SliderWrapper>
  )
}

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const StyledSwiper = styled(Swiper)`
  height: 50rem;
  padding: 2rem 0;
  .swiper-slide {
    width: 37rem;
    height: 42rem;
  }
  @media (max-width: 900px) {
    height: 45rem;
    .swiper-slide {
      width: 28rem;
      height: 36rem;
    }
  }
  @media (max-width: 600px) {
    height: 35rem;
    .swiper-slide {
      width: 20rem;
      height: 28rem;
    }
  }
`

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  object-fit: cover;
`

const PaginationWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  .swiper-pagination-bullet {
    background: white;
    padding: 0.43rem;
  }
  .swiper-pagination-bullet-active {
    background: #007aff;
  }
`

const ArrowButton = styled.div`
  background: rgba(74, 74, 77, 0.8);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
  pointer-events: all;
  color: white;
  transition: background 0.3s ease;
  user-select: none;
  &:hover {
    background: rgb(50, 50, 55);
  }
  &:after {
    content: '';
  }
`

export default Slider
