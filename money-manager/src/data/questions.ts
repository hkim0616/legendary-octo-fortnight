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

  // ── Part 3: 상품지식 및 ETF 실전 ──

  // Card 21 - S&P 500
  {
    type: 'ox',
    cardId: 21,
    question: 'S&P 500은 미국 나스닥에 상장된 기술주 500개로 구성된 지수이다.',
    answer: false,
    explanation: 'S&P 500은 나스닥뿐 아니라 NYSE 등 미국 주식시장 전체의 시가총액 상위 우량 기업 500개로 구성됩니다.',
  },
  {
    type: 'multiple',
    cardId: 21,
    question: '워런 버핏이 유언으로 아내에게 추천한 투자 방법은?',
    options: ['개별 주식 투자', 'S&P 500 인덱스 펀드', '부동산 투자', '금 투자'],
    answerIndex: 1,
    explanation: '워런 버핏은 "내가 죽으면 S&P 500 인덱스 펀드에 투자하라"고 했을 정도로 검증된 투자처입니다.',
  },

  // Card 22 - 나스닥 100
  {
    type: 'ox',
    cardId: 22,
    question: '나스닥 100은 금융주를 포함한 상위 100개 기업으로 구성된 지수이다.',
    answer: false,
    explanation: '나스닥 100은 금융주를 제외한 상위 100개 기업으로 구성되며, IT·바이오 등 혁신 기술주 중심입니다.',
  },
  {
    type: 'multiple',
    cardId: 22,
    question: '나스닥 100 지수의 특징으로 가장 적절한 것은?',
    options: ['안정적이고 변동성이 낮다', '금융주 위주로 구성된다', '기술주 중심으로 변동성은 크지만 성장성이 높다', '미국 이외 국가 기업도 포함한다'],
    answerIndex: 2,
    explanation: '나스닥 100은 반도체, AI, 플랫폼 등 혁신 기업이 많아 변동성은 크지만 성장성도 높습니다.',
  },

  // Card 23 - 운용보수
  {
    type: 'ox',
    cardId: 23,
    question: 'ETF 운용보수 0.1%와 0.5%의 차이는 장기적으로 무시할 수 있는 수준이다.',
    answer: false,
    explanation: '0.4%p의 차이도 10~20년 복리로 쌓이면 수천만 원의 차이를 만들므로 반드시 비교해야 합니다.',
  },
  {
    type: 'multiple',
    cardId: 23,
    question: '비슷한 지수를 추종하는 ETF를 고를 때 가장 먼저 비교해야 할 것은?',
    options: ['ETF 이름', '운용보수', '상장 날짜', '거래 시간'],
    answerIndex: 1,
    explanation: '비슷한 성과를 내는 ETF라면 운용보수가 낮은 상품을 선택하는 것이 투자의 정석입니다.',
  },

  // Card 24 - 적립식 투자
  {
    type: 'ox',
    cardId: 24,
    question: '적립식 투자는 시장의 최저점을 정확히 맞춰 매매하는 방식이다.',
    answer: false,
    explanation: '적립식 투자는 타이밍과 관계없이 정기적으로 일정 금액을 투자하여 평균 단가를 낮추는 방식입니다.',
  },
  {
    type: 'multiple',
    cardId: 24,
    question: '적립식 투자(DCA)의 가장 큰 장점은?',
    options: ['항상 최고 수익 보장', '평균 매수 단가를 낮추고 위험 분산', '세금 면제', '원금 보장'],
    answerIndex: 1,
    explanation: '비쌀 때 적게, 쌀 때 많이 사게 되어 평균 매수 단가가 낮아지는 코스트 에버리징 효과가 발생합니다.',
  },

  // Card 25 - 연금 이전 제도
  {
    type: 'ox',
    cardId: 25,
    question: '연금 이전을 하면 기존에 받았던 세액공제 혜택이 모두 사라진다.',
    answer: false,
    explanation: '연금 이전은 해지가 아니므로 세액공제 혜택이 유지되며, 해지 위약금(기타소득세 16.5%)도 면제됩니다.',
  },
  {
    type: 'multiple',
    cardId: 25,
    question: '기존 연금저축보험의 수익률이 불만족스러울 때 가장 좋은 방법은?',
    options: ['해지 후 재가입', '연금 이전 제도로 증권사로 이전', '추가 보험료 납입', '그냥 유지'],
    answerIndex: 1,
    explanation: '연금 이전 제도를 활용하면 해지 위약금 없이 수익률이 더 좋은 상품으로 갈아탈 수 있습니다.',
  },

  // Card 26 - 금 투자
  {
    type: 'ox',
    cardId: 26,
    question: '금은 경제가 호황일 때 가치가 가장 많이 오른다.',
    answer: false,
    explanation: '금은 경제 위기나 인플레이션 시 안전자산 선호로 가치가 상승하는 대표적인 실물 자산입니다.',
  },
  {
    type: 'multiple',
    cardId: 26,
    question: '포트폴리오에 금을 포함하는 가장 큰 이유는?',
    options: ['높은 이자 수익', '주식 폭락 시 방어 역할', '세금 면제 혜택', '유동성이 가장 높아서'],
    answerIndex: 1,
    explanation: '금은 주식 시장이 폭락할 때 가치가 오르는 경향이 있어 포트폴리오의 방어 자산으로 활용됩니다.',
  },

  // Card 27 - 리츠
  {
    type: 'ox',
    cardId: 27,
    question: '리츠(REITs)에 투자하려면 수십억 원의 부동산을 직접 매입해야 한다.',
    answer: false,
    explanation: '리츠는 소액으로 대형 빌딩에 간접 투자할 수 있으며, 주식처럼 사고팔기 편합니다.',
  },
  {
    type: 'multiple',
    cardId: 27,
    question: '리츠(REITs)의 주요 수익 원천은?',
    options: ['주가 상승차익만', '부동산 임대료를 배당으로 분배', '국가 보조금', '환전 차익'],
    answerIndex: 1,
    explanation: '리츠는 부동산에서 나오는 임대료 수익을 투자자에게 배당으로 분배하는 구조입니다.',
  },

  // Card 28 - 어카운트인포
  {
    type: 'ox',
    cardId: 28,
    question: '어카운트인포에서는 은행 계좌만 조회할 수 있고 보험이나 증권은 확인할 수 없다.',
    answer: false,
    explanation: '어카운트인포는 은행, 증권사, 보험사 등 모든 금융권의 계좌를 한눈에 확인할 수 있는 서비스입니다.',
  },
  {
    type: 'multiple',
    cardId: 28,
    question: '다음 중 어카운트인포의 주요 기능이 아닌 것은?',
    options: ['모든 금융 계좌 조회', '휴면 계좌 잔액 이체', '카드 포인트 현금화', '주식 자동 매매'],
    answerIndex: 3,
    explanation: '어카운트인포는 계좌 조회, 휴면 계좌 관리, 카드 포인트 현금화 기능을 제공하지만 주식 매매 기능은 없습니다.',
  },

  // Card 29 - 예금자 보호 제도
  {
    type: 'ox',
    cardId: 29,
    question: '예금자 보호 제도는 주식이나 펀드 같은 투자 상품도 보호 대상이다.',
    answer: false,
    explanation: '예금자 보호 제도는 예금, 적금 등이 대상이며 주식, 펀드 같은 투자 상품은 보호 대상이 아닙니다.',
  },
  {
    type: 'multiple',
    cardId: 29,
    question: '예금자 보호 제도의 보호 한도는 1인당 금융기관별 최대 얼마인가?',
    options: ['1,000만 원', '3,000만 원', '5,000만 원', '1억 원'],
    answerIndex: 2,
    explanation: '예금보험공사는 금융기관별 1인당 원금과 이자를 합쳐 최대 5,000만 원까지 보호합니다.',
  },

  // Card 30 - 금융소득종합과세
  {
    type: 'ox',
    cardId: 30,
    question: '금융소득종합과세는 이자·배당 소득이 연간 1,000만 원을 초과할 때 적용된다.',
    answer: false,
    explanation: '금융소득종합과세는 이자·배당 소득이 연간 2,000만 원을 초과할 때 적용됩니다.',
  },
  {
    type: 'multiple',
    cardId: 30,
    question: '금융소득종합과세를 피하기 위해 활용할 수 있는 절세 계좌는?',
    options: ['일반 예금', 'ISA 및 연금 계좌', '마이너스 통장', '외화 예금'],
    answerIndex: 1,
    explanation: 'ISA나 연금 계좌를 활용하면 금융소득이 종합과세 대상에서 제외되는 혜택을 누릴 수 있습니다.',
  },

  // ── Part 4: 보험 기초 및 연말정산 시리즈 ──

  // Card 31 - 실손의료보험
  {
    type: 'ox',
    cardId: 31,
    question: '실손의료보험(실비)은 실제 병원에서 지출한 치료비 전액을 돌려준다.',
    answer: false,
    explanation: '실손보험은 치료비의 70~80% 정도를 돌려받으며, 자기부담금이 있습니다.',
  },
  {
    type: 'multiple',
    cardId: 31,
    question: '보험을 딱 하나만 가입해야 한다면 전문가들이 가장 추천하는 것은?',
    options: ['종신보험', '실손의료보험', '저축보험', '여행자 보험'],
    answerIndex: 1,
    explanation: '실손의료보험은 가벼운 질병부터 큰 수술까지 폭넓게 보장되어 가성비가 가장 좋은 필수 보험입니다.',
  },

  // Card 32 - 소득공제 vs 세액공제
  {
    type: 'ox',
    cardId: 32,
    question: '소득공제와 세액공제는 같은 방식으로 세금을 줄여준다.',
    answer: false,
    explanation: '소득공제는 과세 대상 소득을 줄여주고, 세액공제는 결정된 세금에서 직접 차감하는 서로 다른 방식입니다.',
  },
  {
    type: 'multiple',
    cardId: 32,
    question: '다음 중 세액공제에 해당하는 항목은?',
    options: ['신용카드 사용액', '연금저축·IRP 납입', '주택청약 납입', '대중교통 이용'],
    answerIndex: 1,
    explanation: '연금저축, IRP 납입은 세액공제 항목으로, 내야 할 세금에서 직접 빼줍니다.',
  },

  // Card 33 - 신용카드 25% 룰
  {
    type: 'ox',
    cardId: 33,
    question: '신용카드로 사용한 금액은 처음부터 전부 소득공제 대상이다.',
    answer: false,
    explanation: '총 급여의 25%를 초과한 금액부터 소득공제가 시작되며, 그 이하는 혜택이 없습니다.',
  },
  {
    type: 'multiple',
    cardId: 33,
    question: '연봉 4,000만 원인 직장인이 카드 소득공제를 받으려면 최소 얼마 이상 사용해야 하나?',
    options: ['500만 원', '750만 원', '1,000만 원', '2,000만 원'],
    answerIndex: 2,
    explanation: '총 급여의 25%인 1,000만 원을 초과하여 사용해야 초과분부터 소득공제가 시작됩니다.',
  },

  // Card 34 - 현금영수증
  {
    type: 'ox',
    cardId: 34,
    question: '현금영수증의 소득공제율은 신용카드보다 낮다.',
    answer: false,
    explanation: '현금영수증의 소득공제율은 30%로, 신용카드(15%)의 두 배입니다.',
  },
  {
    type: 'multiple',
    cardId: 34,
    question: '현금영수증의 소득공제율은?',
    options: ['10%', '15%', '30%', '50%'],
    answerIndex: 2,
    explanation: '현금영수증의 소득공제율은 30%로, 체크카드와 같은 수준이며 신용카드(15%)의 두 배입니다.',
  },

  // Card 35 - 해외주식 양도소득세
  {
    type: 'ox',
    cardId: 35,
    question: '해외 주식으로 연간 100만 원 수익을 올리면 양도소득세를 내야 한다.',
    answer: false,
    explanation: '해외 주식 양도소득은 연간 250만 원까지 기본공제가 적용되어 세금이 없습니다.',
  },
  {
    type: 'multiple',
    cardId: 35,
    question: '해외주식 양도소득세의 세율은?',
    options: ['10%', '15.4%', '22%', '33%'],
    answerIndex: 2,
    explanation: '해외주식 양도소득세는 기본공제 250만 원 초과분에 대해 22%(지방소득세 포함)가 부과됩니다.',
  },

  // Card 36 - 환전 스프레드
  {
    type: 'ox',
    cardId: 36,
    question: '환전 우대 90%는 환전 비용의 90%를 줄여준다는 뜻이다.',
    answer: true,
    explanation: '환전 우대 90%는 매수/매도 환율의 스프레드(차이)를 90% 할인해준다는 의미입니다.',
  },
  {
    type: 'multiple',
    cardId: 36,
    question: '해외 투자 시 환전 비용을 줄이는 가장 좋은 방법은?',
    options: ['공항에서 환전', '환전 우대율이 높은 증권사 이용', '현금으로 환전', '여행사를 통해 환전'],
    answerIndex: 1,
    explanation: '증권사 앱에서 환전 우대 90~95%를 적용받으면 환전 비용을 대폭 절감할 수 있습니다.',
  },

  // Card 37 - 배당소득세
  {
    type: 'ox',
    cardId: 37,
    question: '국내 주식 배당금은 세금 없이 전액 입금된다.',
    answer: false,
    explanation: '국내 배당금에는 15.4%의 배당소득세가 원천징수되어 차감 후 입금됩니다.',
  },
  {
    type: 'multiple',
    cardId: 37,
    question: '국내 배당소득세 및 이자소득세의 원천징수 세율은?',
    options: ['10%', '15.4%', '22%', '33%'],
    answerIndex: 1,
    explanation: '국내 배당·이자 소득에는 15.4%(소득세 14% + 지방소득세 1.4%)가 자동 원천징수됩니다.',
  },

  // Card 38 - 반도체 ETF
  {
    type: 'ox',
    cardId: 38,
    question: '반도체 ETF는 삼성전자 한 종목에만 투자하는 상품이다.',
    answer: false,
    explanation: '반도체 ETF는 삼성전자뿐 아니라 SK하이닉스, TSMC, 엔비디아 등 여러 반도체 기업에 분산 투자합니다.',
  },
  {
    type: 'multiple',
    cardId: 38,
    question: '반도체 섹터 ETF에 투자하는 가장 큰 장점은?',
    options: ['원금 보장', '개별 종목 위험을 분산하면서 핵심 산업에 투자', '세금 면제', '무위험 수익'],
    answerIndex: 1,
    explanation: '섹터 ETF는 특정 산업 내 여러 기업에 분산 투자하므로 개별 종목 리스크를 줄일 수 있습니다.',
  },

  // Card 39 - 레버리지 / 인버스
  {
    type: 'ox',
    cardId: 39,
    question: '레버리지 ETF는 횡보장에서도 가치가 보존된다.',
    answer: false,
    explanation: '레버리지 ETF는 횡보장에서도 변동성 전이(Volatility Decay) 현상으로 가치가 점점 깎입니다.',
  },
  {
    type: 'multiple',
    cardId: 39,
    question: '레버리지 ETF 2배 상품의 특징으로 맞는 것은?',
    options: ['항상 2배 수익 보장', '지수 상승 시 2배 수익, 하락 시 2배 손실', '원금이 보장된다', '장기 투자에 최적화'],
    answerIndex: 1,
    explanation: '레버리지 2배 ETF는 기초 지수가 오르면 2배 수익이지만, 떨어지면 2배 손실을 봅니다.',
  },

  // Card 40 - 마이너스 통장
  {
    type: 'ox',
    cardId: 40,
    question: '마이너스 통장은 일반 대출보다 금리가 보통 낮다.',
    answer: false,
    explanation: '마이너스 통장은 편의성이 높지만, 일반 대출보다 금리가 높은 경우가 많습니다.',
  },
  {
    type: 'multiple',
    cardId: 40,
    question: '마이너스 통장의 가장 큰 위험은?',
    options: ['해외 송금 불가', '내 돈처럼 착각해 소비 습관이 망가짐', '이자가 없다', '해지가 어렵다'],
    answerIndex: 1,
    explanation: '한 번 쓰기 시작하면 대출금을 내 돈인 줄 착각하고 소비 습관이 망가지기 쉬운 것이 가장 큰 위험입니다.',
  },
];

/** 카드 20장에서 무작위로 3문항을 뽑되, OX와 객관식을 섞는다 */
export function pickRandomQuestions(count: number = 3): Question[] {
  // 카드 ID를 셔플해서 count개 선택
  const cardIds = Array.from({ length: 40 }, (_, i) => i + 1);
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
