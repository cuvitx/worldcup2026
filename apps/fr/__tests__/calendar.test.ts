import { describe, it, expect, vi } from 'vitest'

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn().mockResolvedValue({
    get: () => 'calendar-test-ip',
  }),
}))

// Mock rate-limit
vi.mock('../app/api/_lib/rate-limit', () => ({
  rateLimit: vi.fn().mockReturnValue(true),
}))

import { GET } from '../app/api/calendar/route'

describe('Calendar API', () => {
  it('returns valid iCal with VCALENDAR and VEVENT', async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('text/calendar')

    const body = await res.text()
    expect(body).toContain('BEGIN:VCALENDAR')
    expect(body).toContain('END:VCALENDAR')
    expect(body).toContain('BEGIN:VEVENT')
    expect(body).toContain('END:VEVENT')
    expect(body).toContain('CDM 2026')
  })
})
