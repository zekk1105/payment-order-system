import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import StepNav from './StepNav'
import LogoutButton from './LogoutButton'

export default async function ApplyLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-sm font-semibold" style={{ color: '#1e3a5f' }}>
              ← トップに戻る
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 hidden sm:block">{user.email}</span>
              <Link
                href="/mypage"
                className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                style={{ color: '#1e3a5f' }}
              >
                マイページ
              </Link>
              <LogoutButton />
            </div>
          </div>
          <StepNav />
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
