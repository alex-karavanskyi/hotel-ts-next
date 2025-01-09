import { act, fireEvent, render, screen } from '@testing-library/react'
import Contact from '@/components/home/Contact'
import '@testing-library/jest-dom'

describe('Contact', () => {
  it('should display form with Name, Email, and Message fields', () => {
    const { container } = render(<Contact />)

    expect(screen.getByTestId('contact')).toBeInTheDocument()

    const nameInput = screen.getByLabelText(/Name/)
    const emailInput = screen.getByLabelText(/Email/)
    const messageInput = screen.getByLabelText(/Message/)
    const submitButton = screen.getByRole('button', { name: /Send/ })
    const title = container.querySelector('h3')

    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(messageInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })
  it('should render error message when form was submit with a weak password', async () => {
    render(<Contact />)

    const nameInput = screen.getByLabelText(/Name/)
    const emailInput = screen.getByLabelText(/Email/)
    const messageInput = screen.getByLabelText(/Message/)
    const submitButton = screen.getByRole('button', { name: /Send/ })

    const errorName = screen.queryByText(/Name must be min 3 characters/)
    const errorEmail = screen.queryByText(/Email must be min 3 characters/)
    const errorMessage = screen.queryByText(/Message must be min 15 characters/)

    expect(errorName).not.toBeInTheDocument()
    expect(errorEmail).not.toBeInTheDocument()
    expect(errorMessage).not.toBeInTheDocument()

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'Alex' } })
      fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } })
      fireEvent.change(messageInput, { target: { value: 'test' } })
      fireEvent.click(submitButton)
    })

    const errorMessageAfterSubmit = await screen.findByText(
      /Message must be min 15 characters/
    )

    expect(errorMessageAfterSubmit).toBeInTheDocument()
  })
})
