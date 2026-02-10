export interface Card {
  id: number;
  title: string;
  description: string;
  emoji: string;
  backgroundColor: string;
}

const cards: Card[] = [
  {
    id: 1,
    title: '예산 세우기',
    description: '매달 수입과 지출을 계획하는 것이 재정 관리의 첫걸음입니다. 50/30/20 규칙을 활용해보세요.',
    emoji: '📊',
    backgroundColor: '#E8F5E9',
  },
  {
    id: 2,
    title: '비상금 마련',
    description: '예상치 못한 지출에 대비해 최소 3~6개월치 생활비를 비상금으로 모아두세요.',
    emoji: '🏦',
    backgroundColor: '#E3F2FD',
  },
  {
    id: 3,
    title: '복리의 마법',
    description: '복리는 이자에 이자가 붙는 것입니다. 일찍 시작할수록 복리 효과가 커집니다.',
    emoji: '✨',
    backgroundColor: '#FFF3E0',
  },
  {
    id: 4,
    title: '신용점수 관리',
    description: '신용점수는 대출 금리와 한도에 영향을 줍니다. 연체 없이 꾸준히 관리하세요.',
    emoji: '💳',
    backgroundColor: '#F3E5F5',
  },
  {
    id: 5,
    title: '투자의 기초',
    description: '주식, 채권, 펀드 등 다양한 투자 상품을 이해하고 분산 투자하는 것이 중요합니다.',
    emoji: '📈',
    backgroundColor: '#E0F7FA',
  },
  {
    id: 6,
    title: '소비 습관 점검',
    description: '라떼 팩터를 아시나요? 작은 지출이 모이면 큰 금액이 됩니다. 소비 패턴을 점검해보세요.',
    emoji: '☕',
    backgroundColor: '#FBE9E7',
  },
  {
    id: 7,
    title: '보험의 중요성',
    description: '건강보험, 자동차보험 등 필수 보험으로 예상치 못한 위험에 대비하세요.',
    emoji: '🛡️',
    backgroundColor: '#E8EAF6',
  },
  {
    id: 8,
    title: '세금 이해하기',
    description: '소득세, 부가가치세 등 기본적인 세금 구조를 이해하면 절세에 도움이 됩니다.',
    emoji: '🧾',
    backgroundColor: '#F1F8E9',
  },
  {
    id: 9,
    title: '은퇴 준비',
    description: '국민연금, 퇴직연금, 개인연금 3층 연금으로 노후를 준비하세요.',
    emoji: '🏖️',
    backgroundColor: '#FFF8E1',
  },
  {
    id: 10,
    title: '금융 목표 설정',
    description: '단기, 중기, 장기 금융 목표를 세우고 실천해보세요. 이제 퀴즈로 실력을 확인해볼까요?',
    emoji: '🎯',
    backgroundColor: '#FCE4EC',
  },
];

export default cards;
