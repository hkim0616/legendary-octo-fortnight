import React, { useRef, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
} from 'react-native';
import cards, { Card } from '../data/cards';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = 20;
const CARD_WIDTH = SCREEN_WIDTH - CARD_MARGIN * 2;

interface CardSwiperProps {
  onStartQuiz: () => void;
}

export default function CardSwiper({ onStartQuiz }: CardSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<Card>>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const isLastCard = activeIndex === cards.length - 1;

  const goToNext = useCallback(() => {
    if (activeIndex < cards.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  }, [activeIndex]);

  const goToPrev = useCallback(() => {
    if (activeIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex - 1,
        animated: true,
      });
    }
  }, [activeIndex]);

  const renderCard = ({ item, index }: { item: Card; index: number }) => {
    const isLast = index === cards.length - 1;

    return (
      <View style={styles.cardWrapper}>
        <View style={[styles.card, { backgroundColor: item.backgroundColor }]}>
          <View style={styles.illustrationArea}>
            <Text style={styles.emoji}>{item.emoji}</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardNumber}>
              {item.id} / {cards.length}
            </Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>

          {isLast && (
            <TouchableOpacity
              style={styles.quizButton}
              onPress={onStartQuiz}
              activeOpacity={0.8}
            >
              <Text style={styles.quizButtonText}>퀴즈 시작하기 →</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      {/* Page Indicator Dots */}
      <View style={styles.pagination}>
        {cards.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      {/* Navigation Arrows */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={[styles.navButton, activeIndex === 0 && styles.navButtonDisabled]}
          onPress={goToPrev}
          disabled={activeIndex === 0}
        >
          <Text style={[styles.navButtonText, activeIndex === 0 && styles.navButtonTextDisabled]}>
            ‹
          </Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>
          {activeIndex + 1} / {cards.length}
        </Text>

        <TouchableOpacity
          style={[styles.navButton, isLastCard && styles.navButtonDisabled]}
          onPress={goToNext}
          disabled={isLastCard}
        >
          <Text style={[styles.navButtonText, isLastCard && styles.navButtonTextDisabled]}>
            ›
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardWrapper: {
    width: SCREEN_WIDTH,
    paddingHorizontal: CARD_MARGIN,
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 20,
    marginVertical: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  illustrationArea: {
    height: 180,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 80,
  },
  cardContent: {
    flex: 1,
  },
  cardNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  quizButton: {
    backgroundColor: '#4A90D9',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#4A90D9',
    width: 20,
  },
  dotInactive: {
    backgroundColor: '#D0D0D0',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#F8F8F8',
  },
  navButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: -2,
  },
  navButtonTextDisabled: {
    color: '#CCC',
  },
  pageText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
  },
});
