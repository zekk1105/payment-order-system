'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { LayoutDashboard, FileText, Users, LogOut, ExternalLink } from 'lucide-react'

export default function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  const [email, setEmail] = useState<string | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null)
    })
  }, [])

  async function handleLogout() {
    setLoggingOut(true)
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-[#1e3a5f] text-white flex flex-col z-10">
      {/* ヘッダー */}
      <div className="px-5 py-5 border-b border-white/10">
        <p className="text-xs text-white/50 uppercase tracking-widest mb-0.5">Admin</p>
        <p className="text-base font-bold leading-tight">支払督促<br />管理ダッシュボード</p>
      </div>

      {/* ナビ */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <NavItem
          href="/admin"
          icon={<LayoutDashboard className="w-4 h-4" />}
          label="ダッシュボード"
          active={pathname === '/admin'}
        />
        <NavItem
          href="/admin/applications"
          icon={<FileText className="w-4 h-4" />}
          label="申立書一覧"
          active={pathname.startsWith('/admin/applications')}
        />
        <NavItem
          href="/admin/users"
          icon={<Users className="w-4 h-4" />}
          label="ユーザー管理"
          active={pathname.startsWith('/admin/users')}
        />
      </nav>

      {/* フッター */}
      <div className="px-4 py-4 border-t border-white/10 space-y-3">
        {/* ログイン中のメール */}
        {email && (
          <div className="px-1">
            <p className="text-xs text-white/40 mb-0.5">ログイン中</p>
            <p className="text-xs text-white/70 break-all leading-snug">{email}</p>
          </div>
        )}

        {/* サービストップへ */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/50 hover:bg-white/10 hover:text-white/80 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
          サービストップ
        </Link>

        {/* ログアウト */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-300/80 hover:bg-red-500/20 hover:text-red-200 transition-colors disabled:opacity-50"
        >
          <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
          {loggingOut ? 'ログアウト中…' : 'ログアウト'}
        </button>
      </div>
    </aside>
  )
}

function NavItem({
  href,
  icon,
  label,
  active,
}: {
  href: string
  icon: React.ReactNode
  label: string
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
        active
          ? 'bg-white/15 text-white font-medium'
          : 'text-white/60 hover:bg-white/10 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </Link>
  )
}
