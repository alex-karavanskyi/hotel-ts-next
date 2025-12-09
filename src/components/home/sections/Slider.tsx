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
import { useRef, useEffect } from 'react'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

const Slider = () => {
  const { products } = useAppSelector((state) => state.products)
  const swiperRef = useRef<any>(null)

  useEffect(() => {
    const handleResize = () => {
      swiperRef.current?.swiper?.update()
    }

    const autoSlide = setInterval(() => {
      swiperRef.current?.swiper?.slideNext()
    }, 3000)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearInterval(autoSlide)
    }
  }, [])

  return (
    <Container>
      <ArrowButton
        className='prev'
        onClick={() => swiperRef.current?.swiper?.slidePrev()}
      >
        <FiChevronLeft />
      </ArrowButton>

      <StyledSwiper
        ref={swiperRef}
        effect='coverflow'
        grabCursor
        centeredSlides
        loop
        slidesPerView={1}
        speed={600}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 3,
          slideShadows: true,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
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

      <ArrowButton
        className='next'
        onClick={() => swiperRef.current?.swiper?.slideNext()}
      >
        <FiChevronRight />
      </ArrowButton>

      <PaginationWrapper>
        <div className='swiper-pagination' />
      </PaginationWrapper>
    </Container>
  )
}

const Container = styled.div`
  ${containerStyles}
  position: relative;
`

const StyledSwiper = styled(Swiper)`
  height: 35rem;
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
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

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(74, 74, 77, 0.8);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
  color: white;
  border: none;
  transition: background 0.3s ease;
  user-select: none;

  &:hover {
    background: rgb(50, 50, 55);
  }

  &.prev {
    left: 0.5rem;
  }

  &.next {
    right: 0.5rem;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`

export default Slider
