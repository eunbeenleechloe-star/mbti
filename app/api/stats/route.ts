import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const STATS_PATH = path.join(process.cwd(), 'data', 'stats.json')

export async function GET() {
  const raw = await fs.readFile(STATS_PATH, 'utf-8')
  const stats = JSON.parse(raw) as Record<string, number>
  return NextResponse.json({ stats })
}
