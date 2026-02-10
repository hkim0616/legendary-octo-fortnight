import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function VocabularyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>단어장</Text>
      <Text style={styles.subtitle}>금융 용어를 학습하세요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
