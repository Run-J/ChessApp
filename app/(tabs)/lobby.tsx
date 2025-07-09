// app/(tabs)/lobby.tsx
import { fakeAiList } from '@/app/utils/fakeAiList';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LobbyTabScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>匹配大厅</Text>
      <Text style={styles.subtitle}>选择一个真实的对手发起挑战</Text>

      <FlatList
        data={fakeAiList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            disabled={item.status !== '空闲'}
            onPress={() => router.push(`/aiBattle/aiGame?level=${item.level}`)}
          >
            <Text style={styles.avatar}>{item.avatar}</Text>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.level}>状态：{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1c',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    color: '#00d9ff',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1c1c2e',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  avatar: {
    fontSize: 32,
    marginRight: 14,
  },
  name: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  level: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 5,
  },
});