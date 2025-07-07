import { useChessStore } from '@/stores/useChessStore';
import { Alert, StyleSheet, View } from 'react-native';
import Chessboard from 'react-native-chessboard'; // UI 上显示棋盘，响应用户点击


export default function ChessBoard() {
  const fen = useChessStore((state) => state.fen);
  const makeMove = useChessStore((state) => state.makeMove);

  // 当用户点击棋盘上的棋子或格子
  const onMove = (info: any) => {
    console.log("info", info);
    
    // 适配 react-native-chessboard 的 ChessMoveInfo 类型
    const from = info?.move?.from;
    const to = info?.move?.to;
    const promotion = info?.move?.promotion;

    if (!from || !to) {
      console.log('无效的走法信息！');
      return;
    }

    const success = makeMove ({ from, to, promotion});

    if (!success) {
      Alert.alert("非法走定");
    }
  };

  return (
    <View style={styles.container}>
      <Chessboard 
        fen={fen} // 显示当前棋盘状态 来自store
        onMove={onMove} // 用户点击后触发
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});