class Gameboard {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = this.createGrid(width, height);
    this.ships = [];
    this.missedAttacks = [];
  }

  createGrid() {
    const grid = [];
    for (let row = 0; row < this.height; row++) {
      const rowArray = [];
      for (let col = 0; col < this.width; col++) {
        rowArray.push(null);
      }
      grid.push(rowArray);
    }
    return grid;
  }

  placeShip(ship, coordinates, direction) {
    if (this.isValidPlacement(ship, coordinates, direction)) {
      const startRow = coordinates[0];
      const startCol = coordinates[1];
      if (direction === "horizontal") {
        for (let i = 0; i < ship.length; i++) {
          this.grid[startRow][startCol + i] = { ship, hit: false };
        }
      } else if (direction === "vertical") {
        for (let i = 0; i < ship.length; i++) {
          this.grid[startRow + i][startCol] = { ship, hit: false };
        }
      } else {
        return false;
      }
      this.ships.push(ship);
      return true;
    }
    return false;
  }

  receiveAttack(coordinates) {
    const attackedRow = coordinates[0];
    const attackedCol = coordinates[1];
    const cell = this.grid[attackedRow][attackedCol];

    if (cell && cell.ship) {
      if (!cell.hit) {
        cell.ship.hit(), (cell.hit = true);
      }
      return true;
    } else {
      if (!this.missedAttacks.some(([r, c]) => r === row && c === col)) {
        this.missedAttacks.push([attackedRow, attackedCol]);
      }
      return false;
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  isValidPlacement(ship, coordinates, direction) {
    const startRow = coordinates[0];
    const startCol = coordinates[1];

    if (direction === "horizontal") {
      if (startCol + ship.length > this.width) {
        return false;
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[startRow][startCol + i] !== null) {
          return false;
        }
      }
    } else if (direction === "vertical") {
      if (startRow + ship.length > this.height) {
        return false;
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[startRow + i][startCol] !== null) {
          return false;
        }
      }
    } else {
      return false;
    }

    return true;
  }
}

module.exports = Gameboard;
