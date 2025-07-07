import { Chess } from 'chess.js'; // 控制棋局状态（走法合法性、轮次、胜负判断）
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Chessboard from 'react-native-chessboard'; // UI 上显示棋盘，响应用户点击

export default function ChessBoard() {
  const [game, setGame] = useState(new Chess()); // 创建一个新的棋局

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

    const gameCopy = new Chess(game.fen()); // 创建棋局副本，防止直接修改原game对象的状态

    const moveParams: any = { from, to };

    // 如果 UI 升变弹窗中用户选择了 promotion（例如 'q', 'r', 'b', 'n'）
    // 就将其加入 move 参数，否则不能强行加，会造成非法走法
    if (promotion) {
      moveParams.promotion = promotion;
    }

    const move = gameCopy.move(moveParams);

    if (move) {
      setGame(gameCopy); // 合法走法，更新状态
    } else {
      console.log('非法走法！');
      alert("非法走棋");
    }
  };

  return (
    <View style={styles.container}>
      <Chessboard 
        fen={game.fen()} // 显示当前棋盘状态
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