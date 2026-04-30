import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const ADMIN_EMAILS = ['zekk.inc1105@gmail.com']
const PRICE_PER_APPLICATION = 9800 // 円

export async function GET(_req: NextRequest) {
  // 管理者認証チェック
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email ?? '')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const admin = createAdminClient()

  // 全申立書を取得
  const { data: applications, error } = await admin
    .from('applications')
    .select('id, payment_status, created_at')
    .order('created_at', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const total = applications?.length ?? 0
  const paid = applications?.filter(a => a.payment_status === 'paid').length ?? 0
  const totalRevenue = paid * PRICE_PER_APPLICATION
  const completionRate = total > 0 ? Math.round((paid / total) * 100) : 0

  // 月別集計（過去6ヶ月）
  const now = new Date()
  const months: { label: string; count: number; revenue: number }[] = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const label = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}`
    const start = new Date(d.getFullYear(), d.getMonth(), 1).toISOString()
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 1).toISOString()

    const monthPaid = applications?.filter(
      a => a.payment_status === 'paid' && a.created_at >= start && a.created_at < end
    ).length ?? 0

    months.push({
      label,
      count: monthPaid,
      revenue: monthPaid * PRICE_PER_APPLICATION,
    })
  }

  return NextResponse.json({
    total,
    paid,
    totalRevenue,
    completionRate,
    months,
  })
}
