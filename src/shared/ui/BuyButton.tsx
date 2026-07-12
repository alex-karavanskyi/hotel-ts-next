import styled, { css } from 'styled-components'

type ButtonSize = 'sm' | 'md' | 'lg'

interface BuyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  fullWidth?: boolean
}

const BuyButton: React.FC<BuyButtonProps> = ({
  children = 'Buy now',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  return (
    <Button $size={size} $fullWidth={fullWidth} {...props}>
      {children}
    </Button>
  )
}

export default BuyButton

const sizeStyles = {
  sm: css`
    height: 2.5rem;
    padding: 0 1rem;
    font-size: 0.875rem;
  `,

  md: css`
    height: 3rem;
    padding: 0 1.5rem;
    font-size: 1rem;
  `,

  lg: css`
    height: 3.5rem;
    padding: 0 2rem;
    font-size: 1.125rem;
  `,
}

const Button = styled.button<{
  $size: ButtonSize
  $fullWidth: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'fit-content')};

  border: none;
  border-radius: var(--radius);
  background: var(--clr-primary-5);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $size }) => sizeStyles[$size]}

  &:hover:not(:disabled) {
    background: var(--clr-primary-4);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
