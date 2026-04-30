import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const ADMIN_EMAILS = ['zekk.inc1105@gmail.com']

export async function GET(_req: NextRequest) {
  // 管理者認証チェック
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email ?? '')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const admin = createAdminClient()

  // ユーザー一覧を取得（Supabase Admin Auth API）
  const { data: usersData, error: usersError } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  })

  if (usersError) {
    return NextResponse.json({ error: usersError.message }, { status: 500 })
  }

  // 各ユーザーの申立書数を取得
  const { data: appCounts, error: countError } = await admin
    .from('applications')
    .select('user_id')

  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 })
  }

  const countMap: Record<string, number> = {}
  const paidMap: Record<string, number> = {}
  for (const a of appCounts ?? []) {
    countMap[a.user_id] = (countMap[a.user_id] ?? 0) + 1
  }

  // 決済済み件数
  const { data: paidApps } = await admin
    .from('applications')
    .select('user_id')
    .eq('payment_status', 'paid')

  for (const a of paidApps ?? []) {
    paidMap[a.user_id] = (paidMap[a.user_id] ?? 0) + 1
  }

  const users = (usersData?.users ?? []).map(u => ({
    id: u.id,
    email: u.email ?? '',
    created_at: u.created_at,
    last_sign_in_at: u.last_sign_in_at ?? null,
    applicationCount: countMap[u.id] ?? 0,
    paidCount: paidMap[u.id] ?? 0,
  }))

  // 登録日の降順
  users.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return NextResponse.json({ users })
}
