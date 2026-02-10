import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { StreakData } from '../store/streakStore';

interface StreakBannerProps {
  streak: StreakData;
}

function getStreakEmoji(days: number): string {
  if (days >= 30) return '👑';
  if (days >= 14) return '💎';
  if (days >= 7) return '🔥';
  if (days >= 3) return '⚡';
  if (days >= 1) return '✅';
  return '💤';
}

function getStreakMessage(days: number): string {
  if (days >= 30) return '놀라워요! 한 달 넘게 연속 학습 중!';
  if (days >= 14) return '대단해요! 2주 연속 학습 달성!';
  if (days >= 7) return '멋져요! 일주일 연속 학습 중!';
  if (days >= 3) return '좋은 습관이 만들어지고 있어요!';
  if (days >= 1) return '오늘도 학습 완료! 내일도 도전!';
  return '오늘 첫 퀴즈를 풀어보세요!';
}

function getStreakGradient(days: number): string[] {
  if (days >= 7) return ['#FF6B35', '#FF8C42'];
  if (days >= 3) return ['#4A90D9', '#5BA3EC'];
  if (days >= 1) return ['#43A047', '#66BB6A'];
  return ['#9E9E9E', '#BDBDBD'];
}

export default function StreakBanner({ streak }: StreakBannerProps) {
  const emoji = getStreakEmoji(streak.currentStreak);
  const message = getStreakMessage(streak.currentStreak);
  const [bgColor] = getStreakGradient(streak.currentStreak);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.topRow}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={styles.streakInfo}>
          <Text style={styles.streakLabel}>
            {streak.currentStreak > 0
              ? `연속 ${streak.currentStreak}일 학습 중`
              : '학습을 시작해보세요'}
          </Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{streak.currentStreak}</Text>
          <Text style={styles.statLabel}>현재 연속</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{streak.bestStreak}</Text>
          <Text style={styles.statLabel}>최고 기록</Text>
        </View>
      </View>

      {/* Visual streak dots (last 7 days) */}
      <View style={styles.dotsRow}>
        {Array.from({ length: 7 }).map((_, i) => {
          const dayIndex = 6 - i; // 0 = today, 6 = 6 days ago
          const filled = dayIndex < streak.currentStreak;
          return (
            <View key={i} style={styles.dotWrapper}>
              <View style={[styles.dot, filled ? styles.dotFilled : styles.dotEmpty]} />
              <Text style={styles.dotLabel}>
                {dayIndex === 0 ? '오늘' : `${dayIndex}일전`}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 40,
    marginRight: 14,
  },
  streakInfo: {
    flex: 1,
  },
  streakLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  message: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dotWrapper: {
    alignItems: 'center',
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: 4,
  },
  dotFilled: {
    backgroundColor: '#fff',
  },
  dotEmpty: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  dotLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.7)',
  },
});
