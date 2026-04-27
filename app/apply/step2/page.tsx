'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useApplication } from '@/hooks/useApplication'
import { Creditor, PartyType } from '@/types/application'
import { ChevronRight, ChevronLeft, HelpCircle, Building2, User } from 'lucide-react'

export default function Step2Page() {
  const router = useRouter()
  const { application, updateApplication } = useApplication()
  const [creditor, setCreditor] = useState<Creditor>(application.creditor)

  const update = (field: keyof Creditor, value: string) => {
    setCreditor((prev) => ({ ...prev, [field]: value }))
  }

  const isValid =
    creditor.name.trim() !== '' &&
    creditor.address.trim() !== '' &&
    (creditor.partyType === 'individual' || (creditor.corporateName ?? '').trim() !== '')

  const handleNext = () => {
    updateApplication({ creditor })
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
                  <span className={`text-sm font-semibold ${creditor.partyType === type ? 'text-blue-900' : 'text-gray-500'}`}
                    style={creditor.partyType === type ? { color: '#1e3a5f' } : {}}>
                    {type === 'individual' ? '個人' : '法人・団体'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {creditor.partyType === 'corporation' && (
            <div className="space-y-2">
              <Label htmlFor="corporateName" className="font-semibold">
                法人名・団体名 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="corporateName"
                placeholder="例：株式会社〇〇"
                value={creditor.corporateName ?? ''}
                onChange={(e) => update('corporateName', e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="font-semibold">
              {creditor.partyType === 'individual' ? '氏名' : '代表者名'} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder={creditor.partyType === 'individual' ? '例：山田 太郎' : '例：山田 太郎（代表取締役）'}
              value={creditor.name}
              onChange={(e) => update('name', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="furigana" className="font-semibold">
              ふりがな
            </Label>
            <Input
              id="furigana"
              placeholder="例：やまだ たろう"
              value={creditor.furigana}
              onChange={(e) => update('furigana', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="font-semibold">
              住所（法人は本店所在地） <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              placeholder="例：東京都新宿区〇〇1-2-3"
              value={creditor.address}
              onChange={(e) => update('address', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="font-semibold">
              電話番号
            </Label>
            <Input
              id="phone"
              placeholder="例：03-1234-5678"
              value={creditor.phone}
              onChange={(e) => update('phone', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {!isValid && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertDescription className="text-amber-700 text-xs">
            ※ 氏名と住所は必須項目です（法人の場合は法人名も必要です）
          </AlertDescription>
        </Alert>
      )}

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
