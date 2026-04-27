'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useApplication } from '@/hooks/useApplication'
import { CheckCircle2, AlertTriangle, HelpCircle, ChevronRight } from 'lucide-react'

interface Question {
  id: keyof { knowsAddress: boolean | null; amountFixed: boolean | null; clearlyRefused: boolean | null }
  text: string
  hint: string
  warnOnNo: string
}

const questions: Question[] = [
  {
    id: 'knowsAddress',
    text: '相手方（お金を払うべき人）の現住所がわかりますか？',
    hint: '支払督促は、相手方の住所地を管轄する裁判所に申し立てる必要があります。',
    warnOnNo: '相手方の住所が不明の場合、支払督促の申立ては困難です。まず住所を確認してから手続きを進めてください。',
  },
  {
    id: 'amountFixed',
    text: '請求する金額は確定していますか？',
    hint: '元金のほか、利息や遅延損害金も計算できる状態であることが望ましいです。',
    warnOnNo: '請求金額が未確定の場合、書類の作成が難しくなります。先に金額を確定させてから手続きを進めることをお勧めします。',
  },
  {
    id: 'clearlyRefused',
    text: '相手方から明確な支払い拒否または無視がありましたか？',
    hint: '支払督促は相手方が任意に支払わない場合に有効な手続きです。まだ交渉中の場合は、先に話し合いを試みることも選択肢です。',
    warnOnNo: '相手方にまだ直接請求していない場合は、まず内容証明郵便などで支払い請求を行うことをお勧めします。それでも支払われない場合に支払督促が有効です。',
  },
]

type Answers = {
  knowsAddress: boolean | null
  amountFixed: boolean | null
  clearlyRefused: boolean | null
}

export default function Step1Page() {
  const router = useRouter()
  const { application, updateApplication } = useApplication()
  const [answers, setAnswers] = useState<Answers>(application.step1)

  const setAnswer = (id: keyof Answers, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const canProceed = answers.knowsAddress === true && answers.amountFixed === true

  const handleNext = () => {
    updateApplication({ step1: answers })
    router.push('/apply/step2')
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
          STEP 1｜状況確認
        </h1>
        <p className="text-gray-600 text-sm">
          まず、支払督促の申立てに必要な条件が整っているか確認します。
          すべての質問に答えてください。
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((q, index) => (
          <Card key={q.id} className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex gap-2 items-start">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold"
                  style={{ background: '#1e3a5f' }}
                >
                  {index + 1}
                </span>
                {q.text}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 rounded-lg p-3">
                <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#1e3a5f' }} />
                <span>{q.hint}</span>
              </div>
              <div className="flex gap-3">
                <Button
                  variant={answers[q.id] === true ? 'default' : 'outline'}
                  className="flex-1"
                  style={
                    answers[q.id] === true
                      ? { background: '#1e3a5f', color: 'white' }
                      : {}
                  }
                  onClick={() => setAnswer(q.id, true)}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  はい
                </Button>
                <Button
                  variant={answers[q.id] === false ? 'default' : 'outline'}
                  className="flex-1"
                  style={
                    answers[q.id] === false
                      ? { background: '#6b7280', color: 'white' }
                      : {}
                  }
                  onClick={() => setAnswer(q.id, false)}
                >
                  いいえ
                </Button>
              </div>
              {answers[q.id] === false && (
                <Alert className="border-amber-300 bg-amber-50">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800 text-xs">
                    {q.warnOnNo}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {answers.clearlyRefused === false && (
        <Alert className="border-blue-300 bg-blue-50">
          <AlertDescription className="text-blue-800 text-sm">
            まだ交渉の余地がある場合でも、書類の準備を進めることができます。「いいえ」でも次のステップに進めます。
          </AlertDescription>
        </Alert>
      )}

      <div className="pt-4">
        <Button
          className="w-full py-6 text-lg font-semibold rounded-xl"
          disabled={!canProceed}
          onClick={handleNext}
          style={canProceed ? { background: '#1e3a5f', color: 'white' } : {}}
        >
          次のステップへ
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
        {!canProceed && (
          <p className="text-center text-xs text-gray-500 mt-2">
            ※ Q1・Q2に「はい」と答えると次に進めます
          </p>
        )}
      </div>
    </div>
  )
}
