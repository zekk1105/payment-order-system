'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { validateEmail } from '@/lib/validators'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('メールアドレスを入力してください')
      return
    }
    if (!validateEmail(email)) {
      setError('メールアドレスの形式が正しくありません')
      return
    }
    if (!password) {
      setError('パスワードを入力してください')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('メールアドレスまたはパスワードが正しくありません')
      setLoading(false)
      return
    }

    router.push('/apply/step1')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: '#f8f9fa' }}>
      <h1 className="text-2xl font-bold mb-8 text-center" style={{ color: '#1e3a5f' }}>
        支払督促かんたん作成
      </h1>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl text-center" style={{ color: '#1e3a5f' }}>
            ログイン
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
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
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700" htmlFor="password">
                パスワード
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワードを入力"
                required
                autoComplete="current-password"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full font-semibold"
              style={{ background: '#1e3a5f' }}
            >
              {loading ? 'ログイン中...' : 'ログイン'}
            </Button>
          </form>
          <div className="mt-6 space-y-2 text-center text-sm">
            <p>
              <Link href="/auth/reset-password" className="hover:underline" style={{ color: '#c9a84c' }}>
                パスワードを忘れた方はこちら
              </Link>
            </p>
            <p className="text-gray-600">
              アカウントをお持ちでない方は{' '}
              <Link href="/auth/register" className="font-semibold hover:underline" style={{ color: '#1e3a5f' }}>
                こちら
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
