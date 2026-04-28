'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useApplication } from '@/hooks/useApplication'
import { ClaimContent, ClaimType } from '@/types/application'
import { calcInterest } from '@/lib/stamp-calculator'
import { ChevronRight, ChevronLeft, HelpCircle, Banknote, ShoppingCart, Home, AlertTriangle } from 'lucide-react'
import { TermTooltip } from '@/components/TermTooltip'

const claimTypes: { type: ClaimType; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    type: 'personal_loan',
    label: '貸金（個人間）',
    desc: '知人・友人・家族などへの個人的なお金の貸し付け',
    icon: <Banknote className="w-6 h-6" />,
  },
  {
    type: 'accounts_receivable',
    label: '売掛金・業務委託報酬',
    desc: '商品代金の未払い、業務委託報酬の未払いなど',
    icon: <ShoppingCart className="w-6 h-6" />,
  },
  {
    type: 'rent_arrears',
    label: '家賃滞納',
    desc: '不動産の賃料・管理費などの滞納',
    icon: <Home className="w-6 h-6" />,
  },
]

const toHalfWidth = (str: string) =>
  str.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))

type FieldKey = 'principal' | 'interestRate' | 'delayInterestRate' | 'loanDate' | 'dueDate' | 'overdueMonths'
type ClaimErrors = Partial<Record<FieldKey, string>>
type ClaimWarnings = Partial<Record<FieldKey, string>>
type TouchedFields = Partial<Record<FieldKey, boolean>>

function validateClaim(c: ClaimContent, today: string): { errors: ClaimErrors; warnings: ClaimWarnings } {
  const errors: ClaimErrors = {}
  const warnings: ClaimWarnings = {}

  if (c.principal <= 0) {
    errors.principal = '元金を入力してください（1円以上）'
  } else if (!Number.isInteger(c.principal)) {
    errors.principal = '整数で入力してください'
  } else if (c.principal > 1_000_000_000) {
    errors.principal = '10億円以下で入力してください'
  }

  if (c.interestRate < 0 || c.interestRate > 100)
    errors.interestRate = '0〜100の数値を入力してください'

  if (c.delayInterestRate < 0 || c.delayInterestRate > 100)
    errors.delayInterestRate = '0〜100の数値を入力してください'

  if (!c.loanDate) {
    errors.loanDate = '日付を入力してください'
  } else if (c.loanDate > today) {
    warnings.loanDate = '貸付日・取引日が未来の日付です。入力内容をご確認ください。'
  }

  if (!c.dueDate) {
    errors.dueDate = '日付を入力してください'
  } else if (c.loanDate && c.dueDate < c.loanDate) {
    errors.dueDate = '返済期日は貸付日・取引日以降の日付を入力してください'
  }

  if (c.claimType === 'rent_arrears') {
    if (!c.overdueMonths || c.overdueMonths < 1) {
      errors.overdueMonths = '1以上の整数を入力してください'
    } else if (!Number.isInteger(c.overdueMonths)) {
      errors.overdueMonths = '整数で入力してください'
    }
  }

  return { errors, warnings }
}

export default function Step4Page() {
  const router = useRouter()
  const { application, updateApplication } = useApplication()
  const [claim, setClaim] = useState<ClaimContent>(application.claim)
  const [principalStr, setPrincipalStr] = useState(
    application.claim.principal > 0 ? String(application.claim.principal) : ''
  )
  const [overdueMonthsStr, setOverdueMonthsStr] = useState(
    application.claim.overdueMonths > 0 ? String(application.claim.overdueMonths) : ''
  )
  const [touched, setTouched] = useState<TouchedFields>({})

  const touch = (field: FieldKey) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  const update = (field: keyof ClaimContent, value: string | number) => {
    setClaim((prev) => ({ ...prev, [field]: value }))
  }

  const handlePrincipalChange = (raw: string) => {
    const half = toHalfWidth(raw).replace(/[^\d]/g, '')
    setPrincipalStr(half)
    const num = half === '' ? 0 : parseInt(half, 10)
    update('principal', num)
    touch('principal')
  }

  const handleOverdueMonthsChange = (raw: string) => {
    const half = toHalfWidth(raw).replace(/[^\d]/g, '')
    setOverdueMonthsStr(half)
    const num = half === '' ? 0 : parseInt(half, 10)
    update('overdueMonths', num)
    touch('overdueMonths')
  }

  const handleRateChange = (field: 'interestRate' | 'delayInterestRate', raw: string) => {
    const half = toHalfWidth(raw)
    update(field, half === '' ? 0 : parseFloat(half))
    touch(field)
  }

  useEffect(() => {
    const interest = calcInterest(
      claim.principal,
      claim.delayInterestRate,
      claim.dueDate,
      new Date().toISOString().slice(0, 10)
    )
    const total = claim.principal + interest
    setClaim((prev) => ({ ...prev, delayDamage: interest, total }))
  }, [claim.principal, claim.delayInterestRate, claim.dueDate])

  const today = new Date().toISOString().slice(0, 10)
  const { errors, warnings } = validateClaim(claim, today)
  const hasErrors = Object.keys(errors).length > 0

  const showError = (field: FieldKey) =>
    touched[field] ? errors[field] : undefined

  const showWarning = (field: FieldKey) =>
    touched[field] ? warnings[field] : undefined

  const handleNext = () => {
    updateApplication({ claim })
    router.push('/apply/step5')
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
          STEP 4｜請求内容
        </h1>
        <p className="text-gray-600 text-sm">
          請求の種類と金額を入力します。遅延損害金は参考として自動計算されます。
        </p>
      </div>

      <div>
        <Label className="font-bold mb-3 block">請求の種類を選んでください</Label>
        <div className="grid gap-3">
          {claimTypes.map(({ type, label, desc, icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => update('claimType', type)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-colors ${
                claim.claimType === type ? 'bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              style={claim.claimType === type ? { borderColor: '#1e3a5f' } : {}}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: claim.claimType === type ? '#1e3a5f' : '#f3f4f6',
                  color: claim.claimType === type ? 'white' : '#6b7280',
                }}
              >
                {icon}
              </div>
              <div>
                <p className="font-semibold" style={claim.claimType === type ? { color: '#1e3a5f' } : {}}>
                  {label}
                </p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-5">
          <div className="space-y-1">
            <Label htmlFor="principal" className="font-semibold">
              元金（請求元本） <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="principal"
                type="text"
                inputMode="numeric"
                placeholder="1000000"
                value={principalStr}
                onChange={(e) => handlePrincipalChange(e.target.value)}
                className={`pr-8 ${showError('principal') ? 'border-red-500' : ''}`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">円</span>
            </div>
            {showError('principal') && (
              <p className="text-red-500 text-xs">{showError('principal')}</p>
            )}
          </div>

          {(claim.claimType === 'personal_loan' || claim.claimType === 'accounts_receivable') && (
            <div className="space-y-1">
              <Label htmlFor="interestRate" className="font-semibold">
                約定利率（参考表示）
              </Label>
              <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 rounded-lg p-2 mb-1">
                <HelpCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" />
                <span>利率は参考表示です。契約書や合意内容をご確認ください。</span>
              </div>
              <div className="relative">
                <Input
                  id="interestRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="3"
                  value={claim.interestRate || ''}
                  onChange={(e) => handleRateChange('interestRate', e.target.value)}
                  className={`pr-10 ${showError('interestRate') ? 'border-red-500' : ''}`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
              </div>
              {showError('interestRate') && (
                <p className="text-red-500 text-xs">{showError('interestRate')}</p>
              )}
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="delayInterestRate" className="font-semibold">
              <TermTooltip term="遅延損害金">遅延損害金</TermTooltip>率（参考表示）
            </Label>
            <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 rounded-lg p-2 mb-1">
              <HelpCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" />
              <span>
                <TermTooltip term="遅延損害金">遅延損害金</TermTooltip>率は参考表示です。民事法定利率は年3%（令和2年4月改正後）、消費者金融等は別途規定があります。
              </span>
            </div>
            <div className="relative">
              <Input
                id="delayInterestRate"
                type="number"
                min="0"
                max="100"
                step="0.1"
                placeholder="3"
                value={claim.delayInterestRate || ''}
                onChange={(e) => handleRateChange('delayInterestRate', e.target.value)}
                className={`pr-10 ${showError('delayInterestRate') ? 'border-red-500' : ''}`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
            </div>
            {showError('delayInterestRate') && (
              <p className="text-red-500 text-xs">{showError('delayInterestRate')}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="loanDate" className="font-semibold">
                {claim.claimType === 'rent_arrears' ? '滞納開始日' : '貸付・取引日'}{' '}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="loanDate"
                type="date"
                value={claim.loanDate}
                onChange={(e) => {
                  update('loanDate', e.target.value)
                  touch('loanDate')
                }}
                className={showError('loanDate') ? 'border-red-500' : ''}
              />
              {showError('loanDate') && (
                <p className="text-red-500 text-xs">{showError('loanDate')}</p>
              )}
              {showWarning('loanDate') && (
                <div className="flex items-start gap-1 text-amber-600 text-xs">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>{showWarning('loanDate')}</span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="dueDate" className="font-semibold">
                弁済期（支払期日） <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={claim.dueDate}
                onChange={(e) => {
                  update('dueDate', e.target.value)
                  touch('dueDate')
                }}
                className={showError('dueDate') ? 'border-red-500' : ''}
              />
              {showError('dueDate') && (
                <p className="text-red-500 text-xs">{showError('dueDate')}</p>
              )}
            </div>
          </div>

          {claim.claimType === 'rent_arrears' && (
            <div className="space-y-1">
              <Label htmlFor="overdueMonths" className="font-semibold">
                滞納月数 <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="overdueMonths"
                  type="text"
                  inputMode="numeric"
                  placeholder="3"
                  value={overdueMonthsStr}
                  onChange={(e) => handleOverdueMonthsChange(e.target.value)}
                  className={`pr-8 ${showError('overdueMonths') ? 'border-red-500' : ''}`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">ヶ月</span>
              </div>
              {showError('overdueMonths') && (
                <p className="text-red-500 text-xs">{showError('overdueMonths')}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {claim.principal > 0 && (
        <Card className="border-2" style={{ borderColor: '#c9a84c' }}>
          <CardContent className="pt-4">
            <p className="text-xs font-semibold mb-3" style={{ color: '#c9a84c' }}>
              請求額サマリー（参考）
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">元金</span>
                <span className="font-semibold">{claim.principal.toLocaleString()} 円</span>
              </div>
              {claim.delayDamage > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">遅延損害金（参考）</span>
                  <span className="font-semibold">{claim.delayDamage.toLocaleString()} 円</span>
                </div>
              )}
              <div className="flex justify-between border-t pt-2">
                <span className="font-bold" style={{ color: '#1e3a5f' }}>合計（参考）</span>
                <span className="font-bold text-lg" style={{ color: '#1e3a5f' }}>
                  {claim.total.toLocaleString()} 円
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              ※ 遅延損害金は参考値です。実際の金額は申立日までの日数で変わります。
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex-1" onClick={() => router.push('/apply/step3')}>
          <ChevronLeft className="mr-2 w-4 h-4" />
          戻る
        </Button>
        <Button
          className="flex-1 py-6 font-semibold rounded-xl"
          disabled={hasErrors}
          onClick={handleNext}
          style={!hasErrors ? { background: '#1e3a5f', color: 'white' } : {}}
        >
          次のステップへ
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
