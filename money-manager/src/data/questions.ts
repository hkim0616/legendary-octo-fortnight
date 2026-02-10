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
];

/** 카드 10장에서 무작위로 3문항을 뽑되, OX와 객관식을 섞는다 */
export function pickRandomQuestions(count: number = 3): Question[] {
  // 카드 ID를 셔플해서 count개 선택
  const cardIds = Array.from({ length: 10 }, (_, i) => i + 1);
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
