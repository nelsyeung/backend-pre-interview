const fs = require("fs");

function getSudokuFromFile(filePath) {
  return fs
    .readFileSync(filePath)
    .toString()
    .split(/(?:\r\n|\n|\r)/)
    .reduce((sudoku, line) => {
      if (line.startsWith("Grid")) {
        sudoku.push([]);
      } else if (line !== "") {
        sudoku[sudoku.length - 1].push(
          line.split("").map((x) => parseInt(x, 10))
        );
      }

      return sudoku;
    }, []);
}

module.exports = {
  getSudokuFromFile,
};
