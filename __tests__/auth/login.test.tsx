import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LoginPage from '@/app/auth/login/page'

const mockPush = vi.fn()
const mockRefresh = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}))

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}))

const mockSignInWithPassword = vi.fn()

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: mockSignInWithPassword,
    },
  }),
}))

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('正しいメール・パスワードでログインすると /apply/step1 にリダイレクトされる', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ data: {}, error: null })
    const user = userEvent.setup()
    render(<LoginPage />)

    await user.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
    await user.type(screen.getByLabelText('パスワード'), 'Password1')
    await user.click(screen.getByRole('button', { name: 'ログイン' }))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/apply/step1')
    })
  })

  it('メールアドレスが空の場合エラーメッセージが表示される', async () => {
    render(<LoginPage />)
    const form = screen.getByRole('button', { name: 'ログイン' }).closest('form')!
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
    expect(mockSignInWithPassword).not.toHaveBeenCalled()
  })

  it('パスワードが空の場合エラーメッセージが表示される', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    await user.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
    const form = screen.getByRole('button', { name: 'ログイン' }).closest('form')!
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
    expect(mockSignInWithPassword).not.toHaveBeenCalled()
  })

  it('メールアドレスの形式が不正の場合エラーメッセージが表示される', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    await user.type(screen.getByLabelText('メールアドレス'), 'test')
    await user.type(screen.getByLabelText('パスワード'), 'Password1')
    const form = screen.getByRole('button', { name: 'ログイン' }).closest('form')!
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
    expect(mockSignInWithPassword).not.toHaveBeenCalled()
  })

  it('Supabaseがエラーを返す場合「メールアドレスまたはパスワードが正しくありません」が表示される', async () => {
    mockSignInWithPassword.mockResolvedValueOnce({
      data: null,
      error: new Error('Invalid credentials'),
    })
    const user = userEvent.setup()
    render(<LoginPage />)

    await user.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
    await user.type(screen.getByLabelText('パスワード'), 'WrongPass1')
    await user.click(screen.getByRole('button', { name: 'ログイン' }))

    await waitFor(() => {
      expect(
        screen.getByText('メールアドレスまたはパスワードが正しくありません')
      ).toBeInTheDocument()
    })
  })
})
