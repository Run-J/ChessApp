import GeneralButton from '@/components/GeneralButton';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function AiTabScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <GeneralButton title="开始 AI 对战" onPress={() => router.push('/aiBattle/difficulty')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e2e' },
});