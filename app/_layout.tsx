import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../reanimatedLogger';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="aiBattle/difficulty" />
        <Stack.Screen name="aiBattle/aiGame" />
        <Stack.Screen
          name="+not-found"
          options={{
            title: "访问了不存在的页面",
            headerShown: true,
            headerBackVisible: false,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}