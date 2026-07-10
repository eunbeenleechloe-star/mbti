import type { AxisKey, MbtiResult, Polarity } from '@/lib/types'

interface AxisDefinition {
  key: AxisKey
  left: Polarity
  right: Polarity
}

const AXES: AxisDefinition[] = [
  { key: 'EI', left: 'E', right: 'I' },
  { key: 'SN', left: 'S', right: 'N' },
  { key: 'TF', left: 'T', right: 'F' },
  { key: 'JP', left: 'J', right: 'P' },
]

// 축별 문항 수가 짝수로 바뀌어 동점이 발생하는 예외 상황을 대비한 기본 극성(폴백)
const TIE_BREAK_POLARITY: Record<AxisKey, Polarity> = {
  EI: 'I',
  SN: 'N',
  TF: 'F',
  JP: 'P',
}

export function calculateMbtiResult(answers: { axis: AxisKey; polarity: Polarity }[]): MbtiResult {
  const tally: Record<AxisKey, Record<string, number>> = {
    EI: { E: 0, I: 0 },
    SN: { S: 0, N: 0 },
    TF: { T: 0, F: 0 },
    JP: { J: 0, P: 0 },
  }

  for (const answer of answers) {
    tally[answer.axis][answer.polarity] += 1
  }

  let code = ''
  const axisResults = {} as MbtiResult['axisResults']

  for (const axis of AXES) {
    const leftCount = tally[axis.key][axis.left]
    const rightCount = tally[axis.key][axis.right]

    let chosen: Polarity
    if (leftCount > rightCount) chosen = axis.left
    else if (rightCount > leftCount) chosen = axis.right
    else chosen = TIE_BREAK_POLARITY[axis.key]

    code += chosen
    axisResults[axis.key] = { left: leftCount, right: rightCount, result: chosen }
  }

  return { code, axisResults }
}
