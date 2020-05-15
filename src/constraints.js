/**
 * Return an array of the constraint that each block must contain all numbers.
 *
 * The block width and height will be chosen as either:
 * 1) sqrt(rows), if rows is a square number;
 * 2) columns / 2 by 2, if rows is not a square number and an even number;
 * 3) columns by 1, otherwise.
 */
function blockConstraint(rows, columns, numbers, row, column, number) {
  // Assume the total number of blocks is the number of rows.
  const constraint = Array(rows * numbers).fill(0);
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

  const block =
    Math.trunc(row / blockHeight) * (columns / blockWidth) +
    Math.trunc(column / blockWidth);
  constraint[block * numbers + number] = 1;

  return constraint;
}

/**
 * Return an array of the constraint that each cell can only have one number.
 */
// eslint-disable-next-line no-unused-vars
function cellConstraint(rows, columns, numbers, row, column, number) {
  const constraint = Array(rows * columns).fill(0);
  constraint[row * columns + column] = 1;
  return constraint;
}

/**
 * Return an array of the constraint that each column can only one of each
 * number.
 */
function columnConstraint(rows, columns, numbers, row, column, number) {
  const constraint = Array(columns * numbers).fill(0);
  constraint[column * numbers + number] = 1;
  return constraint;
}

/**
 * Return an array of the constraint that each row can only one of each number.
 */
function rowConstraint(rows, columns, numbers, row, column, number) {
  const constraint = Array(rows * numbers).fill(0);
  constraint[row * numbers + number] = 1;
  return constraint;
}

module.exports = {
  blockConstraint,
  cellConstraint,
  columnConstraint,
  rowConstraint,
};
