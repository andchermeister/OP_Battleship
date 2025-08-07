class Ship {
  constructor(length, num_of_hits = 0, isSunk) {
    this.length = length;
    this.num_of_hits = num_of_hits;
  }

  hit() {
    this.num_of_hits += 1;
  }

  isSunk() {
    return this.num_of_hits >= this.length;
  }
}

module.exports = Ship;
