import { describe, it, expect } from 'vitest'
import {
  getAlternates,
  getStaticAlternates,
  getHomeAlternates,
  domains,
  routePrefixes,
} from '../src/route-mapping'

describe('route-mapping', () => {
  describe('domains', () => {
    it('has correct FR domain', () => {
      expect(domains.fr).toBe('https://www.cdm2026.fr')
    })
  })

  describe('routePrefixes', () => {
    it('has French route prefixes', () => {
      expect(routePrefixes.fr.team).toBe('equipe')
      expect(routePrefixes.fr.teams).toBe('equipes')
      expect(routePrefixes.fr.match).toBe('match')
    })
  })

  describe('getAlternates', () => {
    it('generates correct canonical for team page', () => {
      const result = getAlternates('team', 'france', 'fr')
      expect(result.canonical).toBe('/equipe/france')
    })

    it('handles different route types', () => {
      expect(getAlternates('stadium', 'stade-de-france', 'fr').canonical).toBe('/stade/stade-de-france')
      expect(getAlternates('guide', 'comment-regarder', 'fr').canonical).toBe('/guide/comment-regarder')
      expect(getAlternates('bookmaker', 'betclic', 'fr').canonical).toBe('/bookmaker/betclic')
    })
  })

  describe('getStaticAlternates', () => {
    it('generates correct canonical for static pages', () => {
      expect(getStaticAlternates('teams', 'fr').canonical).toBe('/equipes')
      expect(getStaticAlternates('players', 'fr').canonical).toBe('/joueurs')
      expect(getStaticAlternates('stadiums', 'fr').canonical).toBe('/stades')
    })
  })

  describe('getHomeAlternates', () => {
    it('generates correct canonical for homepage', () => {
      expect(getHomeAlternates().canonical).toBe('/')
    })
  })
})
