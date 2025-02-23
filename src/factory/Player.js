import Gameboard from '../factory/Gameboard.js';
import Ship from  '../factory/Ship.js';


export default class Player {
    constructor(name = 'Player 1', isComputer = false){
        this.name = name;
        this.isComputer = isComputer; // Boolean value false is real player
        this.gameBoard = new Gameboard();
    }
    populateComputerGrid() {
        const ships = [
            new Ship(5, "Carrier"),
            new Ship(4, "Battleship"),
            new Ship(3, "Cruiser"),
            new Ship(3, "Submarine"),
            new Ship(2, "Destroyer"),
        ];
    
        while (ships.length > 0) {
            let randomX = this.generateCoordinate();
            let randomY = this.generateCoordinate();
            let randomDirection = Math.random() < 0.5 ? "down" : "right";
    
            let currentShip = ships[ships.length - 1];  
    
            if (this.gameBoard.placeOnBoard(randomX, randomY, currentShip, randomDirection)) {
                ships.pop(); 
            }
        }
    }
    
    generateCoordinate() {
        return Math.floor(Math.random() * 10);
    }
}    