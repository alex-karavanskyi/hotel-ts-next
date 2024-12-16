import { fireEvent, render } from '@testing-library/react'
import Contact from '@/components/home/Contact'
import '@testing-library/jest-dom'

it('should display form with Name, Email, and Message fields', () => {
  const { getByLabelText } = render(<Contact />)

  const nameInput = getByLabelText('Name')
  const emailInput = getByLabelText('Email')
  const messageInput = getByLabelText('Message')

  expect(nameInput).toBeInTheDocument()
  expect(emailInput).toBeInTheDocument()
  expect(messageInput).toBeInTheDocument()
})

it('should reset form after successful submission', () => {
  const { getByLabelText, getByText } = render(<Contact />)
  const nameInput = getByLabelText('Name') as HTMLInputElement
  const emailInput = getByLabelText('Email') as HTMLInputElement
  const messageInput = getByLabelText('Message') as HTMLInputElement
  const submitButton = getByText('Send')

  fireEvent.change(nameInput, { target: { value: '' } })
  fireEvent.change(emailInput, { target: { value: '' } })
  fireEvent.change(messageInput, { target: { value: '' } })
  fireEvent.click(submitButton)

  expect(nameInput.value).toBe('')
  expect(emailInput.value).toBe('')
  expect(messageInput.value).toBe('')
})
