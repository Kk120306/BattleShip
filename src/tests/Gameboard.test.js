const Ship = require('../factory/Ship');
const Gameboard = require('../factory/Gameboard');

describe('Gameboard Tests', () => {
    let gameboard, ship;

    beforeEach(() => {
        gameboard = new Gameboard();
        ship = new Ship(3, "Battleship");
    });

    test('should correctly place a ship on the board', () => {
        const result = gameboard.placeOnBoard(0, 0, ship, 'right');
        expect(result).toBe(true);
        expect(gameboard.board[0][0]).toBe(ship);
        expect(gameboard.board[0][1]).toBe(ship);
        expect(gameboard.board[0][2]).toBe(ship);
    });

    test('should correctly detect a ship hit', () => {
        gameboard.placeOnBoard(0, 0, ship, 'right');
        const coordinates = [0, 1]; // Coordinates where the ship is placed
        gameboard.recieveAttack(coordinates);
        expect(ship.hits).toBe(1);
    });

    test('should correctly mark a ship as sunk', () => {
        gameboard.placeOnBoard(0, 0, ship, 'right');
        gameboard.recieveAttack([0, 0]);
        gameboard.recieveAttack([0, 1]);
        gameboard.recieveAttack([0, 2]);
        expect(ship.isSunk()).toBe(true);
    });

    test('should correctly return false if not all ships are sunk', () => {
        const ship2 = new Ship(2, "Cruiser");
        gameboard.placeOnBoard(1, 1, ship, 'right');
        gameboard.placeOnBoard(4, 4, ship2, 'down');
        gameboard.recieveAttack([0, 0]);
        gameboard.recieveAttack([1, 1]);
        expect(gameboard.allSunk()).toBe(false);
    });

    

    test('should handle missed shots correctly', () => {
        gameboard.placeOnBoard(0, 0, ship, 'right');
        const coordinates = [5, 5];
        gameboard.recieveAttack(coordinates);
        expect(gameboard.missedShots).toContainEqual(coordinates);
    });
});
