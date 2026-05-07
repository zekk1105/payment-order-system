'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useApplication } from '@/hooks/useApplication'
import { Debtor, PartyType } from '@/types/application'
import { findCourt, supportedPrefectures as prefectures } from '@/lib/court-data'
import { lookupPostalCode } from '@/lib/postal-code'
import { ChevronRight, ChevronLeft, HelpCircle, Building2, User, MapPin, Loader2 } from 'lucide-react'
import { saveApplication } from '@/lib/save-application'

const toHalfWidth = (str: string) =>
  str.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))

const formatPostalCode = (raw: string): string => {
  const digits = toHalfWidth(raw).replace(/\D/g, '').slice(0, 7)
  return digits.length > 3 ? `${digits.slice(0, 3)}-${digits.slice(3)}` : digits
}

type FieldKey =
  | 'corporateName'
  | 'name'
  | 'furigana'
  | 'postalCode'
  | 'phone'
  | 'prefecture'
  | 'city'
  | 'address'
type DebtorErrors = Partial<Record<FieldKey, string>>
type TouchedFields = Partial<Record<FieldKey, boolean>>

function validateDebtor(d: Debtor): DebtorErrors {
  const errors: DebtorErrors = {}

  if (d.partyType === 'corporation' && !(d.corporateName ?? '').trim())
    errors.corporateName = '法人名・団体名は必須です'

  if (!d.name.trim()) errors.name = '氏名は必須です'
  else if (d.name.length > 50) errors.name = '50文字以内で入力してください'

  if (!d.furigana.trim()) errors.furigana = 'ふりがなは必須です'
  else if (!/^[ぁ-ん　]+$/.test(d.furigana)) errors.furigana = '全角ひらがなのみで入力してください'

  if (d.postalCode && !/^\d{3}-\d{4}$/.test(d.postalCode))
    errors.postalCode = '郵便番号は7桁の数字で入力してください'

  if (d.phone) {
    const half = toHalfWidth(d.phone)
    if (!/^[\d\-]+$/.test(half)) {
      errors.phone = '数値とハイフンのみ入力してください'
    } else {
      const digits = half.replace(/-/g, '')
      if (digits.length < 10 || digits.length > 11) errors.phone = '10〜11桁の番号を入力してください'
    }
  }

  if (!d.prefecture.trim()) errors.prefecture = '都道府県を選択してください'
  if (!d.city.trim()) errors.city = '市区町村は必須です'

  if (!d.address.trim()) errors.address = '住所は必須です'
  else if (d.address.length > 100) errors.address = '100文字以内で入力してください'

  return errors
}

export default function Step3Page() {
  const router = useRouter()
  const { application, updateApplication, loaded } = useApplication()
  const [debtor, setDebtor] = useState<Debtor>(application.debtor)
  const [detectedCourt, setDetectedCourt] = useState(application.court)
  const [touched, setTouched] = useState<TouchedFields>({})
  const [postalLookupStatus, setPostalLookupStatus] = useState<'idle' | 'loading' | 'found' | 'notfound'>('idle')

  // 郵便番号のデバウンス用
  const postalTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!loaded) return
    setDebtor(application.debtor)
  }, [loaded])

  const touch = (field: FieldKey) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  const update = (field: keyof Debtor, value: string) => {
    const next = { ...debtor, [field]: value }
    setDebtor(next)
    touch(field as FieldKey)
    updateApplication({ debtor: next })
  }

  const updateMultiple = (fields: Partial<Debtor>) => {
    const next = { ...debtor, ...fields }
    setDebtor(next)
    updateApplication({ debtor: next })
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
          updateMultiple({
            postalCode: formatted,
            prefecture: result.prefecture,
            city: result.city,
          })
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

  // 都道府県・市区町村が変わったら管轄裁判所を再判定
  useEffect(() => {
    if (debtor.prefecture && debtor.city) {
      const court = findCourt(debtor.prefecture, debtor.city)
      setDetectedCourt(court)
    } else {
      setDetectedCourt(null)
    }
  }, [debtor.prefecture, debtor.city])

  const errors = validateDebtor(debtor)
  const hasErrors = Object.keys(errors).length > 0

  const showError = (field: FieldKey) =>
    touched[field] ? errors[field] : undefined

  const handleNext = () => {
    updateApplication({ court: detectedCourt })
    saveApplication(4).catch(console.error)
    router.push('/apply/step4')
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
          STEP 3｜相手方の情報
        </h1>
        <p className="text-gray-600 text-sm">
          相手方（お金を払うべき人）の情報を入力します。
          郵便番号を入力すると住所と管轄裁判所が自動で表示されます。
        </p>
      </div>

      <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 rounded-lg p-3">
        <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
        <span>
          相手方の住所地を管轄する簡易裁判所に申し立てます。郵便番号を入力すると住所と管轄裁判所を自動判定します。
        </span>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-5">
          <div>
            <Label className="font-semibold mb-2 block">相手方の種別</Label>
            <div className="flex gap-3">
              {(['individual', 'corporation'] as PartyType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => update('partyType', type)}
                  className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${
                    debtor.partyType === type ? 'border-blue-800 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={debtor.partyType === type ? { borderColor: '#1e3a5f' } : {}}
                >
                  {type === 'individual' ? (
                    <User className="w-6 h-6" style={debtor.partyType === type ? { color: '#1e3a5f' } : { color: '#9ca3af' }} />
                  ) : (
                    <Building2 className="w-6 h-6" style={debtor.partyType === type ? { color: '#1e3a5f' } : { color: '#9ca3af' }} />
                  )}
                  <span
                    className="text-sm font-semibold"
                    style={debtor.partyType === type ? { color: '#1e3a5f' } : { color: '#6b7280' }}
                  >
                    {type === 'individual' ? '個人' : '法人・団体'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {debtor.partyType === 'corporation' && (
            <div className="space-y-1">
              <Label htmlFor="corporateName" className="font-semibold">
                法人名・団体名 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="corporateName"
                placeholder="例：株式会社〇〇"
                value={debtor.corporateName ?? ''}
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
              {debtor.partyType === 'individual' ? '氏名' : '代表者名'}{' '}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="例：田中 花子"
              value={debtor.name}
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
              placeholder="例：たなか はなこ"
              value={debtor.furigana}
              onChange={(e) => update('furigana', e.target.value)}
              className={showError('furigana') ? 'border-red-500' : ''}
            />
            {showError('furigana') && (
              <p className="text-red-500 text-xs">{showError('furigana')}</p>
            )}
          </div>

          {/* 郵便番号（住所自動入力） */}
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
                value={debtor.postalCode}
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
              <p className="text-green-600 text-xs">✓ 住所を自動入力しました</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone" className="font-semibold">
              電話番号
            </Label>
            <Input
              id="phone"
              placeholder="例：03-1234-5678"
              value={debtor.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              inputMode="tel"
              className={showError('phone') ? 'border-red-500' : ''}
            />
            {showError('phone') && (
              <p className="text-red-500 text-xs">{showError('phone')}</p>
            )}
          </div>

          {/* 都道府県・市区町村（郵便番号から自動補完 or 手動入力） */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="prefecture" className="font-semibold">
                都道府県 <span className="text-red-500">*</span>
              </Label>
              <select
                id="prefecture"
                value={debtor.prefecture}
                onChange={(e) => update('prefecture', e.target.value)}
                className={`w-full h-10 px-3 rounded-md border bg-background text-sm ${
                  showError('prefecture') ? 'border-red-500' : 'border-input'
                }`}
              >
                <option value="">選択してください</option>
                {prefectures.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              {showError('prefecture') && (
                <p className="text-red-500 text-xs">{showError('prefecture')}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="city" className="font-semibold">
                市区町村 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                placeholder="例：横浜市西区"
                value={debtor.city}
                onChange={(e) => update('city', e.target.value)}
                className={showError('city') ? 'border-red-500' : ''}
              />
              {showError('city') && (
                <p className="text-red-500 text-xs">{showError('city')}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="address" className="font-semibold">
              番地以降の住所 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              placeholder="例：1-2-3 △△マンション101号"
              value={debtor.address}
              onChange={(e) => update('address', e.target.value)}
              className={showError('address') ? 'border-red-500' : ''}
            />
            {showError('address') && (
              <p className="text-red-500 text-xs">{showError('address')}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 管轄裁判所表示 */}
      {detectedCourt && (
        <Card className="border-2" style={{ borderColor: '#c9a84c' }}>
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#c9a84c' }} />
              <div>
                <p className="text-xs text-gray-500 mb-1">管轄裁判所（自動判定）</p>
                <p className="font-bold text-lg" style={{ color: '#1e3a5f' }}>{detectedCourt.name}</p>
                <p className="text-sm text-gray-600">{detectedCourt.address}</p>
                <p className="text-xs text-gray-500 mt-1">
                  郵券額（参考）：<span className="font-semibold">{detectedCourt.stampAmount.toLocaleString()}円</span>
                  <span className="ml-1 text-gray-400">※ 申立前に裁判所へご確認ください</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {debtor.prefecture && debtor.city && !detectedCourt && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertDescription className="text-amber-700 text-xs">
            入力された地域の管轄裁判所データがありません。最寄りの簡易裁判所をご確認ください。
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex-1" onClick={() => router.push('/apply/step2')}>
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
