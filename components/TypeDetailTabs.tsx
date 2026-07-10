'use client'

import { useState } from 'react'
import type { MbtiType } from '@/lib/types'

const TABS = ['특징', '강점', '약점', '추천 직업'] as const
type Tab = (typeof TABS)[number]

export default function TypeDetailTabs({ type }: { type: MbtiType }) {
  const [active, setActive] = useState<Tab>('특징')

  return (
    <div className="mt-6 w-full">
      <div className="flex rounded-xl bg-gray-100 p-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
              active === tab ? 'bg-white text-violet-700 shadow-sm' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4 min-h-[140px] rounded-xl bg-white p-4 shadow-sm">
        {active === '특징' && <p className="text-sm leading-relaxed text-gray-700">{type.description}</p>}

        {active === '강점' && (
          <ul className="space-y-2">
            {type.strengths.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 text-emerald-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {active === '약점' && (
          <ul className="space-y-2">
            {type.weaknesses.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 text-amber-500">△</span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {active === '추천 직업' && (
          <div className="flex flex-wrap gap-2">
            {type.jobs.map((job) => (
              <span key={job} className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                {job}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
