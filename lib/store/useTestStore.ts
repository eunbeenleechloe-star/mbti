'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { QUESTIONS } from '@/lib/data/questions'
import { calculateMbtiResult } from '@/lib/scoring'
import type { MbtiResult, Polarity } from '@/lib/types'

interface TestState {
  answers: Record<number, Polarity>
  currentIndex: number
  result: MbtiResult | null
  lastResultCode: string | null
  answerCurrent: (polarity: Polarity) => MbtiResult | null
  reset: () => void
}

export const useTestStore = create<TestState>()(
  persist(
    (set, get) => ({
      answers: {},
      currentIndex: 0,
      result: null,
      lastResultCode: null,

      answerCurrent: (polarity) => {
        const { currentIndex, answers } = get()
        const question = QUESTIONS[currentIndex]
        if (!question) return null

        const nextAnswers = { ...answers, [question.id]: polarity }
        const isLastQuestion = currentIndex + 1 >= QUESTIONS.length

        if (isLastQuestion) {
          const result = calculateMbtiResult(
            QUESTIONS.map((q) => ({ axis: q.axis, polarity: nextAnswers[q.id] }))
          )
          set({
            answers: nextAnswers,
            currentIndex: currentIndex + 1,
            result,
            lastResultCode: result.code,
          })
          return result
        }

        set({ answers: nextAnswers, currentIndex: currentIndex + 1 })
        return null
      },

      reset: () => set({ answers: {}, currentIndex: 0, result: null }),
    }),
    {
      name: 'mbti-test-storage',
      partialize: (state) => ({ lastResultCode: state.lastResultCode }),
    }
  )
)
