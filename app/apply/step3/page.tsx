'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useApplication } from '@/hooks/useApplication'
import { Debtor, PartyType } from '@/types/application'
import { findCourt, prefectures } from '@/lib/court-data'
import { ChevronRight, ChevronLeft, HelpCircle, Building2, User, MapPin } from 'lucide-react'

export default function Step3Page() {
  const router = useRouter()
  const { application, updateApplication } = useApplication()
  const [debtor, setDebtor] = useState<Debtor>(application.debtor)
  const [detectedCourt, setDetectedCourt] = useState(application.court)

  const update = (field: keyof Debtor, value: string) => {
    setDebtor((prev) => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    if (debtor.prefecture && debtor.city) {
      const court = findCourt(debtor.prefecture, debtor.city)
      setDetectedCourt(court)
    } else {
      setDetectedCourt(null)
    }
  }, [debtor.prefecture, debtor.city])

  const isValid =
    debtor.name.trim() !== '' &&
    debtor.address.trim() !== '' &&
    debtor.prefecture.trim() !== '' &&
    debtor.city.trim() !== '' &&
    (debtor.partyType === 'individual' || (debtor.corporateName ?? '').trim() !== '')

  const handleNext = () => {
    updateApplication({ debtor, court: detectedCourt })
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
          都道府県と市区町村を入力すると、管轄裁判所が自動で表示されます。
        </p>
      </div>

      <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 rounded-lg p-3">
        <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
        <span>
          相手方の住所地を管轄する簡易裁判所に申し立てます。住所を入力すると管轄裁判所を自動判定します。
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
                  <span className="text-sm font-semibold" style={debtor.partyType === type ? { color: '#1e3a5f' } : { color: '#6b7280' }}>
                    {type === 'individual' ? '個人' : '法人・団体'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {debtor.partyType === 'corporation' && (
            <div className="space-y-2">
              <Label htmlFor="corporateName" className="font-semibold">
                法人名・団体名 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="corporateName"
                placeholder="例：株式会社〇〇"
                value={debtor.corporateName ?? ''}
                onChange={(e) => update('corporateName', e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="font-semibold">
              {debtor.partyType === 'individual' ? '氏名' : '代表者名'} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="例：田中 花子"
              value={debtor.name}
              onChange={(e) => update('name', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="furigana" className="font-semibold">ふりがな</Label>
            <Input
              id="furigana"
              placeholder="例：たなか はなこ"
              value={debtor.furigana}
              onChange={(e) => update('furigana', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="prefecture" className="font-semibold">
                都道府県 <span className="text-red-500">*</span>
              </Label>
              <select
                id="prefecture"
                value={debtor.prefecture}
                onChange={(e) => update('prefecture', e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="">選択してください</option>
                {prefectures.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="font-semibold">
                市区町村 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                placeholder="例：横浜市"
                value={debtor.city}
                onChange={(e) => update('city', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="font-semibold">
              番地以降の住所 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              placeholder="例：中区〇〇1-2-3 △△マンション101号"
              value={debtor.address}
              onChange={(e) => update('address', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

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
                  郵券額：<span className="font-semibold">{detectedCourt.stampAmount.toLocaleString()}円</span>
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
          disabled={!isValid}
          onClick={handleNext}
          style={isValid ? { background: '#1e3a5f', color: 'white' } : {}}
        >
          次のステップへ
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
