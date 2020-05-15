const {
  blockConstraint,
  cellConstraint,
  columnConstraint,
  rowConstraint,
} = require("./constraints.js");
const dlx = require("./dlx.js");

/**
 * Return true if an array has duplicates.
 */
function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}

/**
 * Check if a sudoku is correct.
 */
function checkSudoku(sudoku) {
  const transposed = sudoku[0].map((c, i) => sudoku.map((r) => r[i]));
  const rows = sudoku.length;
  const columns = sudoku[0].length;
  const blocks = [...Array(rows)].map(() => []);
  let blockWidth = columns;
  let blockHeight = 1;

  if (Math.sqrt(rows) % 1 === 0) {
    // Square number
    blockWidth = Math.sqrt(rows);
    blockHeight = blockWidth;
  } else if (rows % 2 === 0) {
    // Even number
    blockWidth = columns / 2;
    blockHeight = 2;
  }

  // Get values from each block
  sudoku.forEach((row, r) => {
    row.forEach((number, c) => {
      const block =
        Math.trunc(r / blockHeight) * (columns / blockWidth) +
        Math.trunc(c / blockWidth);

      blocks[block].push(sudoku[r][c]);
    });
  });

  for (let i = 0; i < rows; i++) {
    if (
      hasDuplicates(transposed[i]) ||
      hasDuplicates(sudoku[i]) ||
      hasDuplicates(blocks[i])
    ) {
      return false;
    }
  }

  return true;
}

/**
 * Return the exact cover matrix from a sudoku matrix.
 */
function getExactCoverMatrix(sudoku, ...constraints) {
  const rows = sudoku.length;
  const columns = sudoku[0].length;
  const numbers = rows; // Assume the allowed numbers is the number of rows.
  const matrix = [];
  let matrixRow = -1;

  // Use default set of constraints if no constraint functions are passed.
  if (constraints.length === 0) {
    constraints = [
      cellConstraint,
      rowConstraint,
      columnConstraint,
      blockConstraint,
    ];
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      for (let n = 0; n < numbers; n++) {
        matrix.push([]);
        matrixRow++;

        // If value is already filled and current number is not the filled
        // value, then the number should not satisfy any contraint.
        if (sudoku[r][c] !== 0 && n + 1 !== sudoku[r][c]) {
          matrix[matrixRow].push(
            ...Array(constraints.length * rows * columns).fill(0)
          );
          continue;
        }

        constraints.forEach((constraint) =>
          matrix[matrixRow].push(...constraint(rows, columns, numbers, r, c, n))
        );
      }
    }
  }

  return matrix;
}

/**
 * Return a solved sudoku.
 */
function solve(sudoku, ...constraints) {
  const rows = sudoku.length;
  const columns = sudoku[0].length;
  const result = [...Array(rows)].map(() => Array(columns));
  const exactCoverMatrix = getExactCoverMatrix(sudoku, ...constraints);
  const solution = dlx(exactCoverMatrix);

  if (solution.length === 0) {
    return false;
  }

  solution.forEach((s) => {
    const n = s % rows === 0 ? rows : s % rows;
    s -= n;
    const r = Math.trunc(s / (rows * columns));
    const c = Math.trunc((s - r * (rows * columns)) / rows);
    result[r][c] = n;
  });

  return result;
}

module.exports = {
  checkSudoku,
  getExactCoverMatrix,
  solve,
};
