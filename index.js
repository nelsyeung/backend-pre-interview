const { getSudokuFromFile } = require("./src/fileParser.js");
const { solve } = require("./src/solver.js");

const allSudoku = getSudokuFromFile("./sudoku.txt");
allSudoku.map((sudoku) => solve(sudoku));
