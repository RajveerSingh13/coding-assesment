# coding-assesment

Chess Moves Calculator
A JavaScript library for calculating possible moves for chess pieces on a standard 8x8 chessboard.

Features
Calculate possible moves for different chess pieces (Pawn, King, Queen)
Standard chess board representation (A-H columns, 1-8 rows)
Input validation and error handling


Installation
1. Install dependency using "npm install"
2. Run this file using "node index.js"
3. Run test cases using "npm test"

Usage
Examples :- 
const result = ChessMoves.getAllPossibleMoves('Queen', 'D4');
console.log(result);
// Output: "C3,B2,A1,C4,B4,A4,C5,B6,A7,D3,D2,D1,D5,D6,D7,D8,E3,F2,G1,E4,F4,G4,H4,E5,F6,G7,H8"

const kingMoves = ChessMoves.getAllPossibleMoves('King', 'B7');
console.log(kingMoves);

const pawnMoves = ChessMoves.getAllPossibleMoves('Pawn', 'E2');
console.log(pawnMoves);
