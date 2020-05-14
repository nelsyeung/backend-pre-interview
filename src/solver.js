const dlx = require("./dlx.js");

/**
 * Return the exact cover matrix from a sudoku matrix.
 */
function getExactCoverMatrix(sudoku) {
  const rows = sudoku.length;
  const columns = sudoku[0].length;
  const matrix = [];
  let loop = 0;

  for (let r = 0; r < rows; r += 1) {
    const boxNumDown = parseInt(r / 3, 10) * 3;

    for (let c = 0; c < columns; c += 1) {
      const boxNum = boxNumDown + parseInt(c / 3, 10);

      for (let n = 0; n < rows; n += 1) {
        matrix.push([]);

        for (let i = 0; i < rows; i += 1) {
          for (let j = 0; j < columns; j += 1) {
            // If value is already filled and current n iteration is not the
            // filled value, then the number should not satisfy any contraints
            if (sudoku[r][c] !== 0 && n + 1 !== sudoku[r][c]) {
              matrix[loop].push(0);
              matrix[loop].push(0);
              matrix[loop].push(0);
              matrix[loop].push(0);
              continue;
            }

            // Row-Column contraints
            if (i === r && j === c) {
              matrix[loop].push(1);
            } else {
              matrix[loop].push(0);
            }

            // Row-Number contraints
            if (i === r && j === n) {
              matrix[loop].push(1);
            } else {
              matrix[loop].push(0);
            }

            // Column-Number contraints
            if (i === c && j === n) {
              matrix[loop].push(1);
            } else {
              matrix[loop].push(0);
            }

            // Box-Number contraints
            if (i === boxNum && j === n) {
              matrix[loop].push(1);
            } else {
              matrix[loop].push(0);
            }
          }
        }

        loop += 1;
      }
    }
  }

  return matrix;
}

/**
 * Return a solved sudoku.
 */
function solve(sudoku) {
  const rows = sudoku.length;
  const columns = sudoku[0].length;
  const result = [...Array(rows)].map(() => Array(columns));

  dlx(getExactCoverMatrix(sudoku)).forEach((s) => {
    const n = s % rows === 0 ? rows : s % rows;
    s -= n;
    const r = parseInt(s / (rows * columns), 10);
    const c = parseInt((s - r * (rows * columns)) / rows, 10);
    result[r][c] = n;
  });

  return result;
}

module.exports = {
  getExactCoverMatrix,
  solve,
};
