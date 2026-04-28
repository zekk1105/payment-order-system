'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useApplication } from '@/hooks/useApplication'
import { calcStamp } from '@/lib/stamp-calculator'
import { ChevronRight, ChevronLeft, HelpCircle, Receipt } from 'lucide-react'
import { TermTooltip } from '@/components/TermTooltip'

const checklistItems: React.ReactNode[] = [
  '相手方の住所・氏名を正確に確認した',
  '請求金額（元金・利息・遅延損害金）を確認した',
  '請求の原因の内容が事実と一致している',
  <>証拠書類（甲号証）の<TermTooltip term="副本">副本</TermTooltip>（コピー）を準備した</>,
  <><TermTooltip term="収入印紙">収入印紙</TermTooltip>は郵便局または法務局で購入できることを確認した</>,
  '提出先の裁判所の所在地を確認した',
]

export default function Step7Page() {
  const router = useRouter()
  const { application, updateApplication } = useApplication()
  const [checklist, setChecklist] = useState<boolean[]>(
    application.checklist.length === checklistItems.length
      ? application.checklist
      : new Array(checklistItems.length).fill(false)
  )

  const stampAmount = calcStamp(application.claim.total || application.claim.principal)
  const postalAmount = application.court?.stampAmount ?? 6000
  const totalCost = stampAmount + postalAmount

  const allChecked = checklist.every(Boolean)

  const toggleCheck = (index: number) => {
    const next = [...checklist]
    next[index] = !next[index]
    setChecklist(next)
    updateApplication({ checklist: next })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
          STEP 7｜費用確認・最終チェック
        </h1>
        <p className="text-gray-600 text-sm">
          申立てに必要な費用のサマリーと、提出前の確認事項です。
          すべてのチェックが完了するとPDF出力ができます。
        </p>
      </div>

      <Card className="border-2" style={{ borderColor: '#c9a84c' }}>
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="w-5 h-5" style={{ color: '#c9a84c' }} />
            <p className="font-bold" style={{ color: '#1e3a5f' }}>申立てに必要な費用</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold"><TermTooltip term="収入印紙">収入印紙</TermTooltip>代</p>
                <p className="text-xs text-gray-500">
                  請求額 {(application.claim.total || application.claim.principal).toLocaleString()} 円に対する印紙
                </p>
              </div>
              <p className="font-bold text-lg" style={{ color: '#1e3a5f' }}>
                {stampAmount.toLocaleString()} 円
              </p>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold"><TermTooltip term="郵券">郵券</TermTooltip>（切手代）</p>
                <p className="text-xs text-gray-500">
                  {application.court?.name ?? '管轄裁判所'}への郵送費用
                </p>
              </div>
              <p className="font-bold text-lg" style={{ color: '#1e3a5f' }}>
                {postalAmount.toLocaleString()} 円
              </p>
            </div>

            <div className="flex justify-between items-center p-4 rounded-xl text-white" style={{ background: '#1e3a5f' }}>
              <p className="font-bold">合計費用</p>
              <p className="font-bold text-xl">{totalCost.toLocaleString()} 円</p>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 text-xs bg-blue-50 rounded-lg p-3">
            <HelpCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-600" />
            <span className="text-gray-600">
              <TermTooltip term="収入印紙">収入印紙</TermTooltip>は郵便局・コンビニ・法務局で購入できます。<TermTooltip term="郵券">郵券</TermTooltip>は裁判所での購入が必要な場合もあります。
              正確な金額は提出先の裁判所にご確認ください。
            </span>
          </div>
        </CardContent>
      </Card>

      {application.court && (
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm font-semibold mb-2" style={{ color: '#1e3a5f' }}>提出先裁判所</p>
            <p className="font-bold">{application.court.name}</p>
            <p className="text-sm text-gray-600">{application.court.address}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="pt-5">
          <p className="font-bold mb-4" style={{ color: '#1e3a5f' }}>提出前チェックリスト</p>
          <div className="space-y-3">
            {checklistItems.map((item, index) => (
              <label
                key={index}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={checklist[index]}
                  onCheckedChange={() => toggleCheck(index)}
                  className="mt-0.5"
                  style={checklist[index] ? { background: '#1e3a5f', borderColor: '#1e3a5f' } : {}}
                />
                <span className={`text-sm ${checklist[index] ? 'text-gray-800 line-through' : 'text-gray-600'}`}>
                  {item}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-4 bg-gray-50 rounded-lg p-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              チェック済み：{checklist.filter(Boolean).length} / {checklistItems.length}
            </span>
            {allChecked && (
              <span className="text-xs font-bold text-green-600">✓ すべて確認済み</span>
            )}
          </div>
        </CardContent>
      </Card>

      {!allChecked && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertDescription className="text-amber-700 text-xs">
            すべての項目にチェックを入れると「PDFを確認する」ボタンが有効になります。
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex-1" onClick={() => router.push('/apply/step6')}>
          <ChevronLeft className="mr-2 w-4 h-4" />
          戻る
        </Button>
        <Button
          className="flex-1 py-6 font-semibold rounded-xl"
          disabled={!allChecked}
          onClick={() => router.push('/apply/step8')}
          style={allChecked ? { background: '#c9a84c', color: '#1e3a5f' } : {}}
        >
          PDFを確認する
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
