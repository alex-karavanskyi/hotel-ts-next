'use client'
import React, { ChangeEvent, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { slideIn } from '../utils/motion'

const Contact = React.forwardRef<HTMLDivElement>((props, ref) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
  }

  return (
    <div className='contact-container' id='contact'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='contact-flex'
      >
        <p>Get in touch</p>
        <h3 style={{ color: 'white' }}>Contact.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className='contact-form'>
          <label>
            <span>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
            />
          </label>
          <label>
            <span>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
            />
          </label>
          <label>
            <span>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
            />
          </label>

          <button type='submit' className='contact-button'>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>
    </div>
  )
})

export default Contact
