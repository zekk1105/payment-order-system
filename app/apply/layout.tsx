'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Circle } from 'lucide-react'

const steps = [
  { number: 1, label: '状況確認', path: '/apply/step1' },
  { number: 2, label: '申立人情報', path: '/apply/step2' },
  { number: 3, label: '相手方情報', path: '/apply/step3' },
  { number: 4, label: '請求内容', path: '/apply/step4' },
  { number: 5, label: '請求の原因', path: '/apply/step5' },
  { number: 6, label: '証拠書類', path: '/apply/step6' },
  { number: 7, label: '費用確認', path: '/apply/step7' },
  { number: 8, label: 'PDF出力', path: '/apply/step8' },
]

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const currentStep = steps.findIndex((s) => pathname.startsWith(s.path)) + 1

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-sm font-semibold" style={{ color: '#1e3a5f' }}>
              ← トップに戻る
            </Link>
          </div>
          <nav aria-label="進捗">
            <ol className="flex items-center gap-1 overflow-x-auto pb-1">
              {steps.map((step, index) => {
                const isCompleted = step.number < currentStep
                const isCurrent = step.number === currentStep
                const isUpcoming = step.number > currentStep
                return (
                  <li key={step.number} className="flex items-center">
                    <div
                      className={`flex flex-col items-center min-w-[60px] ${
                        isUpcoming ? 'opacity-40' : ''
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mb-1 transition-colors ${
                          isCompleted
                            ? 'text-white'
                            : isCurrent
                            ? 'text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                        style={
                          isCompleted
                            ? { background: '#c9a84c' }
                            : isCurrent
                            ? { background: '#1e3a5f' }
                            : {}
                        }
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span>{step.number}</span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] text-center leading-tight ${
                          isCurrent ? 'font-bold' : 'font-normal text-gray-500'
                        }`}
                        style={isCurrent ? { color: '#1e3a5f' } : {}}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className="w-4 h-0.5 mx-1 flex-shrink-0"
                        style={{ background: step.number < currentStep ? '#c9a84c' : '#e5e7eb' }}
                      />
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
