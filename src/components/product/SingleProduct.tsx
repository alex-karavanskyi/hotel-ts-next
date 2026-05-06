'use client'
import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import styled from 'styled-components'

import Chat from '@/components/chat/Chat'
import { Error, Loading } from '@/layout'
import { getSingleProduct } from '@/redux/features/productSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { url } from '@/shared/constants/db'
import { device } from '@/shared/constants/device'
import { Breadcrumbs } from '@/shared/ui'
import ProductInfo from '@/shared/ui/ProductInfo'
import { containerStyles } from '@/shared/ui/styles/containerStyles'

import ProductImages from './ProductImages'

const SingleProduct = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
  } = useAppSelector(store => store.products)

  const { id } = useParams()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getSingleProduct(`${url}/${id}`))
  }, [dispatch, id])

  if (loading) return <Loading />
  if (error) {
    return (
      <Error
        message="Oops! Something went wrong. Try again later."
        redirectTo="/"
        redirectDelay={3000}
      />
    )
  }
  if (!product) return null

  const { description, images } = product

  return (
    <Container>
      <Breadcrumbs name={product.name} />
      <div className="single__product-container">
        <ProductImages images={images} onChatOpen={() => setIsChatOpen(true)} />
        <section className="single__product-info">
          <ProductInfo
            product={product}
            variant="detailed"
            showHeader={true}
            showPrice={true}
            priceTag="h5"
          />
          <p className="single__product-description">{description}</p>
          <hr />
        </section>
      </div>

      {isChatOpen && (
        <ChatModal>
          <ChatOverlay onClick={() => setIsChatOpen(false)} />
          <ChatContent>
            <ChatHeader>
              <CloseButton
                onClick={() => setIsChatOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </CloseButton>
            </ChatHeader>
            <ChatWrapper>
              <Chat product={product} />
            </ChatWrapper>
          </ChatContent>
        </ChatModal>
      )}
    </Container>
  )
}

const Container = styled.main`
  ${containerStyles}
  padding: 1rem;

  .single__product-container {
    display: grid;
    gap: 4rem;
  }

  .single__product-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .single__product-description {
    line-height: 1.8;
    color: #acb4be;
  }

  .product__info-favorite-icon {
    width: 2rem;
    height: 2rem;
    color: var(--clr-grey-dark);
    cursor: pointer;
  }

  @media ${device.laptop} {
    .single__product-container {
      grid-template-columns: 1fr 1fr;
    }

    .product__info-favorite-icon {
      width: 2.2rem;
      height: 2.2rem;
    }
  }

  @media ${device.desktop} {
    padding-left: 0;
    padding-right: 0;
  }
`

const ChatModal = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 1000;

  @media ${device.laptop} {
    align-items: center;
    justify-content: center;
  }
`

const ChatOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  cursor: pointer;
`

const ChatContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 600px;
  background: white;
  border-radius: 12px 12px 0 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media ${device.laptop} {
    width: 90%;
    max-width: 450px;
    height: auto;
    border-radius: 12px;

    @keyframes slideUp {
      from {
        transform: scale(0.9);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
  }

  @media (max-width: 480px) {
    max-height: 80vh;
  }
`

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
`

const CloseButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  color: #6b7280;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e7eb;
    color: #1f2937;
  }

  &:active {
    background: #d1d5db;
  }
`

const ChatWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`

export default SingleProduct
