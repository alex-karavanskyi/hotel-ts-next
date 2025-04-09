import { render, screen } from '@testing-library/react'
import Ecommerce from '@/app/ecommerce/page'

jest.mock('@/components/ecommerce', () => ({
  ProductControls: () => <div data-testid='product-controls'>Controls</div>,
  ProductList: () => <div data-testid='product-list'>List</div>,
}))

describe('Ecommerce Page', () => {
  it('renders page title and description', () => {
    render(<Ecommerce />)

    expect(
      screen.getByRole('heading', { name: /e-commerce/i })
    ).toBeInTheDocument()

    expect(
      screen.getByText(/REFINED, SOPHISTICATED, SMART AND SIMPLE/i)
    ).toBeInTheDocument()
  })

  it('renders ProductControls and ProductList components', () => {
    render(<Ecommerce />)

    expect(screen.getByTestId('product-controls')).toBeInTheDocument()
    expect(screen.getByTestId('product-list')).toBeInTheDocument()
  })
})
