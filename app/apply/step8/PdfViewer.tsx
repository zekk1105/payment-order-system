'use client'

import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import { PaymentOrderDocument } from './PdfDocument'
import { Application } from '@/types/application'
import { Button } from '@/components/ui/button'
import { Download, Printer } from 'lucide-react'

export function PdfPreview({ application }: { application: Application }) {
  return (
    <PDFViewer width="100%" height={600} showToolbar={false}>
      <PaymentOrderDocument application={application} />
    </PDFViewer>
  )
}

export function PdfDownloadButton({ application }: { application: Application }) {
  return (
    <PDFDownloadLink
      document={<PaymentOrderDocument application={application} />}
      fileName="支払督促申立書_下書き.pdf"
    >
      {({ loading }) => (
        <Button
          className="w-full py-5 font-semibold"
          disabled={loading}
          style={{ background: '#1e3a5f', color: 'white' }}
        >
          <Download className="w-4 h-4 mr-2" />
          {loading ? '生成中...' : 'ダウンロード'}
        </Button>
      )}
    </PDFDownloadLink>
  )
}

export function PrintButton() {
  return (
    <Button
      variant="outline"
      className="w-full py-5 font-semibold"
      onClick={() => window.print()}
    >
      <Printer className="w-4 h-4 mr-2" />
      印刷する
    </Button>
  )
}
