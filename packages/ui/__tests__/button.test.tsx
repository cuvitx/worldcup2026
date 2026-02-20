import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button, ButtonLink, ButtonAnchor } from '../src/button'

describe('Button', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>)
    
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies primary variant by default', () => {
    const { container } = render(<Button>Primary</Button>)
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('bg-accent')
  })

  it('applies secondary variant when specified', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>)
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('bg-transparent')
    expect(button).toHaveClass('text-secondary')
  })

  it('applies outline variant when specified', () => {
    const { container } = render(<Button variant="outline">Outline</Button>)
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('border')
  })

  it('applies ghost variant when specified', () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>)
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('bg-white/10')
  })

  it('applies cta variant when specified', () => {
    const { container } = render(<Button variant="cta">CTA</Button>)
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('font-bold')
  })

  it('applies medium size by default', () => {
    const { container } = render(<Button>Medium</Button>)
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('px-6')
    expect(button).toHaveClass('py-3')
  })

  it('applies small size when specified', () => {
    const { container } = render(<Button size="sm">Small</Button>)
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('px-4')
    expect(button).toHaveClass('py-2')
  })

  it('applies large size when specified', () => {
    const { container } = render(<Button size="lg">Large</Button>)
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('px-8')
    expect(button).toHaveClass('py-4')
  })

  it('applies rounded-full when pill is true', () => {
    const { container } = render(<Button pill>Pill</Button>)
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('rounded-full')
  })

  it('applies rounded-lg when pill is false', () => {
    const { container } = render(<Button pill={false}>Not Pill</Button>)
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('rounded-lg')
  })

  it('handles onClick events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    const handleClick = vi.fn()
    render(<Button disabled onClick={handleClick}>Disabled</Button>)
    
    const button = screen.getByText('Disabled')
    expect(button).toBeDisabled()
    
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(<Button className="custom-class">Custom</Button>)
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('custom-class')
  })
})

describe('ButtonLink', () => {
  it('renders anchor with href', () => {
    render(<ButtonLink href="/test">Link</ButtonLink>)
    
    const link = screen.getByText('Link')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/test')
  })

  it('applies primary variant by default', () => {
    const { container } = render(<ButtonLink href="/test">Link</ButtonLink>)
    
    const link = container.querySelector('a')
    expect(link).toHaveClass('bg-accent')
  })

  it('applies different variants', () => {
    const { container } = render(
      <ButtonLink href="/test" variant="secondary">
        Secondary Link
      </ButtonLink>
    )
    
    const link = container.querySelector('a')
    expect(link).toHaveClass('text-secondary')
  })

  it('supports target and rel attributes', () => {
    render(
      <ButtonLink href="/test" target="_blank" rel="noopener noreferrer">
        External
      </ButtonLink>
    )
    
    const link = screen.getByText('External')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})

describe('ButtonAnchor', () => {
  it('renders anchor element', () => {
    render(<ButtonAnchor href="#section">Anchor</ButtonAnchor>)
    
    const anchor = screen.getByText('Anchor')
    expect(anchor.tagName).toBe('A')
    expect(anchor).toHaveAttribute('href', '#section')
  })

  it('applies variant styles', () => {
    const { container } = render(
      <ButtonAnchor href="#test" variant="outline">
        Outline Anchor
      </ButtonAnchor>
    )
    
    const anchor = container.querySelector('a')
    expect(anchor).toHaveClass('border')
  })

  it('applies size styles', () => {
    const { container } = render(
      <ButtonAnchor href="#test" size="lg">
        Large Anchor
      </ButtonAnchor>
    )
    
    const anchor = container.querySelector('a')
    expect(anchor).toHaveClass('px-8')
    expect(anchor).toHaveClass('py-4')
  })

  it('supports pill prop', () => {
    const { container } = render(
      <ButtonAnchor href="#test" pill>
        Pill Anchor
      </ButtonAnchor>
    )
    
    const anchor = container.querySelector('a')
    expect(anchor).toHaveClass('rounded-full')
  })
})
