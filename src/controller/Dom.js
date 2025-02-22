export function renderPlayerGrid(player) {
    const boardContainer = document.querySelector('.player-grid');

    if (!player || !player.gameBoard.board) {
        console.error("player or player.gameBoard is undefined:", player);
        return;  // Exit early to prevent crash
    }

    console.log("Game board:", player.gameBoard.board);  // Check structure

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
