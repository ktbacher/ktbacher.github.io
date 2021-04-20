let pos = 300;
//let pos = -3000;
let posMax = 300;
//let posMin = -9200;
let stage = 0;

let scrollduration = window.innerHeight;

let stage_bounds = [0, -200-scrollduration, -200-scrollduration, -200-scrollduration, -200-scrollduration, // stages 0-4
                  -200-scrollduration, -200-scrollduration, -200-scrollduration, -950-scrollduration, -8000, // stages 5-9
                  -300-scrollduration, -100-scrollduration, -100-scrollduration, -100-scrollduration, -700-scrollduration, // stages 10-14
                  -scrollduration, -650, -10]; // stages 15, 16, 17
let posMin = stage_bounds.reduce((acc, bound) => acc + bound, 0);

let scrollFactor = 10;
let iconScale = 3;
let crownImg;
let castleImg;
let leftFootImg;
let rightFootImg;
let niImg;
let timImg;
let bridgeImg;
let shatterImg;
let rabbitImg;
let caveImg;
let monsterImg;
let quoteImg;

let mainline = window.innerWidth * 0.5;

let speachBubbleDelay = -250;

let font;

let quotes = [["You've got two empty halves of coconuts and you're banging them together.", "Are you suggesting coconuts migrate?"],
              ["Listen: Strange women lying in ponds distributing swords is no basis for a system of government!  Supreme executive power derives from a mandate from the masses, not from some... farcical aquatic ceremony!",
              "Come and see the violence inherent in the system!  HELP, HELP, I'M BEING REPRESSED!"],
              "It's just a flesh wound.",
              ["She turned me into a newt.", "A newt?", "...I got better."],
              "On second thought, let's not go to Camelot. 'Tis a silly place.",
              "Arthur, this is the Holy Grail. Look well, Arthur, for it is your sacred task to seek this grail.",
              "I fart in your general direction!  Your mother was a hamster, and your father smelt of elderberries!",
              '"Defeat at the castle seems to have utterly disheartened King Arthur.  The ferocity of the French taunting took him completely by suprise, and Arthur became convinced that a new strategy was required if the Quest for the Holy Grail were to be brought to a successful conclusion.  Arthur, having consulted his closest knights, decided that they should separate, and search for the Grail individually.  Now this is what they did...." -- A Famous Historian',
              ["Brave Sir Robin ran away.", "No!",
                "Bravely ran away away.", "I didn't!",
                "When danger reared its ugly head, he bravely turned his tail and fled.", "No!",
                "Yes, brave Sir Robin turned about.", " I didn't!",
                "And gallantly he chickened out.", "I never did!",
                "Bravely taking to his feet, he beat a very brave retreat.", "All lies!",
                "Bravest of the brave, Sir Robin!", "I never!"],
              "Do you think this scene should have been cut? We were so worried when the boys were writing it, but now we're glad! It's better than some of the previous scenes I think.",
              ['The knights who say "Ni" demand..... a sacrifice!', 'We want.....(pause) A SHRUBBERY!!!!'],
              "Please! This is supposed to be a happy occasion. Let's not bicker and argue over who killed who.",
              "Yes, shrubberies are my trade. I am a shrubber. My name is Roger the Shrubber. I arrange, design, and sell shrubberies.",
              'There are some who call me... "Tim"?',
              ["What, behind the rabit?", "It IS the rabit", "Look, that rabbit's got a vicious streak a mile wide, it's a killer!",
                "And the Lord spake, saying, 'First shalt thou take out the Holy Pin. Then shalt thou count to three, no more, no less. Three shall be the number thou shalt count, and the number of the counting shall be three. Four shalt thou not count, neither count thou two, excepting that thou then proceed to three. Five is right out. Once the number three, being the third number, be reached, then lobbest thou thy Holy Hand Grenade of Antioch towards thy foe, who, being naughty in My sight, shall snuff it.'"],
              'Here may be found... the last words of Joseph of Arimathea: "He who is valiant and pure of spirit... may find the Holy Grail...in the Castle of Aaargh."',
              "As the horrendous Black Beast lunged forward, escape for Arthur and his knights seemed hopeless,  when, suddenly... the animator suffered a fatal heart attack.  The cartoon peril was no more... The Quest for Holy Grail could continue.",
              ["What... is your favourite colour?", "Blue. No, yellOOOOOOOW!! [is cast into the gorge]"],
              "No chance, English bed-wetting types.  We burst our pimples at you, and call your door-opening request a silly thing. You tiny-brained wipers of other people's bottoms!",
              "We shall attack at once."];
              
let iconLabels = ["King Arthur", "The First Castle", "The Peasant Dennis", "The Black Knight", "The Witch Trial", "Camelot!", "A Visit from God", "The French Castle",
                  ["Sir Robin faces the 3-headed giant", "Sir Galahad is tempted at Castle Antrax", "Arthur and the Knights who say 'Ni!'", "Sir Lancelot attacks a wedding party at Swamp Castle"],
                  "Tim the Enchantor", "The killer Rabbit", "The Cave", "The Black Beast of Aaaargh", "The Bridge of Death", "The French Castle (Again)", "Police!"];

//let sideTextX = window.innerWidth *0.16;


function preload() {
  crownImg = loadImage('assets/arthur.png');
  castleImg = loadImage('assets/castle.png');
  leftFootImg = loadImage('assets/left_foot.png');
  rightFootImg = loadImage('assets/right_foot.png');
  manImg = loadImage('assets/dude.png');
  blackKnightImg = loadImage('assets/bl_knight.png');
  grailImg = loadImage('assets/grail.png');
  witchImg = loadImage('assets/witch.png');
  giantImg = loadImage('assets/3headedGiant.png');
  niImg = loadImage('assets/ni_knight.png');
  timImg = loadImage('assets/tim_enchantor.png');
  bridgeImg = loadImage('assets/death_bridge.png');
  shatterImg = loadImage('assets/shatter.png');
  rabbitImg = loadImage('assets/rabbit.png');
  caveImg = loadImage('assets/cave_agh.png');
  beastImg = loadImage('assets/monster.png');
  shrubberyImg = loadImage('assets/shrubbery.png');
  quoteImg = loadImage('assets/quotebubble.png');
  quoteLeft = loadImage('assets/quoteleft.png');
  
  font = loadFont("data/PatrickHand-Regular.ttf");
  
  coconuts = loadSound('audio/coconuts_noA.mp3');
  
}


function setup() {
  //createCanvas(1250, 700);
  createCanvas(window.innerWidth, window.innerHeight);
  
  imageMode(CENTER);

  textFont(font);
}


function draw() {
  background('white');
  
  let y = 100;
  let x = mainline;
  
  fill(0);
  textSize(24);
  if (stage == 0) {
    text("Scroll up ^", width/2-50, min(pos, 300));
    
    noStroke();
    rectMode(CORNER);

    fill('black');
    textSize(80);
    text("Monty Python", 50, pos-posMax+100);
    textSize(50);
    text("and the", 50, pos-posMax+160);
    textSize(70);
    textStyle(BOLD);
    text("Holy Grail", 50, pos-posMax+240);
    textStyle(NORMAL);
  }
  if (stage >= 1) {
    if (stage == 1) {
      image(crownImg, x, y, min(crownImg.width/2, crownImg.width*abs(pos-1)/500),min(crownImg.height/2, crownImg.height*abs(pos-1)/500));
      footprintsDir(x + crownImg.width/4, y, 4, 0, 10, -scrollduration);  
    } 
    else {
      image(crownImg, x, y, crownImg.width/2, crownImg.height/2);
      footprintsDir(x + crownImg.width/4, y, 4, 0, 10, 1000);
    }
   
  } 
  if (stage >= 2) {
    x = mainline+crownImg.width/4+50 + castleImg.width/6 + 20;
    if (stage == 2) {
      image(castleImg, x, y, min(castleImg.width/iconScale, castleImg.width*abs(pos-1)/500),min(castleImg.height/iconScale, castleImg.height*abs(pos-1)/500));
      footprintsDir(x+castleImg.width/(iconScale*2), y, 4, 0, 10, -scrollduration);
      if (pos < speachBubbleDelay && pos> -scrollduration) {
        speachBubble(quotes[0][0], x+castleImg.width/(iconScale*2)+100, y, 200, 100, PI*1.05);
      }
      
    }
    else {
      image(castleImg, x, y, castleImg.width/iconScale, castleImg.height/iconScale);
      footprintsDir(x+castleImg.width/(iconScale*2), y, 4, 0, 10, 1000);
    }
    
  }
  if (stage >=3) {
    x = mainline+crownImg.width/4+50+castleImg.width/iconScale+20+50 + manImg.width/(iconScale*2) + 20;
    if (stage == 3) {
      image(manImg, x, y, min(manImg.width/iconScale, manImg.width*abs(pos-1)/500),min(manImg.height/iconScale, manImg.height*abs(pos-1)/500));
      footprintsDir(mainline+crownImg.width/4+50+castleImg.width/iconScale+70+manImg.width/iconScale+20, y, 4, 0, 10, -scrollduration);
      
      if (pos < speachBubbleDelay && pos> -scrollduration) {
        speachBubble(quotes[1][0], x+manImg.width/(iconScale*2)+150, y, 300, 130, PI*1.035);
      }
    }
    else {
      image(manImg, x, y, manImg.width/iconScale, manImg.height/iconScale);
      footprintsDir(mainline+crownImg.width/4+50+castleImg.width/iconScale+70+manImg.width/iconScale+20, y, 4, 0, 10, 1000);
    }
  }
  if (stage >= 4) {
    x = mainline+crownImg.width/4+50+castleImg.width/iconScale+70+manImg.width/iconScale+20+50 + blackKnightImg.width/(iconScale*2) + 20;
    if (stage == 4) {
      image(blackKnightImg,x, y, min(blackKnightImg.width/iconScale, blackKnightImg.width*abs(pos-1)/500),min(blackKnightImg.height/iconScale, blackKnightImg.height*abs(pos-1)/500));
      footprintsDir(x, y +blackKnightImg.height/(iconScale*2)+10, 4, PI/2, 10, -scrollduration);
      
      if (pos < speachBubbleDelay && pos> -scrollduration) {
        //speachBubble(quotes[2], x, y +blackKnightImg.height/(iconScale*2)+10+25, 100, 50, PI*3/2);
        speachBubble(quotes[2], x+80, y, 100, 50, PI);
      }
    }
    else {
      image(blackKnightImg, x, y, blackKnightImg.width/iconScale, blackKnightImg.height/iconScale);
      footprintsDir(x, y +blackKnightImg.height/(iconScale*2)+10, 4, PI/2, 10, 1000);
    }
  }
  if (stage >= 5) {
    x = mainline+crownImg.width/4+50+castleImg.width/iconScale+70+manImg.width/iconScale+20+50 + blackKnightImg.width/(iconScale*2) + 20;
    y += blackKnightImg.height/(iconScale*2)+100;
    if (stage == 5) {
      image(witchImg,x, y, min(witchImg.width/iconScale, witchImg.width*abs(pos-1)/500),min(witchImg.height/iconScale, witchImg.height*abs(pos-1)/500));
      footprintsDir(x-witchImg.width/(iconScale *2)-10, y, 4, PI, 10, -scrollduration);
      
      if (pos < speachBubbleDelay+150 && pos> -scrollduration) {
        speachBubble(quotes[3][0], x+witchImg.width/(iconScale *2) + 50, y-30, 125, 60, PI*0.98);
        if (pos < speachBubbleDelay+80) {
          speachBubble(quotes[3][1], x-witchImg.width/(iconScale *2) - 30, y, 70, 45, 0);
          if (pos < speachBubbleDelay-110) {
            speachBubble(quotes[3][2], x+witchImg.width/(iconScale *2) + 50, y+30, 100, 45, PI*1.02);
          }
        }
      }
    }
    else {
      image(witchImg, x, y, witchImg.width/iconScale, witchImg.height/iconScale);
      footprintsDir(x-witchImg.width/(iconScale *2)-10, y, 4, PI, 10, 1000);
    }
  }
  if (stage >= 6) {
    x = mainline+crownImg.width/4+50+castleImg.width/iconScale+20+50 + manImg.width/(iconScale*2)+20;
    if (stage == 6) {
      image(castleImg,x, y, min(castleImg.width/iconScale, castleImg.width*abs(pos-1)/500),min(castleImg.height/iconScale, castleImg.height*abs(pos-1)/500));
      footprintsDir(x-castleImg.width/(iconScale *2), y, 4, PI, 10, -scrollduration);
      
      if (pos < speachBubbleDelay && pos> -scrollduration) {
        //speachBubble(quotes[4], x-castleImg.width/(iconScale *2)-75, y, 150, 90, 0);
        speachBubble(quotes[4], x+castleImg.width/(iconScale *2)+75, y, 150, 90, PI);
      }
    }
    else {
      image(castleImg, x, y, castleImg.width/iconScale, castleImg.height/iconScale);
      footprintsDir(x-castleImg.width/(iconScale *2), y, 4, PI, 10, 1000);
    }
  }
  if (stage >=7) {
    x = mainline+crownImg.width/4+50 + castleImg.width/6 + 20;
    if (stage == 7) {
      image(grailImg,x, y, min(grailImg.width/iconScale, grailImg.width*abs(pos-1)/500),min(grailImg.height/iconScale, grailImg.height*abs(pos-1)/500));
      footprintsDir(x-grailImg.width/(iconScale *2)-10, y, 4, PI, 10, -scrollduration);
      
      if (pos < speachBubbleDelay && pos> -scrollduration) {
        //speachBubble(quotes[5], x-grailImg.width/(iconScale *2)-100, y, 200, 100, 0);
        speachBubble(quotes[5], x+grailImg.width/(iconScale *2)+100, y, 200, 100, PI);
      }
    }
    else {
      image(grailImg, x, y, grailImg.width/iconScale, grailImg.height/iconScale);
      footprintsDir(x-grailImg.width/(iconScale *2)-10, y, 4, PI, 10, 1000);
    }
  }
  if (stage >=8) {
    x = mainline;
    if (stage == 8) {
      image(castleImg,x+10, y, min(castleImg.width/iconScale, castleImg.width*abs(pos-1)/500),min(castleImg.height/iconScale, castleImg.height*abs(pos-1)/500));
      footprintsDir(x+castleImg.width/(iconScale *2)+10, y +castleImg.height/(iconScale *4), 10, PI/5, 10, -scrollduration);
      
      if (pos < speachBubbleDelay && pos> -scrollduration) {
        //speachBubble(quotes[6], x, y +castleImg.height/(iconScale *2)+50, 200, 100, PI *3/2);
        speachBubble(quotes[6], x+140, y, 200, 100, PI);
      }
    }
    else {
      image(castleImg, x+10, y, castleImg.width/iconScale, castleImg.height/iconScale);
      footprintsDir(x+castleImg.width/(iconScale *2)+10, y +castleImg.height/(iconScale *4), 10, PI/5, 10, 1000);
    }
  }
  
  let y_gap = height*0.125;
  let x_diff = width*0.3;
  let y_mid;
  if (stage >= 9) {
    let playCoconuts = false;
    x = x+castleImg.width/(iconScale *2)+10 + 20*10*cos(PI/5);
    y_mid = y+castleImg.height/(iconScale *4) + 20*10*sin(PI/5);
    y = y_mid;
    if (stage == 9) {
      // first sir robin 3 head monster
      footprintsDir(x+10,y-10,20, PI*0.12, 20, 0);
      if (pos < 0 && pos > -1050){
        //handleSound(0, -1000+10);
        playCoconuts = true;
      }
      if (pos < -1000) {
        if (pos > -1250-20*50) {
          let offset = -1000;
          sceneLabel(iconLabels[stage-1][0], y+y_gap-50, x+x_diff/2,40,max(0,map(abs(pos-offset+scrollduration/2), 0, scrollduration/2, 255, 0)));
        }
        image(giantImg,x+x_diff/2, y+y_gap, min(giantImg.width/iconScale, giantImg.width*abs(pos+999)/500),min(giantImg.height/iconScale, giantImg.height*abs(pos+999)/500));
      }
      footprintsDir(x+x_diff/2,y+y_gap+ giantImg.height/(iconScale*2)+5,20, PI-PI*0.12, 20, -1250); //from giant
      if (pos < -1250 && pos > -1250-20*50-50){
      //  handleSound(-1250, -1250-20*50);
        playCoconuts = true;
      }
      let offset = -50;
      if (pos > -2200+offset){
        if (pos > -1390+offset && pos < -1250+offset) {
          speachBubble(quotes[8][0], x+x_diff/2+28*cos(PI-PI*0.12)-50, y+y_gap+28*sin(PI-PI*0.12), 100, 50, 0);
        }
        if (pos > -1460+offset &&pos < -1320+offset) {
          speachBubble(quotes[8][1], x+x_diff/2+28*cos(PI-PI*0.12)+100, y+y_gap+28*sin(PI-PI*0.12)+20, 100, 50, PI);
        }
        if (pos > -1530+offset && pos < -1390+offset) {
          speachBubble(quotes[8][2], x+x_diff/2+56*cos(PI-PI*0.12)-50, y+y_gap+56*sin(PI-PI*0.12), 100, 50, 0);
        }
        if (pos > -1600+offset && pos < -1460+offset) {
          speachBubble(quotes[8][3], x+x_diff/2+56*cos(PI-PI*0.12)+100, y+y_gap+56*sin(PI-PI*0.12)+20, 100, 50, PI);
        }
        if (pos > -1670+offset &&pos < -1530+offset) {
          speachBubble(quotes[8][4], x+x_diff/2+84*cos(PI-PI*0.12)-80, y+y_gap+84*sin(PI-PI*0.12), 220, 80, 0);
        }
        if (pos > -1740+offset && pos < -1600+offset) {
          speachBubble(quotes[8][5], x+x_diff/2+84*cos(PI-PI*0.12)+100, y+y_gap+84*sin(PI-PI*0.12)+20, 100, 50, PI);
        }
        if (pos > -1810+offset && pos < -1670+offset) {
          speachBubble(quotes[8][6], x+x_diff/2+112*cos(PI-PI*0.12)-50, y+y_gap+112*sin(PI-PI*0.12), 150, 50, 0);
        }
        if (pos > -1880+offset && pos < -1740+offset) {
          speachBubble(quotes[8][7], x+x_diff/2+112*cos(PI-PI*0.12)+100, y+y_gap+112*sin(PI-PI*0.12)+20, 100, 50, PI);
        }
        if (pos > -1950+offset && pos < -1810+offset) {
          speachBubble(quotes[8][8], x+x_diff/2+140*cos(PI-PI*0.12)-50, y+y_gap+140*sin(PI-PI*0.12), 150, 50, 0);
        }
        if (pos > -2020+offset && pos < -1880+offset) {
          speachBubble(quotes[8][9], x+x_diff/2+140*cos(PI-PI*0.12)+100, y+y_gap+140*sin(PI-PI*0.12)+20, 100, 50, PI);
        }
        if (pos > -2090+offset && pos < -1950+offset) {
          speachBubble(quotes[8][10], x+x_diff/2+168*cos(PI-PI*0.12)-50, y+y_gap+168*sin(PI-PI*0.12), 150, 50, 0);
        }
        if (pos > -2160+offset && pos < -2020+offset) {
          speachBubble(quotes[8][11], x+x_diff/2+168*cos(PI-PI*0.12)+100, y+y_gap+168*sin(PI-PI*0.12)+20, 100, 50, PI);
        }
        if ( pos < -2090+offset) {
          speachBubble(quotes[8][12], x+x_diff/2+196*cos(PI-PI*0.12)-50, y+y_gap+196*sin(PI-PI*0.12), 150, 50, 0);
        }
        if ( pos < -2160+offset) {
          speachBubble(quotes[8][13], x+x_diff/2+196*cos(PI-PI*0.12)+100, y+y_gap+196*sin(PI-PI*0.12)+20, 100, 50, PI);
        }
      }
      
      // Sir galahad at castle antrax
      footprintsDir(x+5,y,10, PI*0.2, 20, -1250-20*50);
      //handleSound(-1250-20*50, -1250-20*50 -10*50);
      if (pos > -1250-20*50 -10*50  && pos < -1250-20*50) {
        playCoconuts = true;
      }
      if (pos < -1250-20*50 -10*50){ // pos < 2750
        if (pos > -3000 - 12*50){
          //sceneLabel(iconLabels[stage-1][1], height+pos+2750, x+x_diff/4-200);
          //sceneLabel(iconLabels[stage-1][1], y+y_gap+80, x+x_diff/4);
          let offset = -1250-20*50 -10*50;
          sceneLabel(iconLabels[stage-1][1], y+y_gap+50, x+x_diff/4, 40,max(0,map(abs(pos-offset+scrollduration/2), 0, scrollduration/2, 255, 0)));
        }
        image(castleImg, x+x_diff/4, y+y_gap,  min(castleImg.width/iconScale, castleImg.width*abs(pos+2749)/500),min(castleImg.height/iconScale, castleImg.height*abs(pos+2749)/500));
        if ( pos > -3000 - 12*50 &&  pos < -2950) {
          speachBubble(quotes[9], x+x_diff/4+150, y+y_gap-15, 200, 160, PI);
        }
      }
      footprintsDir(x+x_diff/4, y+y_gap+ castleImg.height/(iconScale*2), 12, PI-PI*0.2, 20, -3000); // from castle 1
      if (pos > -3000-12*50  && pos < -3000) {
        playCoconuts = true;
      }
      
      // king arthur and knights who say Ni
      footprintsDir(x-10,y+5,10, PI*0.8, 20, -3000-12*50);
      if (pos > -3000 - 12*50 - 10*50  && pos < -3000-12*50) {
        playCoconuts = true;
      }
      if (pos < -3000 - 12*50 - 10*50) { // pos < 4100
        if (pos > -5000-12*50) {
          //sceneLabel(iconLabels[stage-1][2], height+(pos+4100)/2, x-x_diff/4-380);
          //sceneLabel(iconLabels[stage-1][2], y+y_gap+80, x-x_diff/4);
          let offset = -3000 - 12*50 - 10*50;
          sceneLabel(iconLabels[stage-1][2], y+y_gap+80, x-x_diff/4,40,max(0,map(abs(pos-offset+scrollduration/2), 0, scrollduration/2, 255, 0)));
        }
        image(niImg,x-x_diff/4, y+y_gap, min(niImg.width/iconScale, niImg.width*abs(pos+4099)/500),min(niImg.height/iconScale, niImg.height*abs(pos+4099)/500));
        if ( pos > -4800 - 12*50 &&  pos < -4100-250) {
          speachBubble(quotes[10][0],x-x_diff/4-130, y+y_gap-20, 180, 50, 0);
        }
        if ( pos > -4800 - 12*50 &&  pos < -4100-250-100) {
          speachBubble(quotes[10][1],x-x_diff/4-130, y+y_gap+30, 180, 50, 0);
        }
      }
      footprintsDir(x-x_diff/4+niImg.width/(iconScale*2), y+y_gap-10,4,0,20,-4350);
      if (pos > -4350-4*50  && pos < -4350) {
        playCoconuts = true;
      }
      if (pos < -4350-4*50) { // 4550
        image(shrubberyImg, x, y+y_gap, min(shrubberyImg.width/4, shrubberyImg.width*abs(pos+4549)/200),min(shrubberyImg.height/4, shrubberyImg.height*abs(pos+4549)/200));
      }
      footprintsDir(x-shrubberyImg.width/(iconScale*2), y+y_gap+10,4,PI,20,-4800);
      footprintsDir(x-x_diff/4, y+y_gap+ niImg.height/(iconScale*2), 12, PI-PI*0.8, 20, -5000); // pos 4800-4*50
      if (pos > -5000-12*50  && pos < -4800) {
        playCoconuts = true;
      }
      
      // lancelot at castle
      footprintsDir(x-20,y-5,18, PI*0.88, 20, -5000-12*50);
      if (pos > -5000-12*50-20*50  && pos < -5000-12*50) {
        playCoconuts = true;
      }
      if (pos < -5000-12*50-20*50) { // 6600
        if( pos > -7850){
          //sceneLabel(iconLabels[stage-1][3], height+pos+6600, x-x_diff/2-420);
          //sceneLabel(iconLabels[stage-1][3], y+y_gap+50, x-x_diff/2);
          let offset = -6600;
          sceneLabel(iconLabels[stage-1][3], y+y_gap+50, x-x_diff/2,40,max(0,map(abs(pos-offset+scrollduration/2), 0, scrollduration/2, 255, 0)));
        }
        image(castleImg, x-x_diff/2, y+y_gap,  min(castleImg.width/iconScale, castleImg.width*abs(pos+6599)/500),min(castleImg.height/iconScale, castleImg.height*abs(pos+6599)/500));
        if ( pos > -6850 - 20*50 &&  pos < -6600-250) {
          speachBubble(quotes[11], x-x_diff/2-150, y+y_gap, 220, 80, 0);
        }
      }
      footprintsDir(x-x_diff/2, y+y_gap+ castleImg.height/(iconScale*2),20, PI-PI*0.88, 20, -6850); // from castle 2
      if (pos > -6850-20*50  && pos < -6850) {
        playCoconuts = true;
      }
      
      footprintsDir(x, y+2*y_gap+20, 3, PI/2, 10, -6850-20*50); //7850 -> total 8000 for stage
      if (pos< -6850-20*50 && pos > -7990) {
        playCoconuts = true;
      }
      
      if (playCoconuts && !coconuts.isPlaying()) {
        coconuts.play();
      } else if (!playCoconuts && coconuts.isPlaying()) {
        coconuts.stop();
      }
    } 
    else {
      
      footprintsDir(x+10,y-10,20, PI*0.12, 20, 1000);
      image(giantImg,x+x_diff/2, y+y_gap, giantImg.width/iconScale,giantImg.height/iconScale);
      footprintsDir(x+5,y,10, PI*0.2, 20, 1000);
      image(castleImg, x+x_diff/4, y+y_gap,  castleImg.width/iconScale, castleImg.height/iconScale);
      
      footprintsDir(x-10,y+5,10, PI*0.8, 20, 1000);
      image(niImg,x-x_diff/4, y+y_gap, niImg.width/iconScale, niImg.height/iconScale);
      footprintsDir(x-20,y-5,18, PI*0.88, 20, 1000);
      image(castleImg, x-x_diff/2, y+y_gap,  castleImg.width/iconScale, castleImg.height/iconScale);
      
      footprintsDir(x-x_diff/4+niImg.width/(iconScale*2), y+y_gap-10,4,0,20,1000);
      image(shrubberyImg, x, y+y_gap, shrubberyImg.width/4, shrubberyImg.height/4);
      footprintsDir(x-shrubberyImg.width/(iconScale*2), y+y_gap+10,4,PI,20,1000);
      
      footprintsDir(x+x_diff/2,y+y_gap+ giantImg.height/(iconScale*2)+5,20, PI-PI*0.12, 20, 1000); //from giant
      footprintsDir(x+x_diff/4, y+y_gap+ castleImg.height/(iconScale*2), 12, PI-PI*0.2, 20, 1000); // from castle 1
      footprintsDir(x-x_diff/4, y+y_gap+ niImg.height/(iconScale*2), 12, PI-PI*0.8, 20, 1000); // from Ni
      footprintsDir(x-x_diff/2, y+y_gap+ castleImg.height/(iconScale*2),20, PI-PI*0.88, 20, 1000); // from castle 2
       
      footprintsDir(x, y+2*y_gap+20, 3, PI/2, 10, 1000);
    }
    
  }
  if (stage >= 10) {
    y +=3*y_gap;
    if (stage == 10) {
      image(timImg,x, y, min(timImg.width/iconScale, timImg.width*abs(pos-1)/500),min(timImg.height/iconScale, timImg.height*abs(pos-1)/500));
      footprintsDir(x-timImg.width/(iconScale *2)-10, y, 6, PI, 10, -scrollduration);
      if (pos < speachBubbleDelay && pos> -scrollduration) {
        speachBubble(quotes[13], x+150, y, 190, 70, PI);
      }
    } else {
      image(timImg,x, y,timImg.width/iconScale, timImg.height/iconScale);
      footprintsDir(x-timImg.width/(iconScale *2)-10, y, 6, PI, 10, 1000);
    }
    
  }
  if (stage >= 11) {
    x = x-timImg.width/(iconScale *2)-10 - 6*20 -rabbitImg.width/(iconScale*2)+5;
    if (stage == 11) {
      image(rabbitImg,x, y, min(rabbitImg.width/iconScale, rabbitImg.width*abs(pos-1)/500),min(rabbitImg.height/iconScale, rabbitImg.height*abs(pos-1)/500));
      footprintsDir(x-rabbitImg.width/(iconScale*2)-15, y, 2, PI, 10, -scrollduration);
      if (pos < speachBubbleDelay && pos> -scrollduration) {
        speachBubble(quotes[14][2],x-rabbitImg.width/(iconScale*2)-100, y, 190, 70, 0);
      }
    }else {
      image(rabbitImg,x, y, rabbitImg.width/iconScale, rabbitImg.height/iconScale);
      footprintsDir(x-rabbitImg.width/(iconScale*2)-15, y, 2, PI, 10, 1000);
    }
  }
  if (stage >= 12) {
    x = x - 200/(iconScale) - 10-caveImg.width/(iconScale);
    if (stage == 12) {
      image(caveImg,x, y, min(caveImg.width/iconScale, caveImg.width*abs(pos-1)/500),min(caveImg.height/iconScale, caveImg.height*abs(pos-1)/500));
      footprintsDir(x-15, y-caveImg.width/(iconScale*2)-5, 2, PI*5/4, 10, -scrollduration);
      if (pos < speachBubbleDelay && pos> -scrollduration) {
        speachBubble(quotes[15],x+170, y, 250, 100, PI);
      }
    }else {
      image(caveImg,x, y, caveImg.width/iconScale,caveImg.height/iconScale);
      footprintsDir(x-15, y-caveImg.width/(iconScale*2)-5, 2, PI*5/4, 10, 1000);
    }
  }
  if (stage >= 13) {
    x = x-15 + 2*(20+200/(iconScale*4))*cos(PI*5/4);
    y = y-200/(iconScale*2)-5 + 2*(20+200/(iconScale*4))*sin(PI*5/4);
    if (stage == 13) {
      image(beastImg,x, y, min(beastImg.width/iconScale, beastImg.width*abs(pos-1)/500),min(beastImg.height/iconScale, beastImg.height*abs(pos-1)/500));
      footprintsDir(x+(20+beastImg.width/(iconScale*2))*cos(PI*5/4), y+(20+beastImg.width/(iconScale*2))*sin(PI*5/4), 2, PI*5/4, 10, -scrollduration);
      if (pos < speachBubbleDelay && pos> -scrollduration) {
        speachBubble(quotes[16],x+180, y, 300, 150, PI);
      }
    }else {
      image(beastImg,x, y, beastImg.width/iconScale, beastImg.height/iconScale);
      footprintsDir(x+(20+beastImg.width/(iconScale*2))*cos(PI*5/4), y+(20+beastImg.width/(iconScale*2))*sin(PI*5/4), 2, PI*5/4, 10, 1000);
    }
  }
  if (stage >= 14) {
    x = x+(20+beastImg.width/(iconScale*2))*cos(PI*5/4)+ 2*20*cos(PI*5/4);
    y = y_mid + y_gap;
    if (stage == 14) {
      image(bridgeImg,x, y, min(bridgeImg.width/iconScale, bridgeImg.width*abs(pos-1)/500),min(bridgeImg.height/iconScale, bridgeImg.height*abs(pos-1)/500));
      //footprintsDir(x+(20+bridgeImg.width/(iconScale*2))*cos(PI*7/4), y+y_gap+(20+bridgeImg.height/(iconScale*2))*sin(PI*7/4), 10, PI*7/4, 10, -250);
      footprintsDir(x+(20+bridgeImg.width/(iconScale*2))*cos(PI*7/4*1.02), y+(20+bridgeImg.height/(iconScale*2))*sin(PI*7/4*1.02), 14, PI*7/4*1.02, 10, -scrollduration);
      if (pos < speachBubbleDelay && pos> -scrollduration) {
        speachBubble(quotes[17][0],x+100, y-30, 180, 50, PI);
      }
      if (pos < speachBubbleDelay-100 && pos> -scrollduration) {
        speachBubble(quotes[17][1],x+150, y+25, 185, 65, PI);
      }
    }else {
      image(bridgeImg,x, y, bridgeImg.width/iconScale, bridgeImg.height/iconScale);
      //footprintsDir(x+(20+bridgeImg.width/(iconScale*2))*cos(PI*7/4), y+y_gap+(20+bridgeImg.height/(iconScale*2))*sin(PI*7/4), 10, PI*7/4, 10, 1000);
      footprintsDir(x+(20+bridgeImg.width/(iconScale*2))*cos(PI*7/4*1.02), y+(20+bridgeImg.height/(iconScale*2))*sin(PI*7/4*1.02), 14, PI*7/4*1.02, 10, 1000);
    }
  }
  //stage 15 only has text
  if (stage == 15) {
    x = mainline;
    y = y_mid-130;
    if (pos < speachBubbleDelay && pos> -scrollduration) {
      speachBubble(quotes[18],x-140, y, 290, 120, 0);
    }
  }
  if (stage >= 16) {
    x = mainline;
    y = blackKnightImg.height/iconScale+150;
    footprintsDir(x,y+50, 5, PI/2, 10, 0);
    rectMode(CENTER);
    fill('black'); 
    rect(width/2, height/2, max(0, -150-pos)/stage_bounds[15]*width, max(0, -150-pos)/stage_bounds[15]*height);
  }
  if (stage == 17) {
   shatter(); 
  }
  
  
  if (stage > 0 && stage <= 16) {
    if (stage == 8 && pos < -scrollduration) {
      sceneLabel(quotes[7], height+pos+scrollduration, x-200, 300, 255);
    }
    if (stage != 9) {
      if (stage == 5) {
        sceneLabel(iconLabels[stage-1], y+50, x);
      } else {
        sceneLabel(iconLabels[stage-1], y+50, x);
      }
      handleSound();
    }


    positionBar();
  }
  
  
  
  handleStages();
}

function footprintsDir(x, y, len, angle, scaleFactor, startPos) {
  tint(255, 30);
  let offset = startPos;
  if (pos < startPos) {
    for (let j=0; j < len ; j++) {
      if (abs(pos - offset) > j*50 && j%2 == 0) {
        push();
        translate(x+j*200/scaleFactor*cos(angle) - 200/(scaleFactor*4)*sin(angle), y+j*200/scaleFactor*sin(angle) + 200/(scaleFactor*4)*cos(angle));
        push();
        rotate(angle);
        image(rightFootImg,  0, 0, rightFootImg.width / scaleFactor, rightFootImg.height / scaleFactor);
      }
      if (abs(pos - offset) > j*50 && j%2 == 1) {
        push();
        translate(x+j*200/scaleFactor*cos(angle) +200/(scaleFactor*4)*sin(angle), y+j*200/scaleFactor*sin(angle) - 200/(scaleFactor*4)* cos(angle));
        push();
        rotate(angle);
        image(leftFootImg,  0, 0, leftFootImg.width / scaleFactor, leftFootImg.height / scaleFactor);
      }
      pop();
      pop();
    }
  }
  tint(255, 255);
}


function handleStages() {
 if (stage > 0 && pos > 0) {
    stage -= 1;
    pos = stage_bounds[stage];
  } else if (stage < 17 && pos < stage_bounds[stage]) {
   stage += 1;
   pos = 0;
  } else if (stage == 17) {
   if (pos < stage_bounds[stage]) {
     pos = stage_bounds[stage];
   }
  }
}

function positionBar() {
 fill('lightgrey');
 noStroke();
 rectMode(CORNER);
 total = posMax;
 curr = stage>0? posMax+abs(pos) : posMax-pos;
 for (let i=1; i<stage_bounds.length; i++) {
   if (i < stage) {
       curr -= stage_bounds[i];
   }
  total -= stage_bounds[i];
 }
 rect(0,0, 20,  height*curr/total);
 cumm = posMax;
 if (stage > 0) {
   for (let i =0; i< stage; i++) {
     fill('white');
     cumm+=abs(stage_bounds[i]);
     circle(10, height*cumm/total, 5);
   }
  }
}

function shatter() {
  image(shatterImg, width/2, height/2, width, height);
}


function sceneLabel(t, y, x=width*0.15, h=40, opacity=max(0,map(abs(pos+scrollduration/2), 0, scrollduration/2, 255, 0))) {
  let y_min = -200, w = width*0.22;
  if (y > y_min){
    rectMode(CENTER);

    fill(0,opacity);
    textAlign(CENTER, CENTER);
    textFont(font, 16);
    text(t, x,y, w-20, h);
    textAlign(LEFT, BASELINE);
    
    fill(0);
  }
}

function speachBubble(t, x, y, w, h, ang) {
  fill('black');
  if (PI/2< ang && ang < PI*3/2) {
    image(quoteImg, x,y, w+0.1*w,h+25);
    
    textSize(12);
    textAlign(CENTER,CENTER);
    rectMode(CENTER);
    textStyle(ITALIC);
    text(t,x+0.02*w,y,w-0.25*w,h);
    textStyle(NORMAL);
    textAlign(LEFT, BASELINE);
    fill('black');
  } else {
    image(quoteLeft, x,y, w+0.1*w,h+25);
    
    textSize(12);
    textAlign(CENTER,CENTER);
    rectMode(CENTER);
    textStyle(ITALIC);
    text(t,x-w*0.08,y,w-0.25*w,h);
    textStyle(NORMAL);
    textAlign(LEFT, BASELINE);
    fill('black');
  }
  
}


function mouseWheel(event) {
  //print(event.delta);
  //move according to the vertical scroll amount
  pos -= event.delta/scrollFactor;
  if (pos < posMin) {
   pos = posMin;
  } else if (pos > posMax) {
   pos = posMax; 
  }
  //uncomment to block page scrolling
  return false;
}

function handleSound(start=-scrollduration, end=stage_bounds[stage]+10) {
   if (pos > end && pos < start && !coconuts.isPlaying()) {
      coconuts.play();
    }
    if (coconuts.isPlaying() && (pos < end || pos > start)) {
      coconuts.stop();
    } 
}
