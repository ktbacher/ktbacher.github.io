let solution = [
  {
    title: "Segment of a Process",
    ans: new Set(["Cycle", "Phase", "Round", "Stage"]),
  },
  {
    title: "Constellations",
    ans: new Set(["Cygnus", "Gemini", "Orion", "Pegasus"]),
  },
  {
    title: "Spirals in Nature",
    ans: new Set(["Cyclone", "Galaxy", "Snail", "Sunflower"]),
  },
  {
    title: "Associated with 'ONE'",
    ans: new Set(["Cyclops", "Monologue", "Solitaire", "Unicycle"]),
  },
];

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

const sqSize = h / 12;

let board = [
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
];

const solutionColors = {
  0: "#F9DF6D",
  1: "#A0C35A",
  2: "#B0C4EF",
  3: "#BA81C5",
};

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
    return solutionColors[sol];
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
  let xStart = w / 2 - (sqSize + 10) * 2 + (sqSize + 10) / 2;
  let x = xStart;
  textSize(12);
  let solutionsGuessed = [];
  let numCorrect = 0;

  for (let guess of guesses) {
    textAlign(RIGHT, CENTER);
    x = xStart;
    if (guess.result === guessResult.CLOSE) {
      text("1 away", x - sqSize, y);
    } else if (guess.result === guessResult.WRONG) {
      text("X", x - sqSize, y);
    } else if (guess.result === guessResult.CORRECT) {
      text(solution[guess.solution].title, x - sqSize, y);
      solutionsGuessed.push(guess.solution);
      numCorrect += 1;
    }
    textAlign(CENTER, CENTER);
    for (let word of guess.guess) {
      fill(getColor(guess.result, guess.solution));
      rect(x, y, sqSize, sqSize);
      fill("black");
      text(word, x, y);
      x += sqSize + 10;
    }
    y += sqSize + 10;
  }

  if (missesRemaining <= 0) {
    text("Game over! Solution:", w / 2, y);

    y += sqSize + 10;

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
        x += sqSize + 10;
      });
      y += sqSize + 10;
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
        x += sqSize + 10;
      }
      y += sqSize + 10;
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
    }
  }

  noLoop();
}

function mousePressed() {
  if (missesRemaining > 0) {
    clickX = mouseX;
    clickY = mouseY;

    draw();
  }
}

function keyPressed() {
  // console.log("keycode", keyCode);
  if (keyCode == 13) {
    if (selected.size == 4) {
      processSubmit();
    } else {
      text("X", w / 2, h - 50);
    }
  }
}
