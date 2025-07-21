'use client'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { Breadcrumbs } from '@/shared/ui'

interface FormData {
  name: string
  email: string
  message: string
}

const Contact = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormData>({ mode: 'onChange' })

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data))
    reset()
  }

  return (
    <Wrapper>
      <div id='contact' className='contact' data-testid='contact'>
        <div className='contact__container'>
          <Breadcrumbs name='Contact' />
          <form onSubmit={handleSubmit(onSubmit)} className='contact__form'>
            <label>
              <span>Name</span>
              <input
                {...register('name', {
                  required: true,
                  minLength: {
                    value: 3,
                    message: 'Name must be min 3 characters',
                  },
                })}
              />
            </label>
            <div>
              {errors.name && (
                <p style={{ color: 'red', marginBottom: 0 }}>
                  {errors.name?.message}
                </p>
              )}
            </div>
            <label>
              <span>Email</span>
              <input
                {...register('email', {
                  required: true,
                  minLength: {
                    value: 3,
                    message: 'Email must be min 3 characters',
                  },
                })}
              />
            </label>
            <div>
              {errors.email && (
                <p style={{ color: 'red', marginBottom: 0 }}>
                  {errors.email?.message}
                </p>
              )}
            </div>
            <label>
              <span>Message</span>
              <textarea
                rows={7}
                {...register('message', {
                  required: true,
                  minLength: {
                    value: 15,
                    message: 'Message must be min 15 characters',
                  },
                })}
              />
            </label>
            <div>
              {errors.message && (
                <p style={{ color: 'red', marginBottom: 0 }}>
                  {errors.message?.message}
                </p>
              )}
            </div>
            <button
              type='submit'
              value='Send'
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
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 2rem auto;
  max-width: 992px;
  .contact {
    position: relative;
    z-index: 0;
  }
  .contact__container {
    flex: 0.75;
    background-color: black;
    padding: 2rem;
    border-radius: 1rem;
  }
  .contact__form {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .contact__form label {
    display: flex;
    flex-direction: column;
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
    margin-bottom: 1rem;
  }
  .contact__button {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 2rem;
    padding-right: 2rem;
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
`

export default Contact
