import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const ADMIN_EMAILS = ['zekk.inc1105@gmail.com']

export async function GET(req: NextRequest) {
  // 管理者認証チェック
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email ?? '')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') ?? ''
  const status = searchParams.get('status') ?? 'all' // 'all' | 'paid' | 'unpaid'
  const format = searchParams.get('format') ?? 'json' // 'json' | 'csv'

  const admin = createAdminClient()

  let query = admin
    .from('applications')
    .select('id, user_id, session_id, debtor_name, claim_amount, payment_status, status, current_step, created_at, updated_at')
    .order('created_at', { ascending: false })

  if (status === 'paid') {
    query = query.eq('payment_status', 'paid')
  } else if (status === 'unpaid') {
    query = query.neq('payment_status', 'paid')
  }

  if (search) {
    query = query.ilike('debtor_name', `%${search}%`)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // CSV エクスポート
  if (format === 'csv') {
    const header = ['ID', '債務者名', '請求金額', '決済状況', 'ステータス', 'STEP', '作成日', '更新日']
    const rows = (data ?? []).map(a => [
      a.id,
      a.debtor_name ?? '',
      a.claim_amount ?? '',
      a.payment_status === 'paid' ? '決済済み' : '未決済',
      a.status ?? '',
      a.current_step ?? '',
      new Date(a.created_at).toLocaleDateString('ja-JP'),
      new Date(a.updated_at).toLocaleDateString('ja-JP'),
    ])

    const csv = [header, ...rows]
      .map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const bom = '﻿' // Excel で文字化けしないよう BOM 付き UTF-8
    return new Response(bom + csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="applications_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    })
  }

  return NextResponse.json({ data })
}
