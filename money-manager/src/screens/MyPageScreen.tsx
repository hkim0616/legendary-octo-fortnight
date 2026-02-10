import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import StreakBanner from '../components/StreakBanner';
import BadgeGrid from '../components/BadgeGrid';
import {
  getStreak,
  getBadges,
  getStats,
  resetAll,
  StreakData,
  BadgeData,
  UserStats,
} from '../store/streakStore';

export default function MyPageScreen() {
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    bestStreak: 0,
    lastPassDate: null,
  });
  const [badges, setBadges] = useState<BadgeData>({ earned: {} });
  const [stats, setStats] = useState<UserStats>({
    totalQuizzes: 0,
    totalCorrect: 0,
    totalQuestions: 0,
  });

  // Refresh data every time the tab comes into focus
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const [s, b, st] = await Promise.all([
          getStreak(),
          getBadges(),
          getStats(),
        ]);
        setStreak(s);
        setBadges(b);
        setStats(st);
      })();
    }, [])
  );

  const accuracy =
    stats.totalQuestions > 0
      ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100)
      : 0;

  const handleReset = () => {
    Alert.alert(
      '데이터 초기화',
      '모든 학습 기록, 배지, 연속 학습 데이터가 삭제됩니다.\n정말 초기화하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '초기화',
          style: 'destructive',
          onPress: async () => {
            await resetAll();
            setStreak({ currentStreak: 0, bestStreak: 0, lastPassDate: null });
            setBadges({ earned: {} });
            setStats({ totalQuizzes: 0, totalCorrect: 0, totalQuestions: 0 });
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Streak Banner */}
      <StreakBanner streak={streak} />

      {/* Quick Stats */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>학습 통계</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalQuizzes}</Text>
            <Text style={styles.statLabel}>총 퀴즈</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalCorrect}</Text>
            <Text style={styles.statLabel}>정답 수</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{accuracy}%</Text>
            <Text style={styles.statLabel}>정답률</Text>
          </View>
        </View>
      </View>

      {/* Badge Collection */}
      <BadgeGrid badges={badges} />

      {/* Reset Button */}
      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleReset}
        activeOpacity={0.7}
      >
        <Text style={styles.resetButtonText}>학습 데이터 초기화</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingBottom: 40,
  },
  // Stats
  statsCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90D9',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E0E0E0',
  },
  // Reset
  resetButton: {
    marginHorizontal: 16,
    marginTop: 32,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  resetButtonText: {
    fontSize: 14,
    color: '#999',
  },
});
