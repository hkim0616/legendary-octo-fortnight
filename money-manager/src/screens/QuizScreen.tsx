import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { pickRandomQuestions, Question } from '../data/questions';
import cards from '../data/cards';
import QuizTimer from '../components/QuizTimer';
import OXQuestion from '../components/OXQuestion';
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';
import QuizResult from '../components/QuizResult';

type TabParamList = {
  '홈': undefined;
  '퀴즈': undefined;
  '단어장': undefined;
  '마이페이지': undefined;
};

type AnswerState = {
  isCorrect: boolean;
  selectedOX: boolean | null;
  selectedIndex: number | null;
};

const TIMER_DURATION = 10;
const QUESTION_COUNT = 3;

export default function QuizScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList, '퀴즈'>>();

  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const currentQuestion = questions[currentIndex];

  const startQuiz = useCallback(() => {
    const picked = pickRandomQuestions(QUESTION_COUNT);
    setQuestions(picked);
    setCurrentIndex(0);
    setAnswerState(null);
    setCorrectCount(0);
    setQuizFinished(false);
    setQuizStarted(true);
    setTimerKey((prev) => prev + 1);
  }, []);

  // Reset quiz when tab is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setQuizStarted(false);
      setQuizFinished(false);
    });
    return unsubscribe;
  }, [navigation]);

  const handleAnswer = useCallback(
    (isCorrect: boolean, selectedOX: boolean | null, selectedIndex: number | null) => {
      const newState: AnswerState = { isCorrect, selectedOX, selectedIndex };
      setAnswerState(newState);
      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);
      }
    },
    []
  );

  const handleOXAnswer = useCallback(
    (answer: boolean) => {
      if (!currentQuestion || currentQuestion.type !== 'ox') return;
      const isCorrect = answer === currentQuestion.answer;
      handleAnswer(isCorrect, answer, null);
    },
    [currentQuestion, handleAnswer]
  );

  const handleMultipleAnswer = useCallback(
    (index: number) => {
      if (!currentQuestion || currentQuestion.type !== 'multiple') return;
      const isCorrect = index === currentQuestion.answerIndex;
      handleAnswer(isCorrect, null, index);
    },
    [currentQuestion, handleAnswer]
  );

  const handleTimeUp = useCallback(() => {
    if (answerState) return; // already answered
    // Time's up = wrong, show as no selection
    setAnswerState({ isCorrect: false, selectedOX: null, selectedIndex: null });
  }, [answerState]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAnswerState(null);
      setTimerKey((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  }, [currentIndex, questions.length]);

  const handleGoToCard = useCallback(() => {
    navigation.navigate('홈');
  }, [navigation]);

  // --- Intro screen ---
  if (!quizStarted) {
    return (
      <View style={styles.introContainer}>
        <Text style={styles.introEmoji}>🧠</Text>
        <Text style={styles.introTitle}>금융 퀴즈</Text>
        <Text style={styles.introDesc}>
          오늘 학습한 카드에서 무작위 {QUESTION_COUNT}문항이 출제됩니다.{'\n'}
          OX 퀴즈와 4지선다가 섞여 나와요!{'\n'}
          문항당 {TIMER_DURATION}초 안에 답해야 합니다.
        </Text>
        <TouchableOpacity style={styles.startButton} onPress={startQuiz} activeOpacity={0.8}>
          <Text style={styles.startButtonText}>퀴즈 시작하기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- Result screen ---
  if (quizFinished) {
    return (
      <View style={styles.container}>
        <QuizResult
          correctCount={correctCount}
          totalCount={questions.length}
          onRetry={startQuiz}
          onGoHome={handleGoToCard}
        />
      </View>
    );
  }

  // --- Quiz in progress ---
  if (!currentQuestion) return null;

  const relatedCard = cards.find((c) => c.id === currentQuestion.cardId);
  const answered = answerState !== null;
  const isTimeUp = answered && answerState.selectedOX === null && answerState.selectedIndex === null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.progress}>
          {currentIndex + 1} / {questions.length}
        </Text>
        {relatedCard && (
          <Text style={styles.cardRef}>
            {relatedCard.emoji} {relatedCard.title}
          </Text>
        )}
      </View>

      {/* Timer */}
      <QuizTimer
        key={timerKey}
        duration={TIMER_DURATION}
        onTimeUp={handleTimeUp}
        isPaused={answered}
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        {/* Question */}
        {currentQuestion.type === 'ox' ? (
          <OXQuestion
            question={currentQuestion.question}
            onAnswer={handleOXAnswer}
            disabled={answered}
            selectedAnswer={answerState?.selectedOX ?? null}
            correctAnswer={currentQuestion.answer}
          />
        ) : (
          <MultipleChoiceQuestion
            question={currentQuestion.question}
            options={currentQuestion.options}
            onAnswer={handleMultipleAnswer}
            disabled={answered}
            selectedIndex={answerState?.selectedIndex ?? null}
            correctIndex={currentQuestion.answerIndex}
          />
        )}

        {/* Feedback */}
        {answered && (
          <View style={styles.feedback}>
            {isTimeUp ? (
              <View style={styles.timeUpBanner}>
                <Text style={styles.timeUpText}>⏰ 시간 초과!</Text>
              </View>
            ) : answerState.isCorrect ? (
              <View style={styles.correctBanner}>
                <Text style={styles.correctText}>🎉 정답입니다!</Text>
              </View>
            ) : (
              <View style={styles.wrongBanner}>
                <Text style={styles.wrongText}>❌ 오답입니다</Text>
              </View>
            )}

            {/* Explanation (shown on correct) */}
            {answerState.isCorrect && (
              <View style={styles.explanationBox}>
                <Text style={styles.explanationLabel}>해설</Text>
                <Text style={styles.explanationText}>
                  {currentQuestion.explanation}
                </Text>
              </View>
            )}

            {/* "Go back to card" button (shown on wrong / time up) */}
            {!answerState.isCorrect && (
              <TouchableOpacity
                style={styles.reviewButton}
                onPress={handleGoToCard}
                activeOpacity={0.8}
              >
                <Text style={styles.reviewButtonText}>📖 카드 다시 보기</Text>
              </TouchableOpacity>
            )}

            {/* Next button */}
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>
                {currentIndex < questions.length - 1 ? '다음 문제 →' : '결과 보기'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Intro
  introContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  introEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  introDesc: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: '#4A90D9',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  progress: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90D9',
  },
  cardRef: {
    fontSize: 13,
    color: '#888',
  },
  // Content
  content: {
    flex: 1,
  },
  contentInner: {
    paddingBottom: 40,
  },
  // Feedback
  feedback: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 12,
  },
  correctBanner: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  correctText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  wrongBanner: {
    backgroundColor: '#FFEBEE',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  wrongText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C62828',
  },
  timeUpBanner: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  timeUpText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
  },
  explanationBox: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
  },
  explanationLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A90D9',
    marginBottom: 6,
  },
  explanationText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  reviewButton: {
    backgroundColor: '#FFF3E0',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  reviewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E65100',
  },
  nextButton: {
    backgroundColor: '#4A90D9',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
