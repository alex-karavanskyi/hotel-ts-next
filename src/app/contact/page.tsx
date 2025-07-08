import { Metadata } from 'next'
import Contact from '@/components/contact/Contact'

export const metadata: Metadata = {
  title: 'Contact | React App',
}

const ContactPage = () => {
  return (
    <div>
      <Contact />
    </div>
  )
}

export default ContactPage
