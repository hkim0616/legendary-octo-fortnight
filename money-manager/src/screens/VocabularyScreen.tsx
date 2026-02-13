import React, { useState, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import terms, { Term, Difficulty, Topic } from '../data/terms';
import {
  getVocabulary,
  removeTerm,
  VocabularyData,
} from '../store/vocabularyStore';
import VocabularyCard from '../components/VocabularyCard';
import FilterBar from '../components/FilterBar';

export default function VocabularyScreen() {
  const [vocabulary, setVocabulary] = useState<VocabularyData>({ saved: {} });
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const v = await getVocabulary();
        setVocabulary(v);
      })();
    }, [])
  );

  const savedTerms: (Term & { savedDate: string })[] = useMemo(() => {
    return terms
      .filter((t) => !!vocabulary.saved[t.id])
      .map((t) => ({
        ...t,
        savedDate: vocabulary.saved[t.id].savedDate,
      }));
  }, [vocabulary]);

  const filteredTerms = useMemo(() => {
    return savedTerms.filter((t) => {
      if (selectedDifficulty && t.difficulty !== selectedDifficulty) return false;
      if (selectedTopic && t.topic !== selectedTopic) return false;
      return true;
    });
  }, [savedTerms, selectedDifficulty, selectedTopic]);

  const handleRemove = useCallback(async (termId: number) => {
    await removeTerm(termId);
    const updated = await getVocabulary();
    setVocabulary(updated);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Term & { savedDate: string } }) => (
      <VocabularyCard
        term={item}
        savedDate={item.savedDate}
        onRemove={handleRemove}
      />
    ),
    [handleRemove]
  );

  const isEmpty = savedTerms.length === 0;

  if (isEmpty) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>📖</Text>
        <Text style={styles.emptyTitle}>단어장이 비어있어요</Text>
        <Text style={styles.emptyDesc}>
          퀴즈에서 문제를 맞히면{'\n'}관련 금융 용어가 자동으로 저장됩니다
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FilterBar
        selectedDifficulty={selectedDifficulty}
        selectedTopic={selectedTopic}
        onDifficultyChange={setSelectedDifficulty}
        onTopicChange={setSelectedTopic}
        termCount={filteredTerms.length}
      />

      {filteredTerms.length === 0 ? (
        <View style={styles.noResult}>
          <Text style={styles.noResultText}>
            필터 조건에 맞는 용어가 없습니다
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredTerms}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  list: {
    padding: 16,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  emptyDesc: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24,
  },
  noResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 15,
    color: '#999',
  },
});
