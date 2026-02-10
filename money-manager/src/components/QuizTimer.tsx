import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

interface QuizTimerProps {
  duration: number;
  onTimeUp: () => void;
  isPaused: boolean;
}

export default function QuizTimer({ duration, onTimeUp, isPaused }: QuizTimerProps) {
  const [remaining, setRemaining] = useState(duration);
  const widthAnim = useRef(new Animated.Value(1)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    setRemaining(duration);
    widthAnim.setValue(1);
  }, [duration]);

  useEffect(() => {
    if (isPaused) {
      animRef.current?.stop();
      return;
    }

    // Countdown interval
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Progress bar animation
    const currentProgress = remaining / duration;
    widthAnim.setValue(currentProgress);
    animRef.current = Animated.timing(widthAnim, {
      toValue: 0,
      duration: remaining * 1000,
      useNativeDriver: false,
    });
    animRef.current.start();

    return () => {
      clearInterval(interval);
      animRef.current?.stop();
    };
  }, [isPaused]);

  const barColor =
    remaining > 5 ? '#4CAF50' : remaining > 3 ? '#FF9800' : '#F44336';

  return (
    <View style={styles.container}>
      <View style={styles.timerRow}>
        <Text style={[styles.timerText, remaining <= 3 && styles.timerUrgent]}>
          {remaining}s
        </Text>
      </View>
      <View style={styles.barBackground}>
        <Animated.View
          style={[
            styles.barFill,
            {
              backgroundColor: barColor,
              width: widthAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  timerRow: {
    alignItems: 'flex-end',
    marginBottom: 6,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timerUrgent: {
    color: '#F44336',
  },
  barBackground: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
});
