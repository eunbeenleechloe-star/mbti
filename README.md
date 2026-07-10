# 타입파인드 (TypeFind)

12개의 짧은 질문으로 만나는 나의 MBTI. 회원가입 없이 2~3분 안에 결과를 확인하고, SNS에 공유하기 좋은 결과 카드를 받아볼 수 있는 웹 서비스입니다.

## 주요 기능

- **12문항 간편 테스트**: 기존 서비스 대비 짧은 문항 수로 빠르게 완주
- **결과 카드**: 공유 최적화된 이미지 카드 자동 생성 (`html-to-image`)
- **실시간 유형 분포 통계**: 내 유형이 얼마나 흔한지/희귀한지 확인 (`recharts`)
- **회원가입 불필요**: 즉시 시작, 즉시 결과 확인

## 기술 스택

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19, TypeScript
- Tailwind CSS 4
- Zustand (상태 관리)
- Framer Motion (애니메이션)
- Recharts (통계 시각화)

## 시작하기

의존성 설치 후 개발 서버를 실행합니다.

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

## 프로젝트 구조

```
app/
  page.tsx          # 랜딩 페이지
  test/page.tsx      # 테스트 진행 페이지
  result/page.tsx     # 결과 페이지
  stats/page.tsx      # 유형 분포 통계 페이지
  api/results/        # 결과 저장 API
  api/stats/          # 통계 조회 API
components/           # UI 컴포넌트
lib/                  # 질문 데이터, 채점 로직, 상태 스토어
```

자세한 기획 내용은 [PRD.md](./PRD.md)를 참고하세요.
