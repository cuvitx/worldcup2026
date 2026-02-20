import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCard } from '../src/stat-card'

describe('StatCard', () => {
  it('renders basic stat card with value and label', () => {
    render(<StatCard value="32" label="Équipes" />)
    
    expect(screen.getByText('32')).toBeInTheDocument()
    expect(screen.getByText('Équipes')).toBeInTheDocument()
  })

  it('renders with icon when provided', () => {
    render(<StatCard value="48" label="Matchs" icon="⚽" />)
    
    expect(screen.getByText('⚽')).toBeInTheDocument()
    expect(screen.getByText('48')).toBeInTheDocument()
    expect(screen.getByText('Matchs')).toBeInTheDocument()
  })

  it('applies primary color class by default', () => {
    const { container } = render(<StatCard value="10" label="Test" />)
    
    const valueElement = screen.getByText('10')
    expect(valueElement).toHaveClass('text-primary')
  })

  it('applies accent color class when color="accent"', () => {
    const { container } = render(<StatCard value="10" label="Test" color="accent" />)
    
    const valueElement = screen.getByText('10')
    expect(valueElement).toHaveClass('text-accent')
  })

  it('applies secondary color class when color="secondary"', () => {
    const { container } = render(<StatCard value="10" label="Test" color="secondary" />)
    
    const valueElement = screen.getByText('10')
    expect(valueElement).toHaveClass('text-secondary')
  })

  it('applies custom className when provided', () => {
    const { container } = render(
      <StatCard value="10" label="Test" className="custom-class" />
    )
    
    const cardElement = container.querySelector('.custom-class')
    expect(cardElement).toBeInTheDocument()
  })

  it('renders ReactNode as value', () => {
    render(
      <StatCard 
        value={<span data-testid="complex-value">2026</span>} 
        label="Année" 
      />
    )
    
    expect(screen.getByTestId('complex-value')).toBeInTheDocument()
    expect(screen.getByText('2026')).toBeInTheDocument()
  })
})
