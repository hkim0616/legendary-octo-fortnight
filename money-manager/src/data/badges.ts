export interface BadgeDefinition {
  cardId: number;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

const badgeDefinitions: BadgeDefinition[] = [
  {
    cardId: 1,
    name: '예산 전문가',
    emoji: '📊',
    description: '예산 세우기 주제를 완료했습니다',
    color: '#E8F5E9',
  },
  {
    cardId: 2,
    name: '비상금 수호자',
    emoji: '🏦',
    description: '비상금 마련 주제를 완료했습니다',
    color: '#E3F2FD',
  },
  {
    cardId: 3,
    name: '복리 마법사',
    emoji: '✨',
    description: '복리의 마법 주제를 완료했습니다',
    color: '#FFF3E0',
  },
  {
    cardId: 4,
    name: '신용 관리사',
    emoji: '💳',
    description: '신용점수 관리 주제를 완료했습니다',
    color: '#F3E5F5',
  },
  {
    cardId: 5,
    name: '투자 입문자',
    emoji: '📈',
    description: '투자의 기초 주제를 완료했습니다',
    color: '#E0F7FA',
  },
  {
    cardId: 6,
    name: '소비 분석가',
    emoji: '☕',
    description: '소비 습관 점검 주제를 완료했습니다',
    color: '#FBE9E7',
  },
  {
    cardId: 7,
    name: '보험 설계사',
    emoji: '🛡️',
    description: '보험의 중요성 주제를 완료했습니다',
    color: '#E8EAF6',
  },
  {
    cardId: 8,
    name: '세금 박사',
    emoji: '🧾',
    description: '세금 이해하기 주제를 완료했습니다',
    color: '#F1F8E9',
  },
  {
    cardId: 9,
    name: '은퇴 설계자',
    emoji: '🏖️',
    description: '은퇴 준비 주제를 완료했습니다',
    color: '#FFF8E1',
  },
  {
    cardId: 10,
    name: '목표 달성자',
    emoji: '🎯',
    description: '금융 목표 설정 주제를 완료했습니다',
    color: '#FCE4EC',
  },
];

export default badgeDefinitions;
