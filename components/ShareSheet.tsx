'use client'

import { useState } from 'react'

interface ShareSheetProps {
  open: boolean
  onClose: () => void
  shareUrl: string
  shareText: string
}

export default function ShareSheet({ open, onClose, shareUrl, shareText }: ShareSheetProps) {
  const [copied, setCopied] = useState(false)

  if (!open) return null

  const kakaoReady =
    typeof window !== 'undefined' && Boolean((window as unknown as { Kakao?: { isInitialized?: () => boolean } }).Kakao?.isInitialized?.())
  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title: shareText, url: shareUrl })
    } catch {
      // 사용자가 공유를 취소한 경우는 별도 처리하지 않음
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div className="w-full max-w-md rounded-t-3xl bg-white p-6 pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-300" />
        <h3 className="mb-5 text-center text-base font-bold text-gray-900">결과 공유하기</h3>
        <div className="grid grid-cols-3 gap-4 text-center text-xs">
          <button
            type="button"
            disabled={!kakaoReady}
            title={kakaoReady ? '카카오톡으로 공유' : '카카오톡 공유는 준비 중이에요'}
            className="flex flex-col items-center gap-2 disabled:opacity-40"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-300 text-xl">💬</span>
            카카오톡
          </button>

          {canNativeShare && (
            <button type="button" onClick={handleNativeShare} className="flex flex-col items-center gap-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">📤</span>
              공유하기
            </button>
          )}

          <button type="button" onClick={handleCopy} className="flex flex-col items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">🔗</span>
            {copied ? '복사됨!' : 'URL 복사'}
          </button>
        </div>
      </div>
    </div>
  )
}
