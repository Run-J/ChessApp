import { Chess } from 'chess.js';
import { create } from 'zustand';

type Move = {
    from: string;
    to: string;
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
    makeMove: ( { from, to } ) => {
        const game = new Chess(get().fen);
        const result = game.move({from, to, promotion: 'q'});

        if (result) {
            set ({
                game,
                fen: game.fen(),
                turn: game.turn(),
                moves: [...get().moves, {from, to}],
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