import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MatchCard } from '../src/match-card'

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

describe('MatchCard', () => {
  const baseProps = {
    slug: 'france-allemagne',
    homeName: 'France',
    homeFlag: '🇫🇷',
    awayName: 'Allemagne',
    awayFlag: '🇩🇪',
    date: '2026-06-15',
  }

  it('renders team names and flags', () => {
    render(<MatchCard {...baseProps} />)
    
    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.getByText('Allemagne')).toBeInTheDocument()
    expect(screen.getByText('🇫🇷')).toBeInTheDocument()
    expect(screen.getByText('🇩🇪')).toBeInTheDocument()
  })

  it('renders VS when no score is provided', () => {
    render(<MatchCard {...baseProps} />)
    
    expect(screen.getByText('VS')).toBeInTheDocument()
  })

  it('renders score when status is live', () => {
    render(
      <MatchCard 
        {...baseProps} 
        status="live" 
        scoreHome={2} 
        scoreAway={1} 
      />
    )
    
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.queryByText('VS')).not.toBeInTheDocument()
  })

  it('renders score when status is finished', () => {
    render(
      <MatchCard 
        {...baseProps} 
        status="finished" 
        scoreHome={3} 
        scoreAway={0} 
      />
    )
    
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.queryByText('VS')).not.toBeInTheDocument()
  })

  it('renders LIVE badge when status is live', () => {
    render(
      <MatchCard 
        {...baseProps} 
        status="live" 
        scoreHome={1} 
        scoreAway={1} 
      />
    )
    
    expect(screen.getByText(/LIVE/)).toBeInTheDocument()
  })

  it('renders minute when provided and status is live', () => {
    render(
      <MatchCard 
        {...baseProps} 
        status="live" 
        scoreHome={1} 
        scoreAway={1} 
        minute={45} 
      />
    )
    
    expect(screen.getByText(/45'/)).toBeInTheDocument()
  })

  it('renders time when provided', () => {
    render(<MatchCard {...baseProps} time="21:00" />)
    
    expect(screen.getByText('21:00')).toBeInTheDocument()
  })

  it('renders group info when provided', () => {
    render(<MatchCard {...baseProps} group="A" matchday={1} />)
    
    expect(screen.getByText(/Groupe A/)).toBeInTheDocument()
    expect(screen.getByText(/J1/)).toBeInTheDocument()
  })

  it('renders stage info when provided', () => {
    render(<MatchCard {...baseProps} stage="Finale" />)
    
    expect(screen.getByText('Finale')).toBeInTheDocument()
  })

  it('renders hot badge when isHot is true and not live', () => {
    render(<MatchCard {...baseProps} isHot />)
    
    expect(screen.getByText(/🔥 Hot/)).toBeInTheDocument()
  })

  it('renders top badge when isTop is true and not live', () => {
    render(<MatchCard {...baseProps} isTop />)
    
    expect(screen.getByText(/⭐ Top/)).toBeInTheDocument()
  })

  it('does not render hot badge when status is live', () => {
    render(
      <MatchCard 
        {...baseProps} 
        isHot 
        status="live" 
        scoreHome={1} 
        scoreAway={1} 
      />
    )
    
    expect(screen.queryByText(/🔥 Hot/)).not.toBeInTheDocument()
  })

  it('renders odds when provided and no score', () => {
    render(
      <MatchCard 
        {...baseProps} 
        odds={{ home: '2.10', draw: '3.20', away: '3.50' }} 
      />
    )
    
    expect(screen.getByText('2.10')).toBeInTheDocument()
    expect(screen.getByText('3.20')).toBeInTheDocument()
    expect(screen.getByText('3.50')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument() // Label for home
    expect(screen.getByText('N')).toBeInTheDocument() // Label for draw
    expect(screen.getByText('2')).toBeInTheDocument() // Label for away
  })

  it('does not render odds when score is shown', () => {
    render(
      <MatchCard 
        {...baseProps} 
        status="live"
        scoreHome={1}
        scoreAway={0}
        odds={{ home: '2.10', draw: '3.20', away: '3.50' }} 
      />
    )
    
    expect(screen.queryByText('2.10')).not.toBeInTheDocument()
  })

  it('renders correct link href', () => {
    const { container } = render(<MatchCard {...baseProps} />)
    
    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', '/pronostic-match/france-allemagne')
  })

  it('applies compact styles when compact is true', () => {
    const { container } = render(<MatchCard {...baseProps} compact />)
    
    const link = container.querySelector('a')
    expect(link).toBeInTheDocument()
    // Compact class is applied via className prop
  })

  it('applies correct status class', () => {
    const { container, rerender } = render(
      <MatchCard {...baseProps} status="live" scoreHome={1} scoreAway={1} />
    )
    
    let link = container.querySelector('a')
    expect(link).toHaveClass('match-card--live')
    
    rerender(
      <MatchCard {...baseProps} status="finished" scoreHome={2} scoreAway={1} />
    )
    link = container.querySelector('a')
    expect(link).toHaveClass('match-card--finished')
    
    rerender(<MatchCard {...baseProps} status="upcoming" />)
    link = container.querySelector('a')
    expect(link).toHaveClass('match-card--upcoming')
  })
})
