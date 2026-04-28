'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle2, Circle, MapPin, Printer, Stamp, Building2, Clock, GitBranch, AlertCircle } from 'lucide-react'
import { Court } from '@/types/application'

const STORAGE_KEY = 'payment_order_application'

function loadCourt(): Court | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      return data.court ?? null
    }
  } catch {
    // ignore
  }
  return null
}

const NAVY = '#1e3a5f'
const GOLD = '#c9a84c'

interface StepProps {
  number: number
  title: string
  checked: boolean
  onToggle: () => void
  children: React.ReactNode
}

function TimelineStep({ number, title, checked, onToggle, children }: StepProps) {
  return (
    <div className="flex gap-4">
      {/* Left column */}
      <div className="flex flex-col items-center">
        <button
          onClick={onToggle}
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm transition-all duration-200 shadow-md hover:opacity-90 active:scale-95"
          style={{ background: checked ? GOLD : NAVY }}
          aria-label={checked ? `STEP${number} 完了済みにする` : `STEP${number} 完了にする`}
        >
          {checked ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <span className="text-base font-bold">{number}</span>
          )}
        </button>
        {number < 5 && (
          <div
            className="w-0.5 flex-1 min-h-[2rem] mt-1"
            style={{ background: checked ? GOLD : '#e5e7eb' }}
          />
        )}
      </div>

      {/* Right column */}
      <div className="flex-1 pb-8">
        <div
          className="rounded-2xl border-2 p-5 transition-all duration-200"
          style={{
            borderColor: checked ? GOLD : '#e5e7eb',
            background: checked ? '#fffbf0' : 'white',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold" style={{ color: NAVY }}>
              STEP {number}｜{title}
            </h2>
            <button
              onClick={onToggle}
              className="text-xs px-3 py-1 rounded-full border transition-colors"
              style={
                checked
                  ? { borderColor: GOLD, color: GOLD, background: '#fffbf0' }
                  : { borderColor: '#d1d5db', color: '#6b7280' }
              }
            >
              {checked ? '完了済み' : '完了にする'}
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function GuidePage() {
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false, false])
  const [court, setCourt] = useState<Court | null>(null)

  useEffect(() => {
    setCourt(loadCourt())
    try {
      const saved = localStorage.getItem('guide_checked')
      if (saved) setChecked(JSON.parse(saved))
    } catch {
      // ignore
    }
  }, [])

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      try {
        localStorage.setItem('guide_checked', JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }

  const completedCount = checked.filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link href="/apply/step8" className="text-sm font-semibold" style={{ color: NAVY }}>
            ← 申立書に戻る
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Page heading */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-3"
            style={{ background: '#eef2f8', color: NAVY }}
          >
            PDF完成後の手続き
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>
            申立書完成後の手順ガイド
          </h1>
          <p className="text-gray-500 text-sm">
            ステップをクリックして完了済みにしながら進めてください。
          </p>
          {/* Progress bar */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / 5) * 100}%`, background: GOLD }}
              />
            </div>
            <span className="text-xs font-semibold" style={{ color: GOLD }}>
              {completedCount}/5 完了
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div>
          {/* STEP 1 */}
          <TimelineStep number={1} title="印刷する" checked={checked[0]} onToggle={() => toggle(0)}>
            <div className="flex items-start gap-3 mb-3">
              <Printer className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: NAVY }} />
              <p className="text-sm font-semibold text-gray-800">申立書を2部印刷する（1部は自分の控え）</p>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 ml-8">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                A4サイズ・白黒で問題ありません
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                1部は裁判所提出用、もう1部は控えとして手元に保管してください
              </li>
            </ul>
          </TimelineStep>

          {/* STEP 2 */}
          <TimelineStep number={2} title="収入印紙と郵便切手を準備する" checked={checked[1]} onToggle={() => toggle(1)}>
            <div className="flex items-start gap-3 mb-3">
              <Stamp className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: NAVY }} />
              <p className="text-sm font-semibold text-gray-800">収入印紙と郵便切手を用意する</p>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 ml-8">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                収入印紙は郵便局・コンビニで購入できます
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                収入印紙は申立書の所定欄に貼ります（消印は押さないでください）
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                郵便切手は裁判所ごとに指定の金額があります
                {court && (
                  <span className="ml-1 font-semibold" style={{ color: NAVY }}>
                    （{court.name}：{court.stampAmount.toLocaleString()}円）
                  </span>
                )}
              </li>
            </ul>
          </TimelineStep>

          {/* STEP 3 */}
          <TimelineStep number={3} title="裁判所に提出する" checked={checked[2]} onToggle={() => toggle(2)}>
            <div className="flex items-start gap-3 mb-3">
              <Building2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: NAVY }} />
              <p className="text-sm font-semibold text-gray-800">管轄の簡易裁判所に申立書を提出する</p>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 ml-8 mb-4">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                管轄の簡易裁判所の窓口に直接持参できます
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                郵送でも提出できます（書留郵便を推奨）
              </li>
            </ul>

            {/* Court info box */}
            {court ? (
              <div
                className="rounded-xl border-2 p-4"
                style={{ borderColor: GOLD, background: '#fffbf0' }}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">提出先（管轄裁判所）</p>
                    <p className="font-bold text-lg leading-tight" style={{ color: NAVY }}>
                      {court.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">{court.address}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                  <p className="text-xs text-amber-700">
                    管轄裁判所の情報が見つかりませんでした。
                    <Link href="/apply/step3" className="underline ml-1">
                      STEP 3（相手方情報）
                    </Link>
                    に戻って住所を入力してください。
                  </p>
                </div>
              </div>
            )}
          </TimelineStep>

          {/* STEP 4 */}
          <TimelineStep number={4} title="督促命令が届くのを待つ" checked={checked[3]} onToggle={() => toggle(3)}>
            <div className="flex items-start gap-3 mb-3">
              <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: NAVY }} />
              <p className="text-sm font-semibold text-gray-800">申立て後、2〜4週間で督促命令が送達されます</p>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 ml-8">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                申立てから2〜4週間で相手方に督促命令が送達されます
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                相手方が2週間以内に異議を申し立てなければ、仮執行宣言の申立てができます
              </li>
            </ul>
          </TimelineStep>

          {/* STEP 5 */}
          <TimelineStep number={5} title="相手方の反応に応じて対応する" checked={checked[4]} onToggle={() => toggle(4)}>
            <div className="flex items-start gap-3 mb-4">
              <GitBranch className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: NAVY }} />
              <p className="text-sm font-semibold text-gray-800">相手方の反応によって次のアクションが変わります</p>
            </div>

            <div className="space-y-3 ml-8">
              {/* Pattern A */}
              <div className="rounded-xl border-2 p-4" style={{ borderColor: '#22c55e', background: '#f0fdf4' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#16a34a' }}>
                    パターン A
                  </span>
                  <span className="text-sm font-semibold text-gray-800">相手が支払った</span>
                </div>
                <p className="text-sm text-green-700 font-semibold">
                  解決！おめでとうございます。
                </p>
              </div>

              {/* Pattern B */}
              <div
                className="rounded-xl border-2 p-4"
                style={{ borderColor: NAVY, background: '#eef2f8' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: NAVY }}>
                    パターン B
                  </span>
                  <span className="text-sm font-semibold text-gray-800">相手が無視した</span>
                </div>
                <p className="text-sm text-gray-700">
                  仮執行宣言の申立てができます。強制執行へ進めます。
                </p>
              </div>

              {/* Pattern C */}
              <div className="rounded-xl border-2 p-4" style={{ borderColor: '#f59e0b', background: '#fffbeb' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#d97706' }}>
                    パターン C
                  </span>
                  <span className="text-sm font-semibold text-gray-800">相手が異議を申し立てた</span>
                </div>
                <p className="text-sm text-amber-700">
                  通常訴訟に移行します。弁護士への相談をお勧めします。
                </p>
              </div>
            </div>
          </TimelineStep>
        </div>

        {/* Notice box */}
        <div
          className="rounded-2xl border p-5 mt-2"
          style={{ borderColor: '#d1d5db', background: '#f8fafc' }}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-500" />
            <p className="text-xs text-gray-600 leading-relaxed">
              手続きに不明な点がある場合は、申立先の裁判所窓口または
              <span className="font-semibold">法テラス（0570-078374）</span>
              にお問い合わせください。本ページは一般的な手順を説明するものであり、個別の法的アドバイスではありません。
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/apply/step8"
            className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl text-white transition-opacity hover:opacity-90"
            style={{ background: NAVY }}
          >
            ← 申立書に戻る
          </Link>
        </div>
      </main>

      <footer className="border-t border-border bg-muted/50 py-3 px-4 text-center text-xs text-muted-foreground mt-8">
        本サービスは書類作成の補助ツールです。法的助言を行うものではありません。
      </footer>
    </div>
  )
}
