import { Chess } from 'chess.js';
import { create } from 'zustand';

type Move = {
    from: string;
    to: string;
    promotion? : 'q' | 'r' | 'b' | 'n';
}

interface ChessState {
    game: Chess;
    fen: string;
    turn: 'w' | 'b';
    moves: Move[];
    makeMove: (move: Move) => boolean;
    resetGame: () => void;
}

export const useChessStore = create<ChessState>((set, get) => ({
    game: new Chess(),
    fen: new Chess().fen(),
    turn: 'w',
    moves: [],
    makeMove: ({ from, to, promotion }) => {
        const game = new Chess(get().fen); // 获得副本
        const moveObj: any = { from, to };
        // 如果 UI 升变弹窗中用户选择了 promotion（例如 'q', 'r', 'b', 'n'）
        // 就将其加入 moveObj 参数，否则不能强行加，会造成非法走法
        if (promotion) {
            moveObj.promotion = promotion;
        }

        const result = game.move(moveObj); // move 副本
        if (result) {
            set({
                game, // 如果可以move，才会更新store里的Chess状态为最新的副本game
                fen: game.fen(),
                turn: game.turn(),
                moves: [...get().moves, { from, to }],
            });
            return true;
        }
        return false;
    },
    resetGame: () => {
        const newGame = new Chess();
        set({
            game: newGame,
            fen: newGame.fen(),
            turn: 'w',
            moves: [],
        });
    },
}));