const crypto = require("crypto");
const fs = require("fs");

const fileParser = require("./fileParser.js");

let inputFilePath;

beforeAll(() => {
  inputFilePath = `${crypto.randomBytes(16).toString("hex")}.txt`;

  fs.writeFileSync(
    inputFilePath,
    `Grid 01
     003020600
     900305001
     001806400
     008102900
     700000008
     006708200
     002609500
     800203009
     005010300
     Grid 02
     200080300
     060070084
     030500209
     000105408
     000000000
     402706000
     301007040
     720040060
     004010003
     Grid 03
     000000907
     000420180
     000705026
     100904000
     050000040
     000507009
     920108000
     034059000
     507000000`
      .split(/(?:\r\n|\n|\r)/)
      .map((line) => line.replace(/^\s+/gm, ""))
      .join("\n")
  );
});

afterAll(() => {
  fs.unlinkSync(inputFilePath);
});

describe("fileParser", () => {
  describe("getSudokuFromFile", () => {
    it("should return an array of sudoku", () => {
      const expected = [
        [
          [0, 0, 3, 0, 2, 0, 6, 0, 0],
          [9, 0, 0, 3, 0, 5, 0, 0, 1],
          [0, 0, 1, 8, 0, 6, 4, 0, 0],
          [0, 0, 8, 1, 0, 2, 9, 0, 0],
          [7, 0, 0, 0, 0, 0, 0, 0, 8],
          [0, 0, 6, 7, 0, 8, 2, 0, 0],
          [0, 0, 2, 6, 0, 9, 5, 0, 0],
          [8, 0, 0, 2, 0, 3, 0, 0, 9],
          [0, 0, 5, 0, 1, 0, 3, 0, 0],
        ],
        [
          [2, 0, 0, 0, 8, 0, 3, 0, 0],
          [0, 6, 0, 0, 7, 0, 0, 8, 4],
          [0, 3, 0, 5, 0, 0, 2, 0, 9],
          [0, 0, 0, 1, 0, 5, 4, 0, 8],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [4, 0, 2, 7, 0, 6, 0, 0, 0],
          [3, 0, 1, 0, 0, 7, 0, 4, 0],
          [7, 2, 0, 0, 4, 0, 0, 6, 0],
          [0, 0, 4, 0, 1, 0, 0, 0, 3],
        ],
        [
          [0, 0, 0, 0, 0, 0, 9, 0, 7],
          [0, 0, 0, 4, 2, 0, 1, 8, 0],
          [0, 0, 0, 7, 0, 5, 0, 2, 6],
          [1, 0, 0, 9, 0, 4, 0, 0, 0],
          [0, 5, 0, 0, 0, 0, 0, 4, 0],
          [0, 0, 0, 5, 0, 7, 0, 0, 9],
          [9, 2, 0, 1, 0, 8, 0, 0, 0],
          [0, 3, 4, 0, 5, 9, 0, 0, 0],
          [5, 0, 7, 0, 0, 0, 0, 0, 0],
        ],
      ];

      const result = fileParser.getSudokuFromFile(`${inputFilePath}`);

      expect(result).toEqual(expected);
    });
  });
});
