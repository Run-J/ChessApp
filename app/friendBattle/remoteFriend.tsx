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
  const [thinking, setThinking] = useState(false);


  // 接收对手走法
  const waitForOpponentMove = (): Promise<{
    from: string;
    to: string;
    promotion?: 'q' | 'r' | 'b' | 'n';
    newFen: string;
  }> => {
    return new Promise((resolve) => {
      setThinking(true); // 👈 开始显示“思考中...”

      const handler = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (data.type === 'opponentMove') {
          ws.current?.removeEventListener('message', handler);
          setThinking(false); // 👈 收到对手走法，停止显示

          resolve({
            from: data.payload.from,
            to: data.payload.to,
            newFen: data.payload.newFen,
          });
        }
      };

      ws.current?.addEventListener('message', handler);
    });
  };


  // 点击加入房间按钮时调用
  const handleJoin = () => {
    if (!roomId.trim()) {
      Alert.alert('Room ID Required', 'Please enter a room ID.');
      return;
    }

    ws.current = new WebSocket('ws://45.32.51.54:3001');

    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({ type: 'join', roomId }));
      Alert.alert('Joined Room', `You have joined room: ${roomId}`);
    };

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'joined') {
        setConnected(true);
        setPlayerColor(msg.color); // 记录玩家颜色
        useChessStore.getState().setFen(msg.fen); // 获取服务器记录的当前房间的棋局
        console.log('接收到服务端当前棋局的 fen:', msg.fen);
        console.log (`收到来自服务器分配的角色:`, msg.color);
      } else if (msg.type === 'error') {
        Alert.alert('Error', msg.message);
      } 
    };

    ws.current.onerror = () => {
      Alert.alert('Connection Failed', 'Unable to connect to the server.');
    };

    ws.current.onclose = () => {
      Alert.alert('Left Room', `You have left the game: ${roomId}`); // alert 接受两个参数，第一个是弹窗的title，第二个是弹窗的message
    };
  };

  // 好友匹配模式下，本地自己走棋时通知服务器
  const handleLocalMove = (from: string, to: string, newFen: string) => {
    ws.current?.send(JSON.stringify({ type: 'move', roomId, payload: { from, to, newFen }}));
    
    console.log('执行了onLocalMove, 发送给服务器的 move 消息：', 'from:', from, 'to:', to, 'newFen:', newFen);
  };


  useEffect(() => {
    useChessStore.getState().resetGame();
  }, []);

  return (
    <View style={styles.container}>
      {!connected ? (
        <>
          <Text style={styles.title}>Online Match</Text>
          <TextInput
            placeholder="Enter Room ID"
            value={roomId}
            onChangeText={setRoomId}
            style={styles.input}
          />
          <GeneralButton title="Join Room" onPress={handleJoin} />
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>Joined Room: {roomId}</Text>
          <ChessBoard
            getOpponentMove={waitForOpponentMove}
            onLocalMove={handleLocalMove}
            shouldWait={playerColor === 'b'} // 如果是黑棋，先等白棋对手先下
            thinking={thinking}
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