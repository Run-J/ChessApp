// components/ChessBoard.tsx
import { useChessStore } from '@/stores/useChessStore';
import { useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Chessboard from 'react-native-chessboard'; // UI 上显示棋盘，响应用户点击

interface ChessBoardProps {
  getOpponentMove?: (fen: string) => Promise<{  // 对手走法逻辑（AI、玩家、或null)
    from: string;
    to: string;
    promotion?: 'q' | 'r' | 'b' | 'n';
    newFen?: string;
  } | null>;

  onLocalMove?: (from: string, to: string, newFen: string) => void; // 本地走棋后发送通知（给 WebSocket)
  shouldWait?: boolean;
  thinking?: boolean;
}


export default function ChessBoard({ getOpponentMove, onLocalMove, shouldWait, thinking }: ChessBoardProps) {
    const fen = useChessStore((state) => state.fen);
    const makeMove = useChessStore((state) => state.makeMove);
    const gameStatus = useChessStore((state) => state.game);
    const turn = useChessStore((state) => state.turn);
    const moves = useChessStore((state) => state.moves);

    const { width } = useWindowDimensions();
    const boardSize = Math.min(width - 5, 480);

    
    useEffect(() => {
      if (shouldWait && getOpponentMove) {
        console.log(`当前的身份:`, shouldWait);
        // 好友匹配时如果我方身份为黑方：加载时就等待白方先手
        getOpponentMove(fen).then((opponentMove) => {
          if (!opponentMove) return;
          const from = opponentMove.from;
          const to = opponentMove.to;
          const promotion = opponentMove.promotion;
          const newFen = opponentMove.newFen;
          const success = makeMove({ from, to, promotion });
          if (!success) {
            console.warn('Initial black move failed to apply');
          }
        });
      }

      if (shouldWait) {
        Alert.alert('You are Black', 'Waiting for opponent to move first');
      } else {
        Alert.alert('You are White', 'Make your first move');
      }
    }, []);



    // 推导对局状态信息文字；反馈给玩家当前棋局状态
    let statusText = '';

    if (gameStatus.isGameOver()) {
      if (gameStatus.isCheckmate()) {
        statusText = turn === 'w' ? 'Black wins (checkmate)' : 'White wins (checkmate)';
      } else if (gameStatus.isStalemate()) {
        statusText = 'Draw (stalemate)';
      } else if (gameStatus.isThreefoldRepetition()) {
        statusText = 'Draw (threefold repetition)';
      } else if (gameStatus.isInsufficientMaterial()) {
        statusText = 'Draw (insufficient material)';
      } else {
        statusText = 'Game over';
      }
    } else if (gameStatus.inCheck()) {
      statusText = turn === 'w' ? 'White is in check!' : 'Black is in check!';
    } else {
      statusText = turn === 'w' ? "White's turn" : "Black's turn";
  }



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
      Alert.alert('Move failed', 'Move could not be applied to game state');
      return;
    }

    if (onLocalMove) { // onLocalMove 函数暂时是专门给好友远程匹配模式提供，用于发送我方走定状态给服务器。
      const newFen = useChessStore.getState().fen;
      console.log('客户端发给服务器的当前棋局fen为：', newFen);
      onLocalMove(from, to, newFen);
    }

    // 获取新的 FEN（ 刚才本方玩家走完之后的棋局 ）
    const newFen = useChessStore.getState().fen;
    console.log('Fen before AI/OpponentPlayer move:', newFen);

    // 如果没有提供 getOpponentMove，就退出（自走棋）
    if (!getOpponentMove) return;

    // 获取 AI/对手玩家 的走法
    const opponentMoveObj = await getOpponentMove(newFen); // 传入的newFen用于给AI模式用的，好友匹配暂时用不到。
    if (!opponentMoveObj) return;

    // 解析 AI/对手玩家 走法
    const { from: opponentFrom, to: opponentTo, promotion: opponentPromotion, newFen: confirmedFen } = opponentMoveObj;
    const oppSuccess = makeMove({ from: opponentFrom, to: opponentTo, promotion: opponentPromotion });


    if (!oppSuccess) {
      console.warn("对手走棋失败，棋盘状态不同步");
    }

    // 如果有confirmedFen，则意味着这是好友远程匹配模式，需要强制把本地的 FEN 同步成服务器上的 FEN
    if (confirmedFen) {
      useChessStore.getState().setFen(confirmedFen);
    }


    console.log('Fen after AI/OpponentPlayer move:', useChessStore.getState().fen);
    console.log(useChessStore.getState().game.ascii());
  };

  return (
    <View style={styles.container}>

      <View style={styles.infoBox}>
        <Text style={styles.statusText}>🎯 {statusText}</Text>
        <Text style={styles.metaText}>🔁 Turn: {Math.ceil(moves.length / 2)}</Text>
      </View>

      <Chessboard 
        key={fen}
        fen={fen} // 显示当前棋盘状态 来自store
        onMove={onMove} // 用户点击后触发
        boardSize={boardSize}
      />

      {thinking && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{ color: '#fff', marginTop: 10 }}>Opponent is thinking... please wait ⌛️</Text>
        </View>
      )}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBox: {
    marginBottom: 16,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  metaText: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 2,
  },
  overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
},
});