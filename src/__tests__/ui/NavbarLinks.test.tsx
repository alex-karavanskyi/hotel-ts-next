import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import modalReducer from '@/redux/features/modalSlice'
import { NavbarLinks } from '@/shared/ui'

describe('NavbarLinks', () => {
  const createTestStore = () =>
    configureStore({
      reducer: {
        modal: modalReducer,
      },
    })

  it('renders correctly', () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <NavbarLinks />
      </Provider>
    )

    expect(screen.getByText(/contact/i)).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })
})
