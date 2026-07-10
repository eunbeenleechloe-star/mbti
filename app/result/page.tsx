'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toPng } from 'html-to-image'
import { useTestStore } from '@/lib/store/useTestStore'
import { MBTI_TYPES } from '@/lib/data/mbtiTypes'
import ResultCard from '@/components/ResultCard'
import TypeDetailTabs from '@/components/TypeDetailTabs'
import ShareSheet from '@/components/ShareSheet'

export default function ResultPage() {
  const router = useRouter()
  const result = useTestStore((s) => s.result)
  const lastResultCode = useTestStore((s) => s.lastResultCode)
  const reset = useTestStore((s) => s.reset)

  const code = result?.code ?? lastResultCode
  const cardRef = useRef<HTMLDivElement>(null)
  const [shareOpen, setShareOpen] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const [stats, setStats] = useState<Record<string, number> | null>(null)

  useEffect(() => {
    if (!code) router.replace('/')
  }, [code, router])

  useEffect(() => {
    if (result?.code) {
      // 방금 완료된 테스트인 경우에만 통계에 반영
      fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: result.code }),
      })
        .then((res) => res.json())
        .then((data) => setStats(data.stats))
        .catch(() => {})
    } else {
      fetch('/api/stats')
        .then((res) => res.json())
        .then((data) => setStats(data.stats))
        .catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!code) return null
  const type = MBTI_TYPES[code]

  const handleSaveImage = async () => {
    if (!cardRef.current) return
    try {
      setSaveError(false)
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 })
      const link = document.createElement('a')
      link.download = `mbti-${code}.png`
      link.href = dataUrl
      link.click()
    } catch {
      setSaveError(true)
    }
  }

  const handleRestart = () => {
    reset()
    router.push('/')
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const total = stats ? Object.values(stats).reduce((a, b) => a + b, 0) : 0
  const myCount = stats?.[code] ?? 0
  const myPercent = total > 0 ? Math.round((myCount / total) * 1000) / 10 : 0

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center px-6 py-10">
      <ResultCard ref={cardRef} code={code} />

      {!result && (
        <p className="mt-4 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
          최근 테스트 결과예요. 다시 테스트하면 최신 결과로 갱신돼요.
        </p>
      )}

      <TypeDetailTabs type={type} />

      {stats && total > 0 && (
        <p className="mt-4 text-center text-sm text-gray-500">
          너와 같은 <span className="font-semibold text-violet-600">{code}</span> 유형은 전체의{' '}
          <span className="font-semibold text-violet-600">{myPercent}%</span>예요
        </p>
      )}

      <div className="mt-6 grid w-full grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleSaveImage}
          className="rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white active:scale-95"
        >
          이미지로 저장
        </button>
        <button
          type="button"
          onClick={() => setShareOpen(true)}
          className="rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white active:scale-95"
        >
          공유하기
        </button>
      </div>
      {saveError && <p className="mt-2 text-xs text-red-500">이미지 저장에 실패했어요. 화면을 캡처해주세요.</p>}

      <button
        type="button"
        onClick={handleRestart}
        className="mt-4 text-sm text-gray-400 underline underline-offset-2"
      >
        다시 테스트하기
      </button>

      <a href="/stats" className="mt-6 text-sm font-medium text-violet-600 underline underline-offset-2">
        전체 유형 분포 보기
      </a>

      <ShareSheet
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        shareUrl={shareUrl}
        shareText={`나의 MBTI는 ${code} ${type.nickname}!`}
      />
    </main>
  )
}
