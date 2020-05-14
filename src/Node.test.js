const Node = require("./Node.js");

describe("Node", () => {
  describe("constructor", () => {
    it("should set data to 1 and all directions to itself", () => {
      // Arrange

      // Act
      const node = new Node(1);

      // Assert
      expect(node.data).toBe(1);
      expect(node.column).toBe(node);
      expect(node.down).toBe(node);
      expect(node.left).toBe(node);
      expect(node.right).toBe(node);
      expect(node.up).toBe(node);
    });
  });
});
