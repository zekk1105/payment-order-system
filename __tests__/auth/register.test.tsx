import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import RegisterPage from '@/app/auth/register/page'

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}))

const mockSignUp = vi.fn()

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signUp: mockSignUp,
    },
  }),
}))

function getForm() {
  return screen.getByRole('button', { name: '登録する' }).closest('form')!
}

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('正しいメール・パスワードで登録すると「確認メールを送信しました」が表示される', async () => {
    mockSignUp.mockResolvedValueOnce({ data: {}, error: null })
    const user = userEvent.setup()
    render(<RegisterPage />)

    await user.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('パスワードを入力'), 'Password1')
    await user.type(screen.getByPlaceholderText('パスワードを再入力'), 'Password1')
    await user.click(screen.getByRole('button', { name: '登録する' }))

    await waitFor(() => {
      expect(screen.getByText(/確認メールを送信しました/)).toBeInTheDocument()
    })
  })

  it('メールアドレスが空の場合エラーが表示される', async () => {
    render(<RegisterPage />)
    fireEvent.submit(getForm())

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
    expect(mockSignUp).not.toHaveBeenCalled()
  })

  it('パスワードが7文字以下の場合エラーが表示される', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)

    await user.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('パスワードを入力'), 'Pass1ab')
    await user.type(screen.getByPlaceholderText('パスワードを再入力'), 'Pass1ab')
    fireEvent.submit(getForm())

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
    expect(mockSignUp).not.toHaveBeenCalled()
  })

  it('パスワードに数字が含まれない場合エラーが表示される', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)

    await user.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('パスワードを入力'), 'password')
    await user.type(screen.getByPlaceholderText('パスワードを再入力'), 'password')
    fireEvent.submit(getForm())

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
    expect(mockSignUp).not.toHaveBeenCalled()
  })

  it('パスワードに英字が含まれない場合エラーが表示される', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)

    await user.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('パスワードを入力'), '12345678')
    await user.type(screen.getByPlaceholderText('パスワードを再入力'), '12345678')
    fireEvent.submit(getForm())

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
    expect(mockSignUp).not.toHaveBeenCalled()
  })

  it('パスワードと確認パスワードが一致しない場合エラーが表示される', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)

    await user.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('パスワードを入力'), 'Password1')
    await user.type(screen.getByPlaceholderText('パスワードを再入力'), 'Password2')
    fireEvent.submit(getForm())

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
    expect(mockSignUp).not.toHaveBeenCalled()
  })

  it('パスワードがちょうど8文字（英数字混在）は登録できる', async () => {
    mockSignUp.mockResolvedValueOnce({ data: {}, error: null })
    const user = userEvent.setup()
    render(<RegisterPage />)

    await user.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('パスワードを入力'), 'Passwor1')
    await user.type(screen.getByPlaceholderText('パスワードを再入力'), 'Passwor1')
    await user.click(screen.getByRole('button', { name: '登録する' }))

    await waitFor(() => {
      expect(screen.getByText(/確認メールを送信しました/)).toBeInTheDocument()
    })
  })

  it('パスワードがちょうど7文字はエラーになる', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)

    await user.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('パスワードを入力'), 'Passwo1')
    await user.type(screen.getByPlaceholderText('パスワードを再入力'), 'Passwo1')
    fireEvent.submit(getForm())

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
    expect(mockSignUp).not.toHaveBeenCalled()
  })
})
