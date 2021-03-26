// this will store all the weather data
let w;
let ws;
let ind=0;
let rainSizes = [];
let cloudSizes = [];
let sunSizes = [];
let maxSize = 10000;
let delay = 1000;
let prevPos = 0;
let prevSize=0;
let dir = 'r';
let dirG = 'g';
let timer = 0;
let switchTimer = 0;
let switchDelay = 10000;
let lightBlue;
let grey;
let yellow;
let darkGrey;
let numHours = 12;

//let pressed = false;
//let initX;
//let initY;

// current message at the bottom of the screen
let message;

// setInterval() uses milliseconds, this helps us convert to them
const SECONDS = 1000;
const MINUTES = 60*SECONDS;

let aspect;


function setup() {
  createCanvas(390, 844);  // use the size of your phone
  
  aspect = new AspectHelper(this);

  // get the current weather for MIT's latitude and longitude
  //w = requestWeather(42.3596764, -71.0958358);  // MIT
  
  w = requestWeather('gps', updateTime);
  message = 'Requesting forecast…';
  setInterval(updateWeather, 5*MINUTES);
  
  grey = color(88, 104, 117);
  midGrey = color(149, 154, 155);
  darkGrey = color(73, 77, 79);
  yellow = color(255, 224, 112);
  lightBlue = color(201, 231,243);
  greyBlue = color(147, 194, 204);
  yellow2 = color(255, 224, 112);
  yellow3 = color(255, 189, 69);
  yellow4 = color(255, 226, 157);
  yellow5 = color(255, 207, 35);
  yellow6 = color(255, 238, 194);
  
  switchTimer = millis();
}


function draw() {
  aspect.apply();
  
  rainBackground = grey;
  rainColor = lightBlue;
  clearBackground = color('white');
  clearColor = lightBlue;
  cloudBackground = grey;
  cloudColor = darkGrey;
  snowBackground = lightBlue;
  snowColor = color('white');
  textColor = color('white');
  
  background('white');

  if (w.ready) {
    fill('white');
    noStroke();
  
    let conditions = w.getSummary().toLowerCase();

    let wind = w.getWindSpeed();
    //wind = 10;
    
    if (conditions.includes("drizzle") || conditions.includes("rain")) {
      background(rainBackground);
      
      maxSize = map(wind, 0, 40, 10000, 3000);
      //maxSize = 10000;
      let intensity = w.getPrecipIntensity();
      //intensity = 0.3;
      let numDrops = map(intensity, 0, 0.5, 0, 100);
      //console.log(numDrops);
      delay = map(numDrops, 1, 100, 2000, 50);
      //console.log(delay);
      if (rainSizes.length < numDrops && millis() - timer > delay) {
        let xVal = random(50, aspect.width-50);
        let yVal = random(50, aspect.height/3-20);
        rainSizes.push({size:30, x:xVal, y:yVal}); 
        timer = millis();
      } else {
        let toDelete=-1;
        rainSizes = rainSizes.map((obj,i) => {
          if (obj.size > maxSize) {
            toDelete = i;
            return {x: obj.x, y: obj.y, size: obj.size};
          }
          return {x: obj.x, y: obj.y, size: obj.size+map(wind, 0, 40, 15, 60)};
        });
        if (toDelete != -1) {
          rainSizes.splice(toDelete,1);
        }
      }
      rainSizes.forEach(pt => rain(pt.x, pt.y, pt.size));
    } else if (conditions.includes("snow")) {
      background(snowBackground);
      snow(aspect.width/2, aspect.height/2, 180);
    } else if (conditions.includes("cloudy") || conditions.includes("foggy")|| conditions.includes("overcast")) {
      background(cloudBackground);

      let cloudCover = round(w.getCloudCover()*100);
      if (cloudSizes.length < cloudCover) {
         let xVal = round(random(0, aspect.width));
         let yVal = round(random(50, aspect.height/4));
         let cSize = round(random(10, 100));
         cloudSizes.push({x: xVal, y:yVal, size: cSize});
      }
      cloudSizes = cloudSizes.map(pt => {
        let newX = pt.x+wind/20;
        if (newX > aspect.width) {
           newX -= aspect.width;
        }
        return {x: newX, y: pt.y, size:pt.size};
      });
      cloudSizes.forEach(pt => cloudy(pt.x, pt.y, pt.size));
      
      
    } else {
      background(yellow2);

      while (sunSizes.length < 100) {
        let wide = random(10,120);
        let angle = random(0, PI);
        let col = random([color('yellow'), color('white'),yellow, yellow2, yellow3, yellow4, yellow5, yellow6]);
        sunSizes.push({ wide: wide, ang: angle, col: col});
      }
      sunSizes = sunSizes.map(pt => {
        let newW = pt.wide + random(-wind, wind);
        if (newW < 0) {
          newW += wind; 
        } else if (newW >= 40) {
         newW -= wind; 
        }
        return {wide: newW, ang:pt.ang, col:pt.col};
      });
      sunSizes.forEach(pt => sun(pt.wide, pt.ang, pt.col));
    }
    
    // foreground
    current(conditions);
    hourly(conditions);

  } else {
    textSize(24);
    text('This may take a few seconds...', aspect.width/2, aspect.height/2);
  }
  
  textSize(12);
  textAlign(CENTER, CENTER);
  text(message, aspect.width/2, aspect.height - 12);
}

function sun(w, ang, col) {
  col.setAlpha(35);
  fill(col);
  push();
  rotate(ang);
  triangle(-50, 0, aspect.height+aspect.width, -w, aspect.height+aspect.width, w);
  pop();
}

function rain(cx, cy, size) {
  for(let i = size/30; i>0; i=i-30) {
    let maxOp = map(size, 0, maxSize, 255, 1);
    stroke(0, map(i, 0, maxSize/30, maxOp, 0));
    rainColor.setAlpha(map(i, 0, maxSize/30, maxOp, 0));
    fill(rainColor);
    circle(cx, cy, i);
  }
}

function cloudy(cx, cy, size) {
  noStroke();
  cloudColor.setAlpha(43);
  fill(cloudColor);
  circle(cx, cy, size);
  
}

function snow(cx,cy,size) {
  fill(snowColor).setAlpha(255);
  circle(cx,cy, size);
}

function current(conditions) {
  textStyle(BOLD);

  if (conditions.includes('clear') || conditions.includes('sunny')) {
    yellow5.setAlpha(255);
    fill(yellow5);
  } else {
    textColor.setAlpha(255);
    fill(textColor);
  }
  textAlign(LEFT, TOP);
  
  textSize(66);  // big text
  text(w.getTime().hourMinute(), 20, 20);
  
  
  let temp = formatDegrees(w.getTemperature());
  //textStyle(NORMAL);
  textAlign(RIGHT, TOP);
  
  let maxT = formatDegrees(w.getTemperatureMax('daily')[0]);
  let minT = formatDegrees(w.getTemperatureMin('daily')[0]);
  textSize(20);
  text("Low " + minT + "  High " + maxT, aspect.width-20, 20);
  
  textStyle(BOLD);
  textSize(58);  // big text
  // show the temperature in degrees
  text(temp+ "F", aspect.width-20, 47);
  
  textStyle(ITALIC);
  textSize(30);
  text(w.getSummary(), aspect.width-20, 108);
  
  textSize(22);
  textStyle(NORMAL);
  text("Wind "+w.getWindSpeed()+ " mph", aspect.width-20, 145);
  
  textSize(18);
  text("Rain "+formatPercent(w.getPrecipProbability()), aspect.width-20, 176);
  
}

function hourly(conditions) {
  textStyle(NORMAL);
  let wd = aspect.width-40;
  let ht = aspect.height*2/3;
  stroke('black');
  
  let runWeights = bestRun();
  let best1 = null;
  let best2 = null;
  let best3 = null;
  runWeights.forEach((weight,i) => {
    if ((best1 == null || weight < best1[1]) && weight != 999999) {
      //console.log("here");
     if(best1 != null) {
      if (best2 != null) {
       best3 = best2; 
      }
      best2 = best1;
     }
     best1 = [i, weight];
    } else if ((best2 == null || weight < best2[1]) && weight != 999999) {
     if (best2 != null) {
      best3 = best2; 
     }
     best2 = [i, weight];
    } else if ((best3 == null || weight < best3[1]) && weight != 999999) {
     best3 = [i, weight]; 
    }
  });
  
  let fillCol;
  let highlightCol;
  if (conditions.includes('clear')) {
    midGrey.setAlpha(200);
    fillCol = midGrey;
    
    yellow5.setAlpha(180);
    highlightCol = yellow5;
  } else {
    fillCol = color(200,200,205, 100); // best

    lightBlue.setAlpha(220);
    highlightCol = lightBlue;
  }
  
  fill('white');
  let y = aspect.height-ht-20;
  let x = aspect.width-wd-20;
  for (let j =0; j<numHours; j++) {
    
    noStroke();
    if ((best1 != null && best1[0] == j) || (best2 != null && best2[0] == j) || (best3 != null && best3[0] == j)) {
     fill(highlightCol);
     textColor.setAlpha(255);
      
    } else {
      fill(fillCol);
      textColor.setAlpha(150);
    }
    
    rect(x,y, wd, ht/numHours-2, 2);
    
    y+= ht/numHours;
    
    fill(textColor);
    textAlign(LEFT, CENTER);
    textSize(24);
    text(twelveHour((w.getTime().hour24() + j+1)%24), x + 10, y-ht/(2*numHours));
    
    if ((best1 != null && best1[0] == j) || (best2 != null && best2[0] == j) || (best3 != null && best3[0] == j)) {
     runIcon( wd*0.35, y-ht/(2*numHours), 24);
    }
    
    noStroke();
    fill(textColor);
    
    textAlign(CENTER, CENTER);
    textSize(22);
    textStyle(BOLD);
    text(formatDegrees(w.getTemperature('hourly')[j])+"F", x + wd*0.45, y-ht/(2*numHours));
    
    textSize(18);
    textStyle(NORMAL);
    text(round(w.getWindSpeed('hourly')[j])+ "mph", x + wd*0.65, y-ht/(2*numHours));
    
    textSize(18);
    text(formatPercent(w.getPrecipProbability('hourly')[j]), x + wd*0.85, y-ht/(2*numHours));
    
    dropIcon(x + wd*0.935, y-ht/(2*numHours)-2, 15);
    
  }
  lightBlue.setAlpha(255);
  textColor.setAlpha(255);
}

// return hours that read 1 through 12 rather than 0 through 23
function twelveHour(h) {
  let str = "";
  if (h>11 && h != 24) {
    str += "pm";
  } else {
    str += "am";
  }
  h = h % 12;
  if (h === 0) {
    h = 12;
  }
  return h+str;
}

function dropIcon(centerx, centery, size) {
  noStroke();
  fill(textColor);
  circle(centerx, centery+size*0.18, size*0.65);
  triangle(centerx-size*0.27, centery, centerx+size*0.27, centery, centerx, centery-size/2);
  
}

function runIcon(cx, cy, size) {
  noStroke();
  darkGrey.setAlpha(255);
  //fill('black');
  fill(darkGrey);
  circle(cx,cy-size*0.4, size*0.25);
  
  stroke(darkGrey);
  //back
  strokeWeight(2);
  line(cx, cy-size*0.4, cx-size*0.08, cy+size*0.05);
  
  //arm
  strokeWeight(1);
  line(cx, cy-size*0.2, cx+size*0.15, cy-size*0.07);
  line(cx+size*0.15, cy-size*0.07, cx+size*0.35, cy-size*0.25);
  
  line(cx, cy-size*0.2, cx-size*0.35, cy-size*0.2);
  line(cx-size*0.35, cy-size*0.2, cx-size*0.3, cy+size*0.05);
  
  //legs
  line(cx-size*0.08, cy, cx+size*0.16, cy+size*0.2);
  line(cx+size*0.16, cy+size*0.2, cx+size*0.25, cy+size*0.5);
  
  line(cx-size*0.08, cy, cx-size*0.16, cy+size*0.4);
  line(cx-size*0.16, cy+size*0.4, cx-size*0.5, cy+size*0.3);
}

function bestRun() {
   let currHour = w.getTime().hour24();
   let tempRatings =  w.getApparentTemperature('hourly').map(temp => abs(temp-65));
   let rainRatings = w.getPrecipProbability('hourly').map(p => {
     if (p <= 0.3) {
       return 1;
     }
     return p*10;
   });
   
   return rainRatings.map((rVal, i) => {
     if ((currHour+i)%24 <5 || (currHour+i)%24 >17) {
        return 999999; 
     }
     return tempRatings[i] *rVal;
   }).slice(0,numHours);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function updateWeather() {
  print('updating');
  message = 'Updating forecast…';
  // update the screen so this message shows up at the bottom
  redraw();

  // get the forecast, and call updateTime() when it arrives
  w.requestForecast('gps', updateTime);
}


// update received, update the message at the bottom of the screen
function updateTime() {
  message = 'Last updated ' + w.getTimeMoment().hourMinuteLong();
  redraw();
}
