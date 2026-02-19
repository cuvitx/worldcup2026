import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn().mockResolvedValue({
    get: (name: string) => name === 'x-forwarded-for' ? 'newsletter-test-' + Math.random() : null,
  }),
}))

// Mock rate-limit to allow by default
vi.mock('../app/api/_lib/rate-limit', () => ({
  rateLimit: vi.fn().mockReturnValue(true),
}))

import { POST } from '../app/api/newsletter/route'
import { rateLimit } from '../app/api/_lib/rate-limit'
import { NextRequest } from 'next/server'

function makePostRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost:3000/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('Newsletter API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(rateLimit as ReturnType<typeof vi.fn>).mockReturnValue(true)
    delete process.env.BREVO_API_KEY
  })

  it('returns 400 for invalid email', async () => {
    const res = await POST(makePostRequest({ email: 'not-an-email' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toContain('invalide')
  })

  it('calls Brevo for valid email', async () => {
    process.env.BREVO_API_KEY = 'test-key'
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(null, { status: 404 }) // contact not found
    ).mockResolvedValueOnce(
      new Response(JSON.stringify({ id: 1 }), { status: 201 }) // created
    )

    const res = await POST(makePostRequest({ email: 'test@example.com' }))
    expect(res.status).toBe(200)
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('api.brevo.com/v3/contacts'),
      expect.anything()
    )
    fetchSpy.mockRestore()
  })

  it('returns 429 when rate limited', async () => {
    ;(rateLimit as ReturnType<typeof vi.fn>).mockReturnValue(false)
    const res = await POST(makePostRequest({ email: 'test@example.com' }))
    expect(res.status).toBe(429)
  })
})
