import { StyleSheet, Text, View } from 'react-native';

// Placeholder route. Replaced by the onboarding / home flow in a later step.
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>40weeks</Text>
      <Text style={styles.caption}>준비 중입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  caption: {
    fontSize: 15,
    opacity: 0.6,
  },
});
