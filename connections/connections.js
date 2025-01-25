const solutionColors = {
  0: "#F9DF6D",
  1: "#A0C35A",
  2: "#B0C4EF",
  3: "#BA81C5",
};
const sqColor = "#EFEFE7";
const selSqColor = "#5A594F";
const guessedColor = "#D5D5D5";
let gameInd = 0;
let completed = false;
const solutions = [
  [
    {
      title: "Puncture",
      ans: ["Pierce", "Impale", "Skewer", "Stab"],
      color: 0,
    },
    {
      title: "Book Components",
      ans: ["Page", "Cover", "Binding", "Spine"],
      color: 1,
    },
    {
      title: "Rhymes with Ate",
      ans: ["Haight", "Wait", "Plate", "Eight"],
      color: 2,
    },
    {
      title: "___ Off",
      ans: ["Fell", "Knock", "Bake", "Shut"],
      color: 3,
    },
  ],
  [
    {
      title: "Look (at)",
      ans: ["Stare", "Gaze", "Glance", "Ogle"],
      color: 0,
    },
    {
      title: "Circular Objects",
      ans: ["Plate", "Watch Face", "Coin", "Bottle cap"],
      color: 1,
    },
    {
      title: "Supplies for Yard Prank",
      ans: ["Egg", "Toilet Paper", "Fork", "Spray Paint"],
      color: 2,
    },
    {
      title: "Anagrams of Lower Haight Streets",
      ans: ["Gape", "Koa", "Recipe", "Film Role"],
      color: 3,
    },
  ],
  [
    {
      title: "Purpose",
      ans: ["Target", "Motive", "Aim", "Objective"],
      color: 0,
    },
    {
      title: "Activities for Injured Runners",
      ans: ["Stretch", "Roll", "Swim", "Bike"],
      color: 1,
    },
    {
      title: "Trolls in Duboce Half III",
      ans: ["Connect Four", "Math", "Mission: Impos.", "Theater"],
      color: 2,
    },
    {
      title: "Beginning of SF Neighborhoods",
      ans: ["Hay", "Sun", "Miss", "Rich"],
      color: 3,
    },
  ],
];
let solution = solutions[gameInd];

let guessResult = {
  WRONG: "wrong",
  CLOSE: "close",
  CORRECT: "correct",
};

let guesses = [];

let missesRemaining = 4;

const w = window.innerWidth;
const h = window.innerHeight;

const sqSize = h / 10.5;
const margin = 6;

const boards = [
  [
    "Spine",
    "Skewer",
    "Knock",
    "Page",
    "Binding",
    "Wait",
    "Fell",
    "Impale",
    "Haight",
    "Bake",
    "Stab",
    "Shut",
    "Eight",
    "Pierce",
    "Cover",
    "Plate",
  ],
  [
    "Fork",
    "Glance",
    "Coin",
    "Gaze",
    "Film Role",
    "Bottle cap",
    "Toilet Paper",
    "Plate",
    "Gape",
    "Egg",
    "Stare",
    "Spray Paint",
    "Koa",
    "Watch Face",
    "Ogle",
    "Recipe",
  ],
  [
    "Connect Four",
    "Swim",
    "Math",
    "Sun",
    "Rich",
    "Aim",
    "Hay",
    "Mission: Impos.",
    "Roll",
    "Target",
    "Bike",
    "Objective",
    "Miss",
    "Motive",
    "Stretch",
    "Theater",
  ],
];

let board = boards[gameInd];

let selected = new Set(); //["1,2", "0,1"]);
let clickX = null;
let clickY = null;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  //textFont("Garamond");
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
}

function getColor(status, sol) {
  if (status === guessResult.CORRECT) {
    return solutionColors[solution[sol].color];
  }
  if (status === guessResult.CLOSE || status === guessResult.WRONG) {
    return guessedColor;
  }
  return sqColor;
}

function processClick(cx, cy, cordX, cordY) {
  if (cx - sqSize / 2 < clickX && cx + sqSize / 2 > clickX) {
    if (cy - sqSize / 2 < clickY && cy + sqSize / 2 > clickY) {
      let pos = `${cordX},${cordY}`;
      if (selected.has(pos)) {
        selected.delete(pos);
      } else if (selected.size < 4) {
        selected.add(`${cordX},${cordY}`);
      }

      clickX = null;
      clickY = null;
    }
  }
}

function processSubmit() {
  guess = new Set();
  for (let pos of selected) {
    let [xPos, yPos] = pos.split(",");
    guess.add(board[+xPos * 4 + +yPos]);
  }
  let closest = 0;
  let solNum = null;
  for (let i = 0; i < solution.length; i++) {
    let sol = solution[i];

    // set intersection
    let closeness = [...guess].filter((word) => sol.ans.includes(word)).length;
    if (closeness > closest) {
      solNum = i;
      closest = closeness;
    }
  }
  result = {};
  if (closest == 4) {
    result = {
      result: guessResult.CORRECT,
      guess,
      solution: solNum,
    };
    board = board.filter((word) => ![...guess].includes(word));
    selected = new Set();
  } else if (closest == 3) {
    result = {
      result: guessResult.CLOSE,
      guess,
      solution: solNum,
    };
    missesRemaining -= 1;
  } else {
    result = {
      result: guessResult.WRONG,
      guess,
      solution: null,
    };
    missesRemaining -= 1;
  }
  guesses.push(result);

  draw();
}

function draw() {
  background("white");
  textSize(40);
  fill("black");
  text("Connections", w / 2, 35);
  let y = 100;
  let xStart = w / 2 - (sqSize + margin) * 2 + (sqSize + margin) / 2;
  let x = xStart;
  textSize(10);
  let solutionsGuessed = [];
  let numCorrect = 0;

  for (let guess of guesses) {
    x = xStart;
    if (guess.result === guessResult.CORRECT) {
      // text(solution[guess.solution].title, x - sqSize / 2 - margin, y);
      solutionsGuessed.push(guess.solution);
      numCorrect += 1;

      textAlign(CENTER, CENTER);
      fill(getColor(guess.result, guess.solution));
      rect(w / 2, y, sqSize * 4 + margin * 3, sqSize, 5);
      fill("black");
      textSize(16);
      text(solution[guess.solution].title, w / 2, y - 12);
      textSize(12);
      for (let word of solution[guess.solution].ans) {
        text(word, x, y + 12);
        x += sqSize + margin;
      }
    } else {
      textAlign(RIGHT, CENTER);
      if (guess.result === guessResult.CLOSE) {
        text("1 away", x - sqSize / 2 - margin, y);
      } else if (guess.result === guessResult.WRONG) {
        text("X", x - sqSize / 2 - margin, y);
      }
      textAlign(CENTER, CENTER);
      for (let word of guess.guess) {
        fill(getColor(guess.result, guess.solution));
        rect(x, y, sqSize, sqSize, 5);
        fill("black");
        text(word, x, y);
        x += sqSize + margin;
      }
    }

    y += sqSize + margin;
  }

  if (missesRemaining <= 0) {
    completed = true;
    textSize(12);
    text("Fail!  Click to restart. Solution:", w / 2, y - sqSize / 2 + 12);

    y += margin * 3 + 12;

    solutionsRemaining = [0, 1, 2, 3].filter(
      (solInd) => !solutionsGuessed.includes(solInd)
    );

    solutionsRemaining.forEach((solInd) => {
      x = xStart;
      textAlign(CENTER, CENTER);
      let sol = solution[solInd];
      fill(getColor(guessResult.CORRECT, solInd));
      rect(w / 2, y, sqSize * 4 + margin * 3, sqSize, 5);
      fill("black");
      textSize(16);
      text(sol.title, w / 2, y - 12);
      textSize(12);
      sol.ans.forEach((item) => {
        text(item, x, y + 12);
        x += sqSize + margin;
      });
      y += sqSize + margin;
    });
  } else {
    for (let i = 0; i < board.length / 4; i++) {
      x = xStart;
      for (let j = 0; j < 4; j++) {
        let item = board[i * 4 + j];
        let pos = `${i},${j}`;

        if (clickX != null && clickY != null && missesRemaining > 0)
          processClick(x, y, i, j);

        if (selected.has(pos)) {
          fill(selSqColor);
          sqCol = selSqColor;
          textCol = "white";
        } else {
          fill(sqColor);
          sqCol = sqColor;
          textCol = "black";
        }
        strokeWeight(0);
        fill(sqCol);
        rect(x, y, sqSize, sqSize, 5);
        fill(textCol);
        text(item, x, y);
        x += sqSize + margin;
      }
      y += sqSize + margin;
    }
    x = w / 2 - 30;
    for (let i = 0; i < missesRemaining; i++) {
      fill("grey");
      circle(x, y - sqSize / 4, 10);
      x += 20;
    }
    if (numCorrect === 4) {
      textAlign(CENTER, CENTER);
      textSize(20);
      fill("black");
      text("Completed puzzle #" + (gameInd + 1) + "!", w / 2, y + sqSize / 4);
      if (gameInd < solutions.length - 1) {
        textSize(12);
        text("Click anywhere to continue", w / 2, y + sqSize / 2);
        completed = true;
      } else {
        textSize(30);
        text("Congrats, you've passed!", w / 2, y + sqSize / 2);
        completed = true;
      }
    } else if (missesRemaining > 0) {
      strokeWeight(1);
      stroke("black");
      textAlign(CENTER, CENTER);
      fill("white");
      rect(w / 2, h - sqSize, 60, 40, 20);
      strokeWeight(0);
      fill("black");
      text("Submit", w / 2, h - sqSize);
    }
  }

  noLoop();
}

function mousePressed() {
  if (completed && missesRemaining <= 0) {
    resetGame();
  } else if (completed && gameInd < solutions.length - 1) {
    nextGame();
  } else if (missesRemaining > 0) {
    clickX = mouseX;
    clickY = mouseY;
    handleInteracton();
  }
}
function touchStarted() {
  if (completed && missesRemaining <= 0) {
    resetGame();
  } else if (completed && gameInd < solutions.length - 1) {
    nextGame();
  } else if (missesRemaining > 0) {
    clickX = touches[0].x;
    clickY = touches[0].y;
    handleInteracton();
  }
}

const resetGame = () => {
  completed = false;
  guesses = [];
  missesRemaining = 4;
  selected = new Set();
  board = boards[gameInd];
  draw();
};

const nextGame = () => {
  completed = false;
  guesses = [];
  missesRemaining = 4;
  gameInd += 1;
  board = boards[gameInd];
  solution = solutions[gameInd];
  draw();
};

const handleInteracton = () => {
  if (
    clickX > w / 2 - 30 &&
    clickX < w / 2 + 30 &&
    clickY > h - sqSize - 20 &&
    clickY < h - sqSize + 20 &&
    selected.size == 4
  ) {
    processSubmit();
  } else {
    draw();
  }
};

function keyPressed() {
  if (keyCode == 13) {
    if (selected.size == 4) {
      processSubmit();
    }
  }
}
