'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { QUESTIONS } from '@/lib/data/questions'
import { useTestStore } from '@/lib/store/useTestStore'
import type { Polarity } from '@/lib/types'

export default function TestPage() {
  const router = useRouter()
  const currentIndex = useTestStore((s) => s.currentIndex)
  const answerCurrent = useTestStore((s) => s.answerCurrent)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // 완료된 테스트 상태로 직접 진입한 경우를 대비한 안전장치
  useEffect(() => {
    if (currentIndex >= QUESTIONS.length) {
      useTestStore.getState().reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 테스트 도중 새로고침/이탈 시 확인 다이얼로그 노출
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const question = QUESTIONS[currentIndex]

  const handleAnswer = (polarity: Polarity) => {
    if (isTransitioning || !question) return
    setIsTransitioning(true)

    const result = answerCurrent(polarity)

    setTimeout(() => {
      if (result) {
        router.push('/result')
      } else {
        setIsTransitioning(false)
      }
    }, 350)
  }

  if (!question) return null

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-10">
      <div className="mb-10">
        <ProgressBar current={Math.min(currentIndex + 1, QUESTIONS.length)} total={QUESTIONS.length} />
      </div>
      <AnimatePresence mode="wait">
        <QuestionCard key={question.id} question={question} onAnswer={handleAnswer} />
      </AnimatePresence>
    </main>
  )
}
