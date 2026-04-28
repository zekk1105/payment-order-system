'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useApplication } from '@/hooks/useApplication'
import { ChevronLeft, Edit, Loader2, ClipboardList } from 'lucide-react'
import { TermTooltip } from '@/components/TermTooltip'

const PdfPreview = dynamic(
  () => import('./PdfViewer').then((m) => m.PdfPreview),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-xl">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" style={{ color: '#1e3a5f' }} />
          <p className="text-sm text-gray-500">PDF を生成中...</p>
        </div>
      </div>
    ),
  }
)

const PdfDownloadButton = dynamic(
  () => import('./PdfViewer').then((m) => m.PdfDownloadButton),
  { ssr: false }
)

const PrintButton = dynamic(
  () => import('./PdfViewer').then((m) => m.PrintButton),
  { ssr: false }
)

export default function Step8Page() {
  const router = useRouter()
  const { application, loaded } = useApplication()

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#1e3a5f' }} />
      </div>
    )
  }

  const isReady =
    application.creditor.name &&
    application.debtor.name &&
    application.claim.principal > 0 &&
    application.claimReason

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
          STEP 8｜PDF出力
        </h1>
        <p className="text-gray-600 text-sm">
          申立書の下書きPDFをプレビューして、ダウンロードまたは印刷できます。
          <TermTooltip term="請求の趣旨">請求の趣旨</TermTooltip>と
          <TermTooltip term="請求の原因">請求の原因</TermTooltip>が正しく記載されているか確認してください。
        </p>
      </div>

      <Alert className="border-amber-200 bg-amber-50">
        <AlertDescription className="text-amber-700 text-xs">
          このPDFは書類作成の参考用下書きです。裁判所への正式提出前に内容を必ずご確認ください。
          正式な書式は各裁判所にお問い合わせください。
        </AlertDescription>
      </Alert>

      {isReady ? (
        <>
          <Card>
            <CardContent className="pt-4 p-2">
              <PdfPreview application={application} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <PdfDownloadButton application={application} />
            <PrintButton />
          </div>
        </>
      ) : (
        <Card className="border-amber-200">
          <CardContent className="pt-6 text-center">
            <p className="text-amber-700 mb-4">
              必要な情報が不足しています。前のステップに戻って確認してください。
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex-1" onClick={() => router.push('/apply/step7')}>
          <ChevronLeft className="mr-2 w-4 h-4" />
          戻る
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          style={{ borderColor: '#1e3a5f', color: '#1e3a5f' }}
          onClick={() => router.push('/apply/step1')}
        >
          <Edit className="w-4 h-4 mr-2" />
          内容を修正する
        </Button>
      </div>

      <Button
        className="w-full py-6 text-base font-semibold rounded-xl"
        style={{ background: '#c9a84c', color: 'white' }}
        onClick={() => router.push('/guide')}
      >
        <ClipboardList className="w-5 h-5 mr-2" />
        提出手順を確認する
      </Button>
    </div>
  )
}
