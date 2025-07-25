import { screen, render } from '@testing-library/react'
import { SocialLinks } from '@/shared/ui'

describe('Footer', () => {
  it('render correctly', () => {
    render(<SocialLinks />)
    expect(screen.getAllByRole('link')).toHaveLength(3)
  })
})
