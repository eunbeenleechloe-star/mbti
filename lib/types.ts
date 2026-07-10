export type Polarity = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'
export type AxisKey = 'EI' | 'SN' | 'TF' | 'JP'

export interface Question {
  id: number
  axis: AxisKey
  order: number
  text: string
  optionA: { text: string; polarity: Polarity }
  optionB: { text: string; polarity: Polarity }
}

export interface MbtiType {
  nickname: string
  emoji: string
  description: string
  strengths: string[]
  weaknesses: string[]
  jobs: string[]
  themeColorFrom: string
  themeColorTo: string
}

export interface AxisResult {
  left: number
  right: number
  result: Polarity
}

export interface MbtiResult {
  code: string
  axisResults: Record<AxisKey, AxisResult>
}
