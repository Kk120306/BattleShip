import Gameboard from '../factory/Gameboard.js';

export default class Player{
    constructor(name = 'Player 1', isComputer = false){
        this.name = name;
        this.isComputer = isComputer; // Boolean value false is real player
        this.gameBoard = new Gameboard();
    }
}