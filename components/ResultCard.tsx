'use client'

import { forwardRef } from 'react'
import { MBTI_TYPES } from '@/lib/data/mbtiTypes'

interface ResultCardProps {
  code: string
}

const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(function ResultCard({ code }, ref) {
  const type = MBTI_TYPES[code]
  if (!type) return null

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden rounded-3xl p-8 text-center text-white shadow-xl"
      style={{ background: `linear-gradient(135deg, ${type.themeColorFrom}, ${type.themeColorTo})` }}
    >
      <div className="mb-2 text-5xl">{type.emoji}</div>
      <div className="mb-1 text-4xl font-black tracking-wide">{code}</div>
      <div className="text-lg font-semibold opacity-90">{type.nickname}</div>
    </div>
  )
})

export default ResultCard
