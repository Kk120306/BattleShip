const Ship = require('../js/Ship.js');

test('hit() increments the hits property', () => {
    const ship = new Ship(4);
    ship.hit();
    expect(ship.hits).toBe(1);
});

test('isSunk() returns true if hit its length', () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
    ship.isSunk();
    expect(ship.sunken).toBe(true);
});

test('isSunk() returns false if hit is not length', () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.isSunk();
    expect(ship.sunken).toBe(false);
});

