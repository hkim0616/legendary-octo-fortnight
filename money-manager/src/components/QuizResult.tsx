import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import badgeDefinitions from '../data/badges';

interface QuizResultProps {
  correctCount: number;
  totalCount: number;
  passed: boolean;
  newBadgeIds: number[];
  streakDays: number;
  onRetry: () => void;
  onGoHome: () => void;
}

export default function QuizResult({
  correctCount,
  totalCount,
  passed,
  newBadgeIds,
  streakDays,
  onRetry,
  onGoHome,
}: QuizResultProps) {
  const score = Math.round((correctCount / totalCount) * 100);
  const isPerfect = correctCount === totalCount;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
    >
      <View style={styles.scoreCard}>
        <Text style={styles.emoji}>{isPerfect ? '🎉' : score >= 50 ? '👍' : '💪'}</Text>
        <Text style={styles.title}>퀴즈 완료!</Text>
        <Text style={styles.scoreText}>
          {totalCount}문제 중 {correctCount}문제 정답
        </Text>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreNumber}>{score}</Text>
          <Text style={styles.scoreUnit}>점</Text>
        </View>

        {passed && streakDays > 0 && (
          <View style={styles.streakNotice}>
            <Text style={styles.streakNoticeText}>
              🔥 연속 {streakDays}일 학습 달성!
            </Text>
          </View>
        )}

        {!passed && (
          <View style={styles.failNotice}>
            <Text style={styles.failNoticeText}>
              2문제 이상 맞혀야 통과입니다. 다시 도전해보세요!
            </Text>
          </View>
        )}

        <Text style={styles.message}>
          {isPerfect
            ? '완벽해요! 금융 지식이 훌륭합니다!'
            : passed
            ? '잘했어요! 조금만 더 공부하면 완벽해요!'
            : '카드를 다시 읽고 도전해보세요!'}
        </Text>
      </View>

      {/* Newly earned badges */}
      {newBadgeIds.length > 0 && (
        <View style={styles.newBadges}>
          <Text style={styles.newBadgesTitle}>🏅 새 배지 획득!</Text>
          {newBadgeIds.map((id) => {
            const badge = badgeDefinitions.find((b) => b.cardId === id);
            if (!badge) return null;
            return (
              <View
                key={id}
                style={[styles.badgeRow, { backgroundColor: badge.color }]}
              >
                <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
                <View style={styles.badgeInfo}>
                  <Text style={styles.badgeName}>{badge.name}</Text>
                  <Text style={styles.badgeDesc}>{badge.description}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.retryButton} onPress={onRetry} activeOpacity={0.8}>
          <Text style={styles.retryButtonText}>다시 풀기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeButton} onPress={onGoHome} activeOpacity={0.8}>
          <Text style={styles.homeButtonText}>홈으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  scoreCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4A90D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreUnit: {
    fontSize: 14,
    color: '#fff',
    marginTop: -4,
  },
  streakNotice: {
    backgroundColor: '#FFF3E0',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },
  streakNoticeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E65100',
  },
  failNotice: {
    backgroundColor: '#FFEBEE',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },
  failNoticeText: {
    fontSize: 13,
    color: '#C62828',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 24,
  },
  newBadges: {
    marginTop: 16,
  },
  newBadgesTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
    textAlign: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  badgeEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  badgeDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  buttons: {
    marginTop: 24,
    gap: 12,
    paddingBottom: 16,
  },
  retryButton: {
    backgroundColor: '#4A90D9',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#333',
    fontSize: 17,
    fontWeight: '600',
  },
});
