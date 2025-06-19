import { render, screen } from '@testing-library/react'
import HomePage, { metadata } from '@/app/page' // Импортируем metadata отдельно
import { Hero, Slider, ProductControls, ProductList } from '@/components/home'

jest.mock('@/components/home', () => ({
  Hero: jest.fn(() => <div data-testid='hero'>Hero</div>),
  Slider: jest.fn(() => <div data-testid='slider'>Slider</div>),
  ProductControls: jest.fn(() => (
    <div data-testid='product-controls'>ProductControls</div>
  )),
  ProductList: jest.fn(() => <div data-testid='product-list'>ProductList</div>),
}))

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all main components', () => {
    render(<HomePage />)

    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getByTestId('slider')).toBeInTheDocument()
    expect(screen.getByTestId('product-controls')).toBeInTheDocument()
    expect(screen.getByTestId('product-list')).toBeInTheDocument()
  })

  it('has correct metadata', () => {
    expect(metadata).toEqual({
      title: 'E-Commerce | React App',
    })
  })

  it('renders main element as wrapper', () => {
    const { container } = render(<HomePage />)
    const mainElement = container.firstChild
    expect(mainElement).not.toBeNull()
    expect((mainElement as HTMLElement).tagName).toBe('MAIN')
  })

  it('calls all components once', () => {
    render(<HomePage />)

    expect(Hero).toHaveBeenCalledTimes(1)
    expect(Slider).toHaveBeenCalledTimes(1)
    expect(ProductControls).toHaveBeenCalledTimes(1)
    expect(ProductList).toHaveBeenCalledTimes(1)
  })
})
