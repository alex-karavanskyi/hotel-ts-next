import Error from '@/layout/Error'

export default function NotFound() {
  return (
    <Error message="404 - Page Not Found" redirectTo="/" redirectDelay={2500} />
  )
}
