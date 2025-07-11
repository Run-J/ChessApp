import ChessBoard from '@/components/ChessBoard';
import GeneralButton from '@/components/GeneralButton';
import { useChessStore } from '@/stores/useChessStore';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';


export default function AiGameScreen() {
  const { level, source } = useLocalSearchParams<{ level: string, source?: string }>();

  const resetGame = useChessStore((state) => state.resetGame);

  // 提供给 ChessBoard 的 AI 响应函数
  const fetchBestMove = async (fen: string): Promise<{
    from: string;
    to: string;
    promotion?: 'q' | 'r' | 'b' | 'n';
    newFen?: string;
  } | null> => {
    try {
      const res = await fetch('http://192.168.1.30:3001/best-move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen, level }),
      });

      const data = await res.json();
      console.log("AI best move response:", data);

      if (!data.move || data.move.length < 4) return null;

      const from = data.move.slice(0, 2); // e.g. "e2"
      const to = data.move.slice(2, 4);   // e.g. "e4"
      const promotion = data.move.length === 5 ? data.move[4] : undefined;

      return {
        from,
        to,
        promotion,
        newFen: data.newFen ?? undefined, // 可选字段
      };

    } catch (error) {
      console.error('AI move fetch failed:', error);
      Alert.alert("AI 请求失败", "无法获取 AI 走法，请检查网络或服务状态。");
      return null;
    }
  };


  useEffect(() => {
    useChessStore.getState().resetGame();
  }, []);

  return (
    <View style={styles.container}>
     {source === 'ai' && (
        <>
             <Text style={styles.title}>智能对战</Text>
             <Text style={styles.subtitle}>AI 难度：{level}</Text>
        </>
     )}

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
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 16,
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