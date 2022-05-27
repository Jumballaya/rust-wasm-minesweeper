import { minesweeperEngine } from './MinesweeperEngine.js';
import { MineSweeperGame } from './MineSweeperGame.js';

minesweeperEngine
  .init()
  .then(engine => new MineSweeperGame('#root', engine));
