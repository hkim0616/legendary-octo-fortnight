export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Topic = 'budget' | 'savings' | 'investment' | 'credit' | 'insurance' | 'tax' | 'retirement';

export interface Term {
  id: number;
  cardId: number;
  term: string;
  definition: string;
  example: string;
  difficulty: Difficulty;
  topic: Topic;
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: '초급',
  intermediate: '중급',
  advanced: '고급',
};

export const TOPIC_LABELS: Record<Topic, string> = {
  budget: '예산',
  savings: '저축',
  investment: '투자',
  credit: '신용',
  insurance: '보험',
  tax: '세금',
  retirement: '은퇴',
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  beginner: '#4CAF50',
  intermediate: '#FF9800',
  advanced: '#F44336',
};

export const TOPIC_COLORS: Record<Topic, string> = {
  budget: '#E8F5E9',
  savings: '#E3F2FD',
  investment: '#E0F7FA',
  credit: '#F3E5F5',
  insurance: '#E8EAF6',
  tax: '#F1F8E9',
  retirement: '#FFF8E1',
};

const terms: Term[] = [
  // Card 1 - 예산 세우기
  {
    id: 1,
    cardId: 1,
    term: '50/30/20 규칙',
    definition: '소득을 필수 지출(50%), 개인 소비(30%), 저축 및 투자(20%)로 나누는 예산 관리 방법입니다.',
    example: '월급 300만원이라면 필수 지출 150만원, 소비 90만원, 저축 60만원',
    difficulty: 'beginner',
    topic: 'budget',
  },
  {
    id: 2,
    cardId: 1,
    term: '가계부',
    definition: '가정의 수입과 지출을 기록하여 관리하는 장부입니다.',
    example: '매일 식비, 교통비 등 지출 내역을 앱에 기록하기',
    difficulty: 'beginner',
    topic: 'budget',
  },

  // Card 2 - 비상금 마련
  {
    id: 3,
    cardId: 2,
    term: '비상자금',
    definition: '예상치 못한 상황(실직, 질병 등)에 대비해 별도로 마련해두는 자금으로, 3~6개월치 생활비가 권장됩니다.',
    example: '월 생활비가 200만원이면 비상금 600~1200만원 준비',
    difficulty: 'beginner',
    topic: 'savings',
  },
  {
    id: 4,
    cardId: 2,
    term: '유동성',
    definition: '자산을 빠르게 현금으로 전환할 수 있는 정도를 말합니다. 비상금은 높은 유동성이 필요합니다.',
    example: '보통예금은 유동성이 높고, 부동산은 유동성이 낮음',
    difficulty: 'intermediate',
    topic: 'savings',
  },

  // Card 3 - 복리의 마법
  {
    id: 5,
    cardId: 3,
    term: '복리',
    definition: '원금뿐 아니라 이자에도 이자가 붙는 계산 방식으로, 시간이 지날수록 자산 증가 속도가 빨라집니다.',
    example: '100만원을 연 5% 복리로 20년 투자하면 약 265만원',
    difficulty: 'beginner',
    topic: 'investment',
  },
  {
    id: 6,
    cardId: 3,
    term: '72의 법칙',
    definition: '투자 원금이 두 배가 되는 데 걸리는 기간을 대략 계산하는 방법입니다. 72 ÷ 수익률(%) = 기간(년)',
    example: '연 6% 수익률이면 72÷6 = 약 12년 후 원금 2배',
    difficulty: 'intermediate',
    topic: 'investment',
  },

  // Card 4 - 신용점수 관리
  {
    id: 7,
    cardId: 4,
    term: '신용점수',
    definition: '개인의 신용도를 숫자로 나타낸 점수로, 대출 심사와 금리 결정의 핵심 기준입니다.',
    example: '신용점수가 높으면 낮은 금리로 대출 가능',
    difficulty: 'beginner',
    topic: 'credit',
  },
  {
    id: 8,
    cardId: 4,
    term: '연체',
    definition: '약정된 납부 기한 내에 대출 원리금이나 카드 대금을 갚지 못하는 것을 말합니다.',
    example: '카드 대금을 결제일까지 미납하면 연체 기록 발생',
    difficulty: 'beginner',
    topic: 'credit',
  },

  // Card 5 - 투자의 기초
  {
    id: 9,
    cardId: 5,
    term: '분산 투자',
    definition: '여러 종류의 자산에 나누어 투자하여 리스크를 줄이는 전략입니다.',
    example: '주식 50%, 채권 30%, 예금 20%로 자산 배분',
    difficulty: 'intermediate',
    topic: 'investment',
  },
  {
    id: 10,
    cardId: 5,
    term: 'ETF',
    definition: '주식처럼 거래소에서 사고팔 수 있는 인덱스 펀드로, 낮은 비용으로 분산 투자가 가능합니다.',
    example: 'KOSPI200 ETF를 사면 상위 200개 종목에 한 번에 투자',
    difficulty: 'advanced',
    topic: 'investment',
  },

  // Card 6 - 소비 습관 점검
  {
    id: 11,
    cardId: 6,
    term: '라떼 팩터',
    definition: '매일 반복되는 소액 지출이 장기적으로 큰 금액이 되는 현상을 말합니다.',
    example: '매일 5,000원 커피 = 월 15만원 = 연 180만원',
    difficulty: 'beginner',
    topic: 'budget',
  },
  {
    id: 12,
    cardId: 6,
    term: '기회비용',
    definition: '하나를 선택함으로써 포기하게 되는 다른 선택의 가치를 말합니다.',
    example: '커피 대신 저축했다면 1년 후 180만원의 자산 형성',
    difficulty: 'intermediate',
    topic: 'budget',
  },

  // Card 7 - 보험의 중요성
  {
    id: 13,
    cardId: 7,
    term: '보험료',
    definition: '보험 계약에 따라 보험 회사에 정기적으로 납부하는 금액입니다.',
    example: '월 5만원씩 건강보험료 납부',
    difficulty: 'beginner',
    topic: 'insurance',
  },
  {
    id: 14,
    cardId: 7,
    term: '면책기간',
    definition: '보험 가입 후 보장이 시작되지 않는 일정 기간을 말합니다.',
    example: '암보험 가입 후 90일간은 암 진단 시 보장 불가',
    difficulty: 'advanced',
    topic: 'insurance',
  },

  // Card 8 - 세금 이해하기
  {
    id: 15,
    cardId: 8,
    term: '소득세',
    definition: '개인이 벌어들인 소득에 대해 부과되는 세금으로, 소득이 높을수록 세율이 높아지는 누진세 구조입니다.',
    example: '연봉 5,000만원 직장인의 근로소득세',
    difficulty: 'beginner',
    topic: 'tax',
  },
  {
    id: 16,
    cardId: 8,
    term: '연말정산',
    definition: '한 해 동안 납부한 근로소득세를 정산하여 과납 시 환급, 부족 시 추가 납부하는 절차입니다.',
    example: '의료비, 교육비 등 공제 항목을 신고하여 세금 환급',
    difficulty: 'intermediate',
    topic: 'tax',
  },

  // Card 9 - 은퇴 준비
  {
    id: 17,
    cardId: 9,
    term: '3층 연금',
    definition: '국민연금(1층), 퇴직연금(2층), 개인연금(3층)으로 구성된 노후 소득 보장 체계입니다.',
    example: '국민연금 + 회사 퇴직연금 + 개인 IRP 계좌',
    difficulty: 'intermediate',
    topic: 'retirement',
  },
  {
    id: 18,
    cardId: 9,
    term: 'IRP',
    definition: '개인형 퇴직연금으로, 퇴직금을 이체하거나 추가 납입하여 세액공제 혜택을 받을 수 있는 계좌입니다.',
    example: '연 최대 900만원 납입 시 세액공제 혜택',
    difficulty: 'advanced',
    topic: 'retirement',
  },

  // Card 10 - 금융 목표 설정
  {
    id: 19,
    cardId: 10,
    term: 'SMART 목표',
    definition: 'Specific(구체적), Measurable(측정 가능), Achievable(달성 가능), Relevant(관련성), Time-bound(기한) 기준으로 설정하는 목표 방법론입니다.',
    example: '"1년 안에 비상금 500만원 모으기"처럼 구체적으로 설정',
    difficulty: 'intermediate',
    topic: 'budget',
  },
  {
    id: 20,
    cardId: 10,
    term: '자산배분',
    definition: '투자 목표와 위험 허용도에 따라 주식, 채권, 현금 등에 자산을 나누는 전략입니다.',
    example: '20대는 주식 70% + 채권 30%, 50대는 주식 40% + 채권 60%',
    difficulty: 'advanced',
    topic: 'investment',
  },
];

export default terms;
