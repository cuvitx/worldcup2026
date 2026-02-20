import { describe, it, expect } from 'vitest'
import { EVENT_DATES, EXTERNAL_URLS, stageLabels } from '../src/constants'

describe('constants', () => {
  describe('EVENT_DATES', () => {
    it('has correct tournament dates', () => {
      expect(EVENT_DATES.START).toBe('2026-06-11')
      expect(EVENT_DATES.END).toBe('2026-07-19')
    })

    it('has correct draw date', () => {
      expect(EVENT_DATES.DRAW_DATE).toBe('2025-12-13')
    })

    it('has correct tournament duration', () => {
      expect(EVENT_DATES.DURATION_DAYS).toBe(39)
    })

    it('has correct total matches', () => {
      expect(EVENT_DATES.TOTAL_MATCHES).toBe(104)
    })

    it('has French date range string', () => {
      expect(EVENT_DATES.RANGE_FR).toBe('11 juin – 19 juillet 2026')
    })
  })

  describe('EXTERNAL_URLS', () => {
    it('has correct site URLs', () => {
      expect(EXTERNAL_URLS.SITE).toBe('https://cdm2026.fr')
      expect(EXTERNAL_URLS.SITE_WWW).toBe('https://www.cdm2026.fr')
    })

    it('has contact email', () => {
      expect(EXTERNAL_URLS.CONTACT_EMAIL).toBe('contact@cdm2026.fr')
    })

    it('has FIFA URLs', () => {
      expect(EXTERNAL_URLS.FIFA_TICKETS).toContain('fifa.com')
      expect(EXTERNAL_URLS.FIFA_SITE).toBe('https://www.fifa.com')
    })
  })

  describe('stageLabels', () => {
    it('has label for group stage', () => {
      expect(stageLabels['group']).toBe('Phase de groupes')
    })

    it('has label for knockout stages', () => {
      expect(stageLabels['round-of-32']).toBe('32e de finale')
      expect(stageLabels['round-of-16']).toBe('Huitième de finale')
      expect(stageLabels['quarter-final']).toBe('Quart de finale')
      expect(stageLabels['semi-final']).toBe('Demi-finale')
    })

    it('has label for final matches', () => {
      expect(stageLabels['third-place']).toBe('Match pour la 3e place')
      expect(stageLabels['final']).toBe('Finale')
    })

    it('has all main tournament stages', () => {
      const stages = Object.keys(stageLabels)
      expect(stages).toContain('group')
      expect(stages).toContain('round-of-16')
      expect(stages).toContain('final')
    })
  })
})
