import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface QuizResultProps {
  correctCount: number;
  totalCount: number;
  onRetry: () => void;
  onGoHome: () => void;
}

export default function QuizResult({
  correctCount,
  totalCount,
  onRetry,
  onGoHome,
}: QuizResultProps) {
  const score = Math.round((correctCount / totalCount) * 100);
  const isPerfect = correctCount === totalCount;

  return (
    <View style={styles.container}>
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
        <Text style={styles.message}>
          {isPerfect
            ? '완벽해요! 금융 지식이 훌륭합니다!'
            : score >= 50
            ? '잘했어요! 조금만 더 공부하면 완벽해요!'
            : '카드를 다시 읽고 도전해보세요!'}
        </Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.retryButton} onPress={onRetry} activeOpacity={0.8}>
          <Text style={styles.retryButtonText}>다시 풀기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeButton} onPress={onGoHome} activeOpacity={0.8}>
          <Text style={styles.homeButtonText}>홈으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 20,
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
  message: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttons: {
    marginTop: 32,
    gap: 12,
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
