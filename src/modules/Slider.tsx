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
  const { products } = useAppSelector((store) => store.products)

  return (
    <Wrapper>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
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
        className='swiper_container'
      >
        {products.slice(0, 5).map((item) => {
          const { image, id } = item
          return (
            <SwiperSlide key={id}>
              <Image alt='img' src={image} width={700} height={700} />
            </SwiperSlide>
          )
        })}

        <div className='slider-controler'>
          <div className='swiper-pagination'></div>
          <div className='swiper-button-prev slider-arrow'>
            <FiChevronLeft />
          </div>
          <div className='swiper-button-next slider-arrow'>
            <FiChevronRight />
          </div>
        </div>
      </Swiper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  z-index: 0;
  max-width: 124rem;
  padding: 0 1rem;
  margin: 0 auto;
  .swiper_container {
    height: 52rem;
    padding: 2rem 0;
  }
  .swiper-slide {
    width: 37rem;
    height: 42rem;
  }
  .swiper-slide img {
    width: 37rem;
    height: 42rem;
    border-radius: 2rem;
    object-fit: cover;
  }
  .slider-controler {
    position: relative;
  }
  .slider-controler .slider-arrow {
    background: rgb(74, 74, 77);
    width: 2.3rem;
    height: 2.3rem;
    border-radius: 50%;
  }
  .slider-controler .slider-arrow::after {
    content: '';
  }
  .swiper-pagination .swiper-pagination-bullet {
    background: white;
    padding: 0.43rem;
  }
  .swiper-pagination .swiper-pagination-bullet-active {
    background: #007aff;
    padding: 0.43rem;
  }
  .slider-controler .swiper-button-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 30rem;
  }
  .slider-controler .swiper-button-prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 30rem;
  }

  @media (max-width: 700px) {
    .swiper_container {
      height: 45rem;
    }
    .swiper-slide {
      width: 28rem;
      height: 36rem;
    }
    .swiper-slide img {
      width: 28rem;
      height: 36rem;
    }
  }
  @media (max-width: 500px) {
    .swiper_container {
      height: 35rem;
    }
    .swiper-slide {
      width: 18rem;
      height: 26rem;
    }
    .swiper-slide img {
      width: 18rem;
      height: 26rem;
    }
  }

  @media (max-width: 1230px) {
    .slider-controler .swiper-button-next {
      right: 20rem;
    }
  }

  @media (max-width: 1230px) {
    .slider-controler .swiper-button-prev {
      left: 20rem;
    }
  }
  @media (max-width: 920px) {
    .slider-controler .swiper-button-next {
      right: 10rem;
    }
  }

  @media (max-width: 920px) {
    .slider-controler .swiper-button-prev {
      left: 10rem;
    }
  }
  @media (max-width: 590px) {
    .slider-controler .swiper-button-next {
      right: 5rem;
    }
  }

  @media (max-width: 590px) {
    .slider-controler .swiper-button-prev {
      left: 5rem;
    }
  }
`

export default Slider
