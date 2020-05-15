/**
 * Run this with `node index.js` to display all the sums or `node index.js -v`
 * to display more information including the solution.
 */
const { getSudokuFromFile } = require("./src/fileParser.js");
const { solve } = require("./src/solver.js");

const allSudoku = getSudokuFromFile("sudoku.txt");
const allSolutions = allSudoku.map((sudoku) => solve(sudoku));

if (process.argv.length > 2 && process.argv[2] === "-v") {
  allSolutions.forEach((solution, i) => {
    const firstThree = solution[0].slice(0, 3);
    const sum = firstThree.reduce((a, b) => a + b);
    console.log(
      `Grid ${String(++i).padStart(2, 0)}: ${firstThree.join(" + ")} = ${sum}`
    );

    solution.forEach((row) => console.log(row.join("")));
    console.log("");
  });
} else {
  allSolutions.forEach((solution) => {
    console.log(solution[0].reduce((a, b, i) => (i < 3 ? a + b : a)));
  });
}
