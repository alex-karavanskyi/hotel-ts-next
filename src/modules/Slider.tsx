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

        <Controls>
          <div className='swiper-pagination' />
          <ArrowButton className='swiper-button-prev'>
            <FiChevronLeft />
          </ArrowButton>
          <ArrowButton className='swiper-button-next'>
            <FiChevronRight />
          </ArrowButton>
        </Controls>
      </StyledSwiper>
    </SliderWrapper>
  )
}

const SliderWrapper = styled.div`
  position: relative;
  max-width: 124rem;
  padding: 0 1rem;
  margin: 0 auto;
`

const StyledSwiper = styled(Swiper)`
  height: 52rem;
  padding: 2rem 0;

  .swiper-slide {
    width: 37rem;
    height: 42rem;
  }

  @media (max-width: 700px) {
    height: 45rem;

    .swiper-slide {
      width: 28rem;
      height: 36rem;
    }
  }

  @media (max-width: 500px) {
    height: 35rem;

    .swiper-slide {
      width: 18rem;
      height: 26rem;
    }
  }
`

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  object-fit: cover;
`

const Controls = styled.div`
  position: relative;
  .swiper-pagination-bullet {
    background: white;
    padding: 0.43rem;
  }
  .swiper-pagination-bullet-active {
    background: #007aff;
  }
`

const ArrowButton = styled.div`
  background: rgb(74, 74, 77);
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  &:after {
    content: '';
  }

  &.swiper-button-next {
    right: 30rem;

    @media (max-width: 1230px) {
      right: 20rem;
    }

    @media (max-width: 920px) {
      right: 10rem;
    }

    @media (max-width: 590px) {
      right: 5rem;
    }
  }

  &.swiper-button-prev {
    left: 30rem;

    @media (max-width: 1230px) {
      left: 20rem;
    }

    @media (max-width: 920px) {
      left: 10rem;
    }

    @media (max-width: 590px) {
      left: 5rem;
    }
  }
`

export default Slider
