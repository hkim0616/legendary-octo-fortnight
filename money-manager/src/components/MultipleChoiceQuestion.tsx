import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface MultipleChoiceQuestionProps {
  question: string;
  options: string[];
  onAnswer: (index: number) => void;
  disabled: boolean;
  selectedIndex: number | null;
  correctIndex: number;
}

export default function MultipleChoiceQuestion({
  question,
  options,
  onAnswer,
  disabled,
  selectedIndex,
  correctIndex,
}: MultipleChoiceQuestionProps) {
  const getOptionStyle = (index: number) => {
    if (selectedIndex === null) return styles.option;
    if (selectedIndex === index) {
      return index === correctIndex
        ? [styles.option, styles.optionCorrect]
        : [styles.option, styles.optionWrong];
    }
    if (disabled && index === correctIndex) {
      return [styles.option, styles.optionCorrectHint];
    }
    return [styles.option, styles.optionDisabled];
  };

  const getOptionTextStyle = (index: number) => {
    if (selectedIndex === null) return styles.optionText;
    if (selectedIndex === index) return [styles.optionText, styles.optionTextSelected];
    if (disabled) return [styles.optionText, styles.optionTextDimmed];
    return styles.optionText;
  };

  const labels = ['A', 'B', 'C', 'D'];

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>4지선다</Text>
      </View>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(index)}
            onPress={() => onAnswer(index)}
            disabled={disabled}
            activeOpacity={0.7}
          >
            <View style={styles.labelCircle}>
              <Text style={styles.labelText}>{labels[index]}</Text>
            </View>
            <Text style={getOptionTextStyle(index)}>{option}</Text>
          </TouchableOpacity>
        ))}
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
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E65100',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    lineHeight: 30,
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  optionCorrect: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  optionWrong: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  optionCorrectHint: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    opacity: 0.7,
  },
  optionDisabled: {
    opacity: 0.4,
  },
  labelCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  optionTextSelected: {
    fontWeight: 'bold',
  },
  optionTextDimmed: {
    color: '#999',
  },
});
