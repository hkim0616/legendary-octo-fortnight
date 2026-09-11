# 40weeks

## Product

A Korea-first pregnancy companion that turns the two dates on the hospital slip
(분만예정일 + 임신확인일) into a personalized 40-week calendar of what to do, when,
and why it matters — 의료(검진), 행정(정부 지원 신청), 준비(물건·예약) — with hard
deadlines flagged.

The full product definition lives in `docs/PRD.md`. When the PRD and this file
disagree on product behavior, the PRD wins; when they disagree on engineering
convention, this file wins.

## Stack

- **Expo SDK 57** (React Native 0.86, React 19.2), TypeScript strict
- **expo-router** — file-based routing, typed routes enabled
- **iOS first.** Android and web build, but iOS is the platform decisions are made for.
- **expo-sqlite** — local-first persistence (the app works with no account)
- **expo-notifications** — local scheduled reminders (weekly + hard-deadline D-3)
- **expo-linking**, **expo-web-browser** — external 신청 links open out of the app
- **date-fns** — all date arithmetic
- **zustand** — client state
- **ESLint** (eslint-config-expo, flat config) + **Prettier** + **Vitest**

App identity: name `40weeks`, slug `fortyweeks`, bundle id `com.hkim0616.fortyweeks`.

## Directory layout

The Expo app lives in `apps/fortyweeks/`. Paths below are relative to it.

```
apps/fortyweeks/
  app/            expo-router routes. File-based — a file here IS a URL.
  components/     Presentational components. No content strings, no week math.
  lib/            Pure TypeScript domain logic. No React, no imports from app/.
    gestation.ts  THE week-math module. See the rule below.
  content/        YAML content seeds (tasks, benefits, product bundles).
  db/             expo-sqlite schema, migrations, queries.
  stores/         zustand stores.
  tests/          Vitest unit tests.
  assets/images/  App icon, splash, adaptive icons.
```

`@/*` is a TypeScript path alias for the app root, e.g. `@/lib/gestation`.

## Rule: content lives in `/content` as YAML

All user-facing domain content — task templates, 정부지원 programs, product
bundles, week copy — lives in `content/*.yaml` and is loaded through a typed
loader. **Never hardcode this content in components.**

- A component receives content as props or reads it from the loader. It never
  contains a task title, a 마감 date, a 신청 URL, or a benefit amount as a literal.
- `TaskTemplate.id` is a stable slug. Never renumber or reuse one — `UserTask`
  completion state is keyed on it and survives EDD edits.
- Every 행정/정부지원 entry carries `source_url` and `verified_at`. Content missing
  them must fail validation, not ship.

Rationale: the to-do list is the product, and it changes every year when
government support amounts and deadlines change. Editing it must never require
touching logic or re-testing components.

UI chrome that is not domain content (button labels like "확인", "취소", a11y
labels) may live in components.

## Rule: all gestational-week math goes through `lib/gestation.ts`

Every derivation of 주차, 일차, D-day, task due dates, or 출산임박 state goes
through `lib/gestation.ts`. **Nowhere else.** No component, store, route, or
query recomputes it, and nothing else calls `Date.now()` for pregnancy state.

The contract (PRD §6):

```
LMP_anchor       = EDD - 280 days            // W0D0
days_pregnant    = today - LMP_anchor
gestational_week = floor(days_pregnant / 7)  // 0-42
gestational_day  = days_pregnant % 7
display          = `${week}주 ${day}일`
d_day_to_birth   = EDD - today
```

- **EDD is the only input to week math.** 임신확인일 is stored and used for
  바우처 신청 기준, timeline markers, and back-dating already-passed tasks — it
  never drives the week calculation. LMP is never collected.
- **Timezone is fixed to `Asia/Seoul`.** All date math is date-only, with no time
  component, to avoid off-by-one at midnight. Never use the device timezone.
- Display clamps at W42; past EDD the app switches to 출산 임박/산후 모드.
- EDD is editable. An edit recomputes every task window and **preserves completion
  state by `task_id`**.

Changes to this file require the PRD §6 acceptance tests to pass. `lib/gestation.ts`
is pure: no React, no I/O, no ambient clock — `today` is passed in, so tests can
pin it.

## Korean UI, English code

- **All user-facing strings are Korean (ko-KR).** Copy, labels, errors, notification
  text, empty states.
- **All code is English.** Identifiers, file names, types, comments, commit messages,
  PR titles and bodies, test names.
- Domain nouns that are Korean concepts keep a romanized English identifier with the
  Korean term in the content layer — e.g. `benefitProgram`, not `지원제도`, while the
  displayed `name` in `content/benefits.yaml` is Korean.
- Category and action enums are stored as the Korean values the PRD defines
  (`의료 | 행정 | 준비 | 생활`) because they are content, and are typed as string
  literal unions in English-named types.

## Build / test commands

Run from `apps/fortyweeks/`.

```bash
npm install          # install dependencies

npm start            # Expo dev server
npm run ios          # dev server, open iOS (primary target)
npm run android
npm run web

npm run typecheck    # tsc --noEmit
npm run lint         # eslint .
npm run lint:fix
npm run format       # prettier --write .
npm run format:check
npm test             # vitest run
npm run test:watch
```

Before committing, `npm run typecheck && npm run lint && npm run format:check && npm test`
must all pass.

Vitest pins `TZ=Asia/Seoul` in `vitest.config.ts` so date tests do not inherit the
machine timezone.

## Compliance constraints that affect code (PRD §11–12)

- 임신·건강 정보 is 민감정보: separate consent screen, consent timestamp stored, and a
  local-storage-only fallback when consent is declined.
- No name, phone, or address collection. Region granularity stops at 시군구.
- Medical disclaimer is persistent UI, not a one-time modal.
- Coupang Partners: **no runtime API calls** (quota risk) — curate into the DB ahead
  of time and read only the DB. HMAC keys are server-side only and must never enter
  the client bundle.
