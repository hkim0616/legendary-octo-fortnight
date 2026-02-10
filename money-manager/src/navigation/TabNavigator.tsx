import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import VocabularyScreen from '../screens/VocabularyScreen';
import MyPageScreen from '../screens/MyPageScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case '홈':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case '퀴즈':
              iconName = focused ? 'help-circle' : 'help-circle-outline';
              break;
            case '단어장':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case '마이페이지':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4A90D9',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="퀴즈" component={QuizScreen} />
      <Tab.Screen name="단어장" component={VocabularyScreen} />
      <Tab.Screen name="마이페이지" component={MyPageScreen} />
    </Tab.Navigator>
  );
}
