var btns = ["btn1", "btn2", "btn3", "btn4", "btn5", "btn6", "btn7", "btn8", "btn9"];
var gameOver = false;

onEvent("restart-btn", "click", function( ) {
  for (var i = 0; i < btns.length; i++) {
    setText(btns[i], "");
    setProperty(btns[i], "hidden", false);
    setProperty("result-label", "hidden", true);
    gameOver = false;
  }
});

for (var i = 0; i < btns.length; i++) {
  addUserClickEvents(btns[i]);
}

function addUserClickEvents(id) {
  onEvent(id, "click", function( ) {
    if (getText(id) !== "X" && getText(id) != "O" && !gameOver) {
      setText(id, "X");
      gameOver = checkGameOver();
      opponentTurn();
    }
  });
}

function opponentTurn() {
  if (!gameOver) {
    var choice = randomNumber(0, 8);
    while ((getText(btns[choice]) == "X" || getText(btns[choice]) == "O")) {
      choice = randomNumber(0, 8);
    }
    setText(btns[choice], "O");
    gameOver = checkGameOver();
  }
  
}

function checkGameOver() {
  if (getText("btn1") == getText("btn2") && getText("btn2") == getText("btn3") && getText("btn1")) {
    showResults(getText("btn1"));
    return true;
  } else if (getText("btn4") == getText("btn5") && getText("btn5") == getText("btn6") && getText("btn4")) {
    showResults(getText("btn4"));
    return true;
  } else if (getText("btn7") == getText("btn8") && getText("btn8") == getText("btn9") && getText("btn7")) {
    showResults(getText("btn7"));
    return true;
  } else if (getText("btn1") == getText("btn4") && getText("btn4") == getText("btn7") && getText("btn1")) {
    showResults(getText("btn1"));
    return true;
  } else if (getText("btn2") == getText("btn5") && getText("btn5") == getText("btn8")  && getText("btn2")) {
    showResults(getText("btn2"));
    return true;
  } else if (getText("btn3") == getText("btn6") && getText("btn6") == getText("btn9") && getText("btn3")) {
    showResults(getText("btn3"));
    return true;
  } else if (getText("btn1") == getText("btn5") && getText("btn5") == getText("btn9") && getText("btn1")) {
    showResults(getText("btn1"));
    return true;
  } else if (getText("btn3") == getText("btn5") && getText("btn5") == getText("btn7") && getText("btn3")) {
    showResults(getText("btn3"));
    return true;
  } if (allBtnsPressed()) {
    showResults("");
    return true;
  }
  return false;
}

function allBtnsPressed() {
  for (var i = 0; i < btns.length; i++) {
    if (!getText(btns[i])) {
      return false;
    }
  }
  return true;
}

function showResults(winner) {
  if (winner == "X") {
    setProperty("result-label", "hidden", false);
    setProperty("result-label", "text-color", "green");
    setProperty("result-label", "text", "You win!");
  } else if (winner =="O") {
    setProperty("result-label", "hidden", false);
    setProperty("result-label", "text-color", "#900");
    setProperty("result-label", "text", "You lose!");
  } else {
    setProperty("result-label", "hidden", false);
    setProperty("result-label", "text-color", "blue");
    setProperty("result-label", "text", "Tie game!");
  }
}

