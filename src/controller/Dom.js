const Ship = require('../factory/Ship');

export function renderComputerGrid(computer) {
    const boardContainer = document.querySelector('.computer-grid');

    if (!computer || !computer.gameBoard.board) {
        console.error("computer or computer.gameBoard is undefined:", computer);
        return;
    }

    console.log("Game board:", computer.gameBoard.board);

    for (let i = 0; i < 10; i++) {
        if (!computer.gameBoard.board[i]) {
            console.error(`Row ${i} in gameBoard is undefined`, computer.gameBoard);
            continue;
        }

        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = i;
            cell.dataset.y = j;

            if (computer.gameBoard.board[i][j] !== null) {
                cell.classList.add("ship");
            }

            if (computer.attemptedPos?.some(([x, y]) => x == i && y == j)) {
                cell.classList.add(
                    computer.gameBoard.board[i][j] ? "hit" : "miss"
                );
            }

            boardContainer.appendChild(cell);
        }
    }
}

export function placePlayerShips(player) {
    const ships = [
        new Ship(5, "Carrier"),
        new Ship(4, "Battleship"),
        new Ship(3, "Cruiser"),
        new Ship(3, "Submarine"),
        new Ship(2, "Destroyer"),
    ];

    let direction = "right"; 
    const directionTxt = document.querySelector('.direction-text');
    directionTxt.innerText = `The Ship is pointing ${direction}`;

    const setupModal = document.querySelector('.setup-modal');
    const computerGrid = document.querySelector('.computer');

    const rotateBtn = document.getElementById('rotate');
    rotateBtn.addEventListener('click', () => {
        direction = direction === 'right' ? 'down' : 'right';
        directionTxt.innerText = `The Ship is pointing ${direction}`;
    });

    const playerGrid = document.querySelector('.player-grid');
    let currentShip = ships.pop();
    
    
    function handleCellClick(event) {
        const x = parseInt(event.target.dataset.x);
        const y = parseInt(event.target.dataset.y);
        console.log(`Cell clicked at coordinates: (${x}, ${y})`);
        directionTxt.innerText = `The Ship is pointing ${direction}`;

        if (player.gameBoard.placeOnBoard(x, y, currentShip, direction)) {
            console.log(`${currentShip.name} placed successfully!`);
            
            renderPlayerGrid(player);
            
            if (ships.length > 0) {
                currentShip = ships.pop();
                console.log(`Ready to place ${currentShip.name}`);
                attachEventListeners();
            } else {
                console.log("All ships placed!");
                setupModal.style.display = "none";
                computerGrid.classList.toggle("hidden");
                return;
            }
        } else {
            console.log("Invalid placement. Out of bounds or interference with another ship.");
            directionTxt.innerText = `You Cannot Place This Ship Here!`;
        }
    }

    function attachEventListeners() {
        const cells = playerGrid.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });
    }

    attachEventListeners();
}


export function renderPlayerGrid(player) {
    const boardContainer = document.querySelector('.player-grid');
    boardContainer.innerHTML = '';

    if (!player || !player.gameBoard.board) {
        console.error("player or player.gameBoard is undefined:", player);
        return;
    }

    for (let i = 0; i < 10; i++) {
        if (!player.gameBoard.board[i]) {
            console.error(`Row ${i} in gameBoard is undefined`, player.gameBoard);
            continue;
        }

        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = i;
            cell.dataset.y = j;

            // Show ships on the player's board
            if (player.gameBoard.board[i][j] !== null) {
                cell.classList.add("ship");
            }

            if (player.attemptedPos?.some(([x, y]) => x == i && y == j)) {
                cell.classList.add(
                    player.gameBoard.board[i][j] ? "hit" : "miss"
                );
            }

            boardContainer.appendChild(cell);
        }
    }
}