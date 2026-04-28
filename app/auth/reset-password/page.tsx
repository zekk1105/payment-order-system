'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback?next=/auth/update-password`,
    })

    if (error) {
      setError('送信に失敗しました。メールアドレスをご確認ください。')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: '#f8f9fa' }}>
      <h1 className="text-2xl font-bold mb-8 text-center" style={{ color: '#1e3a5f' }}>
        支払督促かんたん作成
      </h1>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl text-center" style={{ color: '#1e3a5f' }}>
            パスワードリセット
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <Alert>
              <AlertDescription className="text-center py-2">
                パスワードリセットメールを送信しました。
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <p className="text-sm text-gray-600">
                登録済みのメールアドレスを入力してください。パスワードリセット用のリンクを送信します。
              </p>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700" htmlFor="email">
                  メールアドレス
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                  autoComplete="email"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full font-semibold"
                style={{ background: '#1e3a5f' }}
              >
                {loading ? '送信中...' : 'リセットメールを送信'}
              </Button>
            </form>
          )}
          <div className="mt-6 text-center text-sm text-gray-600">
            <Link href="/auth/login" className="hover:underline" style={{ color: '#1e3a5f' }}>
              ← ログインに戻る
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
