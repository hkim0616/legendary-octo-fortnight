import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Difficulty,
  Topic,
  DIFFICULTY_LABELS,
  DIFFICULTY_COLORS,
  TOPIC_LABELS,
} from '../data/terms';

interface FilterBarProps {
  selectedDifficulty: Difficulty | null;
  selectedTopic: Topic | null;
  onDifficultyChange: (d: Difficulty | null) => void;
  onTopicChange: (t: Topic | null) => void;
  termCount: number;
}

const DIFFICULTIES: Difficulty[] = ['beginner', 'intermediate', 'advanced'];
const TOPICS: Topic[] = ['budget', 'savings', 'investment', 'credit', 'insurance', 'tax', 'retirement'];

export default function FilterBar({
  selectedDifficulty,
  selectedTopic,
  onDifficultyChange,
  onTopicChange,
  termCount,
}: FilterBarProps) {
  return (
    <View style={styles.container}>
      {/* Difficulty filter */}
      <View style={styles.section}>
        <Text style={styles.label}>난이도</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chips}>
            <TouchableOpacity
              style={[styles.chip, !selectedDifficulty && styles.chipActive]}
              onPress={() => onDifficultyChange(null)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, !selectedDifficulty && styles.chipTextActive]}>
                전체
              </Text>
            </TouchableOpacity>
            {DIFFICULTIES.map((d) => {
              const active = selectedDifficulty === d;
              return (
                <TouchableOpacity
                  key={d}
                  style={[
                    styles.chip,
                    active && { backgroundColor: DIFFICULTY_COLORS[d] + '20', borderColor: DIFFICULTY_COLORS[d] },
                  ]}
                  onPress={() => onDifficultyChange(active ? null : d)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[styles.difficultyDot, { backgroundColor: DIFFICULTY_COLORS[d] }]}
                  />
                  <Text
                    style={[
                      styles.chipText,
                      active && { color: DIFFICULTY_COLORS[d], fontWeight: '700' },
                    ]}
                  >
                    {DIFFICULTY_LABELS[d]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Topic filter */}
      <View style={styles.section}>
        <Text style={styles.label}>주제</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chips}>
            <TouchableOpacity
              style={[styles.chip, !selectedTopic && styles.chipActive]}
              onPress={() => onTopicChange(null)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, !selectedTopic && styles.chipTextActive]}>
                전체
              </Text>
            </TouchableOpacity>
            {TOPICS.map((t) => {
              const active = selectedTopic === t;
              return (
                <TouchableOpacity
                  key={t}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => onTopicChange(active ? null : t)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {TOPIC_LABELS[t]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Result count */}
      <Text style={styles.resultCount}>{termCount}개 용어</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 4,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    marginBottom: 6,
  },
  chips: {
    flexDirection: 'row',
    gap: 6,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  chipActive: {
    backgroundColor: '#4A90D9',
    borderColor: '#4A90D9',
  },
  chipText: {
    fontSize: 13,
    color: '#555',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  resultCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    paddingHorizontal: 16,
    marginTop: 2,
    marginBottom: 4,
  },
});
