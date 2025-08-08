const Ship = require("./Ship");
const Gameboard = require("./Gameboard");

test("hit() increments number_of_hits", () => {
  const sh1 = new Ship(5, 0, false);
  sh1.hit();
  expect(sh1.num_of_hits).toBe(1);
});

test("isSunk() when num of hits >= length", () => {
  const sh2 = new Ship(1, 2, false);
  sh2.hit();
  expect(sh2.isSunk()).toBe(true);
});

test("createGrid() has correct number of rows and cols", () => {
  const gb = new Gameboard(4, 3);
  expect(gb.grid.length).toBe(3);
  gb.grid.forEach((row) => {
    expect(row.length).toBe(4);
  });
});

test("createGrid() fills the grid with nulls", () => {
  const gb2 = new Gameboard(2, 2);
  expect(gb2.grid).toEqual([
    [null, null],
    [null, null],
  ]);
});

test("placeShip() for correct horizontal placement", () => {
  const sh3 = new Ship(3, 0, false);
  const gb3 = new Gameboard(3, 3);

  gb3.placeShip(sh3, [0, 0], "horizontal");

  expect(gb3.grid[0][0]).toEqual({ ship: sh3, hit: false });
  expect(gb3.grid[0][1]).toEqual({ ship: sh3, hit: false });
  expect(gb3.grid[0][2]).toEqual({ ship: sh3, hit: false });
});

test("placeShip() for correct vertical placement", () => {
  const sh4 = new Ship(5, 0, false);
  const gb4 = new Gameboard(10, 10);
  gb4.placeShip(sh4, [5, 4], "vertical");
  expect(gb4.grid[5][4]).toEqual({ ship: sh4, hit: false });
});

test("placeShip() for overlap", () => {
  const sh6 = new Ship(1, 0, false);
  const sh7 = new Ship(1, 0, false);
  const gb6 = new Gameboard(2, 2);
  gb6.placeShip(sh6, [0, 0], "vertical");
  expect(gb6.placeShip(sh7, [0, 0], "vertical")).toBe(false);
});

test("receiveAttack() for Bool result at coords", () => {
  const sh5 = new Ship(2, 0, false);
  const gb5 = new Gameboard(2, 2);
  gb5.placeShip(sh5, [0, 0], "horizontal");
  gb5.receiveAttack([0, 0]);
  expect(sh5.num_of_hits).toBe(1);
  expect(gb5.receiveAttack([0, 0])).toBe(true);
  expect(gb5.receiveAttack([0, 1])).toBe(true);
  expect(gb5.receiveAttack([1, 0])).toBe(false);
});

test("allShipsSunk() when all the ships were hitted", () => {
  const sh8 = new Ship(3, 0, false);
  const sh9 = new Ship(2, 0, false);
  const sh10 = new Ship(1, 0, false);
  const gb7 = new Gameboard(5, 5);

  gb7.placeShip(sh8, [0, 0], "vertical");
  gb7.placeShip(sh9, [0, 2], "horizontal");
  gb7.placeShip(sh10, [3, 3], "horizontal");
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [0, 2],
    [0, 3],
  ].forEach((coord) => gb7.receiveAttack(coord));
  expect(gb7.allShipsSunk()).toBe(false);
  gb7.receiveAttack([3, 3]);
  expect(gb7.allShipsSunk()).toBe(true);
});
