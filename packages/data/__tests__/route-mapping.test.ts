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
    it('has correct domain URLs', () => {
      expect(domains.fr).toBe('https://cdm2026.fr')
      expect(domains.en).toBe('https://worldcup2026guide.com')
      expect(domains.es).toBe('https://mundial2026.es')
    })
  })

  describe('routePrefixes', () => {
    it('has French route prefixes', () => {
      expect(routePrefixes.fr.team).toBe('equipe')
      expect(routePrefixes.fr.teams).toBe('equipes')
      expect(routePrefixes.fr.match).toBe('match')
    })

    it('has English route prefixes', () => {
      expect(routePrefixes.en.team).toBe('team')
      expect(routePrefixes.en.teams).toBe('teams')
      expect(routePrefixes.en.match).toBe('match')
    })

    it('has Spanish route prefixes', () => {
      expect(routePrefixes.es.team).toBe('equipo')
      expect(routePrefixes.es.teams).toBe('equipos')
      expect(routePrefixes.es.match).toBe('match')
    })
  })

  describe('getAlternates', () => {
    it('generates correct alternates for team page in French', () => {
      const result = getAlternates('team', 'france', 'fr')
      
      expect(result.canonical).toBe('/equipe/france')
      expect(result.languages.fr).toBe('https://cdm2026.fr/equipe/france')
      expect(result.languages.en).toBe('https://worldcup2026guide.com/team/france')
      expect(result.languages.es).toBe('https://mundial2026.es/equipo/france')
      expect(result.languages['x-default']).toBe('https://worldcup2026guide.com/team/france')
    })

    it('generates correct alternates for match page in English', () => {
      const result = getAlternates('match', 'france-allemagne', 'en')
      
      expect(result.canonical).toBe('/match/france-allemagne')
      expect(result.languages.fr).toBe('https://cdm2026.fr/match/france-allemagne')
      expect(result.languages.en).toBe('https://worldcup2026guide.com/match/france-allemagne')
      expect(result.languages.es).toBe('https://mundial2026.es/match/france-allemagne')
    })

    it('generates correct alternates for player page in Spanish', () => {
      const result = getAlternates('player', 'kylian-mbappe', 'es')
      
      expect(result.canonical).toBe('/jugador/kylian-mbappe')
      expect(result.languages.fr).toBe('https://cdm2026.fr/joueur/kylian-mbappe')
      expect(result.languages.en).toBe('https://worldcup2026guide.com/player/kylian-mbappe')
      expect(result.languages.es).toBe('https://mundial2026.es/jugador/kylian-mbappe')
    })

    it('handles different route types correctly', () => {
      const stadium = getAlternates('stadium', 'stade-de-france', 'fr')
      expect(stadium.canonical).toBe('/stade/stade-de-france')
      
      const guide = getAlternates('guide', 'comment-regarder', 'fr')
      expect(guide.canonical).toBe('/guide/comment-regarder')
      
      const bookmaker = getAlternates('bookmaker', 'betclic', 'fr')
      expect(bookmaker.canonical).toBe('/bookmaker/betclic')
    })
  })

  describe('getStaticAlternates', () => {
    it('generates correct alternates for teams page in French', () => {
      const result = getStaticAlternates('teams', 'fr')
      
      expect(result.canonical).toBe('/equipes')
      expect(result.languages.fr).toBe('https://cdm2026.fr/equipes')
      expect(result.languages.en).toBe('https://worldcup2026guide.com/teams')
      expect(result.languages.es).toBe('https://mundial2026.es/equipos')
      expect(result.languages['x-default']).toBe('https://worldcup2026guide.com/teams')
    })

    it('generates correct alternates for players page in English', () => {
      const result = getStaticAlternates('players', 'en')
      
      expect(result.canonical).toBe('/players')
      expect(result.languages.fr).toBe('https://cdm2026.fr/joueurs')
      expect(result.languages.en).toBe('https://worldcup2026guide.com/players')
      expect(result.languages.es).toBe('https://mundial2026.es/jugadores')
    })

    it('generates correct alternates for stadiums page in Spanish', () => {
      const result = getStaticAlternates('stadiums', 'es')
      
      expect(result.canonical).toBe('/estadios')
      expect(result.languages.fr).toBe('https://cdm2026.fr/stades')
      expect(result.languages.en).toBe('https://worldcup2026guide.com/stadiums')
      expect(result.languages.es).toBe('https://mundial2026.es/estadios')
    })

    it('handles different static route types', () => {
      const guides = getStaticAlternates('guides', 'fr')
      expect(guides.canonical).toBe('/guides')
      
      const cities = getStaticAlternates('cities', 'en')
      expect(cities.canonical).toBe('/cities')
      
      const faq = getStaticAlternates('faq', 'es')
      expect(faq.canonical).toBe('/faq')
    })
  })

  describe('getHomeAlternates', () => {
    it('generates correct alternates for homepage', () => {
      const result = getHomeAlternates()
      
      expect(result.canonical).toBe('/')
      expect(result.languages.fr).toBe('https://cdm2026.fr')
      expect(result.languages.en).toBe('https://worldcup2026guide.com')
      expect(result.languages.es).toBe('https://mundial2026.es')
      expect(result.languages['x-default']).toBe('https://worldcup2026guide.com')
    })

    it('always uses English as x-default', () => {
      const result = getHomeAlternates()
      
      expect(result.languages['x-default']).toBe(domains.en)
    })
  })
})
