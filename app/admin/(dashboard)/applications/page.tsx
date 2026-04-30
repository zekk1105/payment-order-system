'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Search, Download, RefreshCw } from 'lucide-react'

type Application = {
  id: string
  user_id: string
  session_id: string | null
  debtor_name: string | null
  claim_amount: number | null
  payment_status: string | null
  status: string | null
  current_step: number | null
  created_at: string
  updated_at: string
}

type FilterStatus = 'all' | 'paid' | 'unpaid'

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [exporting, setExporting] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const fetchApplications = useCallback(async (s?: string, f?: FilterStatus) => {
    const params = new URLSearchParams()
    if (s) params.set('search', s)
    if (f && f !== 'all') params.set('status', f)
    const res = await fetch(`/api/admin/applications?${params}`)
    const json = await res.json()
    setApplications(json.data ?? [])
  }, [])

  useEffect(() => {
    fetchApplications(search, filterStatus).finally(() => setLoading(false))
  }, [fetchApplications, search, filterStatus])

  async function handleRefresh() {
    setRefreshing(true)
    await fetchApplications(search, filterStatus)
    setRefreshing(false)
  }

  async function handleExportCsv() {
    setExporting(true)
    const params = new URLSearchParams({ format: 'csv' })
    if (search) params.set('search', search)
    if (filterStatus !== 'all') params.set('status', filterStatus)
    const res = await fetch(`/api/admin/applications?${params}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `applications_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    setExporting(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">申立書一覧</h1>
        <p className="text-sm text-gray-400 mt-0.5">全ユーザーの申立書データを確認できます</p>
      </div>

      {/* フィルターバー */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* 検索 */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                className="pl-9"
                placeholder="債務者名で検索…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* ステータスフィルター */}
            <div className="flex gap-2">
              {(['all', 'paid', 'unpaid'] as FilterStatus[]).map(f => (
                <Button
                  key={f}
                  size="sm"
                  variant={filterStatus === f ? 'default' : 'outline'}
                  style={filterStatus === f ? { background: '#1e3a5f', color: 'white' } : {}}
                  onClick={() => setFilterStatus(f)}
                >
                  {f === 'all' ? 'すべて' : f === 'paid' ? '決済済み' : '未決済'}
                </Button>
              ))}
            </div>

            {/* アクション */}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleRefresh} disabled={refreshing}>
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleExportCsv}
                disabled={exporting}
              >
                {exporting
                  ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                  : <Download className="w-4 h-4 mr-1.5" />
                }
                CSV出力
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* テーブル */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-gray-500 font-normal">
            {loading ? '読み込み中…' : `${applications.length} 件`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-7 h-7 animate-spin text-[#1e3a5f]" />
            </div>
          ) : applications.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-12">該当するデータがありません</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-y border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-400 font-normal">債務者名</th>
                    <th className="text-right px-4 py-3 text-gray-400 font-normal">請求金額</th>
                    <th className="text-center px-4 py-3 text-gray-400 font-normal">決済状況</th>
                    <th className="text-center px-4 py-3 text-gray-400 font-normal">STEP</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-normal">作成日</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-normal">更新日</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {applications.map(app => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium">
                        {app.debtor_name ?? <span className="text-gray-300">（未入力）</span>}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {app.claim_amount != null
                          ? `¥${app.claim_amount.toLocaleString()}`
                          : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {app.payment_status === 'paid' ? (
                          <Badge className="bg-green-100 text-green-700 border border-green-200 text-xs">
                            決済済み
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-400 text-xs">
                            未決済
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-500">
                        {app.current_step != null ? `${app.current_step} / 8` : '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(app.created_at).toLocaleDateString('ja-JP')}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(app.updated_at).toLocaleDateString('ja-JP')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
