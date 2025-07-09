// app/friendBattle/localFriend.tsx
import ChessBoard from '@/components/ChessBoard';
import GeneralButton from '@/components/GeneralButton';
import { useChessStore } from '@/stores/useChessStore';
import { StyleSheet, Text, View } from 'react-native';

export default function LocalFriendBattleScreen() {
  const resetGame = useChessStore((state) => state.resetGame);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 本地双人对战</Text>
      <Text style={styles.subtitle}>你们可以轮流点击走子，共用一台设备</Text>

      <View style={styles.boardContainer}>
        <ChessBoard />
      </View>

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
    fontSize: 26,
    color: '#ffd33d',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
  boardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#00d9ff',
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 12,
    shadowColor: '#00d9ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#0f0f1c',
    fontSize: 16,
    fontWeight: 'bold',
  },
});