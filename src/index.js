import './styles.css';
import { renderPlayerGrid } from "./controller/Dom.js";
import Player from './factory/Player.js';

const player = new Player("Human", false);
renderPlayerGrid(player);
