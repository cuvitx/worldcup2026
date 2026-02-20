import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Flag from '../src/flag'

describe('Flag', () => {
  it('renders flag emoji', () => {
    render(<Flag flag="🇫🇷" name="France" />)
    
    expect(screen.getByText('🇫🇷')).toBeInTheDocument()
  })

  it('has correct aria-label for accessibility', () => {
    render(<Flag flag="🇩🇪" name="Allemagne" />)
    
    const flagElement = screen.getByLabelText('Drapeau de Allemagne')
    expect(flagElement).toBeInTheDocument()
  })

  it('has role="img" for accessibility', () => {
    render(<Flag flag="🇧🇷" name="Brésil" />)
    
    const flagElement = screen.getByRole('img', { name: 'Drapeau de Brésil' })
    expect(flagElement).toBeInTheDocument()
  })

  it('applies custom className when provided', () => {
    render(<Flag flag="🇪🇸" name="Espagne" className="text-2xl" />)
    
    const flagElement = screen.getByText('🇪🇸')
    expect(flagElement).toHaveClass('text-2xl')
  })

  it('renders different flags correctly', () => {
    const { rerender } = render(<Flag flag="🇦🇷" name="Argentine" />)
    expect(screen.getByText('🇦🇷')).toBeInTheDocument()
    
    rerender(<Flag flag="🇵🇹" name="Portugal" />)
    expect(screen.getByText('🇵🇹')).toBeInTheDocument()
    expect(screen.queryByText('🇦🇷')).not.toBeInTheDocument()
  })
})
