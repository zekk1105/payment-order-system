// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from '@/app/api/stripe/webhook/route'
import { NextRequest } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { sendPdfCompleteEmail } from '@/lib/email'

vi.mock('@/lib/stripe', () => ({
  stripe: {
    webhooks: {
      constructEvent: vi.fn(),
    },
  },
}))

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(),
}))

vi.mock('@/lib/email', () => ({
  sendPdfCompleteEmail: vi.fn().mockResolvedValue(undefined),
}))

const mockEvent = {
  type: 'checkout.session.completed',
  data: {
    object: {
      id: 'cs_test_123',
      metadata: {
        userId: 'user_123',
        sessionId: 'session_123',
      },
      customer_details: {
        email: 'test@example.com',
      },
    },
  },
}

// Supabaseのクエリビルダーをthenableオブジェクトとしてモックする。
// .from().update().eq().eq() のチェーンを再現し、awaitで{ error }を返す。
function createSupabaseMock(error: Error | null = null) {
  const builder: Record<string, unknown> & {
    then: (
      onfulfilled: (value: { error: Error | null }) => unknown,
      onrejected?: (reason: unknown) => unknown
    ) => Promise<unknown>
  } = {
    from: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    then(onfulfilled, onrejected) {
      return Promise.resolve({ error }).then(onfulfilled, onrejected)
    },
  }
  return builder
}

function createRequest(body: string, signature: string) {
  return new NextRequest('http://localhost/api/stripe/webhook', {
    method: 'POST',
    body,
    headers: { 'stripe-signature': signature },
  })
}

describe('POST /api/stripe/webhook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('checkout.session.completedイベントを受信したとき payment_statusがpaidに更新されメールが送信される', async () => {
    const mockBuilder = createSupabaseMock()
    vi.mocked(createClient).mockReturnValue(mockBuilder as ReturnType<typeof createClient>)
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue(mockEvent as ReturnType<typeof stripe.webhooks.constructEvent>)

    const request = createRequest(JSON.stringify(mockEvent), 'valid_signature')
    await POST(request)

    expect(vi.mocked(mockBuilder.from as ReturnType<typeof vi.fn>)).toHaveBeenCalledWith('applications')
    expect(vi.mocked(mockBuilder.update as ReturnType<typeof vi.fn>)).toHaveBeenCalledWith({ payment_status: 'paid' })
    expect(vi.mocked(mockBuilder.eq as ReturnType<typeof vi.fn>)).toHaveBeenCalledWith('user_id', 'user_123')
    expect(vi.mocked(mockBuilder.eq as ReturnType<typeof vi.fn>)).toHaveBeenCalledWith('session_id', 'session_123')
    expect(sendPdfCompleteEmail).toHaveBeenCalledWith('test@example.com')
  })

  it('署名が正しい場合 ステータス200を返す', async () => {
    const mockBuilder = createSupabaseMock()
    vi.mocked(createClient).mockReturnValue(mockBuilder as ReturnType<typeof createClient>)
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue(mockEvent as ReturnType<typeof stripe.webhooks.constructEvent>)

    const request = createRequest(JSON.stringify(mockEvent), 'valid_signature')
    const response = await POST(request)

    expect(response.status).toBe(200)
  })

  it('署名が不正な場合 ステータス400を返す', async () => {
    vi.mocked(stripe.webhooks.constructEvent).mockImplementation(() => {
      throw new Error('No signatures found matching the expected signature for payload')
    })

    const request = createRequest(JSON.stringify(mockEvent), 'invalid_signature')
    const response = await POST(request)

    expect(response.status).toBe(400)
  })

  it('不明なイベントタイプを受信した場合 エラーにならずステータス200を返す', async () => {
    const unknownEvent = { ...mockEvent, type: 'unknown.event.type' }
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue(unknownEvent as ReturnType<typeof stripe.webhooks.constructEvent>)

    const request = createRequest(JSON.stringify(unknownEvent), 'valid_signature')
    const response = await POST(request)

    expect(response.status).toBe(200)
    expect(sendPdfCompleteEmail).not.toHaveBeenCalled()
  })

  it('Supabaseの更新が失敗した場合 エラーをログに記録してステータス500を返す', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const mockBuilder = createSupabaseMock(new Error('DB update failed'))
    vi.mocked(createClient).mockReturnValue(mockBuilder as ReturnType<typeof createClient>)
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue(mockEvent as ReturnType<typeof stripe.webhooks.constructEvent>)

    const request = createRequest(JSON.stringify(mockEvent), 'valid_signature')
    const response = await POST(request)

    expect(response.status).toBe(500)
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to update payment status:',
      expect.any(Error)
    )
    consoleSpy.mockRestore()
  })
})
