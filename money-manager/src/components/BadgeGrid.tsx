import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import badgeDefinitions, { BadgeDefinition } from '../data/badges';
import type { BadgeData } from '../store/streakStore';

interface BadgeGridProps {
  badges: BadgeData;
}

function BadgeItem({
  badge,
  earned,
}: {
  badge: BadgeDefinition;
  earned: boolean;
}) {
  return (
    <View style={[styles.badge, earned ? { backgroundColor: badge.color } : styles.badgeLocked]}>
      <Text style={[styles.badgeEmoji, !earned && styles.emojiLocked]}>
        {earned ? badge.emoji : '🔒'}
      </Text>
      <Text
        style={[styles.badgeName, !earned && styles.nameLocked]}
        numberOfLines={1}
      >
        {badge.name}
      </Text>
      {earned && <Text style={styles.badgeCheck}>✓</Text>}
    </View>
  );
}

export default function BadgeGrid({ badges }: BadgeGridProps) {
  const earnedCount = Object.keys(badges.earned).length;
  const totalCount = badgeDefinitions.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>획득한 배지</Text>
        <Text style={styles.count}>
          {earnedCount} / {totalCount}
        </Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBg}>
        <View
          style={[
            styles.progressFill,
            { width: `${(earnedCount / totalCount) * 100}%` },
          ]}
        />
      </View>

      <View style={styles.grid}>
        {badgeDefinitions.map((badge) => (
          <BadgeItem
            key={badge.cardId}
            badge={badge}
            earned={!!badges.earned[badge.cardId]}
          />
        ))}
      </View>

      {earnedCount === totalCount && (
        <View style={styles.completeBanner}>
          <Text style={styles.completeText}>🏆 모든 배지를 획득했습니다!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  count: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90D9',
  },
  progressBg: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90D9',
    borderRadius: 3,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  badge: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    position: 'relative',
  },
  badgeLocked: {
    backgroundColor: '#F0F0F0',
  },
  badgeEmoji: {
    fontSize: 32,
    marginBottom: 6,
  },
  emojiLocked: {
    opacity: 0.4,
  },
  badgeName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  nameLocked: {
    color: '#AAA',
  },
  badgeCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  completeBanner: {
    marginTop: 16,
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  completeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F57F17',
  },
});
