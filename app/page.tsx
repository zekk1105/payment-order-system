import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Clock, Shield, ChevronRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2a5080 50%, #1e3a5f 100%)' }}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge className="mb-4 text-sm" style={{ background: '#c9a84c', color: '#1e3a5f' }}>
            無料・書類作成補助ツール
          </Badge>
          <h1 className="text-4xl font-bold text-white mb-4">
            支払督促書類
            <br />
            作成支援システム
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            お金の貸し借りや売掛金の回収など、未払い問題でお困りですか？
            ステップに沿って情報を入力するだけで、裁判所へ提出する書類を作成できます。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="pt-6">
              <FileText className="w-8 h-8 mb-3" style={{ color: '#c9a84c' }} />
              <h3 className="font-semibold mb-2">書類を自動生成</h3>
              <p className="text-sm text-blue-200">必要事項を入力するだけで、裁判所書式に対応した書類を作成します</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="pt-6">
              <Clock className="w-8 h-8 mb-3" style={{ color: '#c9a84c' }} />
              <h3 className="font-semibold mb-2">最短20分で完成</h3>
              <p className="text-sm text-blue-200">8つのステップをガイドに沿って進めるだけ。複雑な法律知識は不要です</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="pt-6">
              <Shield className="w-8 h-8 mb-3" style={{ color: '#c9a84c' }} />
              <h3 className="font-semibold mb-2">安心の免責表示</h3>
              <p className="text-sm text-blue-200">本ツールは書類作成の補助です。法的助言や結果の保証は行いません</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-xl p-6 mb-10 text-white">
          <h2 className="font-semibold text-lg mb-4" style={{ color: '#c9a84c' }}>支払督促とは？</h2>
          <p className="text-blue-100 text-sm leading-relaxed mb-3">
            支払督促（しはらいとくそく）とは、お金の貸し借りや売掛金など、金銭の支払いを求めるための簡易的な裁判手続きです。
            通常の訴訟より費用と手間が少なく、相手が異議を申し立てなければ、強制執行（差し押さえ等）も可能になります。
          </p>
          <p className="text-blue-200 text-xs">
            ※ 手続きの結果については保証いたしません。複雑な事案や不明点がある場合は、弁護士や司法書士にご相談ください。
          </p>
        </div>

        <div className="text-center">
          <Link href="/apply/step1">
            <Button
              size="lg"
              className="text-lg px-10 py-6 font-bold rounded-full shadow-xl hover:opacity-90 transition-opacity"
              style={{ background: '#c9a84c', color: '#1e3a5f' }}
            >
              書類作成を始める
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="text-blue-300 text-sm mt-4">所要時間：約20〜30分</p>
        </div>
      </div>
    </div>
  )
}
