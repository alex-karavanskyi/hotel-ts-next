import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { NavbarLinks } from '@/shared/ui'
import modalReducer from '@/redux/features/modalSlice'

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
