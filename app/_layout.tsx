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
            title: "难度选择",
            headerBackTitle: "返回",
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
            title: "对战中...",
            headerBackTitle: "退出",
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
            title: "本地对战中...",
            headerBackTitle: "返回",
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
            title: "访问了不存在的页面",
            headerShown: true,
            headerBackVisible: false,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}