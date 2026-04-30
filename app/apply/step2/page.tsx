'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useApplication } from '@/hooks/useApplication'
import { Creditor, PartyType } from '@/types/application'
import { lookupPostalCode } from '@/lib/postal-code'
import { ChevronRight, ChevronLeft, HelpCircle, Building2, User, Loader2 } from 'lucide-react'
import { saveApplication } from '@/lib/save-application'

const toHalfWidth = (str: string) =>
  str.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))

const formatPostalCode = (raw: string): string => {
  const digits = toHalfWidth(raw).replace(/\D/g, '').slice(0, 7)
  return digits.length > 3 ? `${digits.slice(0, 3)}-${digits.slice(3)}` : digits
}

type FieldKey = 'corporateName' | 'name' | 'furigana' | 'postalCode' | 'address' | 'phone'
type CreditorErrors = Partial<Record<FieldKey, string>>
type TouchedFields = Partial<Record<FieldKey, boolean>>

function validateCreditor(c: Creditor): CreditorErrors {
  const errors: CreditorErrors = {}

  if (c.partyType === 'corporation' && !(c.corporateName ?? '').trim())
    errors.corporateName = '法人名・団体名は必須です'

  if (!c.name.trim()) errors.name = '氏名は必須です'
  else if (c.name.length > 50) errors.name = '50文字以内で入力してください'

  if (!c.furigana.trim()) errors.furigana = 'ふりがなは必須です'
  else if (!/^[ぁ-ん　]+$/.test(c.furigana)) errors.furigana = '全角ひらがなのみで入力してください'

  if (c.postalCode && !/^\d{3}-\d{4}$/.test(c.postalCode))
    errors.postalCode = '郵便番号は7桁の数字で入力してください'

  if (c.phone) {
    const half = toHalfWidth(c.phone)
    if (!/^[\d\-]+$/.test(half)) {
      errors.phone = '数値とハイフンのみ入力してください'
    } else {
      const digits = half.replace(/-/g, '')
      if (digits.length < 10 || digits.length > 11) errors.phone = '10〜11桁の番号を入力してください'
    }
  }

  if (!c.address.trim()) errors.address = '住所は必須です'
  else if (c.address.length > 100) errors.address = '100文字以内で入力してください'

  return errors
}

export default function Step2Page() {
  const router = useRouter()
  const { application, updateApplication, loaded } = useApplication()
  const [creditor, setCreditor] = useState<Creditor>(application.creditor)
  const [touched, setTouched] = useState<TouchedFields>({})
  const [postalLookupStatus, setPostalLookupStatus] = useState<'idle' | 'loading' | 'found' | 'notfound'>('idle')
  const postalTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!loaded) return
    setCreditor(application.creditor)
  }, [loaded])

  const touch = (field: FieldKey) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  const update = (field: keyof Creditor, value: string) => {
    const next = { ...creditor, [field]: value }
    setCreditor(next)
    touch(field as FieldKey)
    updateApplication({ creditor: next })
  }

  // 郵便番号が7桁になったらZipCloudで住所を自動取得
  const handlePostalChange = (raw: string) => {
    const formatted = formatPostalCode(raw)
    update('postalCode', formatted)

    const digits = formatted.replace(/\D/g, '')
    if (postalTimerRef.current) clearTimeout(postalTimerRef.current)

    if (digits.length === 7) {
      setPostalLookupStatus('loading')
      postalTimerRef.current = setTimeout(async () => {
        const result = await lookupPostalCode(digits)
        if (result) {
          // 都道府県+市区町村+町域 を address に自動入力（番地は空けておく）
          const autoAddress = `${result.prefecture}${result.city}${result.town}`
          const next = { ...creditor, postalCode: formatted, address: autoAddress }
          setCreditor(next)
          updateApplication({ creditor: next })
          setPostalLookupStatus('found')
        } else {
          setPostalLookupStatus('notfound')
        }
      }, 300)
    } else {
      setPostalLookupStatus('idle')
    }
  }

  const handlePhoneChange = (raw: string) => {
    update('phone', toHalfWidth(raw))
  }

  const errors = validateCreditor(creditor)
  const hasErrors = Object.keys(errors).length > 0

  const showError = (field: FieldKey) =>
    touched[field] ? errors[field] : undefined

  const handleNext = () => {
    saveApplication(3).catch(console.error)
    router.push('/apply/step3')
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
          STEP 2｜申立人（あなた）の情報
        </h1>
        <p className="text-gray-600 text-sm">
          申立人とは、お金を請求する側（あなた）のことです。
          裁判所に提出する書類に記載される情報ですので、正確に入力してください。
        </p>
      </div>

      <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 rounded-lg p-3 mb-4">
        <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
        <span>個人・法人のどちらかを選択してから、情報を入力してください。</span>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-5">
          <div>
            <Label className="font-semibold mb-2 block">申立人の種別</Label>
            <div className="flex gap-3">
              {(['individual', 'corporation'] as PartyType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => update('partyType', type)}
                  className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${
                    creditor.partyType === type
                      ? 'border-blue-800 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={creditor.partyType === type ? { borderColor: '#1e3a5f' } : {}}
                >
                  {type === 'individual' ? (
                    <User className="w-6 h-6" style={creditor.partyType === type ? { color: '#1e3a5f' } : { color: '#9ca3af' }} />
                  ) : (
                    <Building2 className="w-6 h-6" style={creditor.partyType === type ? { color: '#1e3a5f' } : { color: '#9ca3af' }} />
                  )}
                  <span
                    className="text-sm font-semibold"
                    style={creditor.partyType === type ? { color: '#1e3a5f' } : { color: '#6b7280' }}
                  >
                    {type === 'individual' ? '個人' : '法人・団体'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {creditor.partyType === 'corporation' && (
            <div className="space-y-1">
              <Label htmlFor="corporateName" className="font-semibold">
                法人名・団体名 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="corporateName"
                placeholder="例：株式会社〇〇"
                value={creditor.corporateName ?? ''}
                onChange={(e) => update('corporateName', e.target.value)}
                className={showError('corporateName') ? 'border-red-500' : ''}
              />
              {showError('corporateName') && (
                <p className="text-red-500 text-xs">{showError('corporateName')}</p>
              )}
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="name" className="font-semibold">
              {creditor.partyType === 'individual' ? '氏名' : '代表者名'}{' '}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder={creditor.partyType === 'individual' ? '例：山田 太郎' : '例：山田 太郎（代表取締役）'}
              value={creditor.name}
              onChange={(e) => update('name', e.target.value)}
              className={showError('name') ? 'border-red-500' : ''}
            />
            {showError('name') && (
              <p className="text-red-500 text-xs">{showError('name')}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="furigana" className="font-semibold">
              ふりがな <span className="text-red-500">*</span>
            </Label>
            <Input
              id="furigana"
              placeholder="例：やまだ たろう"
              value={creditor.furigana}
              onChange={(e) => update('furigana', e.target.value)}
              className={showError('furigana') ? 'border-red-500' : ''}
            />
            {showError('furigana') && (
              <p className="text-red-500 text-xs">{showError('furigana')}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="postalCode" className="font-semibold">
              郵便番号
              <span className="ml-2 text-xs font-normal text-blue-600">
                ※ 入力すると住所を自動補完します
              </span>
            </Label>
            <div className="relative">
              <Input
                id="postalCode"
                placeholder="例：123-4567"
                value={creditor.postalCode}
                onChange={(e) => handlePostalChange(e.target.value)}
                inputMode="numeric"
                maxLength={8}
                className={showError('postalCode') ? 'border-red-500 pr-10' : 'pr-10'}
              />
              {postalLookupStatus === 'loading' && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin" />
              )}
              {postalLookupStatus === 'found' && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm">✓</span>
              )}
            </div>
            {showError('postalCode') && (
              <p className="text-red-500 text-xs">{showError('postalCode')}</p>
            )}
            {postalLookupStatus === 'notfound' && (
              <p className="text-amber-600 text-xs">郵便番号から住所を取得できませんでした。手動で入力してください。</p>
            )}
            {postalLookupStatus === 'found' && (
              <p className="text-green-600 text-xs">✓ 住所を自動入力しました。番地・建物名を追加してください。</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="address" className="font-semibold">
              住所（法人は本店所在地） <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              placeholder="例：東京都新宿区〇〇1-2-3 △△マンション101号"
              value={creditor.address}
              onChange={(e) => update('address', e.target.value)}
              className={showError('address') ? 'border-red-500' : ''}
            />
            {showError('address') && (
              <p className="text-red-500 text-xs">{showError('address')}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone" className="font-semibold">
              電話番号
            </Label>
            <Input
              id="phone"
              placeholder="例：03-1234-5678"
              value={creditor.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              inputMode="tel"
              className={showError('phone') ? 'border-red-500' : ''}
            />
            {showError('phone') && (
              <p className="text-red-500 text-xs">{showError('phone')}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => router.push('/apply/step1')}
        >
          <ChevronLeft className="mr-2 w-4 h-4" />
          戻る
        </Button>
        <Button
          className="flex-2 py-6 font-semibold rounded-xl flex-1"
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
