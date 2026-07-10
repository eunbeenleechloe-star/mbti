'use client'

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export interface ChartDatum {
  code: string
  nickname: string
  count: number
  percent: number
}

const COLORS = ['#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD']

interface TooltipPayloadItem {
  payload: ChartDatum
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  if (!active || !payload?.length) return null
  const item = payload[0].payload
  return (
    <div className="rounded-lg border border-gray-100 bg-white px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-gray-900">
        {item.code} · {item.nickname}
      </p>
      <p className="text-gray-500">
        {item.count.toLocaleString()}명 ({item.percent}%)
      </p>
    </div>
  )
}

export default function StatsChart({ data }: { data: ChartDatum[] }) {
  return (
    <div className="h-[640px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 0 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="code" width={52} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(124,58,237,0.06)' }} />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={16}>
            {data.map((entry, index) => (
              <Cell key={entry.code} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
