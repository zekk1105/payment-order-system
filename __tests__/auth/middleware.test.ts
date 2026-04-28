// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { proxy } from '@/proxy'
import { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(),
}))

const mockGetUser = vi.fn()
const mockCreateServerClient = vi.mocked(createServerClient)

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'http://test.supabase.co')
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test-anon-key')

  mockCreateServerClient.mockReturnValue({
    auth: { getUser: mockGetUser },
  } as ReturnType<typeof createServerClient>)
})

function makeRequest(pathname: string) {
  return new NextRequest(new URL(pathname, 'http://localhost:3000'))
}

describe('proxy middleware', () => {
  it('未認証ユーザーが /apply/step1 にアクセスすると /auth/login にリダイレクトされる', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null } })

    const res = await proxy(makeRequest('/apply/step1'))

    expect(res.headers.get('location')).toContain('/auth/login')
  })

  it('未認証ユーザーが /apply/step8 にアクセスすると /auth/login にリダイレクトされる', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null } })

    const res = await proxy(makeRequest('/apply/step8'))

    expect(res.headers.get('location')).toContain('/auth/login')
  })

  it('未認証ユーザーが /auth/login にアクセスするとリダイレクトされない', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null } })

    const res = await proxy(makeRequest('/auth/login'))

    expect(res.headers.get('location')).toBeNull()
  })

  it('認証済みユーザーが /apply/step1 にアクセスするとリダイレクトされない', async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: 'user-id', email: 'test@example.com' } },
    })

    const res = await proxy(makeRequest('/apply/step1'))

    expect(res.headers.get('location')).toBeNull()
  })
})
