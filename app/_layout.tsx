import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../reanimatedLogger'; // 最早引入 Logger 配置



export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: "首页", 
            headerShown: false,
            gestureEnabled: false, 

          }}
        />
        <Stack.Screen 
          name="aiBattle/difficulty" 
          options={{ 
            title: "选择难度",

          }} 
        />
        <Stack.Screen 
          name="aiBattle/aiGame" 
          options={{ 
            title: "AI 对战" 
          }}
        />
        <Stack.Screen 
          name="+not-found"
          options={{
            title: "页面未找到",
            headerShown: true,          // 显示导航栏
            headerBackVisible: false,   // 移除左上角返回按钮
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});