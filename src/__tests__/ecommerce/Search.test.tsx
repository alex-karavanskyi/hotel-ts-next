import { screen, render } from '@testing-library/react'
import { Search } from '@/components/ecommerce'
import { useState } from 'react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe('Search', () => {
  const TestWrapper = () => {
    const [search, setSearch] = useState('')
    const handleFilters = jest.fn((_, value) => setSearch(value))

    return <Search search={search} handleFilters={handleFilters} />
  }

  it('renders correctly', () => {
    render(<TestWrapper />)

    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('should handle input change and update value', async () => {
    render(<TestWrapper />)

    const input = screen.getByRole('searchbox')

    await userEvent.type(input, 'dell')

    expect(input).toHaveValue('dell')
  })
})
