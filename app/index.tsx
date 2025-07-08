// app/index.tsx
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import GeneralButton from '../components/GeneralButton';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/chess-icon.png')} style={styles.logo} /> */}
      <Text style={styles.title}>♟️ Chess App</Text>
      <GeneralButton
        title="开始 AI 对战"
        onPress={() => router.push('/aiBattle/difficulty')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 36,
    color: '#ffffff',
    marginBottom: 40,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
});