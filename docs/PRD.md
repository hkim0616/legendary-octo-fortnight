# PRD — 임신 주차별 To-Do 캘린더 (working title: **40weeks**)

> Build spec written for Claude Code execution. Sections 1–5 are product definition; Sections 6–12 are implementation contracts; Section 13 is the build sequence you can turn into step-by-step commands.

---

## 1. TL;DR

A Korea-first pregnancy companion that converts **two dates from the hospital slip (분만예정일 + 임신확인일)** into a personalized 40-week calendar of *what to do, when, and why it matters*. Each week surfaces three task types — 의료(검진), 행정(정부 지원 신청), 준비(물건·예약) — with hard deadlines flagged. Monetization is Coupang Partners affiliate on week-timed product bundles, plus a shareable **baby wishlist** (registry), a category that effectively does not exist in Korea.

---

## 2. Problem & Context

| Pain | Today | Consequence |
|---|---|---|
| Info is scattered | 맘카페, 블로그, 유튜브, 정부24, 병원 안내문 각각 분산 | 산모가 매주 직접 검색해야 함 |
| Timing is invisible | "언제까지 해야 하는지"가 문서에 없음 | 마감이 있는 혜택(바우처 사용기한, 근로시간 단축 12주 이내)을 놓침 |
| 정부 지원 인지율 낮음 | 지원 제도가 부처·지자체별로 분산, 지자체 지원은 특히 모름 | 받을 수 있는 지원을 못 받음 |
| 준비물 판단 어려움 | 초산모는 무엇을 언제 사야 하는지 기준 없음 | 과소비 또는 막판 급구매 |
| 선물 조율 안 됨 | 한국에 baby registry 문화·서비스 부재 | 중복 선물, 원하지 않는 제품 수령 |

**Why now / why this shape:** the two dates on the 임신확인서 are a near-universal, high-confidence trigger. Every downstream schedule (검진 주기, 바우처 신청, 조리원 예약, 육아휴직 협의) can be derived from them without asking the user anything else.

---

## 3. Industry Benchmarks

| Service | Market | Strength | Gap this product exploits |
|---|---|---|---|
| 베이비타임 / 마미톡 / 아이보리 | KR | 초음파 공유, 태동·수유 기록 | 임신 중 **행정·준비 to-do**가 약함 |
| What to Expect / Ovia / Flo | US | 주차별 콘텐츠, 태아 발달 | 한국 정부지원·조리원·산부인과 체계 미반영 |
| Babylist / Amazon Baby Registry | US | 멀티 스토어 registry + 어필리에이트 수익모델 | 한국 미진출, 카카오 공유 기반 UX 없음 |
| 정부24 맘편한임신 | KR | 원스톱 신청 | 알림·캘린더·리마인드 없음, 진입 후 이탈 |

**Read:** KR apps own *기록(logging)*, US apps own *가이드+registry*. The unoccupied position is **가이드 + 행정 + registry, 한국 규격**.

---

## 4. Hypothesis

> If a user enters only 분만예정일 and 임신확인일, and we show her a weekly card containing (a) this week's 검진, (b) any 신청 마감이 임박한 정부 지원, (c) 지금 예약/구매해야 할 것 — then weekly retention will exceed generic pregnancy-content apps, and affiliate conversion will be materially higher than untimed product feeds because the recommendation arrives at the moment of intent (e.g. 출산가방 at W32, not at W12).

---

## 5. Scope by Phase

| Phase | Scope | Ships |
|---|---|---|
| **P0 — MVP** | Onboarding(2 dates) → 40주 캘린더 → 주차별 to-do → 체크/완료 → 로컬 푸시 알림 | Core loop, no revenue |
| **P1 — 정부지원** | 지원제도 데이터셋, 지역(시군구) 개인화, 마감 D-day 알림, 신청 링크 | Retention + word of mouth |
| **P2 — 커머스** | 주차별 큐레이션 상품, 쿠팡 파트너스 딥링크, 구매 체크리스트 | Revenue on |
| **P3 — Wishlist** | 위시리스트 생성 → 카카오 공유 → 선물자 "찜/구매완료" 표시(비로그인) | Viral loop + revenue |
| **P4 — later** | 배우자 초대·공유, 산후 100일 모드, 병원/조리원 리뷰, 커뮤니티 | — |

**Non-goals (v1):** 의료 상담·진단, 태아 발달 3D 콘텐츠, 자체 결제/에스크로(선물 대금 대납), 커뮤니티 게시판, 다국어.

---

## 6. Core Engine — 주차 계산 (the single most important logic)

Everything derives from **EDD (분만예정일)**. Do not ask for LMP.

```
LMP_anchor      = EDD - 280 days            // W0D0
days_pregnant   = today - LMP_anchor
gestational_week = floor(days_pregnant / 7)  // 0-42
gestational_day  = days_pregnant % 7
display          = `${week}주 ${day}일`       // e.g. "12주 3일" (W12+3)
d_day_to_birth   = EDD - today
```

**Rules**
- 임신확인일 is stored and used for (a) 바우처 신청 시작 기준, (b) 회고용 타임라인 마커, (c) onboarding에서 "이미 지난 주차" 태스크를 과거 상태로 표시. It does **not** drive week math.
- Support editing EDD later (병원에서 예정일 조정은 흔함) → recompute all task dates, preserve completion state by `task_id`.
- Clamp display at W42; after EDD passes, switch home to **출산 임박/산후 모드**.
- Timezone fixed to `Asia/Seoul`, all date math on date-only (no time component) to avoid off-by-one.

**Acceptance tests (write these first):**
| Input | Expect |
|---|---|
| EDD = today + 238d | 6주 0일 |
| EDD = today + 1d | 39주 6일 |
| EDD = today - 3d | 40주 3일, 출산임박 모드 |
| EDD edited +7d | 모든 task window +7d, 완료 상태 유지 |

---

## 7. Data Model

```
User
  id, nickname, created_at
  edd (date, required)
  confirmed_at (date, required)          // 임신확인일
  is_multiple (bool, default false)      // 다태아
  region_code (string, nullable)         // 시군구 코드 — 지자체 지원 개인화
  is_employed (bool, nullable)           // 근로자 대상 제도 노출 여부
  is_first_baby (bool, nullable)
  consent_health_data_at (timestamp)     // 민감정보 별도 동의 시각 (Section 11)

TaskTemplate                              // content, seeded from YAML/JSON, not user-generated
  id (slug, stable — never renumber)
  title, summary, why_it_matters
  category: 의료 | 행정 | 준비 | 생활
  action_type: 예약 | 신청 | 검진 | 구매 | 준비 | 확인
  week_start (int), week_end (int)        // 노출/수행 권장 구간
  deadline_type: hard | recommended       // hard = 놓치면 혜택 소멸
  priority: 1|2|3
  external_links[] {label, url}
  product_tags[]                          // → ProductBundle 조인 키
  conditions {is_multiple?, is_employed?, region_code?, is_first_baby?}
  source_url, verified_at                 // 콘텐츠 신뢰성 필수 필드

UserTask                                  // materialized per user on signup + on EDD edit
  id, user_id, template_id
  due_start_date, due_end_date            // week_start/end → 실제 날짜로 변환
  status: todo | done | skipped | na
  completed_at, user_memo

BenefitProgram                            // 행정 카테고리의 확장 엔티티
  id, name, provider (중앙/지자체), amount_text, eligibility_text
  apply_channel[] {name, url}
  window_start_week, window_end_week, expiry_rule_text
  region_code (nullable = 전국)
  source_url, verified_at

ProductBundle                             // 주차별 큐레이션
  id, title, week_start, week_end, tags[]
  items[] {name, why, price_range_text, coupang_product_id, deeplink_url, image_url, updated_at}

Wishlist / WishlistItem                   // Section 10
```

**Content is data, not code.** Seed files live in `/content/*.yaml` and are loaded at build time so you can edit the to-do list without touching logic.

---

## 8. Screens

| Screen | Purpose | Must contain |
|---|---|---|
| **Onboarding** | 2-date input | 분만예정일 / 임신확인일 캘린더 피커, 다태아·지역·근로여부(스킵 가능), 민감정보 동의 체크, "임신확인서 보고 입력하세요" 안내 |
| **Home (This Week)** | 매주 재방문 이유 | 현재 주차 배지(12주 3일 · D-196), 이번 주 할 일 3~5개, 마감임박 배너, 태아 크기 한 줄 비유, 이번 주 준비물 카드 |
| **40주 타임라인** | 전체 조망 | 세로 스크롤 1~40주, 주차별 미완료 개수 뱃지, 지난 주차 접힘, 현재 주차 자동 스크롤 |
| **월 캘린더** | 날짜 기반 조회 | 검진일·마감일 마커, 사용자 추가 일정(병원 예약일) |
| **Task Detail** | 실행 | 왜 필요한지, 마감, 신청 링크(외부 브라우저), 관련 상품, 완료 체크, 메모 |
| **정부지원 탭** | 인지율 문제 해결 | 전국/우리지역 분리, 신청 가능/마감임박/신청완료 상태, 원스톱 링크 |
| **준비물 체크리스트** | 커머스 진입점 | 카테고리별(출산가방/신생아/수유/외출), 보유·구매완료 체크, 상품 추천, 위시리스트 담기 |
| **위시리스트** | P3 | 리스트 생성, 공유 링크, 선물자 뷰 |

**UX rules**
- Home은 **5개 이하** 태스크만 노출. 40주 전체를 보여주면 즉시 압도됨.
- 모든 태스크에 `왜 필요한지` 1줄 필수 — 이게 없으면 체크리스트일 뿐 가이드가 아님.
- 지난 주차 미완료 태스크는 "지난 할 일"로 별도 접기(죄책감 최소화), 자동 삭제 금지.
- 의료 정보는 항상 "담당 의료진 안내 우선" 문구와 함께.

---

## 9. 콘텐츠 시드 (starter — 본인이 확정할 리스트의 뼈대)

> ⚠️ **모든 항목의 금액·기한·요건은 배포 전 공식 출처(정부24, 국민건강보험공단, 보건복지부, 관할 지자체)에서 재확인하고 `verified_at`을 기록할 것.** 정부 지원 금액은 매년 변동되며, 다태아 지원 금액은 출처마다 상이하게 표기되고 있음 — 반드시 공단 고시 기준으로 확정.

| 주차 | 카테고리 | 태스크 | 유형 | 비고 |
|---|---|---|---|---|
| 5–7 | 의료 | 산부인과 초진 · 임신확인서 발급 | 검진 | 모든 흐름의 시작점 |
| 5–7 | 행정 | 국민행복카드 발급 + 임신·출산 진료비 바우처 신청 | 신청 | hard — 사용기한 존재 |
| 5–7 | 행정 | 정부24 '맘편한임신' 원스톱 서비스 신청 | 신청 | 지자체 지원 일괄 확인 |
| **6–10** | **준비** | **산후조리원 예약 (1순위)** | **예약** | 인기 조리원 조기 마감, 취소 가능 → "먼저 잡고 나중에 결정" |
| 6–12 | 행정 | 임신기 근로시간 단축 신청 (12주 이내 구간) | 신청 | hard — 기간 놓치면 소멸, `is_employed` 조건부 |
| 6–12 | 생활 | 엽산 복용 / 금기 식품·약물 확인 | 준비 | 상품 태그: 엽산, 임산부 영양제 |
| 8–12 | 행정 | 산모수첩 수령 · 임산부 배지 신청 | 확인 | 지자체·지하철 배포처 |
| 10–13 | 의료 | 1차 기형아 검사 / 목투명대(NT) / NIPT 상담 | 검진 | 시기 고정 |
| 12–16 | 준비 | 태아보험 비교·가입 검토 | 준비 | 가입 가능 시기 제한 있음 |
| 14–18 | 준비 | 임부복 · 튼살 관리 시작 | 구매 | 상품 태그: 임부복, 튼살크림 |
| 16–20 | 의료 | 2차 기형아 검사 · 정밀초음파 | 검진 | |
| 16–20 | 준비 | 산후조리원 방문·계약 확정 | 예약 | W6 예약 건 확정 단계 |
| 20–24 | 생활 | 태교여행 / 배우자와 출산 계획 논의 | 준비 | |
| 24–28 | 의료 | 임신성 당뇨 검사 | 검진 | 시기 고정 |
| 24–30 | 준비 | 출산준비물 리스트 작성 · **위시리스트 생성** | 준비 | P3 진입점 |
| 26–32 | 행정 | 회사 출산휴가·육아휴직 협의 및 신청 일정 확인 | 신청 | `is_employed` |
| 28–34 | 준비 | 신생아 대용품 구매 (카시트, 아기침대, 수유용품) | 구매 | 최대 객단가 구간 |
| 32–36 | 준비 | 출산가방 싸기 | 준비 | 상품 태그: 출산가방 |
| 35–37 | 의료 | GBS 검사 · 막달 검사 | 검진 | 시기 고정 |
| 36–40 | 의료 | 주 1회 정기검진 | 검진 | 반복 태스크 |
| 36–40 | 행정 | 출생신고·첫만남이용권·부모급여·아동수당 서류 사전 확인 | 확인 | 출산 후 즉시 필요 |
| 출산 후 | 행정 | 출생신고(기한 내) + 행복출산 원스톱 신청 | 신청 | hard |

---

## 10. Wishlist (P3) — 한국형 baby registry

**Design constraint: 앱이 돈을 만지지 않는다.** 선물 대금 대납·에스크로는 전자금융 이슈를 발생시키므로 v1에서 제외. 흐름은 *큐레이션 → 공유 → 쿠팡에서 각자 구매 → 앱에서 상태 표시*.

| 단계 | 동작 |
|---|---|
| 1. 생성 | 준비물 체크리스트 또는 상품 추천에서 "위시리스트 담기", 직접 항목 추가(제품명+링크+메모) 허용 |
| 2. 공유 | 공개 링크 생성 → 카카오톡 공유. 로그인 없이 열람 가능. 산모 개인정보(예정일 외) 비노출, 주소 요구 금지 |
| 3. 선물자 | 항목별 **"제가 준비할게요"** 토글 → 24h 소프트 홀드 → "구매 완료" 확정. 익명/닉네임 선택 가능 |
| 4. 산모 | 중복 방지 위해 누가 무엇을 맡았는지 **기본 숨김**(서프라이즈 유지) 옵션, 감사 인사용 리스트는 별도 |
| 5. 수익 | 선물자의 구매 링크에도 파트너스 딥링크 적용 (subId = `wishlist`) |

**Viral loop:** 공유 링크 방문자 → "나도 만들기" CTA. 이게 이 앱의 유일한 무료 획득 채널이므로 링크 페이지 품질이 곧 성장률.

---

## 11. 컴플라이언스 & 신뢰 (must be built in, not bolted on)

| 항목 | 요구사항 |
|---|---|
| **민감정보** | 임신·건강 정보는 개인정보보호법상 민감정보 → **별도 동의** 화면 분리, 동의 시각 저장, 목적·보유기간 명시, 동의 없으면 로컬 저장만으로 동작하는 폴백 제공 |
| **최소 수집** | 이름·연락처·주소 수집 금지. 지역은 시군구 단위까지만 |
| **삭제권** | 설정 내 "모든 데이터 삭제" 1스텝, 서버·로컬 동시 삭제, 30일 내 백업 파기 |
| **의료 면책** | 전 화면 하단 고정 문구: 본 정보는 일반 정보이며 진단·처방이 아님, 담당 의료진 안내 우선 |
| **정부지원 정확성** | 모든 BenefitProgram에 `source_url` + `verified_at` 필수, 앱 내 "최종 확인일" 노출, 90일 초과 시 관리자 대시보드에 경고 |
| **쿠팡 파트너스** | ① 제휴 활동 대가 수취 고지 문구를 상품 노출 화면마다 표시 ② 파트너스 이용약관·운영정책 준수(허위·과장 금지) ③ 가입 승인 후 API 키 발급 필요 |
| **광고 표기** | 추천 상품은 "제휴 링크" 뱃지로 콘텐츠와 시각적으로 구분 |
| **연령** | 만 14세 미만 가입 차단 |

---

## 12. 커머스 구현 제약 (Coupang Partners)

이건 설계 단계에서 반드시 반영해야 함 — 나중에 고치면 재작업이 큼.

| 제약 | 설계 대응 |
|---|---|
| 파트너스 검색 API는 호출 쿼터가 매우 타이트하고, 초과 시 계정 제한 위험이 보고됨 | **런타임 호출 금지.** 관리자가 사전 큐레이션 → DB 저장 → 앱은 DB만 조회 |
| 가격 필터 파라미터 미지원 | 가격대는 큐레이션 시 수기 입력(`price_range_text`), "실시간 가격 아님" 표기 |
| 인증은 HMAC-SHA256 서명 | 키는 서버 환경변수, **클라이언트 번들에 절대 노출 금지** — 딥링크 생성은 서버 라우트에서만 |
| 재고·가격 변동 | `updated_at` 기준 7일 초과 항목은 "가격 변동 가능" 표시, 주 1회 배치 갱신 |
| 성과 측정 | `subId`를 placement별로 부여: `home_w{n}`, `checklist_{category}`, `wishlist`, `task_{template_id}` |

---

## 13. 빌드 순서 (Claude Code 명령으로 쪼갤 단위)

각 스텝은 독립 커밋 + 테스트 통과 가능해야 함.

| Step | 산출물 | 완료 기준 |
|---|---|---|
| 1 | 프로젝트 셋업 (Next.js App Router + TypeScript + Tailwind + Supabase, PWA 설정) | 로컬 실행, 모바일 뷰포트 정상 |
| 2 | `lib/gestation.ts` — 주차 계산 엔진 + 단위 테스트 | Section 6 acceptance tests 전부 통과 |
| 3 | 콘텐츠 스키마 + `/content/tasks.yaml` 로더 + 검증 스크립트 | 잘못된 주차·중복 slug 시 빌드 실패 |
| 4 | DB 스키마 마이그레이션 + RLS 정책 | 타 사용자 데이터 조회 불가 테스트 통과 |
| 5 | 온보딩 플로우 (2 dates + 동의 + 조건 질문) → UserTask 생성 | 가입 후 현재 주차 태스크가 생성됨 |
| 6 | Home(This Week) 화면 | 주차 배지, 태스크 5개 이하, 완료 토글 동작 |
| 7 | 40주 타임라인 + Task Detail | 현재 주차 자동 스크롤, 지난 할 일 접힘 |
| 8 | EDD 수정 → 전체 재계산 (완료 상태 보존) | Step 2 테스트 케이스 4 통과 |
| 9 | 로컬 푸시/알림 (주 1회 + hard deadline D-3) | 알림 권한 거부 시에도 앱 정상 동작 |
| 10 | 정부지원 탭 + `/content/benefits.yaml` + 지역 필터 | `verified_at` 미기재 항목 빌드 차단 |
| 11 | 관리자 큐레이션 페이지 (상품 등록/딥링크 생성 서버 라우트) | API 키 클라이언트 미노출 검증 |
| 12 | 준비물 체크리스트 + 주차별 상품 카드 + 제휴 고지 문구 | subId 파라미터 정상 부착 |
| 13 | 위시리스트 생성/공유/선물자 뷰 (비로그인 접근) | 공유 링크에서 개인정보 미노출 |
| 14 | 설정 — 데이터 삭제, 동의 철회, 면책 문구 | 삭제 후 재로그인 시 데이터 없음 |

---

## 14. Success Metrics (parametric — 실측 후 수치 확정)

| Layer | Metric | 정의 |
|---|---|---|
| Activation | 온보딩 완료율 | 2-date 입력 완료 / 앱 실행 |
| Core value | **W1 재방문율** | 가입 주차 이후 다음 주에 Home 재진입 — 이 앱의 북극성 |
| Engagement | 주간 태스크 완료율 | 완료 태스크 / 해당 주 노출 태스크 |
| Benefit impact | 정부지원 신청 링크 클릭률 · hard-deadline 태스크 완료율 | 문제 해결 여부의 직접 지표 |
| Revenue | 상품 카드 CTR × 파트너스 전환율 × 평균 수수료 | placement별 subId로 분해 |
| Viral | 위시리스트 공유 1건당 신규 가입 수 (K) | 성장 채널 유일 |

**Revenue model (파라메트릭, 숫자는 실측으로 대체):**
`월 수익 = MAU × 상품카드 노출률 × CTR × 전환율 × 평균객단가 × 수수료율`
→ 임신 코호트는 **W24–36에 객단가가 집중**되므로, 초기에는 MAU보다 *후기 주차 사용자 비중*이 수익을 좌우함. 초기 획득을 임신 초기(W6)에 집중하되 리텐션이 30주까지 유지되지 않으면 수익화 가정이 붕괴함 — 이 구간의 이탈률을 최우선 계측할 것.

---

## 15. Feedback Loops

| 루프 | 방법 |
|---|---|
| 콘텐츠 정확성 | 각 태스크에 "정보가 틀렸어요" 신고 → 관리자 큐 |
| 태스크 적합성 | "이건 나에게 해당 없음" 스킵 사유 수집 → 조건부 노출 규칙 개선 |
| 상품 큐레이션 | 체크리스트 "직접 추가" 항목 수집 → 다음 큐레이션 후보 |
| 주차 이탈 | 주차별 이탈 지점 분석 → 해당 구간 콘텐츠 보강 |

---

## 16. Open Questions

1. 산후조리원 예약은 앱에서 **정보 제공만** 할 것인가, 제휴 예약으로 확장할 것인가 (수익 잠재력은 커머스보다 클 수 있음).
2. 배우자 공유를 P4가 아니라 P1로 올릴 것인가 — 준비물·행정 태스크는 배우자가 실행하는 비중이 높음.
3. 유산·사산 등 임신 중단 시나리오의 UX 처리 방침 (알림 즉시 중단 + 데이터 보존/삭제 선택지 제공은 최소 요건).
4. 정부지원 데이터의 갱신 주체 — 수기 관리 vs 공공데이터포털 API 연동 가능 여부 확인 필요.
