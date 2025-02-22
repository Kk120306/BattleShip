// Test class for logic in console.

// import Player from '../factory/Player.js';
// import Ship from '../factory/Ship.js';
// import Gameboard from '../factory/Gameboard.js';
// import readline from 'readline';

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// const player = new Player("Human", false);
// const computer = new Player("AI", true);

// // Example: Manually placing ships for now
// player.gameBoard.placeOnBoard(0, 0, new Ship(3, "Battleship"), 'right');
// computer.gameBoard.placeOnBoard(2, 2, new Ship(3, "Cruiser"), 'down');

// function playTurn() {
//     rl.question("Enter attack coordinates (e.g., 3,4): ", (input) => {
//         let userMove = input.split(",").map(Number);
//         if (userMove.length !== 2 || isNaN(userMove[0]) || isNaN(userMove[1])) {
//             console.log("Invalid input. Please enter coordinates in the format x,y");
//             return playTurn();
//         }
        
//         let [x, y] = userMove;
//         computer.gameBoard.recieveAttack([x, y]);
//         player.gameBoard.recieveAttack([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]);
        
//         console.log("Player board:", player.gameBoard.board);
//         console.log("Computer board:", computer.gameBoard.board);

//         if (player.gameBoard.allSunk() || computer.gameBoard.allSunk()) {
//             console.log("Game Over!");
//             rl.close();
//         } else {
//             playTurn();
//         }
//     });
// }

// playTurn();