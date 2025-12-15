import { Metadata } from 'next'
import Contact from '@/components/contact/Contact'

export const metadata: Metadata = {
  title: 'Contact | React App',
}

const ContactPage = () => {
  return (
    <>
      <Contact />
    </>
  )
}

export default ContactPage
