import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../reanimatedLogger';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen 
          name="(tabs)"
          options={{
            headerShown: false,
          }} 
        
        />

        <Stack.Screen 
          name="aiBattle/difficulty"
          options={{
            title: "Select Difficulty",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: '#1e1e2e',  // 背景色
            },
            headerTintColor: '#ffd33d',     // 返回箭头 和 标题文字颜色
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />

        <Stack.Screen 
          name="aiBattle/aiGame"
          options={{
            title: "In Battle...",
            headerBackTitle: "Quit",
            headerStyle: {
              backgroundColor: '#1e1e2e',  // 背景色
            },
            headerTintColor: '#ffd33d',     // 返回箭头 和 标题文字颜色
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />

        <Stack.Screen 
          name="friendBattle/localFriend"
          options={{
            title: "Local Match...",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: '#1e1e2e',
            },
            headerTintColor: '#ffd33d',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />

        <Stack.Screen 
          name="friendBattle/remoteFriend"
          options={{
            title: "Join Game",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: '#1e1e2e',
            },
            headerTintColor: '#ffd33d',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />


        <Stack.Screen
          name="+not-found"
          options={{
            title: "Page Not Found",
            headerShown: true,
            headerBackVisible: false,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}