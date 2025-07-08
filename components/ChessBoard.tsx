// components/ChessBoard.tsx
import { useChessStore } from '@/stores/useChessStore';
import { Alert, StyleSheet, View } from 'react-native';
import Chessboard from 'react-native-chessboard'; // UI 上显示棋盘，响应用户点击

interface ChessBoardProps {
  getOpponentMove?: (fen: string) => Promise<string | null>; // 对手走法逻辑（AI、玩家、或null）
}

export default function ChessBoard({ getOpponentMove }: ChessBoardProps) {
    const fen = useChessStore((state) => state.fen);
    const makeMove = useChessStore((state) => state.makeMove);


  // 当用户成功移动了棋盘上的棋子
  const onMove = async (info: any) => {
    console.log("User Moved Info:", info);

    // 适配 react-native-chessboard 的 ChessMoveInfo 类型
    const from = info?.move?.from;
    const to = info?.move?.to;
    const promotion = info?.move?.promotion;

    if (!from || !to) {
        console.log('ChessBoard 反馈获下了无效的走法信息！');
        return;
    }

    const success = makeMove({ from, to, promotion }); // 同步下棋我们ChessStore里维持的棋盘
    if (!success) {
      Alert.alert('走定和ChessStore维持的棋盘状态不一致');
      return;
    }

    // 获取新的 FEN（ 刚才本方玩家走完之后的棋局 ）
    const newFen = useChessStore.getState().fen;
    console.log('Fen before AI/OpponentPlayer move:', newFen);

    // 如果没有提供 getOpponentMove，就退出（自走棋）
    if (!getOpponentMove) return;

    // 获取 AI/对手玩家 的走法
    const opponentMove = await getOpponentMove(newFen);
    if (!opponentMove) return;

    // 解析 AI/对手玩家 走法
    const oppFrom = opponentMove.substring(0, 2);
    const oppTo = opponentMove.substring(2, 4);
    const oppPromotion = opponentMove.length === 5 ? opponentMove[4] as 'q' | 'r' | 'b' | 'n' : undefined;

    const oppSuccess = makeMove({ from: oppFrom, to: oppTo, promotion: oppPromotion }); // 同步下棋我们ChessStore里维持的棋盘
    if (!oppSuccess) {
      console.warn("对手走棋失败/错误; 与ChessStore维持的棋盘状态不符");
    }

    console.log('Fen after AI/OpponentPlayer move:', useChessStore.getState().fen);
    console.log(useChessStore.getState().game.ascii());
  };

  return (
    <View style={styles.container}>
      <Chessboard 
        key={fen}
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