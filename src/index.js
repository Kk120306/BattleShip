import './styles.css';
import { renderPlayerGrid, renderComputerGrid, placePlayerShips } from "./controller/Dom.js";
import Player from './factory/Player.js';

const player = new Player("Human", false);
const computer = new Player("AI", true);

renderPlayerGrid(player);
placePlayerShips(player);
renderComputerGrid(computer);
