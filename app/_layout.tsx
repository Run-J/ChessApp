import { Stack } from "expo-router";
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../reanimatedLogger'; // 最早引入 Logger 配置



export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Stack />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});