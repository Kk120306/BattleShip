import { renderPlayerGrid, renderComputerGrid, placePlayerShips } from "./Dom.js";
import Player from '../factory/Player.js';

let gameOver = false; 
const attackedPositions = new Set(); 
const playerAttackedPositions = new Set();

export function startGame() {
    const player = new Player("Human", false);
    const computer = new Player("AI", true);

    renderPlayerGrid(player);

    placePlayerShips(player).then(() => {  
        if (computer.populateComputerGrid) {
            computer.populateComputerGrid(); 
        }

        console.log(player.gameBoard.board);
        console.log(computer.gameBoard.board);
        renderComputerGrid(computer);

        playerTurn(player, computer);
    });
}

function playerTurn(player, computer) {
    if (gameOver) return; 

    const instructionText = document.querySelector('.instruction-text');
    instructionText.innerText = "It's your turn! Keep attacking until you miss.";

    function handlePlayerAttack(event) {
        const cell = event.target;
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);


        if (cell.classList.contains("attacked")) {
            return; 
        }

        cell.classList.add("attacked");

        if (computer.gameBoard.receiveAttack(x, y)) { 
            cell.classList.add("hit");
            renderComputerGrid(computer);
            console.log(`Player hit at (${x}, ${y})`);
            
            if (computer.gameBoard.allSunk()) { 
                instructionText.innerText = "You win! All enemy ships are sunk!";
                gameOver = true;
                return;
            }
        } else { 
            console.log(`Player missed at (${x}, ${y})`);
            instructionText.innerText = "You missed! Now it's AI's turn.";
            cell.classList.add("missed");
            renderComputerGrid(computer);
            document.querySelector('.computer-grid').removeEventListener('click', handlePlayerAttack);
            setTimeout(() => computerTurn(player, computer), 1000);
        }
    }

    document.querySelector('.computer-grid').addEventListener('click', handlePlayerAttack);
}


function computerTurn(player, computer) {
    if (gameOver) return; 

    const instructionText = document.querySelector('.instruction-text');
    instructionText.innerText = "AI is attacking...";

    let prevHit = false;
    let prevX = null;
    let prevY = null;
    let attackedPositions = new Set();

    function aiAttack(hitBefore, x, y) {
        if (gameOver) return; 

        if (!hitBefore) {
            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
            } while (attackedPositions.has(`${x},${y}`)); 
        } else {
            do {
                ({ x, y } = getNextMove(prevX, prevY));
            } while (attackedPositions.has(`${x},${y}`));
        }

        attackedPositions.add(`${x},${y}`);

        console.log(`AI attacks: (${x}, ${y})`);

        if (player.gameBoard.receiveAttack(x, y)) { 
            console.log("AI hit! It attacks again.");
            renderPlayerGrid(player);
            prevHit = true;
            prevX = x;
            prevY = y;
            
            if (player.gameBoard.allSunk()) { 
                instructionText.innerText = "Game Over! AI won!";
                gameOver = true;
                return;
            }

            setTimeout(() => aiAttack(true, x, y), 1000);
        } else { 
            console.log("AI missed! Player's turn.");
            renderPlayerGrid(player);
            prevHit = false;
            prevX = null;
            prevY = null;
            setTimeout(() => playerTurn(player, computer), 1000);
        }
    }

    function getNextMove(prevX, prevY) {
        const possibleMoves = [
            [prevX - 1, prevY], 
            [prevX + 1, prevY], 
            [prevX, prevY - 1], 
            [prevX, prevY + 1]  
        ];
    
        const validMoves = possibleMoves.filter(([newX, newY]) => 
            newX >= 0 && newX < 10 && newY >= 0 && newY < 10
        );
    
        const [x, y] = validMoves[Math.floor(Math.random() * validMoves.length)];
        
        return { x, y };
    }

    setTimeout(() => aiAttack(prevHit, prevX, prevY), 1000);
}
