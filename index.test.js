const { ChessBoard, ChessPiece, ChessMoves } = require('./index');

describe('ChessBoard', () => {
    let board;

    beforeEach(() => {
        board = new ChessBoard();
    });

    describe('convertPositionToIndex', () => {
        test('should convert A4 to [0, 3]', () => {
            expect(board.convertPositionToIndex('A4')).toEqual([0, 3]);
        });

        test('should convert D6 to [3, 5]', () => {
            expect(board.convertPositionToIndex('D6')).toEqual([3, 5]);
        });
    });

    describe('convertIndexToPosition', () => {
        test('should convert [0, 3] to A4', () => {
            expect(board.convertIndexToPosition(0, 3)).toBe('A4');
        });

        test('should convert [3, 5] to D6', () => {
            expect(board.convertIndexToPosition(3, 5)).toBe('D6');
        });
    });

    describe('isValidPosition', () => {
        test('should return true if position valid', () => {
            expect(board.isValidPosition(0, 3)).toBe(true);
            expect(board.isValidPosition(3, 5)).toBe(true);
            expect(board.isValidPosition(-1, 0)).toBe(false);
            expect(board.isValidPosition(8, 9)).toBe(false);
        });
    });
});

describe('ChessPiece', () => {
    describe('getPawnMoves', () => {
        test('should move one step from A3', () => {
            const pawn = new ChessPiece('pawn', 'A3');
            expect(pawn.getNextMoves()).toEqual(['A4']);
        });

        test('should return empty arr when pawn is in last row', () => {
            const pawn = new ChessPiece('pawn', 'A8');
            expect(pawn.getNextMoves()).toEqual([]);
        });
    });

    describe('getKingMoves', () => {
        test('should return all moves for position D4', () => {
            const king = new ChessPiece('king', 'D4');
            const moves = king.getNextMoves();
            expect(moves.length).toBe(8);
        });

        test('should return all moves from corner H8', () => {
            const king = new ChessPiece('king', 'H8');
            const moves = king.getNextMoves();
            expect(moves.length).toBe(3);
        });
    });

    describe('getQueenMoves', () => {
        test('should return all moves for position D4', () => {
            const queen = new ChessPiece('queen', 'D4');
            const moves = queen.getNextMoves();
            expect(moves.length).toBe(27);
        });

        test('should return all moves from corner H8', () => {
            const queen = new ChessPiece('queen', 'H8');
            const moves = queen.getNextMoves();
            expect(moves.length).toBe(21);
        });
    });

    describe('Invalid piece:', () => {
        test('should give error for invalid piece', () => {
            const rook = new ChessPiece('rook', 'D4');
            expect(() => rook.getNextMoves()).toThrow('Invalid Piece: rook');
        });
    });
});

describe('ChessMoves', () => {
    describe('getAllPossibleMoves', () => {
        test('should return moves arr for pawn', () => {
            const result = ChessMoves.getAllPossibleMoves('pawn', 'A1');
            expect(result).toBe('A2');
        });

        test('should return moves arr for king', () => {
            const result = ChessMoves.getAllPossibleMoves('king', 'A1');
            const moves = result.split(',');
            expect(moves).toEqual(['A2', 'B1', 'B2']);
        });

        test('should return moves arr for queen', () => {
            const result = ChessMoves.getAllPossibleMoves('queen', 'A1');
            const moves = result.split(',');
            expect(moves.length).toBe(21);
        });

        test('should throw error for empty string', () => {
            const result = ChessMoves.getAllPossibleMoves('', 'A1');
            expect(result).toBe('Error: Error: Invalid input');
        });
    });
});