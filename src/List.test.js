const List = require("./List.js");
const Node = require("./Node.js");

describe("List", () => {
  describe("addToRow", () => {
    it("should add three nodes", () => {
      // Arrange
      const list = new List();

      // Act
      list.addToRow(1);
      list.addToRow(2);
      list.addToRow(3);

      // Assert
      expect(list.head.data).toBe(1);
      expect(list.head.left.data).toBe(3);
      expect(list.head.right.data).toBe(2);
      expect(list.tail.data).toBe(3);
    });
  });

  describe("addToColumn", () => {
    it("should add three nodes", () => {
      // Arrange
      const list = new List();
      const header = new Node({ size: -1 });
      const node = new Node(1);

      // Act
      list.addToColumn(header);
      list.addToColumn(node);
      list.addToColumn(node);

      // Assert
      expect(list.head.data.size).toBe(2);
      expect(list.head.up.data).toBe(1);
      expect(list.head.down.data).toBe(1);
      expect(list.tail.data).toBe(1);
    });
  });
});
