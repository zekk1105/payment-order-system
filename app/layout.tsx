import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: '支払督促書類作成支援システム',
  description: '支払督促の申立書類作成をサポートします。法的助言を行うものではありません。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="flex-1">{children}</div>
        <footer className="border-t border-border bg-muted/50 py-3 px-4 text-center text-xs text-muted-foreground">
          本サービスは書類作成の補助ツールです。法的助言を行うものではありません。
        </footer>
      </body>
    </html>
  )
}
