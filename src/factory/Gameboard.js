class Gameboard {
    constructor() {
        this.board = Array(10).fill().map(() => Array(10).fill(null));
        this.missedShots = [];
        this.ships = [];
        this.attemptedPos = [];
    }

    placeOnBoard(x, y, ship, direction) {
        if (direction === 'right') {
            if (y + ship._length > 10) return false;
            for (let i = 0; i < ship._length; i++) {
                if (this.board[x][y + i] !== null) return false;
            }
            for (let i = 0; i < ship._length; i++) {
                this.board[x][y + i] = ship;
            }
        } else if (direction === 'down') {
            if (x + ship._length > 10) return false;
            for (let i = 0; i < ship._length; i++) {
                if (this.board[x + i][y] !== null) return false;
            }
            for (let i = 0; i < ship._length; i++) {
                this.board[x + i][y] = ship;
            }
        } else {
            return false;
        }
        this.ships.push(ship);
        return true;
    }


    receiveAttack(x, y) {
        let wasAttacked = false;
    
        if (this.attemptedPos.some(([px, py]) => px === x && py === y)) {
            console.log("You have already hit a ship at this position!");
            return false; 
        }

        const shipAtPosition = this.board[x][y];
    
        if (shipAtPosition && typeof shipAtPosition.hit === "function") {
            shipAtPosition.hit();
            wasAttacked = true;
        } else {
            this.missedShots.push([x, y]); 
        }
    
        this.attemptedPos.push([x, y]); 
        return wasAttacked;
    }
    

    allSunk() {
        console.log('Checking if all ships are sunk...');
        for (let ship of this.ships) {
            if (!ship.isSunk()) {
                console.log(`${ship.name} is not sunk yet.`);
                return false;
            }
        }
        console.log('All ships are sunk!');
        return true;
    }
}

module.exports = Gameboard;
