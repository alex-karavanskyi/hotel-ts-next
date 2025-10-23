'use client'
import styled, { css } from 'styled-components'
import { Product } from '@/shared/types/productsType'
import { FavoriteButton } from '@/shared/ui'
import { formatPrice } from '@/shared/utils/formatPrice'

interface ProductInfoProps {
  product: Product
  variant?: 'compact' | 'detailed'
  priceTag?: 'h5' | 'p'
  showHeader?: boolean
  showPrice?: boolean
  showFavorite?: boolean
  className?: string
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  variant = 'compact',
  priceTag = 'p',
  showHeader = true,
  showPrice = true,
  showFavorite = true,
  className = '',
}) => {
  const { name, price } = product
  const PriceTag = priceTag
  const isDetailed = variant === 'detailed'

  return (
    <Wrapper className={className} $isDetailed={isDetailed}>
      {showHeader && (
        <Header $isDetailed={isDetailed}>
          <Name $isDetailed={isDetailed}>{name}</Name>
          {showFavorite && (
            <FavoriteButton
              product={product}
              classIcon='product-info-favorite-icon'
            />
          )}
        </Header>
      )}
      {showPrice && (
        <PriceTag className='product-info-price'>{formatPrice(price)}</PriceTag>
      )}
    </Wrapper>
  )
}

const baseStyles = css`
  color: var(--clr-grey-dark);
`

const Wrapper = styled.div<{ $isDetailed: boolean }>`
  ${baseStyles}
`

const Header = styled.div<{ $isDetailed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ $isDetailed }) => ($isDetailed ? '0.75rem' : '0.5rem')};
  margin-bottom: ${({ $isDetailed }) => ($isDetailed ? '1rem' : '0')};
`

const Name = styled.h5<{ $isDetailed: boolean }>`
  margin: 0;
  font-weight: 500;
  color: var(--clr-grey-dark);
  font-size: ${({ $isDetailed }) => ($isDetailed ? '1.5rem' : 'inherit')};

  @media (min-width: 992px) {
    font-size: ${({ $isDetailed }) => ($isDetailed ? '2rem' : 'inherit')};
  }
`

export default ProductInfo
