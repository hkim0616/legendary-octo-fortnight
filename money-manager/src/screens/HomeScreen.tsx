import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import CardSwiper from '../components/CardSwiper';

type TabParamList = {
  '홈': undefined;
  '퀴즈': undefined;
  '단어장': undefined;
  '마이페이지': undefined;
};

export default function HomeScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList, '홈'>>();

  const handleStartQuiz = () => {
    navigation.navigate('퀴즈');
  };

  return (
    <View style={styles.container}>
      <CardSwiper onStartQuiz={handleStartQuiz} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
