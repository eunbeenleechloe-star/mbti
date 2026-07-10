'use client'

import { useRouter } from 'next/navigation'
import { useTestStore } from '@/lib/store/useTestStore'

export default function StartTestButton() {
  const router = useRouter()
  const reset = useTestStore((s) => s.reset)

  const handleStart = () => {
    reset()
    router.push('/test')
  }

  return (
    <button
      type="button"
      onClick={handleStart}
      className="w-full max-w-xs rounded-2xl bg-violet-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-violet-200 transition-transform active:scale-95"
    >
      테스트 시작하기
    </button>
  )
}
