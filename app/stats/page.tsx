import fs from 'node:fs/promises'
import path from 'node:path'
import Link from 'next/link'
import StatsChart from '@/components/StatsChart'
import { MBTI_TYPES } from '@/lib/data/mbtiTypes'

export const dynamic = 'force-dynamic'

async function getStats(): Promise<Record<string, number>> {
  const filePath = path.join(process.cwd(), 'data', 'stats.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw) as Record<string, number>
}

export default async function StatsPage() {
  const stats = await getStats()
  const total = Object.values(stats).reduce((a, b) => a + b, 0)

  const chartData = Object.entries(stats)
    .map(([code, count]) => ({
      code,
      nickname: MBTI_TYPES[code]?.nickname ?? '',
      count,
      percent: total > 0 ? Math.round((count / total) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.count - a.count)

  return (
    <main className="mx-auto min-h-screen max-w-md px-6 py-10">
      <Link href="/" className="text-sm text-gray-400 underline underline-offset-2">
        ← 홈으로
      </Link>
      <h1 className="mb-1 mt-4 text-2xl font-bold text-gray-900">실시간 유형 분포</h1>
      <p className="mb-6 text-sm text-gray-500">
        지금까지 <span className="font-semibold text-violet-600">{total.toLocaleString()}명</span>이 참여했어요
      </p>

      {total > 0 ? (
        <StatsChart data={chartData} />
      ) : (
        <p className="rounded-xl bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
          아직 충분한 데이터가 없어요. 첫 번째 참여자가 되어보세요!
        </p>
      )}
    </main>
  )
}
