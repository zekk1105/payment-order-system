'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Lock, ShieldCheck } from 'lucide-react'

const ADMIN_EMAILS = ['zekk.inc1105@gmail.com']

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError('メールアドレスまたはパスワードが正しくありません')
      setLoading(false)
      return
    }

    // 管理者メールアドレスチェック
    if (!ADMIN_EMAILS.includes(data.user?.email ?? '')) {
      await supabase.auth.signOut()
      setError('このアカウントには管理者権限がありません')
      setLoading(false)
      return
    }

    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-[#1e3a5f] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* ロゴエリア */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-4">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">管理者ログイン</h1>
          <p className="text-sm text-white/50 mt-1">支払督促かんたん作成 — Admin</p>
        </div>

        {/* フォーム */}
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-xl px-6 py-7 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">メールアドレス</label>
            <Input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">パスワード</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-2"
            disabled={loading || !email || !password}
            style={{ background: '#1e3a5f', color: 'white' }}
          >
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />ログイン中…</>
              : <><Lock className="w-4 h-4 mr-2" />ログイン</>
            }
          </Button>
        </form>

        <p className="text-center text-xs text-white/30 mt-6">
          管理者専用ページです
        </p>
      </div>
    </div>
  )
}
