// app/friendBattle/remoteFriend.tsx
import ChessBoard from '@/components/ChessBoard';
import GeneralButton from '@/components/GeneralButton';
import { useChessStore } from '@/stores/useChessStore';
import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';


export default function RemoteFriendGame() {
  const [roomId, setRoomId] = useState('');
  const [connected, setConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const [playerColor, setPlayerColor] = useState<'w' | 'b' | null>(null);


  // 接收对手走法
  const waitForOpponentMove = (): Promise<string> => {
    return new Promise((resolve) => {

      const handler = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (data.type === 'opponentMove') {
          ws.current?.removeEventListener('message', handler);
          resolve(data.payload);
        }
      };

      ws.current?.addEventListener('message', handler);
    });
  };

  // 点击加入房间按钮时调用
  const handleJoin = () => {
    if (!roomId.trim()) {
      Alert.alert('请输入房间号');
      return;
    }

    ws.current = new WebSocket('ws://192.168.1.30:3001');

    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({ type: 'join', roomId }));
    };

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'joined') {
        setConnected(true);
      } else if (msg.type === 'error') {
        Alert.alert('错误', msg.message);
      } else if (msg.type === 'joined') {
        setConnected(true);
        setPlayerColor(msg.color); // 记录玩家颜色
        console.log (`收到来自服务器分配的角色:`, msg.color);
      }

    };

    ws.current.onerror = () => {
      Alert.alert('连接失败', '无法连接服务器');
    };

    ws.current.onclose = () => {
      Alert.alert('连接已断开');
    };
  };

  // 好友匹配模式下，本地自己走棋时通知服务器
  const handleLocalMove = (move: string) => {
    ws.current?.send(JSON.stringify({ type: 'move', roomId, payload: move }));
    
    console.log('执行了onLocalMove, 发送给服务器的 move 消息：', move);
  };


  useEffect(() => {
    useChessStore.getState().resetGame();
  }, []);

  return (
    <View style={styles.container}>
      {!connected ? (
        <>
          <Text style={styles.title}>远程对战</Text>
          <TextInput
            placeholder="请输入房间号"
            value={roomId}
            onChangeText={setRoomId}
            style={styles.input}
          />
          <GeneralButton title="加入房间" onPress={handleJoin} />
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>已加入房间：{roomId}</Text>
          <ChessBoard
            getOpponentMove={waitForOpponentMove}
            onLocalMove={handleLocalMove}
            shouldWait={playerColor === 'b'} // 如果是黑棋，先等白棋对手先下
          />
          <GeneralButton
            title="退出房间"
            onPress={() => {
                // 1. 通知服务器退出
                if (ws.current?.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({ type: 'leave', roomId }));
                }

                // 2. 关闭 WebSocket 连接
                ws.current?.close();

                // 3. 重置本地状态
                setConnected(false);
                setRoomId('');
                useChessStore.getState().resetGame();
            }}
            style={{ marginTop: 20 }}
          />

        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1c', alignItems: 'center', paddingTop: 40 },
  title: { fontSize: 22, color: '#00d9ff', marginBottom: 20 },
  subtitle: { fontSize: 16, color: '#ccc', marginBottom: 10 },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});