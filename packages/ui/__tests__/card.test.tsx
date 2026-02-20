import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from '../src/card'

describe('Card', () => {
  it('renders children content', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    )
    
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies default large padding', () => {
    const { container } = render(<Card>Content</Card>)
    
    const card = container.firstChild
    expect(card).toHaveClass('p-6')
  })

  it('applies small padding when specified', () => {
    const { container } = render(<Card padding="sm">Content</Card>)
    
    const card = container.firstChild
    expect(card).toHaveClass('p-4')
  })

  it('applies medium padding when specified', () => {
    const { container } = render(<Card padding="md">Content</Card>)
    
    const card = container.firstChild
    expect(card).toHaveClass('p-5')
  })

  it('does not apply hover styles by default', () => {
    const { container } = render(<Card>Content</Card>)
    
    const card = container.firstChild
    expect(card).not.toHaveClass('hover:shadow-md')
  })

  it('applies hover styles when hover is true', () => {
    const { container } = render(<Card hover>Content</Card>)
    
    const card = container.firstChild
    expect(card).toHaveClass('hover:shadow-md')
    expect(card).toHaveClass('transition-shadow')
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    
    const card = container.firstChild
    expect(card).toHaveClass('custom-class')
  })

  it('applies border and rounded styles', () => {
    const { container } = render(<Card>Content</Card>)
    
    const card = container.firstChild
    expect(card).toHaveClass('rounded-xl')
    expect(card).toHaveClass('border')
  })

  it('renders complex children', () => {
    render(
      <Card>
        <h2>Title</h2>
        <p>Description</p>
        <button>Action</button>
      </Card>
    )
    
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })
})
