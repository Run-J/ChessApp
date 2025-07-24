import GeneralButton from '@/components/GeneralButton';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function AiTabScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 AI Battle</Text>
      <Text style={styles.subtitle}>Face a futuristic AI</Text>

      <GeneralButton
        title="Start AI Battle"
        onPress={() => router.push('/aiBattle/difficulty')}
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
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    color: '#00d9ff',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#00d9ff',
    width: 240,
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: '#00d9ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f0f1c',
  },
});