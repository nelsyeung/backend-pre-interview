const dlx = require("./dlx.js");

describe("dlx", () => {
  it("should solve a matrix", () => {
    // Arrange
    const input = [
      [0, 0, 1, 0, 1, 1, 0],
      [1, 0, 0, 1, 0, 0, 1],
      [0, 1, 1, 0, 0, 1, 0],
      [1, 0, 0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 1],
      [0, 0, 0, 1, 1, 0, 1],
    ];
    const expected = [4, 1, 5];

    // Act
    const result = dlx(input);

    // Assert
    expect(result).toEqual(expected);
  });
});
