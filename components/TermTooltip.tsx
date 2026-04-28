'use client'

import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const TERM_DEFINITIONS: Record<string, string> = {
  送達: '裁判所が書類を相手方に届ける手続きのことです',
  副本: '提出書類のコピーのことです。相手方に送るために使います',
  督促命令: '裁判所書記官が相手方に支払いを命じる書類のことです',
  異議申立: '相手方が支払督促の内容に不服を申し立てることです。申立てがあると通常訴訟に移行します',
  債権者: 'お金を請求する側（あなた）のことです',
  債務者: 'お金を支払う義務がある相手方のことです',
  遅延損害金: '支払期日を過ぎた場合に発生する遅れた分の損害金です',
  収入印紙: '裁判所への手数料として申立書に貼り付ける印紙のことです',
  郵券: '裁判所が書類を送付するための郵便切手のことです',
  管轄: 'どの裁判所に申立てるかを決めるルールのことです',
  請求の趣旨: 'いくら請求するかを記載する欄のことです',
  請求の原因: 'なぜ請求するかの事実経緯を記載する欄のことです',
}

interface TermTooltipProps {
  term: string
  children: React.ReactNode
}

export function TermTooltip({ term, children }: TermTooltipProps) {
  const [open, setOpen] = useState(false)
  const definition = TERM_DEFINITIONS[term]

  if (!definition) return <>{children}</>

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        asChild={false}
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-help border-b-2 border-dashed inline"
        style={{ borderColor: '#c9a84c', textDecorationLine: 'none' }}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent
        style={{ background: '#1e3a5f' }}
        className="leading-relaxed"
      >
        <p className="font-semibold mb-0.5">{term}</p>
        <p>{definition}</p>
      </TooltipContent>
    </Tooltip>
  )
}
