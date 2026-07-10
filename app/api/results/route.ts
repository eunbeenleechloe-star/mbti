import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'
import { MBTI_TYPES } from '@/lib/data/mbtiTypes'

const STATS_PATH = path.join(process.cwd(), 'data', 'stats.json')

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const code = body?.code as string | undefined

  if (!code || !(code in MBTI_TYPES)) {
    return NextResponse.json({ error: 'invalid code' }, { status: 400 })
  }

  const raw = await fs.readFile(STATS_PATH, 'utf-8')
  const stats = JSON.parse(raw) as Record<string, number>
  stats[code] = (stats[code] ?? 0) + 1
  await fs.writeFile(STATS_PATH, JSON.stringify(stats, null, 2))

  return NextResponse.json({ stats })
}
