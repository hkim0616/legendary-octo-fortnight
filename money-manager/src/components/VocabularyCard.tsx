import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  Term,
  DIFFICULTY_LABELS,
  DIFFICULTY_COLORS,
  TOPIC_LABELS,
  TOPIC_COLORS,
} from '../data/terms';

interface VocabularyCardProps {
  term: Term;
  savedDate: string;
  onRemove: (termId: number) => void;
}

export default function VocabularyCard({ term, savedDate, onRemove }: VocabularyCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: DIFFICULTY_COLORS[term.difficulty] }]}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.term}>{term.term}</Text>
          <Text style={styles.expandIcon}>{expanded ? '▲' : '▼'}</Text>
        </View>
        <View style={styles.tags}>
          <View style={[styles.tag, { backgroundColor: DIFFICULTY_COLORS[term.difficulty] + '20' }]}>
            <Text style={[styles.tagText, { color: DIFFICULTY_COLORS[term.difficulty] }]}>
              {DIFFICULTY_LABELS[term.difficulty]}
            </Text>
          </View>
          <View style={[styles.tag, { backgroundColor: TOPIC_COLORS[term.topic] }]}>
            <Text style={styles.topicTagText}>
              {TOPIC_LABELS[term.topic]}
            </Text>
          </View>
        </View>
      </View>

      {/* Definition (always visible) */}
      <Text style={styles.definition} numberOfLines={expanded ? undefined : 2}>
        {term.definition}
      </Text>

      {/* Expanded content */}
      {expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.exampleBox}>
            <Text style={styles.exampleLabel}>예시</Text>
            <Text style={styles.exampleText}>{term.example}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.savedDate}>저장일: {savedDate}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => onRemove(term.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.removeButtonText}>삭제</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  term: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  expandIcon: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  tags: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  topicTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#555',
  },
  definition: {
    fontSize: 14,
    lineHeight: 21,
    color: '#444',
  },
  expandedContent: {
    marginTop: 12,
  },
  exampleBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  exampleLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4A90D9',
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savedDate: {
    fontSize: 11,
    color: '#AAA',
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  removeButtonText: {
    fontSize: 12,
    color: '#999',
  },
});
