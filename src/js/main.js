import '../scss/styles.scss';

import DOM from "./dom.js"
import GameLogic from "./gamelogic.js"



const dom = new DOM (4, 4);
const gameLogic = new GameLogic()

window.onload = function () {
  dom.startGame();
};

document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowLeft") {
        gameLogic.slideLeft();
        dom.setTwo();
    }
    else if (e.code === "ArrowRight") {
        gameLogic.slideRight();
        dom.setTwo();
    }
    else if (e.code === "ArrowUp") {
        gameLogic.slideUp();
        dom.setTwo();

    }
    else if (e.code === "ArrowDown") {
        gameLogic.slideDown();
        dom.setTwo();
    }
    document.getElementById("score").innerText = gamelogic.score;
})
