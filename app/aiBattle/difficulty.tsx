// app/aiBattle/difficulty.tsx
import GeneralButton from '@/components/GeneralButton';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const difficultyLevels = [
  { level: 1, label: '菜鸟' },
  { level: 3, label: '新手' },
  { level: 5, label: '进阶' },
  { level: 7, label: '熟练' },
  { level: 9, label: '专家' },
  { level: 11, label: '大师' },
  { level: 13, label: '超神' },
  { level: 15, label: 'AI魔王' },
];

export default function DifficultyScreen() {
  const router = useRouter();

  const handleSelect = (level: number) => {
    router.push({
      pathname: '/aiBattle/aiGame',
      params: { level: level.toString(), source: 'ai' },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 难度选择</Text>
      <Text style={styles.subtitle}>挑战不同等级的智能棋手</Text>

      <FlatList
        data={difficultyLevels}
        keyExtractor={(item) => item.level.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <GeneralButton
            title={item.label}
            onPress={() => handleSelect(item.level)}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 30,
    color: '#00d9ff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 28,
  },
  list: {
    gap: 16,
  },
  button: {
    width: 240,
    backgroundColor: '#00d9ff',
    borderRadius: 14,
    shadowColor: '#00d9ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f0f1c',
  },
});