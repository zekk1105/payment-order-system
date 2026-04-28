'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useApplication } from '@/hooks/useApplication'
import { Evidence } from '@/types/application'
import { ChevronRight, ChevronLeft, HelpCircle, Plus, Trash2, FileCheck } from 'lucide-react'
import { saveApplication } from '@/lib/save-application'

const evidenceExamples = [
  '借用証書（写し）',
  '預金通帳（写し）',
  '振込明細書（写し）',
  '請求書（写し）',
  '契約書（写し）',
  '領収書（写し）',
  'メール・LINEのやり取り（写し）',
]

export default function Step6Page() {
  const router = useRouter()
  const { application, updateApplication, loaded } = useApplication()
  const [evidences, setEvidences] = useState<Evidence[]>(application.evidences)

  useEffect(() => {
    if (!loaded) return
    setEvidences(application.evidences)
  }, [loaded])

  const addEvidence = () => {
    const next: Evidence = { number: evidences.length + 1, description: '' }
    const nextEvidences = [...evidences, next]
    setEvidences(nextEvidences)
    updateApplication({ evidences: nextEvidences })
  }

  const removeEvidence = (index: number) => {
    const nextEvidences = evidences
      .filter((_, i) => i !== index)
      .map((e, i) => ({ ...e, number: i + 1 }))
    setEvidences(nextEvidences)
    updateApplication({ evidences: nextEvidences })
  }

  const updateEvidence = (index: number, description: string) => {
    const nextEvidences = evidences.map((e, i) => (i === index ? { ...e, description } : e))
    setEvidences(nextEvidences)
    updateApplication({ evidences: nextEvidences })
  }

  const handleSkip = () => {
    updateApplication({ evidences: [] })
    saveApplication(7).catch(console.error)
    router.push('/apply/step7')
  }

  const handleNext = () => {
    saveApplication(7).catch(console.error)
    router.push('/apply/step7')
  }

  const canProceed = evidences.length === 0 || evidences.every((e) => e.description.trim() !== '')

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
          STEP 6｜証拠書類
        </h1>
        <p className="text-gray-600 text-sm">
          申立てを裏付ける証拠書類を登録します。証拠がない場合はスキップできます。
        </p>
      </div>

      <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 rounded-lg p-3">
        <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
        <span>
          証拠書類（甲号証）は申立書のコピーと一緒に裁判所に提出します。
          借用書・通帳・メール等、請求の事実を証明できる書類を添付することをお勧めします。
        </span>
      </div>

      <div className="space-y-3">
        {evidences.map((evidence, index) => (
          <Card key={index} className="border-gray-200">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <span
                  className="flex-shrink-0 text-white text-xs font-bold px-2 py-1 rounded"
                  style={{ background: '#1e3a5f' }}
                >
                  甲第{evidence.number}号証
                </span>
                <Input
                  placeholder="例：借用証書（写し）"
                  value={evidence.description}
                  onChange={(e) => updateEvidence(index, e.target.value)}
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeEvidence(index)}
                  className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full border-dashed"
        style={{ borderColor: '#1e3a5f', color: '#1e3a5f' }}
        onClick={addEvidence}
      >
        <Plus className="w-4 h-4 mr-2" />
        証拠を追加する（甲第{evidences.length + 1}号証）
      </Button>

      {evidences.length === 0 && (
        <div>
          <p className="text-xs text-gray-500 text-center mb-3">よく使われる証拠書類の例：</p>
          <div className="flex flex-wrap gap-2">
            {evidenceExamples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  const next: Evidence = { number: evidences.length + 1, description: ex }
                  const nextEvidences = [...evidences, next]
                  setEvidences(nextEvidences)
                  updateApplication({ evidences: nextEvidences })
                }}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
              >
                + {ex}
              </button>
            ))}
          </div>
        </div>
      )}

      {evidences.length > 0 && !canProceed && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertDescription className="text-amber-700 text-xs">
            証拠の説明が空欄のものがあります。すべて入力するか、不要な行を削除してください。
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex-1" onClick={() => router.push('/apply/step5')}>
          <ChevronLeft className="mr-2 w-4 h-4" />
          戻る
        </Button>
        <div className="flex flex-col gap-2 flex-1">
          {evidences.length > 0 ? (
            <Button
              className="w-full py-5 font-semibold rounded-xl"
              disabled={!canProceed}
              onClick={handleNext}
              style={canProceed ? { background: '#1e3a5f', color: 'white' } : {}}
            >
              <FileCheck className="w-4 h-4 mr-2" />
              証拠を登録して次へ
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          ) : (
            <Button
              className="w-full py-5 font-semibold rounded-xl"
              onClick={handleSkip}
              style={{ background: '#6b7280', color: 'white' }}
            >
              証拠なしでスキップ
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
