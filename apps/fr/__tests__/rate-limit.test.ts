import { describe, it, expect, vi, beforeEach } from 'vitest'

// We need to re-import fresh each time to reset the internal Map
// But since the module has side effects (setInterval), we'll just test the exported function
import { rateLimit } from '../app/api/_lib/rate-limit'

describe('rateLimit', () => {
  it('blocks after N requests', () => {
    const ip = 'test-block-' + Date.now()
    const limit = 3
    expect(rateLimit(ip, limit)).toBe(true)  // 1
    expect(rateLimit(ip, limit)).toBe(true)  // 2
    expect(rateLimit(ip, limit)).toBe(true)  // 3
    expect(rateLimit(ip, limit)).toBe(false) // 4 → blocked
    expect(rateLimit(ip, limit)).toBe(false) // 5 → still blocked
  })

  it('resets after windowMs', () => {
    vi.useFakeTimers()
    const ip = 'test-reset-' + Date.now()
    const limit = 2
    const windowMs = 1000

    expect(rateLimit(ip, limit, windowMs)).toBe(true)
    expect(rateLimit(ip, limit, windowMs)).toBe(true)
    expect(rateLimit(ip, limit, windowMs)).toBe(false) // blocked

    vi.advanceTimersByTime(1001) // past window

    expect(rateLimit(ip, limit, windowMs)).toBe(true) // reset → allowed
    vi.useRealTimers()
  })

  it('different IPs are independent', () => {
    const ip1 = 'ip1-' + Date.now()
    const ip2 = 'ip2-' + Date.now()
    const limit = 1

    expect(rateLimit(ip1, limit)).toBe(true)
    expect(rateLimit(ip1, limit)).toBe(false) // ip1 blocked

    expect(rateLimit(ip2, limit)).toBe(true)  // ip2 still allowed
  })
})
