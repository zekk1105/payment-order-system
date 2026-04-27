'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useApplication } from '@/hooks/useApplication'
import { generateClaimReason } from '@/lib/claim-templates'
import { ChevronRight, ChevronLeft, HelpCircle, RotateCcw } from 'lucide-react'

export default function Step5Page() {
  const router = useRouter()
  const { application, updateApplication, loaded } = useApplication()
  const [text, setText] = useState('')
  const [defaultText, setDefaultText] = useState('')
  const [isEdited, setIsEdited] = useState(false)

  useEffect(() => {
    if (!loaded) return
    const generated = generateClaimReason({
      creditorName: application.creditor.corporateName
        ? `${application.creditor.corporateName} ${application.creditor.name}`
        : application.creditor.name || '申立人',
      debtorName: application.debtor.corporateName
        ? `${application.debtor.corporateName} ${application.debtor.name}`
        : application.debtor.name || '相手方',
      principal: application.claim.principal,
      interestRate: application.claim.interestRate,
      delayInterestRate: application.claim.delayInterestRate,
      loanDate: application.claim.loanDate,
      dueDate: application.claim.dueDate,
      claimType: application.claim.claimType,
    })
    setDefaultText(generated)
    if (application.claimReason) {
      setText(application.claimReason)
      setIsEdited(application.claimReason !== generated)
    } else {
      setText(generated)
    }
  }, [loaded])

  const handleReset = () => {
    setText(defaultText)
    setIsEdited(false)
  }

  const handleChange = (value: string) => {
    setText(value)
    setIsEdited(value !== defaultText)
  }

  const handleNext = () => {
    updateApplication({ claimReason: text })
    router.push('/apply/step6')
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
          STEP 5｜請求の原因
        </h1>
        <p className="text-gray-600 text-sm">
          入力された情報をもとに、裁判所提出用の「請求の原因」文章を自動生成しました。
          内容を確認し、必要があれば編集してください。
        </p>
      </div>

      <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 rounded-lg p-3">
        <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
        <span>
          「請求の原因」は裁判所に提出する書面の一部です。事実関係を正確に記載してください。
          テンプレートを参考に、実際の状況に合わせて修正することをお勧めします。
        </span>
      </div>

      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold" style={{ color: '#1e3a5f' }}>請求の原因</p>
            {isEdited && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={handleReset}
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                元に戻す
              </Button>
            )}
          </div>
          <textarea
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full min-h-[320px] p-3 text-sm border border-input rounded-lg bg-background resize-y font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="請求の原因を入力してください"
          />
          <p className="text-xs text-gray-400 mt-2">
            {text.length} 文字
            {isEdited && <span className="ml-2 text-amber-600">（編集済み）</span>}
          </p>
        </CardContent>
      </Card>

      {isEdited && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertDescription className="text-amber-700 text-xs">
            テンプレートを編集しました。内容が事実と一致しているか必ず確認してください。
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex-1" onClick={() => router.push('/apply/step4')}>
          <ChevronLeft className="mr-2 w-4 h-4" />
          戻る
        </Button>
        <Button
          className="flex-1 py-6 font-semibold rounded-xl"
          disabled={!text.trim()}
          onClick={handleNext}
          style={text.trim() ? { background: '#1e3a5f', color: 'white' } : {}}
        >
          次のステップへ
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
