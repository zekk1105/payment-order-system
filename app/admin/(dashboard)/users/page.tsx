'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loader2, RefreshCw, Users } from 'lucide-react'

type UserRow = {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
  applicationCount: number
  paidCount: number
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  async function fetchUsers() {
    const res = await fetch('/api/admin/users')
    const json = await res.json()
    setUsers(json.users ?? [])
  }

  useEffect(() => {
    fetchUsers().finally(() => setLoading(false))
  }, [])

  async function handleRefresh() {
    setRefreshing(true)
    await fetchUsers()
    setRefreshing(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">ユーザー管理</h1>
        <p className="text-sm text-gray-400 mt-0.5">登録ユーザーの一覧と利用状況を確認できます</p>
      </div>

      {/* サマリー */}
      {!loading && (
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-5 pb-4 px-5">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-[#1e3a5f]" />
                <span className="text-xs text-gray-400">総ユーザー数</span>
              </div>
              <p className="text-2xl font-bold">{users.length} 人</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-4 px-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-400">申立書作成あり</span>
              </div>
              <p className="text-2xl font-bold">
                {users.filter(u => u.applicationCount > 0).length} 人
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-4 px-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-400">決済完了あり</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.paidCount > 0).length} 人
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* テーブル */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm text-gray-500 font-normal">
            {loading ? '読み込み中…' : `${users.length} 人`}
          </CardTitle>
          <Button size="sm" variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-7 h-7 animate-spin text-[#1e3a5f]" />
            </div>
          ) : users.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-12">ユーザーが見つかりません</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-y border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-400 font-normal">メールアドレス</th>
                    <th className="text-center px-4 py-3 text-gray-400 font-normal">申立書数</th>
                    <th className="text-center px-4 py-3 text-gray-400 font-normal">決済済み</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-normal">登録日</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-normal">最終ログイン</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-medium break-all">{u.email}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {u.applicationCount > 0 ? (
                          <Badge variant="outline" className="text-xs">
                            {u.applicationCount} 件
                          </Badge>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {u.paidCount > 0 ? (
                          <Badge className="bg-green-100 text-green-700 border border-green-200 text-xs">
                            {u.paidCount} 件
                          </Badge>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(u.created_at).toLocaleDateString('ja-JP')}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {u.last_sign_in_at
                          ? new Date(u.last_sign_in_at).toLocaleDateString('ja-JP')
                          : <span className="text-gray-300">—</span>}
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
