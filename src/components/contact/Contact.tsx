'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { z } from 'zod'

import { device } from '@/shared/constants/device'
import { Breadcrumbs } from '@/shared/ui'

const contactSchema = z.object({
  name: z.string().min(3, 'Name must be min 3 characters'),
  email: z
    .string()
    .email('Email must be valid')
    .min(3, 'Email must be min 3 characters'),
  message: z.string().min(15, 'Message must be min 15 characters'),
})

type FormData = z.infer<typeof contactSchema>

const Contact = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data))
    reset()
  }

  return (
    <Container>
      <div id="contact" className="contact" data-testid="contact">
        <div className="contact__container">
          <Breadcrumbs name="Contact" />
          <form onSubmit={handleSubmit(onSubmit)} className="contact__form">
            <label htmlFor="name">
              <span>Name</span>
              <input {...register('name')} />
            </label>
            <div>
              {errors.name && (
                <p style={{ color: 'red', marginBottom: 0 }}>
                  {errors.name?.message}
                </p>
              )}
            </div>
            <label htmlFor="email">
              <span>Email</span>
              <input {...register('email')} />
            </label>
            <div>
              {errors.email && (
                <p style={{ color: 'red', marginBottom: 0 }}>
                  {errors.email?.message}
                </p>
              )}
            </div>
            <label htmlFor="message">
              <span>Message</span>
              <textarea rows={7} {...register('message')} />
            </label>
            <div>
              {errors.message && (
                <p style={{ color: 'red', marginBottom: 0 }}>
                  {errors.message?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              value="Send"
              className={`contact__button ${
                isValid ? 'contact__button--black' : 'contact__button--white'
              }`}
              disabled={!isValid}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.section`
  margin: 0 auto;
  max-width: 1024px;

  .contact {
    position: relative;
    z-index: 0;
  }

  .contact__container {
    flex: 0.75;
    background-color: black;
    padding: 2rem;
  }

  .contact__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .contact__form label {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .contact__form input,
  textarea {
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    border-radius: 0.5rem;
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-style: none;
    font-weight: 500;
  }

  .contact__form input::placeholder,
  .contact__form textarea::placeholder {
    opacity: 1;
    color: black;
  }

  .contact__form span {
    color: white;
    font-weight: 500;
  }

  .contact__button {
    padding: 0.75rem 2rem;
    border-radius: 0.75rem;
    outline: 2px solid transparent;
    outline-offset: 2px;
    width: fit-content;
    cursor: pointer;
  }

  .contact__button:disabled {
    opacity: 0.5;
  }

  .contact__button--white {
    color: white;
    cursor: not-allowed;
  }

  .contact__button--black {
    color: black;
  }

  @media ${device.desktop} {
    padding-top: 1rem;
    padding-bottom: 1rem;

    .contact__container {
      border-radius: 1rem;
    }
  }
`

export default Contact
