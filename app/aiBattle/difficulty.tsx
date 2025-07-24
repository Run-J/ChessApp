// app/aiBattle/difficulty.tsx
import GeneralButton from '@/components/GeneralButton';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const difficultyLevels = [
  { level: 1, label: 'Beginner' },
  { level: 3, label: 'Novice' },
  { level: 5, label: 'Intermediate' },
  { level: 7, label: 'Skilled' },
  { level: 9, label: 'Expert' },
  { level: 11, label: 'Master' },
  { level: 13, label: 'Legendary' },
  { level: 15, label: 'AI Overlord' },
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
      <Text style={styles.title}>🎯 Select Difficulty</Text>
      <Text style={styles.subtitle}>Choose your AI opponent's level</Text>

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