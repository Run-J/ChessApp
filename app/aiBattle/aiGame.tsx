import ChessBoard from '@/components/ChessBoard';
import GeneralButton from '@/components/GeneralButton';
import { useChessStore } from '@/stores/useChessStore';
import { useLocalSearchParams } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';


export default function AiGameScreen() {
  const { level } = useLocalSearchParams<{ level: string }>();

  const resetGame = useChessStore((state) => state.resetGame);

  // 提供给 ChessBoard 的 AI 响应函数
  const fetchBestMove = async (fen: string): Promise<string | null> => {
    try {
      const res = await fetch('http://192.168.1.30:3001/best-move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen, level }),
      });

      const data = await res.json();
      console.log("AI best move response:", data);

      return data.move; // 例如 "e2e4"

    } catch (error) {
      console.error('AI move fetch failed:', error);
      Alert.alert("AI 请求失败", "无法获取 AI 走法，请检查网络或服务状态。");
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI 难度：{level}</Text>

      <ChessBoard getOpponentMove={fetchBestMove} />

      <GeneralButton 
        title="🔄 重新开始对局"
        onPress={resetGame}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1c',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    color: '#00d9ff',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#00d9ff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#00d9ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#0f0f1c',
    fontSize: 16,
    fontWeight: 'bold',
  },
});