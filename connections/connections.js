const solutionColors = {
  0: "#F9DF6D",
  1: "#A0C35A",
  2: "#B0C4EF",
  3: "#BA81C5",
};
let gameInd = 1;
let completed = false;
const solutions = [
  [
    {
      title: "Part of Process",
      ans: new Set(["Cycle", "Phase", "Round", "Stage"]),
      color: 0,
    },
    {
      title: "Constellations",
      ans: new Set(["Cygnus", "Gemini", "Orion", "Pegasus"]),
      color: 1,
    },
    {
      title: "Spirals",
      ans: new Set(["Cyclone", "Galaxy", "Snail", "Sunflower"]),
      color: 2,
    },
    {
      title: "Relates to 'ONE'",
      ans: new Set(["Cyclops", "Monologue", "Solitaire", "Unicycle"]),
      color: 3,
    },
  ],
  [
    {
      title: "Stab",
      ans: new Set(["Spike", "Skewer", "Pierce", "Knife"]),
      color: 0,
    },
    {
      title: "Book Components",
      ans: new Set(["Page", "Cover", "Binding", "Spine"]),
      color: 1,
    },
    {
      title: "Rhymes with ate",
      ans: new Set(["Wait", "Plate", "Eight", "Haight"]),
      color: 2,
    },
    {
      title: "__ Off",
      ans: new Set(["Shut", "Fell", "Bake", "Take"]), // Dance, close
      color: 3,
    },
  ],
  [
    {
      title: "Anagrams of Lower Haight Streets",
      ans: new Set(["Gape", "Koa", "Recipe", "Film Role"]),
      color: 3,
    },
    {
      title: "Things that are circular",
      ans: new Set(["Plate", "Ball", "Sun", "Watch"]),
      color: 0,
    },
    {
      title: "Supplies for Yard Prank",
      ans: new Set(["Egg", "Toilet Paper", "Fork", "Spray Paint"]),
      color: 2,
    },
    {
      title: "Things to Stay Healthy Running",
      ans: new Set(["Stretch", "Roll", "Lift", "Bike"]),
      color: 1,
    },
  ],
];
let solution = solutions[gameInd];

let guessResult = {
  WRONG: "wrong",
  CLOSE: "close",
  CORRECT: "correct",
};

// let guesses = [
//   {
//     result: guessResult.CLOSE,
//     guess: ["Cygnus", "Gemini", "Orion", "Solitaire"],
//     solution: null,
//   },
//   {
//     result: guessResult.WRONG,
//     guess: ["Sunflower", "Solitaire", "Stage", "Snail"],
//     solution: null,
//   },
//   {
//     result: guessResult.CORRECT,
//     guess: ["Cyclops", "Monologue", "Solitaire", "Unicycle"],
//     solution: 4,
//   },
// ];
let guesses = [];

let missesRemaining = 4;

const w = window.innerWidth;
const h = window.innerHeight;

const sqSize = h / 11;
const margin = 5;

const boards = [
  [
    "Sunflower",
    "Solitaire",
    "Stage",
    "Snail",
    "Cycle",
    "Cyclone",
    "Cyclops",
    "Cygnus",
    "Unicycle",
    "Orion",
    "Round",
    "Galaxy",
    "Pegasus",
    "Phase",
    "Monologue",
    "Gemini",
  ],
  [
    "Spine",
    "Skewer",
    "Take",
    "Page",
    "Binding",
    "Wait",
    "Fell",
    "Shut",
    "Haight",
    "Knife",
    "Spike",
    "Bake",
    "Eight",
    "Pierce",
    "Cover",
    "Plate",
  ],
  [
    "Fork",
    "Lift",
    "Ball",
    "Roll",
    "Film Role",
    "Sun",
    "Toilet Paper",
    "Plate",
    "Gape",
    "Egg",
    "Stretch",
    "Spray Paint",
    "Koa",
    "Watch",
    "Bike",
    "Recipe",
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
    return "grey";
  }
  return "white";
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
    let closeness = [...guess].filter((word) => sol.ans.has(word)).length;
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
  selected = new Set();

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
      rect(w / 2, y, sqSize * 4 + margin * 3, sqSize);
      fill("black");
      textSize(16);
      text(solution[guess.solution].title, w / 2, y - 12);
      textSize(12);
      for (let word of guess.guess) {
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
        rect(x, y, sqSize, sqSize);
        fill("black");
        text(word, x, y);
        x += sqSize + margin;
      }
    }

    y += sqSize + margin;
  }

  if (missesRemaining <= 0) {
    text("Game over! Solution:", w / 2, y);

    y += sqSize + margin;

    solutionsRemaining = [0, 1, 2, 3].filter(
      (solInd) => !solutionsGuessed.includes(solInd)
    );

    solutionsRemaining.forEach((solInd) => {
      x = xStart;
      textAlign(RIGHT, CENTER);
      let sol = solution[solInd];
      text(sol.title, x - sqSize, y);
      sol.ans.forEach((item) => {
        textAlign(CENTER, CENTER);
        fill(getColor(guessResult.CORRECT, solInd));
        rect(x, y, sqSize, sqSize);
        fill("black");
        text(item, x, y);
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
          fill("lightgrey");
        } else {
          fill("white");
        }

        rect(x, y, sqSize, sqSize);
        fill("black");
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
      text("Complete!", w / 2, y + sqSize / 4);
      if (gameInd < solutions.length - 1) {
        textSize(12);
        text("Click anywhere to continue", w / 2, y + sqSize);
        completed = true;
      } else {
        textSize(30);
        text("Congrats, you've passed!", w / 2, y + sqSize);
        completed = true;
      }
    } else if (missesRemaining > 0) {
      textAlign(CENTER, CENTER);
      fill("white");
      rect(w / 2, h - sqSize, 50, 30);
      fill("black");
      text("Enter", w / 2, h - sqSize);
    }
  }

  noLoop();
}

function mousePressed() {
  if (completed && gameInd < solutions.length - 1) {
    nextGame();
  } else if (missesRemaining > 0) {
    clickX = mouseX;
    clickY = mouseY;
    handleInteracton();
  }
}
function touchStarted() {
  if (completed && gameInd < solutions.length - 1) {
    nextGame();
  } else if (missesRemaining > 0) {
    clickX = touches[0].x;
    clickY = touches[0].y;
    handleInteracton();
  }
}

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
    clickX > w / 2 - 25 &&
    clickX < w / 2 + 25 &&
    clickY > h - sqSize - 15 &&
    clickY < h - sqSize + 15 &&
    selected.size == 4
  ) {
    processSubmit();
  } else {
    draw();
  }
};

function keyPressed() {
  // console.log("keycode", keyCode);
  if (keyCode == 13) {
    if (selected.size == 4) {
      processSubmit();
    }
  }
}
