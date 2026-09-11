import { describe, expect, it } from 'vitest';

// Smoke test for the unit-test harness itself. Real coverage starts with
// lib/gestation.ts (see PRD section 6 acceptance tests).
describe('test harness', () => {
  it('runs with the timezone pinned to Asia/Seoul', () => {
    expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toBe('Asia/Seoul');
  });
});
