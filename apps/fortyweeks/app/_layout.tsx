import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Root layout. Screens are added in later steps; this only establishes the
// navigator so expo-router can boot.
export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </>
  );
}
