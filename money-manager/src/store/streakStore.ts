import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Types ───────────────────────────────────────────────

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastPassDate: string | null; // 'YYYY-MM-DD'
}

export interface BadgeData {
  /** cardId -> first earned date ('YYYY-MM-DD') */
  earned: Record<number, string>;
}

export interface UserStats {
  totalQuizzes: number;
  totalCorrect: number;
  totalQuestions: number;
}

// ─── Keys ────────────────────────────────────────────────

const STREAK_KEY = '@money_manager/streak';
const BADGE_KEY = '@money_manager/badges';
const STATS_KEY = '@money_manager/stats';

// ─── Helpers ─────────────────────────────────────────────

function getToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// ─── Streak ──────────────────────────────────────────────

const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  bestStreak: 0,
  lastPassDate: null,
};

export async function getStreak(): Promise<StreakData> {
  const raw = await AsyncStorage.getItem(STREAK_KEY);
  if (!raw) return { ...DEFAULT_STREAK };
  const data: StreakData = JSON.parse(raw);

  // If last pass was before yesterday, streak is broken
  const today = getToday();
  const yesterday = getYesterday();
  if (
    data.lastPassDate &&
    data.lastPassDate !== today &&
    data.lastPassDate !== yesterday
  ) {
    const reset: StreakData = {
      currentStreak: 0,
      bestStreak: data.bestStreak,
      lastPassDate: data.lastPassDate,
    };
    await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(reset));
    return reset;
  }

  return data;
}

/**
 * Record a quiz pass for today.
 * Returns the updated streak data.
 * Pass threshold: correctCount >= passThreshold
 */
export async function recordQuizPass(): Promise<StreakData> {
  const prev = await getStreak();
  const today = getToday();

  // Already passed today – no double counting
  if (prev.lastPassDate === today) {
    return prev;
  }

  const yesterday = getYesterday();
  const isConsecutive = prev.lastPassDate === yesterday;

  const newStreak = isConsecutive ? prev.currentStreak + 1 : 1;
  const newBest = Math.max(newStreak, prev.bestStreak);

  const updated: StreakData = {
    currentStreak: newStreak,
    bestStreak: newBest,
    lastPassDate: today,
  };

  await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(updated));
  return updated;
}

// ─── Badges ──────────────────────────────────────────────

export async function getBadges(): Promise<BadgeData> {
  const raw = await AsyncStorage.getItem(BADGE_KEY);
  if (!raw) return { earned: {} };
  return JSON.parse(raw);
}

/**
 * Award badges for correctly answered card topics.
 * @param cardIds - card IDs the user answered correctly in this quiz session
 * @returns list of *newly* earned card IDs
 */
export async function awardBadges(cardIds: number[]): Promise<number[]> {
  const data = await getBadges();
  const today = getToday();
  const newlyEarned: number[] = [];

  for (const id of cardIds) {
    if (!data.earned[id]) {
      data.earned[id] = today;
      newlyEarned.push(id);
    }
  }

  if (newlyEarned.length > 0) {
    await AsyncStorage.setItem(BADGE_KEY, JSON.stringify(data));
  }

  return newlyEarned;
}

// ─── Stats ───────────────────────────────────────────────

export async function getStats(): Promise<UserStats> {
  const raw = await AsyncStorage.getItem(STATS_KEY);
  if (!raw) return { totalQuizzes: 0, totalCorrect: 0, totalQuestions: 0 };
  return JSON.parse(raw);
}

export async function recordQuizStats(
  correct: number,
  total: number
): Promise<UserStats> {
  const prev = await getStats();
  const updated: UserStats = {
    totalQuizzes: prev.totalQuizzes + 1,
    totalCorrect: prev.totalCorrect + correct,
    totalQuestions: prev.totalQuestions + total,
  };
  await AsyncStorage.setItem(STATS_KEY, JSON.stringify(updated));
  return updated;
}

// ─── Reset (for dev/testing) ─────────────────────────────

export async function resetAll(): Promise<void> {
  await AsyncStorage.multiRemove([STREAK_KEY, BADGE_KEY, STATS_KEY]);
}
