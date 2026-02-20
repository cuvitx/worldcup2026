import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Breadcrumb } from '../src/breadcrumb'

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

// Mock BreadcrumbSchema component
vi.mock('../src/breadcrumb-schema', () => ({
  BreadcrumbSchema: () => null,
}))

// Mock route-mapping data
vi.mock('@repo/data/route-mapping', () => ({
  domains: { fr: 'https://cdm2026.fr' },
}))

describe('Breadcrumb', () => {
  it('renders single item without link', () => {
    render(<Breadcrumb items={[{ label: 'Home' }]} />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders multiple items with separators', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Équipes', href: '/equipes' },
          { label: 'France' },
        ]}
      />
    )
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Équipes')).toBeInTheDocument()
    expect(screen.getByText('France')).toBeInTheDocument()
    
    // Check for separators
    const separators = screen.getAllByText('/')
    expect(separators).toHaveLength(2)
  })

  it('renders links for non-last items with href', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Équipes', href: '/equipes' },
          { label: 'France' },
        ]}
      />
    )
    
    const homeLink = screen.getByText('Home')
    expect(homeLink.tagName).toBe('A')
    expect(homeLink).toHaveAttribute('href', '/')
    
    const equipesLink = screen.getByText('Équipes')
    expect(equipesLink.tagName).toBe('A')
    expect(equipesLink).toHaveAttribute('href', '/equipes')
  })

  it('does not render last item as link', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'France', href: '/equipes/france' },
        ]}
      />
    )
    
    const franceItem = screen.getByText('France')
    expect(franceItem.tagName).toBe('SPAN')
    expect(franceItem).not.toHaveAttribute('href')
  })

  it('renders items without href as plain text', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home' },
          { label: 'About' },
        ]}
      />
    )
    
    const homeItem = screen.getByText('Home')
    expect(homeItem.tagName).toBe('SPAN')
    
    const aboutItem = screen.getByText('About')
    expect(aboutItem.tagName).toBe('SPAN')
  })

  it('applies special styling to last item', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Current Page' },
        ]}
      />
    )
    
    const lastItem = screen.getByText('Current Page')
    expect(lastItem).toHaveClass('font-medium')
  })

  it('renders breadcrumb navigation element', () => {
    const { container } = render(
      <Breadcrumb items={[{ label: 'Home', href: '/' }]} />
    )
    
    const nav = container.querySelector('nav')
    expect(nav).toBeInTheDocument()
  })

  it('renders ordered list for breadcrumb items', () => {
    const { container } = render(
      <Breadcrumb items={[{ label: 'Home' }]} />
    )
    
    const ol = container.querySelector('ol')
    expect(ol).toBeInTheDocument()
  })
})
