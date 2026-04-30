'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, TrendingUp, FileText, CircleCheckBig, Banknote } from 'lucide-react'

type Stats = {
  total: number
  paid: number
  totalRevenue: number
  completionRate: number
  months: { label: string; count: number; revenue: number }[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#1e3a5f]" />
      </div>
    )
  }

  if (!stats) {
    return <p className="text-red-500">データの取得に失敗しました。</p>
  }

  const maxCount = Math.max(...stats.months.map(m => m.count), 1)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">ダッシュボード</h1>
        <p className="text-sm text-gray-400 mt-0.5">サービス全体のサマリーです</p>
      </div>

      {/* サマリーカード */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard
          icon={<FileText className="w-5 h-5 text-[#1e3a5f]" />}
          label="申立書 総作成数"
          value={`${stats.total.toLocaleString()} 件`}
        />
        <SummaryCard
          icon={<CircleCheckBig className="w-5 h-5 text-green-600" />}
          label="決済完了"
          value={`${stats.paid.toLocaleString()} 件`}
          sub={`完了率 ${stats.completionRate}%`}
          subColor="text-green-600"
        />
        <SummaryCard
          icon={<Banknote className="w-5 h-5 text-[#c9a84c]" />}
          label="累計売上"
          value={`¥${stats.totalRevenue.toLocaleString()}`}
        />
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5 text-blue-500" />}
          label="今月の決済"
          value={`${(stats.months[stats.months.length - 1]?.count ?? 0).toLocaleString()} 件`}
          sub={`¥${(stats.months[stats.months.length - 1]?.revenue ?? 0).toLocaleString()}`}
          subColor="text-blue-500"
        />
      </div>

      {/* 月別グラフ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-[#1e3a5f]">月別 決済完了件数（過去6ヶ月）</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4 h-44">
            {stats.months.map(m => {
              const heightPct = maxCount > 0 ? (m.count / maxCount) * 100 : 0
              return (
                <div key={m.label} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-gray-700">
                    {m.count > 0 ? `${m.count}件` : ''}
                  </span>
                  <div className="w-full flex items-end" style={{ height: '120px' }}>
                    <div
                      className="w-full rounded-t-md bg-[#1e3a5f] transition-all"
                      style={{ height: `${Math.max(heightPct, m.count > 0 ? 4 : 0)}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{m.label}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* 月別テーブル */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-[#1e3a5f]">月別 売上内訳</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-gray-400 font-normal">月</th>
                <th className="text-right py-2 text-gray-400 font-normal">決済件数</th>
                <th className="text-right py-2 text-gray-400 font-normal">売上</th>
              </tr>
            </thead>
            <tbody>
              {[...stats.months].reverse().map(m => (
                <tr key={m.label} className="border-b border-gray-50">
                  <td className="py-2.5 font-medium">{m.label}</td>
                  <td className="py-2.5 text-right">{m.count} 件</td>
                  <td className="py-2.5 text-right font-semibold">¥{m.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

function SummaryCard({
  icon,
  label,
  value,
  sub,
  subColor = 'text-gray-400',
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
  subColor?: string
}) {
  return (
    <Card>
      <CardContent className="pt-5 pb-4 px-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-gray-50">{icon}</div>
          <span className="text-xs text-gray-400">{label}</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {sub && <p className={`text-xs mt-1 ${subColor}`}>{sub}</p>}
      </CardContent>
    </Card>
  )
}
