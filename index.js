class ChessBoard {
    constructor() {
        this.columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        this.rows = [1, 2, 3, 4, 5, 6, 7, 8];
    }

    // Convert position to row & col index
    // like 'A4' to [0, 3]
    convertPositionToIndex(position) {
        const column = position[0];
        const row = parseInt(position[1]);

        const colIndex = this.columns.indexOf(column);
        const rowIndex = row - 1;

        return [colIndex, rowIndex];
    }

    // Convert index to position
    convertIndexToPosition(colIndex, rowIndex) {
        if (this.isValidPosition(colIndex, rowIndex)) {
            return this.columns[colIndex] + (rowIndex + 1);
        }
        return null;
    }

    // Check if position is not out of boundary
    isValidPosition(colIndex, rowIndex) {
        return colIndex >= 0 && colIndex < 8 && rowIndex >= 0 && rowIndex < 8;
    }
}

class ChessPiece {
    constructor(type, position) {
        this.type = type;
        this.position = position;
        this.board = new ChessBoard();
        this.allDirections = [
            [-1, -1], // Top-left
            [-1, 0], // only Top
            [-1, 1], // Top-right
            [0, -1], // only Left
            [0, 1], // only right
            [1, -1], // Bottom Left
            [1, 0], // only Bottom
            [1, 1], // Bottom Right
        ];
    }

    // Get all the moves for the piece
    getNextMoves() {
        const [colIndex, rowIndex] = this.board.convertPositionToIndex(
            this.position.toUpperCase()
        );

        switch (this.type.toLowerCase()) {
            case 'pawn':
                return this.getPawnMoves(colIndex, rowIndex);
            case 'king':
                return this.getKingMoves(colIndex, rowIndex);
            case 'queen':
                return this.getQueenMoves(colIndex, rowIndex);
            default:
                throw new Error(`Invalid Piece: ${this.type}`);
        }
    }

    getPawnMoves(colIndex, rowIndex) {
        const moves = [];
        const newRowIndex = rowIndex + 1; // Move by 1 step

        if (this.board.isValidPosition(colIndex, newRowIndex)) {
            moves.push(this.board.convertIndexToPosition(colIndex, newRowIndex));
        } else {
            console.log('Pawn is already at the last position.');
        }

        return moves;
    }

    getKingMoves(colIndex, rowIndex) {
        const moves = [];

        for (const [xIndex, yIndex] of this.allDirections) {
            const newColIndex = colIndex + xIndex;
            const newRowIndex = rowIndex + yIndex;

            const position = this.board.convertIndexToPosition(
                newColIndex,
                newRowIndex
            );
            if (position) {
                moves.push(position);
            }
        }

        return moves;
    }

    getQueenMoves(colIndex, rowIndex) {
        const moves = [];

        for (const [xIndex, yIndex] of this.allDirections) {
            // Push moves in current direction until last step
            let step = 1;
            while (true) {
                const newColIndex = colIndex + xIndex * step;
                const newRowIndex = rowIndex + yIndex * step;

                const position = this.board.convertIndexToPosition(
                    newColIndex,
                    newRowIndex
                );
                if (!position) break;

                moves.push(position);
                step++;
            }
        }

        return moves;
    }
}

class ChessMoves {
    static getAllPossibleMoves(pieceType, position) {
        try {
            // Validate input
            if (!pieceType || !position) {
                throw new Error('Invalid input');
            }

            const piece = new ChessPiece(pieceType, position);
            const moves = piece.getNextMoves();

            return moves.join(',');
        } catch (error) {
            return `Error: ${error}`;
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ChessBoard, ChessPiece, ChessMoves };
}


// Please add your input here
// e.g.  ChessMoves.getAllPossibleMoves('King', 'B7')
const result = ChessMoves.getAllPossibleMoves('Queen', 'D4');
console.log(result);
