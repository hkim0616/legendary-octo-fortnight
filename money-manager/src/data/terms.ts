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

  // ── Part 2: 사회 초년생을 위한 상품지식 및 재테크 기초 ──

  // Card 11 - 연금저축보험 vs 펀드
  {
    id: 21,
    cardId: 11,
    term: '연금저축펀드',
    definition: '연금저축 계좌에서 직접 ETF나 펀드를 골라 투자할 수 있는 상품으로, 수익률은 높지만 원금 보장이 되지 않습니다.',
    example: 'S&P500 ETF를 연금저축펀드 계좌에서 매월 30만원씩 적립 매수',
    difficulty: 'intermediate',
    topic: 'retirement',
  },
  {
    id: 22,
    cardId: 11,
    term: '계좌이전 제도',
    definition: '연금저축보험에서 연금저축펀드로, 또는 그 반대로 계좌를 옮길 수 있는 제도입니다. 세액공제 혜택은 유지됩니다.',
    example: '수익률이 낮은 보험사 연금저축을 증권사 연금저축펀드로 이전',
    difficulty: 'intermediate',
    topic: 'retirement',
  },

  // Card 12 - 파킹 통장
  {
    id: 23,
    cardId: 12,
    term: '파킹 통장',
    definition: '하루만 맡겨도 이자가 붙는 수시입출금식 고금리 통장으로, 비상금이나 단기 자금 보관에 최적입니다.',
    example: '토스뱅크 통장에 500만원을 넣어두면 매일 이자 발생',
    difficulty: 'beginner',
    topic: 'savings',
  },
  {
    id: 24,
    cardId: 12,
    term: '예금자 보호',
    definition: '금융기관이 파산해도 1인당 최대 5,000만원까지 예금보험공사가 원금과 이자를 보장해주는 제도입니다.',
    example: '한 은행에 5,000만원 이상은 다른 은행으로 분산 예치',
    difficulty: 'beginner',
    topic: 'savings',
  },

  // Card 13 - 주택청약
  {
    id: 25,
    cardId: 13,
    term: '주택청약종합저축',
    definition: '새 아파트 분양 자격을 얻기 위한 필수 저축 상품으로, 가입 기간과 납입 횟수가 당첨 확률에 영향을 줍니다.',
    example: '매월 10만원씩 주택청약 통장에 자동이체 설정',
    difficulty: 'beginner',
    topic: 'savings',
  },
  {
    id: 26,
    cardId: 13,
    term: '청약담보대출',
    definition: '주택청약 통장 잔액을 담보로 받을 수 있는 대출로, 청약 가입 기간이 길수록 한도가 높아집니다.',
    example: '청약 통장에 1,000만원 있으면 해당 금액의 90%까지 대출 가능',
    difficulty: 'intermediate',
    topic: 'credit',
  },

  // Card 14 - 전세자금대출
  {
    id: 27,
    cardId: 14,
    term: '전세자금대출',
    definition: '전세 보증금의 일부를 은행에서 빌려주는 대출 상품으로, 월세보다 주거비를 절약할 수 있습니다.',
    example: '전세 2억 중 1억 6천만원을 연 3% 전세대출로 이용',
    difficulty: 'beginner',
    topic: 'credit',
  },
  {
    id: 28,
    cardId: 14,
    term: '확정일자',
    definition: '주민센터에서 임대차계약서에 받는 날짜 도장으로, 전세보증금을 법적으로 보호받기 위한 필수 절차입니다.',
    example: '이사 당일 전입신고 + 확정일자를 받아야 대항력 발생',
    difficulty: 'intermediate',
    topic: 'credit',
  },

  // Card 15 - 공모주 청약
  {
    id: 29,
    cardId: 15,
    term: '공모주 청약',
    definition: '기업이 처음 주식시장에 상장할 때 일반 투자자가 미리 주식을 신청하여 받는 투자 방법입니다.',
    example: '카카오뱅크 상장 시 증거금 50만원으로 공모주 청약 신청',
    difficulty: 'intermediate',
    topic: 'investment',
  },
  {
    id: 30,
    cardId: 15,
    term: '균등 배정',
    definition: '공모주 청약 시 최소 증거금만 넣어도 동일한 수량의 주식을 배정받는 방식입니다.',
    example: '증거금 10만원이든 1억이든 균등 배정분은 동일하게 1주 배정',
    difficulty: 'intermediate',
    topic: 'investment',
  },

  // Card 16 - LTV / DTI / DSR
  {
    id: 31,
    cardId: 16,
    term: 'LTV',
    definition: 'Loan To Value의 약자로, 담보 가치 대비 대출 비율을 의미합니다. 집값의 몇 %까지 대출이 가능한지를 나타냅니다.',
    example: 'LTV 70%이면 5억짜리 집을 담보로 최대 3.5억 대출 가능',
    difficulty: 'intermediate',
    topic: 'credit',
  },
  {
    id: 32,
    cardId: 16,
    term: 'DSR',
    definition: 'Debt Service Ratio의 약자로, 연소득 대비 모든 대출의 연간 원리금 상환액 비율입니다. 대출 한도의 핵심 기준입니다.',
    example: '연봉 5,000만원, DSR 40%이면 연간 원리금 상환 최대 2,000만원',
    difficulty: 'advanced',
    topic: 'credit',
  },

  // Card 17 - 손익통산
  {
    id: 33,
    cardId: 17,
    term: '손익통산',
    definition: '투자에서 발생한 이익과 손실을 합산하여 실제 순이익에 대해서만 세금을 부과하는 원리입니다.',
    example: 'A주식에서 500만원 이익, B주식에서 300만원 손실 → 200만원에만 과세',
    difficulty: 'intermediate',
    topic: 'tax',
  },
  {
    id: 34,
    cardId: 17,
    term: 'ISA',
    definition: '개인종합자산관리계좌로, 하나의 계좌에서 예금·펀드·주식 등을 운용하며 손익통산과 비과세 혜택을 받을 수 있습니다.',
    example: 'ISA 계좌에서 200만원까지 비과세, 초과분은 9.9% 분리과세',
    difficulty: 'advanced',
    topic: 'tax',
  },

  // Card 18 - 과세이연
  {
    id: 35,
    cardId: 18,
    term: '과세이연',
    definition: '연금 계좌에서 발생한 수익에 대한 세금 납부를 인출 시점까지 미루는 것으로, 그동안 세금 없이 복리 효과를 누릴 수 있습니다.',
    example: '연금저축에서 ETF 매매 차익이 나도 인출 전까지 세금 0원',
    difficulty: 'advanced',
    topic: 'tax',
  },
  {
    id: 36,
    cardId: 18,
    term: '세액공제',
    definition: '계산된 세금에서 일정 금액을 직접 빼주는 제도입니다. 소득공제와 달리 세금 자체를 줄여줍니다.',
    example: '연금저축 400만원 납입 시 최대 66만원 세액공제(16.5%)',
    difficulty: 'intermediate',
    topic: 'tax',
  },

  // Card 19 - 신용점수 관리법
  {
    id: 37,
    cardId: 19,
    term: '주거래 은행',
    definition: '급여 이체, 자동이체, 카드 결제 등을 집중하여 거래 실적을 쌓는 은행으로, 우대 금리 등 혜택을 받을 수 있습니다.',
    example: '급여 통장을 한 은행으로 모아 신용점수와 우대 혜택 확보',
    difficulty: 'beginner',
    topic: 'credit',
  },
  {
    id: 38,
    cardId: 19,
    term: '신용카드 이용률',
    definition: '신용카드 한도 대비 실제 사용 금액의 비율로, 30% 이하를 유지하는 것이 신용점수에 유리합니다.',
    example: '한도 500만원 카드는 월 150만원 이하로 사용 권장',
    difficulty: 'intermediate',
    topic: 'credit',
  },

  // Card 20 - 달러 투자
  {
    id: 39,
    cardId: 20,
    term: '달러 예금',
    definition: '원화를 달러로 환전하여 예금하는 상품으로, 환율 상승 시 환차익까지 기대할 수 있습니다.',
    example: '환율 1,200원일 때 달러 예금 후 1,400원이 되면 환차익 발생',
    difficulty: 'intermediate',
    topic: 'investment',
  },
  {
    id: 40,
    cardId: 20,
    term: '환헤지',
    definition: '해외 투자 시 환율 변동으로 인한 손실을 방지하기 위한 전략으로, 환헤지 상품은 환율 영향을 줄여줍니다.',
    example: '환헤지 ETF는 달러 가치가 떨어져도 손실 없이 순수 주가 수익만 반영',
    difficulty: 'advanced',
    topic: 'investment',
  },

  // ── Part 3: 상품지식 및 ETF 실전 ──

  // Card 21 - S&P 500
  {
    id: 41,
    cardId: 21,
    term: 'S&P 500',
    definition: '미국 주식시장에 상장된 시가총액 상위 500개 우량 기업으로 구성된 지수로, 미국 경제 전체를 대표합니다.',
    example: '애플, 마이크로소프트, 아마존 등 초일류 기업이 모두 포함',
    difficulty: 'intermediate',
    topic: 'investment',
  },
  {
    id: 42,
    cardId: 21,
    term: '인덱스 펀드',
    definition: '특정 지수(S&P 500 등)를 그대로 따라가도록 설계된 펀드로, 낮은 비용으로 시장 전체에 투자할 수 있습니다.',
    example: '워런 버핏이 추천한 S&P 500 인덱스 펀드에 매월 적립식 투자',
    difficulty: 'beginner',
    topic: 'investment',
  },

  // Card 22 - 나스닥 100
  {
    id: 43,
    cardId: 22,
    term: '나스닥 100',
    definition: '미국 나스닥 시장에 상장된 기업 중 금융주를 제외한 상위 100개 기업으로 구성된 기술주 중심 지수입니다.',
    example: '반도체, AI, 플랫폼 등 혁신 기술 기업들이 대거 포진',
    difficulty: 'intermediate',
    topic: 'investment',
  },
  {
    id: 44,
    cardId: 22,
    term: '변동성',
    definition: '자산 가격이 얼마나 크게 오르내리는지를 나타내는 지표로, 변동성이 높을수록 위험과 수익 가능성이 모두 큽니다.',
    example: '나스닥 100은 S&P 500보다 변동성이 크지만 장기 성장성도 높음',
    difficulty: 'intermediate',
    topic: 'investment',
  },

  // Card 23 - 운용보수
  {
    id: 45,
    cardId: 23,
    term: '운용보수',
    definition: '투자한 돈에서 자산운용사가 관리 비용으로 매일 조금씩 떼어가는 수수료입니다.',
    example: '운용보수 0.1%인 ETF와 0.5%인 ETF는 20년 후 수천만 원 차이',
    difficulty: 'intermediate',
    topic: 'investment',
  },
  {
    id: 46,
    cardId: 23,
    term: '총보수비율 (TER)',
    definition: 'Total Expense Ratio의 약자로, 운용보수 외 판매보수, 수탁보수 등을 모두 합산한 실제 투자 비용입니다.',
    example: 'ETF 비교 시 운용보수만 보지 말고 TER(총보수비율)을 반드시 확인',
    difficulty: 'advanced',
    topic: 'investment',
  },

  // Card 24 - 적립식 투자
  {
    id: 47,
    cardId: 24,
    term: '적립식 투자 (DCA)',
    definition: '주가와 상관없이 매달 정해진 날짜에 정해진 금액만큼 꾸준히 사는 투자 방식입니다.',
    example: '월급날 자동으로 S&P 500 ETF를 30만원씩 매수 설정',
    difficulty: 'beginner',
    topic: 'investment',
  },
  {
    id: 48,
    cardId: 24,
    term: '코스트 에버리징',
    definition: '적립식 투자로 비쌀 때 적게, 쌀 때 많이 사게 되어 평균 매수 단가가 낮아지는 효과입니다.',
    example: '1만원일 때 3주, 5천원일 때 6주를 사면 평균 단가는 약 6,667원',
    difficulty: 'intermediate',
    topic: 'investment',
  },

  // Card 25 - 연금 이전 제도
  {
    id: 49,
    cardId: 25,
    term: '연금 이전',
    definition: '기존 연금 계좌를 해지하지 않고 다른 금융기관이나 상품으로 옮기는 제도로, 세제 혜택이 유지됩니다.',
    example: '은행 연금저축보험 → 증권사 연금저축펀드로 이전하여 ETF 투자',
    difficulty: 'intermediate',
    topic: 'retirement',
  },
  {
    id: 50,
    cardId: 25,
    term: '기타소득세',
    definition: '연금 계좌를 중도 해지할 경우 그동안의 세제 혜택에 대해 부과되는 16.5%의 세금입니다.',
    example: '연금저축 해지 시 세액공제 받았던 금액에 16.5% 기타소득세 부과',
    difficulty: 'advanced',
    topic: 'tax',
  },

  // Card 26 - 금 투자
  {
    id: 51,
    cardId: 26,
    term: '금 ETF',
    definition: '금 현물 가격을 추종하는 ETF로, 골드바를 직접 사지 않고도 주식처럼 금에 투자할 수 있습니다.',
    example: 'KRX 금시장이나 금 ETF를 통해 1g 단위로 금 매매 가능',
    difficulty: 'intermediate',
    topic: 'investment',
  },
  {
    id: 52,
    cardId: 26,
    term: '안전 자산',
    definition: '경제 위기나 시장 불안 시에도 가치가 유지되거나 오히려 상승하는 자산으로, 금과 달러가 대표적입니다.',
    example: '포트폴리오에 금을 5~10% 섞어두면 주식 폭락 시 방어 가능',
    difficulty: 'beginner',
    topic: 'investment',
  },

  // Card 27 - 리츠
  {
    id: 53,
    cardId: 27,
    term: '리츠 (REITs)',
    definition: '다수의 투자자에게 돈을 모아 부동산에 투자하고, 임대료 수익을 배당으로 나눠주는 부동산 간접 투자 상품입니다.',
    example: '소액으로 대형 빌딩, 쇼핑몰, 데이터 센터의 주인이 될 수 있음',
    difficulty: 'intermediate',
    topic: 'investment',
  },
  {
    id: 54,
    cardId: 27,
    term: '배당 수익률',
    definition: '투자 금액 대비 받는 배당금의 비율로, 리츠는 보통 예금보다 높은 배당 수익률을 제공합니다.',
    example: '리츠 배당 수익률 5%이면 1,000만 원 투자 시 연 50만 원 배당',
    difficulty: 'intermediate',
    topic: 'investment',
  },

  // Card 28 - 어카운트인포
  {
    id: 55,
    cardId: 28,
    term: '어카운트인포',
    definition: '내가 가입한 모든 은행, 증권사, 보험 계좌를 한눈에 확인할 수 있는 계좌정보통합관리서비스입니다.',
    example: '앱에서 휴면 계좌 잔액 확인 후 주거래 계좌로 이체',
    difficulty: 'beginner',
    topic: 'savings',
  },
  {
    id: 56,
    cardId: 28,
    term: '휴면 계좌',
    definition: '장기간 거래가 없어 잠들어 있는 계좌로, 소액이라도 찾으면 쌈짓돈이 됩니다.',
    example: '어카운트인포로 잊고 있던 옛날 계좌의 잔액 5만 원 발견',
    difficulty: 'beginner',
    topic: 'savings',
  },

  // Card 29 - 예금자 보호 제도
  {
    id: 57,
    cardId: 29,
    term: '예금보험공사',
    definition: '금융회사가 파산했을 때 예금자의 돈을 대신 돌려주는 정부 기관으로, 최대 5,000만 원까지 보호합니다.',
    example: '은행, 저축은행, 보험사 등이 예금보험공사의 보호 대상',
    difficulty: 'intermediate',
    topic: 'savings',
  },
  {
    id: 58,
    cardId: 29,
    term: '예금자 보호 한도',
    definition: '금융기관별 1인당 원금과 이자를 합쳐 최대 5,000만 원까지 보장되는 한도입니다.',
    example: '고금리 저축은행은 5,000만 원씩 쪼개서 예치하는 것이 안전',
    difficulty: 'beginner',
    topic: 'savings',
  },

  // Card 30 - 금융소득종합과세
  {
    id: 59,
    cardId: 30,
    term: '금융소득종합과세',
    definition: '이자·배당 소득이 연간 2,000만 원을 초과하면 다른 소득과 합쳐서 더 높은 세율로 과세하는 제도입니다.',
    example: '이자+배당 합계 3,000만 원이면 초과분 1,000만 원을 급여와 합산 과세',
    difficulty: 'advanced',
    topic: 'tax',
  },
  {
    id: 60,
    cardId: 30,
    term: '분리과세',
    definition: '다른 소득과 합치지 않고 해당 소득에 대해서만 별도 세율로 과세하는 방식으로, ISA 계좌 등에서 활용됩니다.',
    example: 'ISA 계좌 초과 수익은 9.9% 분리과세로 종합과세 회피 가능',
    difficulty: 'advanced',
    topic: 'tax',
  },

  // ── Part 4: 보험 기초 및 연말정산 시리즈 ──

  // Card 31 - 실손의료보험
  {
    id: 61,
    cardId: 31,
    term: '실손의료보험',
    definition: '실제로 병원에 낸 치료비의 상당 부분(70~80%)을 돌려받는 보험으로, 보험 중 가장 기본적인 필수 보험입니다.',
    example: '감기부터 큰 수술까지 폭넓게 보장, 가성비 최고의 보험',
    difficulty: 'beginner',
    topic: 'insurance',
  },
  {
    id: 62,
    cardId: 31,
    term: '4세대 실손',
    definition: '2021년 7월 이후 출시된 실손보험으로, 비급여 보장이 특약으로 분리되어 보험료가 더 저렴해졌습니다.',
    example: '비급여 항목 이용이 적으면 보험료 할인 혜택을 받을 수 있음',
    difficulty: 'intermediate',
    topic: 'insurance',
  },

  // Card 32 - 소득공제 vs 세액공제
  {
    id: 63,
    cardId: 32,
    term: '소득공제',
    definition: '세금을 매기는 기준인 과세 대상 소득 자체를 줄여주는 방식으로, 신용카드·주택청약 등이 해당됩니다.',
    example: '연봉 5,000만 원에서 소득공제 500만 원 → 4,500만 원에 세금 부과',
    difficulty: 'beginner',
    topic: 'tax',
  },
  {
    id: 64,
    cardId: 32,
    term: '과세표준',
    definition: '각종 소득공제를 적용한 후 실제로 세금이 부과되는 기준 금액입니다.',
    example: '총소득 5,000만 원 - 소득공제 1,500만 원 = 과세표준 3,500만 원',
    difficulty: 'intermediate',
    topic: 'tax',
  },

  // Card 33 - 신용카드 25% 룰
  {
    id: 65,
    cardId: 33,
    term: '소득공제 문턱',
    definition: '총 급여의 25%를 넘게 카드를 사용해야 초과분부터 소득공제가 시작되는 최소 기준입니다.',
    example: '연봉 4,000만 원이면 1,000만 원까지는 공제 혜택 0원',
    difficulty: 'beginner',
    topic: 'tax',
  },
  {
    id: 66,
    cardId: 33,
    term: '체크카드 공제율',
    definition: '체크카드의 소득공제율은 30%로 신용카드(15%)의 두 배이므로, 문턱 초과 후에는 체크카드가 유리합니다.',
    example: '25%까지 혜택 좋은 신용카드 → 이후 공제율 높은 체크카드 사용',
    difficulty: 'beginner',
    topic: 'tax',
  },

  // Card 34 - 현금영수증
  {
    id: 67,
    cardId: 34,
    term: '현금영수증',
    definition: '현금으로 결제할 때 휴대폰 번호를 입력하여 발급받는 영수증으로, 소득공제율 30%가 적용됩니다.',
    example: '카페에서 현금 결제 시 번호 입력 → 30% 소득공제 자동 적립',
    difficulty: 'beginner',
    topic: 'tax',
  },
  {
    id: 68,
    cardId: 34,
    term: '홈택스',
    definition: '국세청의 온라인 세금 신고·조회 서비스로, 현금영수증 자동 발급 번호 등록도 가능합니다.',
    example: '홈택스에 휴대폰 번호 등록 → 현금 결제 시 번호만 불러도 자동 적립',
    difficulty: 'beginner',
    topic: 'tax',
  },

  // Card 35 - 해외주식 양도소득세
  {
    id: 69,
    cardId: 35,
    term: '해외주식 양도소득세',
    definition: '해외 주식 매매로 1년간 번 돈에서 잃은 돈을 뺀 순수익이 250만 원을 넘으면 22% 세율로 과세됩니다.',
    example: '미국 주식 수익 500만 원 - 기본공제 250만 원 = 250만 원 × 22% = 55만 원',
    difficulty: 'intermediate',
    topic: 'tax',
  },
  {
    id: 70,
    cardId: 35,
    term: '기본공제 250만 원',
    definition: '해외 주식 양도소득에 적용되는 연간 비과세 한도로, 250만 원까지는 세금이 없습니다.',
    example: '연말에 손실 난 주식을 팔아 순수익을 250만 원 이하로 조절하는 절세 전략',
    difficulty: 'intermediate',
    topic: 'tax',
  },

  // Card 36 - 환전 스프레드
  {
    id: 71,
    cardId: 36,
    term: '환전 스프레드',
    definition: '외화를 살 때와 팔 때의 가격 차이로, 이 차이가 사실상 은행이나 증권사의 환전 수수료입니다.',
    example: '기준 환율 1,300원인데 살 때 1,313원, 팔 때 1,287원이면 스프레드 26원',
    difficulty: 'intermediate',
    topic: 'investment',
  },
  {
    id: 72,
    cardId: 36,
    term: '환전 우대율',
    definition: '환전 스프레드를 할인해주는 비율로, 90% 우대면 스프레드의 90%를 줄여준다는 뜻입니다.',
    example: '증권사 앱에서 환전 우대 95% 적용 → 환전 비용 대폭 절감',
    difficulty: 'beginner',
    topic: 'investment',
  },

  // Card 37 - 배당소득세
  {
    id: 73,
    cardId: 37,
    term: '원천징수',
    definition: '소득이 발생하는 시점에 세금을 미리 떼고 지급하는 방식으로, 배당금과 이자에 15.4%가 자동 적용됩니다.',
    example: '10만 원 배당 → 15.4% 원천징수 → 통장에 84,600원 입금',
    difficulty: 'intermediate',
    topic: 'tax',
  },
  {
    id: 74,
    cardId: 37,
    term: '배당소득세',
    definition: '주식 배당금이나 은행 이자에 부과되는 15.4%의 세금(소득세 14% + 지방소득세 1.4%)입니다.',
    example: 'ISA 계좌를 활용하면 배당소득세 15.4%를 내지 않거나 미룰 수 있음',
    difficulty: 'intermediate',
    topic: 'tax',
  },

  // Card 38 - 반도체 ETF
  {
    id: 75,
    cardId: 38,
    term: '섹터 ETF',
    definition: '특정 산업(반도체, 헬스케어 등)에 속한 기업들만 모아 투자하는 테마형 상장지수펀드입니다.',
    example: '반도체 ETF로 삼성전자, SK하이닉스, TSMC 등에 한 번에 투자',
    difficulty: 'intermediate',
    topic: 'investment',
  },
  {
    id: 76,
    cardId: 38,
    term: 'SOXX',
    definition: '미국 필라델피아 반도체 지수를 추종하는 대표적인 반도체 섹터 ETF입니다.',
    example: 'SOXX에 투자하면 엔비디아, AMD, 인텔 등 글로벌 반도체 대장주에 분산 투자',
    difficulty: 'advanced',
    topic: 'investment',
  },

  // Card 39 - 레버리지 / 인버스
  {
    id: 77,
    cardId: 39,
    term: '레버리지 ETF',
    definition: '기초 지수 수익률의 2배(또는 3배)를 추구하는 ETF로, 상승 시 배수 수익이지만 하락 시 배수 손실입니다.',
    example: '코스피가 1% 오르면 레버리지 2배 ETF는 2% 상승, 1% 떨어지면 2% 하락',
    difficulty: 'advanced',
    topic: 'investment',
  },
  {
    id: 78,
    cardId: 39,
    term: '인버스 ETF',
    definition: '기초 지수가 하락할 때 수익이 나는 역방향 ETF로, 하락장에 베팅하는 상품입니다.',
    example: '코스피가 1% 하락하면 인버스 ETF는 1% 상승, 횡보장에서도 가치 하락 위험',
    difficulty: 'advanced',
    topic: 'investment',
  },

  // Card 40 - 마이너스 통장
  {
    id: 79,
    cardId: 40,
    term: '마이너스 통장',
    definition: '미리 정해진 한도 내에서 빌려 쓰고, 사용 금액과 기간에 따라 이자를 내는 한도 대출 상품입니다.',
    example: '한도 1,000만 원 중 300만 원 사용 → 300만 원에 대해서만 이자 부과',
    difficulty: 'beginner',
    topic: 'credit',
  },
  {
    id: 80,
    cardId: 40,
    term: '한도 대출',
    definition: '약정된 대출 한도 내에서 자유롭게 입출금이 가능한 대출 방식으로, 마이너스 통장이 대표적입니다.',
    example: '일반 대출보다 금리가 높은 경우가 많아 장기 사용 시 이자 부담 증가',
    difficulty: 'intermediate',
    topic: 'credit',
  },
];

export default terms;
