import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface OXQuestionProps {
  question: string;
  onAnswer: (answer: boolean) => void;
  disabled: boolean;
  selectedAnswer: boolean | null;
  correctAnswer: boolean;
}

export default function OXQuestion({
  question,
  onAnswer,
  disabled,
  selectedAnswer,
  correctAnswer,
}: OXQuestionProps) {
  const getButtonStyle = (value: boolean) => {
    if (selectedAnswer === null) return styles.oxButton;
    if (selectedAnswer === value) {
      return value === correctAnswer
        ? [styles.oxButton, styles.oxCorrect]
        : [styles.oxButton, styles.oxWrong];
    }
    if (disabled && value === correctAnswer) {
      return [styles.oxButton, styles.oxCorrectHint];
    }
    return [styles.oxButton, styles.oxDisabled];
  };

  const getTextStyle = (value: boolean) => {
    if (selectedAnswer === null) return styles.oxText;
    if (selectedAnswer === value) {
      return [styles.oxText, styles.oxTextSelected];
    }
    if (disabled) return [styles.oxText, styles.oxTextDimmed];
    return styles.oxText;
  };

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>OX 퀴즈</Text>
      </View>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={getButtonStyle(true)}
          onPress={() => onAnswer(true)}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Text style={getTextStyle(true)}>O</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle(false)}
          onPress={() => onAnswer(false)}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Text style={getTextStyle(false)}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1976D2',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    lineHeight: 30,
    marginBottom: 32,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  oxButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#E0E0E0',
  },
  oxCorrect: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  oxWrong: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  oxCorrectHint: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    opacity: 0.6,
  },
  oxDisabled: {
    opacity: 0.3,
  },
  oxText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  oxTextSelected: {
    color: '#fff',
  },
  oxTextDimmed: {
    color: '#999',
  },
});
