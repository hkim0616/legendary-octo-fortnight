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

  // ── Part 2: 사회 초년생을 위한 상품지식 및 재테크 기초 ──

  {
    id: 11,
    title: '연금저축보험 vs 펀드',
    description: '연금저축보험은 원금 보장이 되지만 수익률이 낮고, 연금저축펀드는 직접 ETF를 골라 더 높은 수익을 노릴 수 있습니다.',
    emoji: '🧐',
    backgroundColor: '#EDE7F6',
  },
  {
    id: 12,
    title: '파킹 통장',
    description: '돈을 잠시 주차하듯 맡겨도 하루치 이자를 쳐주는 고금리 통장입니다. 비상금 보관에 최적!',
    emoji: '🅿️',
    backgroundColor: '#E0F2F1',
  },
  {
    id: 13,
    title: '주택청약',
    description: '새 아파트 분양 자격을 얻기 위한 필수 통장입니다. 오래 가입할수록 당첨 확률이 올라갑니다.',
    emoji: '🏠',
    backgroundColor: '#FFF9C4',
  },
  {
    id: 14,
    title: '전세자금대출',
    description: '은행에서 전세 보증금의 80% 내외를 빌려주는 제도입니다. 월세보다 이자가 싼 경우가 많습니다.',
    emoji: '🏃',
    backgroundColor: '#F3E5F5',
  },
  {
    id: 15,
    title: '공모주 청약',
    description: '기업이 처음 주식 시장에 나올 때 미리 신청해서 주식을 받는 소액 재테크 입문법입니다.',
    emoji: '☕',
    backgroundColor: '#E8F5E9',
  },
  {
    id: 16,
    title: 'LTV / DTI / DSR',
    description: '집값 대비, 연봉 대비 대출 한도를 결정하는 핵심 금융 지표 3가지입니다.',
    emoji: '🏦',
    backgroundColor: '#E3F2FD',
  },
  {
    id: 17,
    title: '손익통산',
    description: '번 돈과 잃은 돈을 합산해서 실제 순이익에 대해서만 세금을 매기는 절세 원리입니다.',
    emoji: '😭',
    backgroundColor: '#FFF3E0',
  },
  {
    id: 18,
    title: '과세이연',
    description: '연금 계좌에서 발생한 수익에 대해 세금 납부를 미래로 미뤄 복리 효과를 극대화하는 기술입니다.',
    emoji: '💰',
    backgroundColor: '#FCE4EC',
  },
  {
    id: 19,
    title: '신용점수 관리법',
    description: '신용점수가 높으면 대출 금리가 낮아지고 한도가 늘어납니다. 연체는 단 하루도 절대 금지!',
    emoji: '💯',
    backgroundColor: '#F1F8E9',
  },
  {
    id: 20,
    title: '달러 투자',
    description: '달러는 세계에서 가장 안전한 통화입니다. 자산의 일부를 달러로 보유하면 경제 위기 시 방어가 됩니다.',
    emoji: '💵',
    backgroundColor: '#E0F7FA',
  },

  // ── Part 3: 상품지식 및 ETF 실전 ──

  {
    id: 21,
    title: 'S&P 500',
    description: '미국을 대표하는 500대 우량 기업에 한 번에 투자하는 전 세계에서 가장 인기 있는 지수입니다.',
    emoji: '🇺🇸',
    backgroundColor: '#E3F2FD',
  },
  {
    id: 22,
    title: '나스닥 100',
    description: 'IT, 바이오 등 혁신 기술주 중심의 미국 상위 100개 기업 지수로, 변동성은 크지만 성장성도 높습니다.',
    emoji: '🚀',
    backgroundColor: '#E8F5E9',
  },
  {
    id: 23,
    title: '운용보수 (수수료)',
    description: '투자 상품 유지 비용으로, 장기 투자 시 수익률에 막대한 영향을 미치는 핵심 체크 요소입니다.',
    emoji: '💸',
    backgroundColor: '#FFF3E0',
  },
  {
    id: 24,
    title: '적립식 투자',
    description: '일정한 금액을 주기적으로 투자하여 매수 가격을 평준화하고 위험을 분산하는 전략입니다.',
    emoji: '⏰',
    backgroundColor: '#F3E5F5',
  },
  {
    id: 25,
    title: '연금 이전 제도',
    description: '세제 혜택은 유지하면서 연금 자산을 더 유리한 금융사나 상품으로 이동시키는 제도입니다.',
    emoji: '📦',
    backgroundColor: '#FFF8E1',
  },
  {
    id: 26,
    title: '금 투자',
    description: '실물 자산으로서 인플레이션과 경제 불확실성에 대비하는 필수 방어 자산입니다.',
    emoji: '🥇',
    backgroundColor: '#FFF9C4',
  },
  {
    id: 27,
    title: '리츠 (REITs)',
    description: '부동산에 간접 투자하여 임대 수익 등을 배당으로 받는 중위험 중수익 상품입니다.',
    emoji: '🏢',
    backgroundColor: '#E0F7FA',
  },
  {
    id: 28,
    title: '어카운트인포',
    description: '모든 금융권 계좌를 한눈에 조회하고 숨은 자산을 관리할 수 있는 서비스입니다.',
    emoji: '🔍',
    backgroundColor: '#EDE7F6',
  },
  {
    id: 29,
    title: '예금자 보호 제도',
    description: '금융사 파산 시 법에 따라 1인당 최대 5,000만 원까지 예치금을 보장해주는 안전 장치입니다.',
    emoji: '🛡️',
    backgroundColor: '#E8EAF6',
  },
  {
    id: 30,
    title: '금융소득종합과세',
    description: '연간 금융소득이 2,000만 원을 넘을 경우 근로소득 등과 합산해 높은 세율로 과세하는 제도입니다.',
    emoji: '😮',
    backgroundColor: '#F1F8E9',
  },

  // ── Part 4: 보험 기초 및 연말정산 시리즈 ──

  {
    id: 31,
    title: '실손의료보험 (실비)',
    description: '실제 지출한 병원비를 보장받는 가장 실용적이고 필수적인 보험입니다.',
    emoji: '🏥',
    backgroundColor: '#FCE4EC',
  },
  {
    id: 32,
    title: '소득공제 vs 세액공제',
    description: '세금 부과 대상 소득을 줄이는 소득공제와 결정된 세금을 직접 깎아주는 세액공제의 차이를 알아봅니다.',
    emoji: '🧾',
    backgroundColor: '#E3F2FD',
  },
  {
    id: 33,
    title: '신용카드 25% 룰',
    description: '총 급여의 25%를 초과하여 지출한 카드 사용금액부터 소득공제 혜택이 시작되는 기준입니다.',
    emoji: '💳',
    backgroundColor: '#FBE9E7',
  },
  {
    id: 34,
    title: '현금영수증',
    description: '현금 결제 시 번호를 입력하여 신용카드보다 높은 비율(30%)로 소득공제를 받는 방법입니다.',
    emoji: '🧾',
    backgroundColor: '#E8F5E9',
  },
  {
    id: 35,
    title: '해외주식 양도소득세',
    description: '해외 주식 투자로 연간 250만 원 이상의 순수익을 얻었을 때 내는 22%의 세금입니다.',
    emoji: '🌐',
    backgroundColor: '#E0F2F1',
  },
  {
    id: 36,
    title: '환전 스프레드',
    description: '통화를 사고팔 때 발생하는 가격 차이로, 실질적인 환전 비용을 의미합니다.',
    emoji: '💱',
    backgroundColor: '#FFF3E0',
  },
  {
    id: 37,
    title: '배당소득세 (15.4%)',
    description: '배당이나 이자 수익이 발생할 때 국가에서 미리 징수하는 15.4%의 세금입니다.',
    emoji: '📊',
    backgroundColor: '#F3E5F5',
  },
  {
    id: 38,
    title: '반도체 ETF',
    description: '반도체 설계 및 제조 기업들을 한데 모아 투자하는 섹터 특화 상품입니다.',
    emoji: '💻',
    backgroundColor: '#E0F7FA',
  },
  {
    id: 39,
    title: '레버리지 / 인버스',
    description: '지수 변동의 배수 수익을 노리거나 역방향으로 투자하는 고위험 상품입니다.',
    emoji: '⚠️',
    backgroundColor: '#FFF9C4',
  },
  {
    id: 40,
    title: '마이너스 통장 (마통)',
    description: '약정된 한도 내에서 자유롭게 입출금하며 사용하는 대출 상품입니다.',
    emoji: '📉',
    backgroundColor: '#FCE4EC',
  },
];

export default cards;
