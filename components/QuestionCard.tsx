'use client'

import { motion } from 'framer-motion'
import type { Polarity, Question } from '@/lib/types'

interface QuestionCardProps {
  question: Question
  onAnswer: (polarity: Polarity) => void
}

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full"
    >
      <h2 className="mb-8 text-center text-lg font-bold leading-relaxed text-gray-900 sm:text-xl">
        {question.text}
      </h2>
      <div className="flex flex-col gap-3">
        {[question.optionA, question.optionB].map((option) => (
          <button
            key={option.polarity}
            type="button"
            aria-label={option.text}
            onClick={() => onAnswer(option.polarity)}
            className="min-h-[48px] rounded-2xl border border-gray-200 bg-white px-5 py-4 text-left text-base text-gray-800 shadow-sm transition-all duration-150 hover:border-violet-400 hover:bg-violet-50 active:scale-[0.98]"
          >
            {option.text}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
