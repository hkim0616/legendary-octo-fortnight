export type QuizType = 'ox' | 'multiple';

export interface OXQuestion {
  type: 'ox';
  cardId: number;
  question: string;
  answer: boolean;
  explanation: string;
}

export interface MultipleChoiceQuestion {
  type: 'multiple';
  cardId: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export type Question = OXQuestion | MultipleChoiceQuestion;

const questions: Question[] = [
  // Card 1 - 예산 세우기
  {
    type: 'ox',
    cardId: 1,
    question: '50/30/20 규칙에서 50%는 저축에 해당한다.',
    answer: false,
    explanation: '50/30/20 규칙에서 50%는 필수 지출(생활비), 30%는 개인 소비, 20%는 저축에 해당합니다.',
  },
  {
    type: 'multiple',
    cardId: 1,
    question: '50/30/20 규칙에서 20%에 해당하는 것은?',
    options: ['식비', '교통비', '저축', '여가비'],
    answerIndex: 2,
    explanation: '50/30/20 규칙에서 20%는 저축과 투자에 배분하는 비율입니다.',
  },

  // Card 2 - 비상금 마련
  {
    type: 'ox',
    cardId: 2,
    question: '비상금은 최소 1개월치 생활비만 준비하면 충분하다.',
    answer: false,
    explanation: '비상금은 최소 3~6개월치 생활비를 준비하는 것이 권장됩니다.',
  },
  {
    type: 'multiple',
    cardId: 2,
    question: '비상금으로 권장되는 금액은 최소 몇 개월치 생활비인가요?',
    options: ['1개월', '3~6개월', '12개월', '24개월'],
    answerIndex: 1,
    explanation: '예상치 못한 지출에 대비해 최소 3~6개월치 생활비를 비상금으로 모아두는 것이 좋습니다.',
  },

  // Card 3 - 복리의 마법
  {
    type: 'ox',
    cardId: 3,
    question: '복리는 원금에만 이자가 붙는 방식이다.',
    answer: false,
    explanation: '복리는 원금뿐 아니라 이자에도 이자가 붙는 방식입니다. 원금에만 이자가 붙는 것은 단리입니다.',
  },
  {
    type: 'multiple',
    cardId: 3,
    question: '복리 효과를 극대화하기 위해 가장 중요한 것은?',
    options: ['높은 금액 투자', '일찍 시작하기', '단기 투자', '자주 인출하기'],
    answerIndex: 1,
    explanation: '복리는 시간이 지날수록 효과가 커지므로 일찍 시작할수록 유리합니다.',
  },

  // Card 4 - 신용점수 관리
  {
    type: 'ox',
    cardId: 4,
    question: '신용점수는 대출 금리에 영향을 준다.',
    answer: true,
    explanation: '신용점수가 높을수록 낮은 금리로 대출을 받을 수 있으며, 한도도 높아집니다.',
  },
  {
    type: 'multiple',
    cardId: 4,
    question: '신용점수를 관리하기 위해 가장 피해야 할 것은?',
    options: ['카드 사용', '통신비 납부', '연체', '저축'],
    answerIndex: 2,
    explanation: '연체는 신용점수에 가장 큰 악영향을 미칩니다. 꾸준한 납부가 중요합니다.',
  },

  // Card 5 - 투자의 기초
  {
    type: 'ox',
    cardId: 5,
    question: '분산 투자는 위험을 줄이는 데 도움이 된다.',
    answer: true,
    explanation: '여러 자산에 분산 투자하면 특정 자산의 손실을 다른 자산의 이익으로 상쇄할 수 있습니다.',
  },
  {
    type: 'multiple',
    cardId: 5,
    question: '다음 중 투자 상품이 아닌 것은?',
    options: ['주식', '채권', '펀드', '월급'],
    answerIndex: 3,
    explanation: '주식, 채권, 펀드는 대표적인 투자 상품이고, 월급은 근로 소득입니다.',
  },

  // Card 6 - 소비 습관 점검
  {
    type: 'ox',
    cardId: 6,
    question: '라떼 팩터란 큰 지출이 재정에 미치는 영향을 뜻한다.',
    answer: false,
    explanation: '라떼 팩터는 라떼 한 잔 같은 작은 지출이 장기적으로 모이면 큰 금액이 되는 현상을 말합니다.',
  },
  {
    type: 'multiple',
    cardId: 6,
    question: '"라떼 팩터"가 강조하는 것은?',
    options: ['부동산 투자', '작은 지출의 누적 효과', '주식 투자 타이밍', '대출 상환 전략'],
    answerIndex: 1,
    explanation: '매일 반복되는 작은 소비(커피 등)가 장기적으로 큰 금액이 됩니다.',
  },

  // Card 7 - 보험의 중요성
  {
    type: 'ox',
    cardId: 7,
    question: '보험은 예상치 못한 위험에 대비하는 금융 상품이다.',
    answer: true,
    explanation: '보험은 질병, 사고 등 예상치 못한 위험의 경제적 부담을 줄여주는 금융 상품입니다.',
  },
  {
    type: 'multiple',
    cardId: 7,
    question: '다음 중 필수 보험으로 가장 적절한 것은?',
    options: ['여행자 보험', '건강보험', '펫 보험', '골프 보험'],
    answerIndex: 1,
    explanation: '건강보험은 질병과 상해에 대비하는 가장 기본적인 필수 보험입니다.',
  },

  // Card 8 - 세금 이해하기
  {
    type: 'ox',
    cardId: 8,
    question: '부가가치세는 소득에 부과되는 세금이다.',
    answer: false,
    explanation: '부가가치세는 상품이나 서비스의 거래 과정에서 부과되는 세금이며, 소득에 부과되는 것은 소득세입니다.',
  },
  {
    type: 'multiple',
    cardId: 8,
    question: '근로 소득에 부과되는 세금은?',
    options: ['부가가치세', '관세', '소득세', '재산세'],
    answerIndex: 2,
    explanation: '소득세는 개인이 벌어들인 소득에 대해 부과되는 세금입니다.',
  },

  // Card 9 - 은퇴 준비
  {
    type: 'multiple',
    cardId: 9,
    question: '3층 연금 체계에 포함되지 않는 것은?',
    options: ['국민연금', '퇴직연금', '주식 배당금', '개인연금'],
    answerIndex: 2,
    explanation: '3층 연금은 국민연금(1층), 퇴직연금(2층), 개인연금(3층)으로 구성됩니다.',
  },
  {
    type: 'ox',
    cardId: 9,
    question: '국민연금, 퇴직연금, 개인연금을 합쳐 3층 연금이라 한다.',
    answer: true,
    explanation: '국민연금(공적연금), 퇴직연금(기업연금), 개인연금을 합쳐 3층 연금 체계라고 합니다.',
  },

  // Card 10 - 금융 목표 설정
  {
    type: 'ox',
    cardId: 10,
    question: '금융 목표는 장기 목표만 세우면 충분하다.',
    answer: false,
    explanation: '단기, 중기, 장기 목표를 균형 있게 세우고 실천하는 것이 효과적인 재정 관리입니다.',
  },
  {
    type: 'multiple',
    cardId: 10,
    question: '효과적인 금융 목표 설정 방법은?',
    options: ['장기 목표만 설정', '단기/중기/장기로 나누어 설정', '목표 없이 저축', '남들 따라 하기'],
    answerIndex: 1,
    explanation: '단기, 중기, 장기로 나누어 구체적인 금융 목표를 설정하는 것이 좋습니다.',
  },
  // ── Part 2: 사회 초년생을 위한 상품지식 및 재테크 기초 ──

  // Card 11 - 연금저축보험 vs 펀드
  {
    type: 'ox',
    cardId: 11,
    question: '연금저축보험은 원금 보장이 되지만 수익률이 높다.',
    answer: false,
    explanation: '연금저축보험은 원금 보장이 되지만 수익률이 낮고 사업비를 떼서 초기에 마이너스가 날 수 있습니다.',
  },
  {
    type: 'multiple',
    cardId: 11,
    question: '투자 기간이 긴 사회 초년생에게 더 유리한 연금저축 상품은?',
    options: ['연금저축보험', '연금저축펀드', '일반 예금', '적금'],
    answerIndex: 1,
    explanation: '투자 기간이 길다면 직접 ETF를 골라 운용하는 연금저축펀드가 복리 효과에 훨씬 유리합니다.',
  },

  // Card 12 - 파킹 통장
  {
    type: 'ox',
    cardId: 12,
    question: '파킹 통장은 돈을 맡기면 하루치 이자를 받을 수 있다.',
    answer: true,
    explanation: '파킹 통장은 차를 잠시 주차하듯 돈을 맡겨도 하루치 이자를 쳐주는 고금리 통장입니다.',
  },
  {
    type: 'multiple',
    cardId: 12,
    question: '파킹 통장의 가장 큰 장점은?',
    options: ['높은 고정 금리', '입출금 자유 + 높은 이자', '세금 면제', '해외 송금 무료'],
    answerIndex: 1,
    explanation: '파킹 통장은 언제든 입출금이 가능하면서도 일반 통장보다 훨씬 높은 이자를 제공합니다.',
  },

  // Card 13 - 주택청약
  {
    type: 'ox',
    cardId: 13,
    question: '주택청약통장은 해지하면 쌓아온 가입 기간이 유지된다.',
    answer: false,
    explanation: '한 번 해지하면 쌓아온 가입 기간이 모두 사라집니다. 급전이 필요하면 청약담보대출을 활용하세요.',
  },
  {
    type: 'multiple',
    cardId: 13,
    question: '공공분양 청약 시 매달 납입 인정 한도 금액은?',
    options: ['2만 원', '5만 원', '10만 원', '50만 원'],
    answerIndex: 2,
    explanation: '공공분양을 노린다면 매달 10만 원(인정 한도) 이상 넣는 것이 정석입니다.',
  },

  // Card 14 - 전세자금대출
  {
    type: 'ox',
    cardId: 14,
    question: '전세자금대출의 이자가 월세보다 비싼 경우가 대부분이다.',
    answer: false,
    explanation: '전세자금대출 이자가 월세보다 싼 경우가 많으며, 특히 청년 전용 상품은 이자가 매우 낮습니다.',
  },
  {
    type: 'multiple',
    cardId: 14,
    question: '전세 계약 시 보증금을 지키기 위해 반드시 확인해야 할 것은?',
    options: ['인테리어 상태', '확정일자와 대항력', '주변 맛집', '건물 연식'],
    answerIndex: 1,
    explanation: '확정일자와 대항력 확인은 내 소중한 전세 보증금을 지키기 위한 필수 절차입니다.',
  },

  // Card 15 - 공모주 청약
  {
    type: 'ox',
    cardId: 15,
    question: '공모주 청약에서 균등 배정을 활용하면 소액으로도 참여할 수 있다.',
    answer: true,
    explanation: '균등 배정을 활용하면 최소 수량만 신청해서 소액으로도 1~2주를 받아 수익을 노릴 수 있습니다.',
  },
  {
    type: 'multiple',
    cardId: 15,
    question: '공모주 청약 시 수익 가능성이 높은 종목을 고르는 팁은?',
    options: ['회사 이름이 긴 종목', '기관 경쟁률이 높은 종목', '공모가가 가장 낮은 종목', '상장일이 빠른 종목'],
    answerIndex: 1,
    explanation: '기관 경쟁률이 높은 종목은 시장의 관심이 높다는 의미로, 상장 후 주가 상승 가능성이 높습니다.',
  },

  // Card 16 - LTV / DTI / DSR
  {
    type: 'ox',
    cardId: 16,
    question: 'DSR은 주택 담보 대출만 고려해서 한도를 계산한다.',
    answer: false,
    explanation: 'DSR은 주택 담보 대출뿐 아니라 학자금 대출, 카드론 등 모든 빚을 따져 한도를 결정합니다.',
  },
  {
    type: 'multiple',
    cardId: 16,
    question: '집값 대비 대출 한도를 결정하는 지표는?',
    options: ['DTI', 'DSR', 'LTV', 'GDP'],
    answerIndex: 2,
    explanation: 'LTV(Loan To Value)는 담보 가치(집값) 대비 대출 가능 비율을 의미합니다.',
  },

  // Card 17 - 손익통산
  {
    type: 'ox',
    cardId: 17,
    question: 'ISA 계좌에서는 수익과 손실을 합산해서 순이익에만 세금을 낸다.',
    answer: true,
    explanation: 'ISA 계좌에서는 손익통산이 적용되어 번 돈과 잃은 돈을 합쳐 실제 순이익에 대해서만 과세합니다.',
  },
  {
    type: 'multiple',
    cardId: 17,
    question: '해외 주식 투자 시 연간 비과세 공제 한도는?',
    options: ['100만 원', '250만 원', '500만 원', '1,000만 원'],
    answerIndex: 1,
    explanation: '해외 주식 양도소득은 연간 250만 원까지 기본 공제가 적용됩니다.',
  },

  // Card 18 - 과세이연
  {
    type: 'ox',
    cardId: 18,
    question: '과세이연은 세금을 영원히 면제해주는 것이다.',
    answer: false,
    explanation: '과세이연은 세금을 면제가 아닌 미래로 미뤄주는 것입니다. 연금 수령 시 세금을 납부합니다.',
  },
  {
    type: 'multiple',
    cardId: 18,
    question: '과세이연의 가장 큰 장점은?',
    options: ['세금 완전 면제', '미뤄진 세금으로 재투자해 복리 효과 극대화', '원금 보장', '높은 이자율'],
    answerIndex: 1,
    explanation: '세금으로 나갈 돈이 계좌에 남아 계속 재투자되어 복리의 마법을 더 크게 만들어줍니다.',
  },

  // Card 19 - 신용점수 관리법
  {
    type: 'ox',
    cardId: 19,
    question: '신용점수는 올리기는 쉽지만 떨어지기는 어렵다.',
    answer: false,
    explanation: '신용점수는 떨어지기는 쉬워도 올리기는 어렵습니다. 연체는 단 하루도 하지 않는 것이 중요합니다.',
  },
  {
    type: 'multiple',
    cardId: 19,
    question: '사회 초년생이 신용점수를 올리는 가장 좋은 방법은?',
    options: ['대출을 많이 받기', '카드를 만들지 않기', '주거래 은행 이용 + 공과금 꾸준히 납부', '현금만 사용하기'],
    answerIndex: 2,
    explanation: '주거래 은행을 꾸준히 이용하고 공과금을 잘 납부하는 것만으로도 신용점수를 올릴 수 있습니다.',
  },

  // Card 20 - 달러 투자
  {
    type: 'ox',
    cardId: 20,
    question: '경제가 어려워질 때 달러 가치는 보통 하락한다.',
    answer: false,
    explanation: '달러는 세계 기축통화로, 경제가 어려워질 때 안전자산 선호로 오히려 가치가 상승하는 경향이 있습니다.',
  },
  {
    type: 'multiple',
    cardId: 20,
    question: '자산의 일부를 달러로 보유하는 가장 큰 이유는?',
    options: ['높은 이자 수익', '통화 분산으로 경제 위기 방어', '환전 수수료 절약', '해외여행 준비'],
    answerIndex: 1,
    explanation: '원화만으로 자산을 보유하면 한국 경제 위기 시 위험합니다. 달러 분산은 훌륭한 자산 보험입니다.',
  },
];

/** 카드 20장에서 무작위로 3문항을 뽑되, OX와 객관식을 섞는다 */
export function pickRandomQuestions(count: number = 3): Question[] {
  // 카드 ID를 셔플해서 count개 선택
  const cardIds = Array.from({ length: 20 }, (_, i) => i + 1);
  for (let i = cardIds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardIds[i], cardIds[j]] = [cardIds[j], cardIds[i]];
  }
  const selectedCardIds = cardIds.slice(0, count);

  // 선택된 카드별로 OX/객관식 중 하나를 무작위 선택
  const picked: Question[] = selectedCardIds.map((cardId) => {
    const cardQuestions = questions.filter((q) => q.cardId === cardId);
    return cardQuestions[Math.floor(Math.random() * cardQuestions.length)];
  });

  // OX와 객관식이 최소 1개씩 포함되도록 보정
  const hasOX = picked.some((q) => q.type === 'ox');
  const hasMultiple = picked.some((q) => q.type === 'multiple');

  if (!hasOX) {
    // 객관식 하나를 OX로 교체
    const idx = Math.floor(Math.random() * picked.length);
    const oxOption = questions.find(
      (q) => q.cardId === picked[idx].cardId && q.type === 'ox'
    );
    if (oxOption) picked[idx] = oxOption;
  } else if (!hasMultiple) {
    const idx = Math.floor(Math.random() * picked.length);
    const mcOption = questions.find(
      (q) => q.cardId === picked[idx].cardId && q.type === 'multiple'
    );
    if (mcOption) picked[idx] = mcOption;
  }

  return picked;
}

export default questions;
