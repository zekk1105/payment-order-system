'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog } from 'radix-ui'
import {
  User,
  CreditCard,
  FileText,
  Trash2,
  Loader2,
  Mail,
  Lock,
  Download,
  PenLine,
  RefreshCw,
} from 'lucide-react'

type ApplicationRow = {
  id: string
  session_id: string | null
  created_at: string
  updated_at: string
  debtor_name: string | null
  claim_amount: number | null
  payment_status: string | null
  status: string | null
  current_step: number | null
  data: Record<string, unknown> | null
}

const STORAGE_KEY = 'payment_order_application'

export default function MyPage() {
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState<{ id: string; email?: string; created_at: string } | null>(null)
  const [applications, setApplications] = useState<ApplicationRow[]>([])
  const [loading, setLoading] = useState(true)

  const [showEmailForm, setShowEmailForm] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [emailSaving, setEmailSaving] = useState(false)
  const [emailMessage, setEmailMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [pwResetSent, setPwResetSent] = useState(false)
  const [pwResetSending, setPwResetSending] = useState(false)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  async function loadApplications(userId: string) {
    const { data } = await supabase
      .from('applications')
      .select('id, session_id, created_at, updated_at, debtor_name, claim_amount, payment_status, status, current_step, data')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5)
    setApplications(data ?? [])
  }

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace('/auth/login')
        return
      }
      setUser({ id: user.id, email: user.email, created_at: user.created_at })
      await loadApplications(user.id)
      setLoading(false)
    }
    load()
  }, [])

  async function handleRefresh() {
    if (!user) return
    setRefreshing(true)
    await loadApplications(user.id)
    setRefreshing(false)
  }

  async function handleEmailChange() {
    if (!newEmail) return
    setEmailSaving(true)
    setEmailMessage(null)
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    setEmailSaving(false)
    if (error) {
      setEmailMessage({ type: 'error', text: 'メールアドレスの更新に失敗しました: ' + error.message })
    } else {
      setEmailMessage({ type: 'success', text: '確認メールを送信しました。新しいアドレスで確認してください。' })
      setShowEmailForm(false)
      setNewEmail('')
    }
  }

  async function handlePasswordReset() {
    if (!user?.email) return
    setPwResetSending(true)
    await supabase.auth.resetPasswordForEmail(user.email)
    setPwResetSending(false)
    setPwResetSent(true)
  }

  async function handleDeleteAccount() {
    setDeleting(true)
    const res = await fetch('/api/account/delete', { method: 'POST' })
    if (res.ok) {
      await supabase.auth.signOut()
      router.replace('/auth/login')
    } else {
      setDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  function handleNewApplication() {
    try {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem('sessionId')
    } catch {
      // ignore
    }
    router.push('/apply/step1')
  }

  function handleContinue(app: ApplicationRow) {
    try {
      if (app.data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(app.data))
      }
      if (app.session_id) {
        localStorage.setItem('sessionId', app.session_id)
      }
    } catch {
      // ignore
    }
    router.push(`/apply/step${app.current_step ?? 1}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#1e3a5f' }} />
      </div>
    )
  }

  const paidApplications = applications.filter(a => a.payment_status === 'paid')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold" style={{ color: '#1e3a5f' }}>
            ← トップに戻る
          </Link>
          <span className="text-base font-bold" style={{ color: '#1e3a5f' }}>マイページ</span>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* 1. アカウント情報 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base" style={{ color: '#1e3a5f' }}>
              <User className="w-5 h-5" />
              アカウント情報
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-0.5">
                <p className="text-xs text-gray-400">メールアドレス</p>
                <p className="font-medium break-all">{user?.email ?? '—'}</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-gray-400">登録日</p>
                <p className="font-medium">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString('ja-JP') : '—'}
                </p>
              </div>
            </div>

            {emailMessage && (
              <p className={`text-sm px-3 py-2 rounded-lg ${emailMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {emailMessage.text}
              </p>
            )}

            {showEmailForm && (
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="新しいメールアドレス"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleEmailChange()}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    disabled={emailSaving || !newEmail}
                    onClick={handleEmailChange}
                    style={{ background: '#1e3a5f', color: 'white' }}
                  >
                    {emailSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : '更新する'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => { setShowEmailForm(false); setNewEmail('') }}
                  >
                    キャンセル
                  </Button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {!showEmailForm && (
                <Button variant="outline" size="sm" onClick={() => setShowEmailForm(true)}>
                  <Mail className="w-4 h-4 mr-1.5" />
                  メールアドレスを変更
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                disabled={pwResetSending || pwResetSent}
                onClick={handlePasswordReset}
              >
                {pwResetSending
                  ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                  : <Lock className="w-4 h-4 mr-1.5" />
                }
                {pwResetSent ? '送信済み ✓' : 'パスワードを変更'}
              </Button>
            </div>

            {pwResetSent && (
              <p className="text-sm text-green-600">パスワードリセットメールを送信しました。</p>
            )}
          </CardContent>
        </Card>

        {/* 2. 申立書の作成履歴 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base" style={{ color: '#1e3a5f' }}>
              <span className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                申立書の作成履歴
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  onClick={handleNewApplication}
                  style={{ background: '#1e3a5f', color: 'white' }}
                >
                  ＋ 新規作成
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {applications.length === 0 ? (
              <div className="text-center py-6 space-y-4">
                <p className="text-gray-500 text-sm">まだ申立書を作成していません。</p>
                <Button
                  onClick={handleNewApplication}
                  style={{ background: '#1e3a5f', color: 'white' }}
                >
                  申立書を作成する
                </Button>
              </div>
            ) : (
              applications.map(app => (
                <div key={app.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <p className="text-xs text-gray-400">
                        作成日: {new Date(app.created_at).toLocaleDateString('ja-JP')}
                      </p>
                      <p className="font-semibold text-sm truncate">
                        {app.debtor_name ?? '（相手方名未入力）'}
                      </p>
                      <p className="text-sm text-gray-600">
                        請求金額:{' '}
                        {app.claim_amount != null
                          ? `${app.claim_amount.toLocaleString()}円`
                          : '—'}
                      </p>
                    </div>
                    <div className="flex-shrink-0 mt-0.5">
                      {app.payment_status === 'paid' ? (
                        <Badge className="bg-green-100 text-green-700 border border-green-200 text-xs">
                          決済済み ✅
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500 text-xs">
                          作成中 ✏️
                        </Badge>
                      )}
                    </div>
                  </div>

                  {app.payment_status === 'paid' ? (
                    <Button
                      size="sm"
                      className="w-full"
                      style={{ background: '#c9a84c', color: 'white' }}
                      onClick={() => router.push(`/apply/step8?redownload=true&id=${app.id}`)}
                    >
                      <Download className="w-4 h-4 mr-1.5" />
                      PDFを再ダウンロード
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="w-full"
                      style={{ background: '#1e3a5f', color: 'white' }}
                      onClick={() => handleContinue(app)}
                    >
                      <PenLine className="w-4 h-4 mr-1.5" />
                      続きから作成する
                    </Button>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* 3. 決済履歴 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base" style={{ color: '#1e3a5f' }}>
              <CreditCard className="w-5 h-5" />
              決済履歴
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paidApplications.length === 0 ? (
              <p className="text-gray-500 text-sm py-2">決済履歴はありません。</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {paidApplications.map(app => (
                  <div key={app.id} className="flex items-center justify-between py-3">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">
                        {new Date(app.updated_at).toLocaleDateString('ja-JP')}
                      </p>
                      <p className="text-xs text-gray-500">9,800円</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border border-green-200 text-xs">
                      完了
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 4. アカウント削除 */}
        <Card className="border-red-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-red-600">
              <Trash2 className="w-5 h-5" />
              アカウント削除
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
            >
              アカウントを削除する
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* 削除確認ダイアログ */}
      <Dialog.Root open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl space-y-4">
            <Dialog.Title className="text-base font-bold text-gray-900">
              アカウントを削除しますか？
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600">
              本当にアカウントを削除しますか？この操作は取り消せません。
            </Dialog.Description>
            <div className="flex gap-3 pt-1">
              <Button
                variant="outline"
                className="flex-1"
                disabled={deleting}
                onClick={() => setShowDeleteDialog(false)}
              >
                キャンセル
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white border-transparent"
                disabled={deleting}
                onClick={handleDeleteAccount}
              >
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : '削除する'}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
