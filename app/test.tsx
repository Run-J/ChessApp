

import { useChessStore } from '@/stores/useChessStore';
import { Alert, StyleSheet, View } from 'react-native';
import Chessboard from 'react-native-chessboard'; // UI 上显示棋盘，响应用户点击


export default function ChessBoard() {
  const fen = useChessStore((state) => state.fen);
  const makeMove = useChessStore((state) => state.makeMove);


  // 当用户点击棋盘上的棋子或格子
  const onMove = async (info: any) => {
    console.log("info", info);
    
    // 适配 react-native-chessboard 的 ChessMoveInfo 类型
    const from = info?.move?.from;
    const to = info?.move?.to;
    const promotion = info?.move?.promotion;

    if (!from || !to) {
      console.log('从 ChessBoard 中 获取到了无效的走法信息！');
      return;
    }

    const success = makeMove ({ from, to, promotion});

    if (!success) {
      Alert.alert("非法走棋");
    }


    // 获取新的 FEN（刚才走完之后的）
    const newFen = useChessStore.getState().fen;
    console.log('Fen before AI move:', newFen);
    console.log(useChessStore.getState().game.ascii());

    // 获取 AI 最佳走法
    const aiMove = await fetchBestMove(newFen);
    if (!aiMove) return;

    const aiFrom = aiMove.substring(0, 2);
    const aiTo = aiMove.substring(2, 4);
    const aiPromotion = aiMove.length === 5 ? aiMove[4] : undefined;

    console.log('ai From:', aiFrom);
    console.log('ai To:', aiTo);

    // 让 AI 也走一步（makeMove 会更新 FEN）
    const aiSuccess = makeMove({ from: aiFrom, to: aiTo, promotion: aiPromotion });
    console.log('Fen after AI move:', useChessStore.getState().fen);
    console.log(useChessStore.getState().game.ascii());

    if (!aiSuccess) {
      console.warn("AI 走棋失败");
    }

  };


  const fetchBestMove = async (fen: string) => {
    try {
      const res = await fetch('http://192.168.1.30:3001/best-move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen }),
      });

      const data = await res.json();

      console.log("AI response:", data);
      
      return data.move; // 比如 "e2e4"

    } catch (error) {
      console.error('AI 走法获取失败', error);
      Alert.alert("AI 请求失败", "无法从服务器获取 AI 走法，请检查网络或服务状态。");
      return null;
    }
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