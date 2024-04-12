'use client'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { slideIn } from '../utils/motion'

type FormData = {
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
    <div className='contact-container' id='contact'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='contact-flex'
      >
        <p>Get in touch</p>
        <h3 style={{ color: 'white' }}>Contact.</h3>

        <form onSubmit={handleSubmit(onSubmit)} className='contact-form'>
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
            className={`contact-button ${
              isValid ? 'contact-button-black' : 'contact-button-white'
            }`}
            disabled={!isValid}
          >
            Send
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default Contact
