import fs from 'node:fs/promises'
import path from 'node:path'
import Link from 'next/link'
import StartTestButton from '@/components/StartTestButton'

export const dynamic = 'force-dynamic'

async function readTotalCount(): Promise<number> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'stats.json')
    const raw = await fs.readFile(filePath, 'utf-8')
    const stats = JSON.parse(raw) as Record<string, number>
    return Object.values(stats).reduce((sum, n) => sum + n, 0)
  } catch {
    return 0
  }
}

export default async function LandingPage() {
  const total = await readTotalCount()

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-12 text-center">
      <span className="mb-3 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
        ⏱ 약 2분 소요 · 12문항
      </span>
      <h1 className="mb-3 text-3xl font-extrabold leading-tight text-gray-900">
        나의 진짜 성격,
        <br />
        12개 질문으로 확인하기
      </h1>
      <p className="mb-10 leading-relaxed text-gray-500">
        회원가입 없이 바로 시작하는
        <br />
        초간단 MBTI 성격 유형 테스트
      </p>

      <StartTestButton />

      <div className="mt-10 text-sm text-gray-400">
        지금까지 <span className="font-semibold text-violet-600">{total.toLocaleString()}명</span>이 테스트했어요
      </div>
      <Link href="/stats" className="mt-2 text-sm font-medium text-violet-600 underline underline-offset-2">
        실시간 유형 분포 보기
      </Link>
    </main>
  )
}
