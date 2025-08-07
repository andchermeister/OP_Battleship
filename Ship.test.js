const Ship = require("./Ship");

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
