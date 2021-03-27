const hourLen = 117;
const minLen = 57;
const secLen = 28;

let screenCenter;

const backColor = 0;
const lineColor = 255;
const pathColor = 150;

function setup() {
  createCanvas(400, 400);
  screenCenter = createVector(width/2, height/2);

  ellipseMode(RADIUS);
  noStroke();
  
}


function draw() {
  background(backColor);
  
  noStroke();
  for (let k=1; k<=12; k++) {
    if (k <= twelveHour()) {
      for (let j=0; j<60; j++) {
        if ( !(k == twelveHour() && j > minute())) {
          for (let i=0; i<60; i++) {
           if (!(k==twelveHour() && j == minute() && i>second())) {
             //hourPt = endPt((k)*3600+j*60+i, 11*3600+60*60+60, screenCenter, hourLen);
             //hourPt = endPt((k)*3600+j*60+i, 12*3600+60*60+60, screenCenter, hourLen);
             
             hourPt = hourPtCalc(k*3600+j*60+i, screenCenter, hourLen);
             minPt = endPt(j*60+i, 59*60+60, hourPt, minLen);
             secPt = endPt(i, 60, minPt, secLen);
             let colorVal;
             if (k == twelveHour() && j == minute()) {
               //colorVal = 230;
               colorVal = map(i, 0, second(), pathColor, 230);
             } else {
               colorVal = map(3600*k+60*j+i, 0, 3600*twelveHour()+60*minute()+second(), 0, pathColor);
             }
             
             fill(colorVal);
             circle(secPt.x, secPt.y, 1);
             
           }
          }
        }
      }
    }
  }
  
  stroke(lineColor);
  strokeWeight(3);
  // hour line
  hourEnd = hourPtCalc(twelveHour()*3600+ minute()*60 + second(), screenCenter, hourLen);
  line(screenCenter.x, screenCenter.y, hourEnd.x, hourEnd.y);
  
  strokeWeight(2);
  minEnd = endPt(minute()*60 + second(), 59*60+60, hourEnd, minLen);
  line(hourEnd.x, hourEnd.y, minEnd.x, minEnd.y);
  
  strokeWeight(1);
  secEnd = endPt(second(), 60, minEnd, secLen);
  line(minEnd.x, minEnd.y, secEnd.x, secEnd.y);
  
  //noStroke();
  //fill(backColor);
  ////rect(screenCenter.x-25, screenCenter.y-10, 50, 20, 7);
  //ellipse(screenCenter.x, screenCenter.y, 30, 10);
  //fill(255);
  //textAlign(CENTER, CENTER);
  //text(hoursMinutesSeconds(), screenCenter.x, screenCenter.y);
}

function endPt(val, max, centerPt, len, min=0) {
  var angle = map(val, min, max, radians(-90), radians(270));
  return createVector(centerPt.x + len*cos(angle), centerPt.y + len*sin(angle));
}

function hourPtCalc(val, centerPt, len) {
 var angle = map(val, 3600, 12*3600+60*60+60, radians(-90+360/12), radians(270+360/12));
  return createVector(centerPt.x + len*cos(angle), centerPt.y + len*sin(angle));
}

// return hours that read 1 through 12 rather than 0 through 23
function twelveHour() {
  let h = hour() % 12;
  if (h === 0) {
    h = 12;
  }
  return h;
  //return 12;
}
function H() {
 return hour(); 
}

//function M() {
//  return 59;
//}


// format hours, minutes, and seconds
function hoursMinutesSeconds() {
  return twelveHour() + ':' + nf(minute(), 2) + ':' + nf(second(), 2);
}
