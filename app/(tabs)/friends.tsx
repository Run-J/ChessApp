// app/(tabs)/friend.tsx
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FriendTabScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👬 好友对战</Text>
      <Text style={styles.subtitle}>选择你们的对战方式</Text>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#1e90ff' }]}
        onPress={() => router.push('/friendBattle/localFriend')}
      >
        <Text style={styles.cardEmoji}>🧍‍♂️🤝🧍‍♂️</Text>
        <Text style={styles.cardText}>本地对战（同屏轮流）</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#ff69b4' }]}
        onPress={() => router.push('/friendBattle/remoteFriend')}
      >
        <Text style={styles.cardEmoji}>🌐🏠</Text>
        <Text style={styles.cardText}>远程对战（在线匹配）</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1c',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    color: '#ffd33d',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  cardEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});