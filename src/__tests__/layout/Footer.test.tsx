import { screen, render } from '@testing-library/react'
import { Footer } from '@/layout'

describe('Footer', () => {
  it('render correctly', () => {
    render(<Footer />)
    expect(screen.getByText(/react/i)).toBeInTheDocument()
  })
})
