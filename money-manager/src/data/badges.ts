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

  // ── Part 2: 사회 초년생을 위한 상품지식 및 재테크 기초 ──

  {
    cardId: 11,
    name: '연금 비교 분석가',
    emoji: '🧐',
    description: '연금저축보험 vs 펀드 주제를 완료했습니다',
    color: '#EDE7F6',
  },
  {
    cardId: 12,
    name: '파킹 마스터',
    emoji: '🅿️',
    description: '파킹 통장 주제를 완료했습니다',
    color: '#E0F2F1',
  },
  {
    cardId: 13,
    name: '청약 준비생',
    emoji: '🏠',
    description: '주택청약 주제를 완료했습니다',
    color: '#FFF9C4',
  },
  {
    cardId: 14,
    name: '전세 전문가',
    emoji: '🏃',
    description: '전세자금대출 주제를 완료했습니다',
    color: '#F3E5F5',
  },
  {
    cardId: 15,
    name: '공모주 헌터',
    emoji: '☕',
    description: '공모주 청약 주제를 완료했습니다',
    color: '#E8F5E9',
  },
  {
    cardId: 16,
    name: '대출 지표 해석가',
    emoji: '🏦',
    description: 'LTV / DTI / DSR 주제를 완료했습니다',
    color: '#E3F2FD',
  },
  {
    cardId: 17,
    name: '절세 전략가',
    emoji: '😭',
    description: '손익통산 주제를 완료했습니다',
    color: '#FFF3E0',
  },
  {
    cardId: 18,
    name: '복리 극대화 고수',
    emoji: '💰',
    description: '과세이연 주제를 완료했습니다',
    color: '#FCE4EC',
  },
  {
    cardId: 19,
    name: '신용 마스터',
    emoji: '💯',
    description: '신용점수 관리법 주제를 완료했습니다',
    color: '#F1F8E9',
  },
  {
    cardId: 20,
    name: '달러 투자자',
    emoji: '💵',
    description: '달러 투자 주제를 완료했습니다',
    color: '#E0F7FA',
  },

  // ── Part 3: 상품지식 및 ETF 실전 ──

  {
    cardId: 21,
    name: 'S&P 500 마스터',
    emoji: '🇺🇸',
    description: 'S&P 500 주제를 완료했습니다',
    color: '#E3F2FD',
  },
  {
    cardId: 22,
    name: '나스닥 분석가',
    emoji: '🚀',
    description: '나스닥 100 주제를 완료했습니다',
    color: '#E8F5E9',
  },
  {
    cardId: 23,
    name: '수수료 감시관',
    emoji: '💸',
    description: '운용보수 주제를 완료했습니다',
    color: '#FFF3E0',
  },
  {
    cardId: 24,
    name: '적립 투자가',
    emoji: '⏰',
    description: '적립식 투자 주제를 완료했습니다',
    color: '#F3E5F5',
  },
  {
    cardId: 25,
    name: '연금 이동 전문가',
    emoji: '📦',
    description: '연금 이전 제도 주제를 완료했습니다',
    color: '#FFF8E1',
  },
  {
    cardId: 26,
    name: '금 투자자',
    emoji: '🥇',
    description: '금 투자 주제를 완료했습니다',
    color: '#FFF9C4',
  },
  {
    cardId: 27,
    name: '건물주 입문자',
    emoji: '🏢',
    description: '리츠 (REITs) 주제를 완료했습니다',
    color: '#E0F7FA',
  },
  {
    cardId: 28,
    name: '자산 탐정',
    emoji: '🔍',
    description: '어카운트인포 주제를 완료했습니다',
    color: '#EDE7F6',
  },
  {
    cardId: 29,
    name: '예금 안전 지킴이',
    emoji: '🛡️',
    description: '예금자 보호 제도 주제를 완료했습니다',
    color: '#E8EAF6',
  },
  {
    cardId: 30,
    name: '종합과세 이해자',
    emoji: '😮',
    description: '금융소득종합과세 주제를 완료했습니다',
    color: '#F1F8E9',
  },

  // ── Part 4: 보험 기초 및 연말정산 시리즈 ──

  {
    cardId: 31,
    name: '실비 전문가',
    emoji: '🏥',
    description: '실손의료보험 주제를 완료했습니다',
    color: '#FCE4EC',
  },
  {
    cardId: 32,
    name: '공제 구분 마스터',
    emoji: '🧾',
    description: '소득공제 vs 세액공제 주제를 완료했습니다',
    color: '#E3F2FD',
  },
  {
    cardId: 33,
    name: '카드 전략가',
    emoji: '💳',
    description: '신용카드 25% 룰 주제를 완료했습니다',
    color: '#FBE9E7',
  },
  {
    cardId: 34,
    name: '현금영수증 달인',
    emoji: '🧾',
    description: '현금영수증 주제를 완료했습니다',
    color: '#E8F5E9',
  },
  {
    cardId: 35,
    name: '해외투자 세금 전문가',
    emoji: '🌐',
    description: '해외주식 양도소득세 주제를 완료했습니다',
    color: '#E0F2F1',
  },
  {
    cardId: 36,
    name: '환전 달인',
    emoji: '💱',
    description: '환전 스프레드 주제를 완료했습니다',
    color: '#FFF3E0',
  },
  {
    cardId: 37,
    name: '배당 세금 이해자',
    emoji: '📊',
    description: '배당소득세 주제를 완료했습니다',
    color: '#F3E5F5',
  },
  {
    cardId: 38,
    name: '반도체 투자자',
    emoji: '💻',
    description: '반도체 ETF 주제를 완료했습니다',
    color: '#E0F7FA',
  },
  {
    cardId: 39,
    name: '위험 관리 전문가',
    emoji: '⚠️',
    description: '레버리지 / 인버스 주제를 완료했습니다',
    color: '#FFF9C4',
  },
  {
    cardId: 40,
    name: '대출 경계자',
    emoji: '📉',
    description: '마이너스 통장 주제를 완료했습니다',
    color: '#FCE4EC',
  },
];

export default badgeDefinitions;
