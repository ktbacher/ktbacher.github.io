let data;
let college_data;
let college_run_data;
let mile_totals;
let time_totals;
let activity_breakdown;
let time_daily_avg;
let mile_daily_avg;
let tooltip_text = "";
let metric = "Distance";
let selected = true;
let select_fill = 240;
let selected_activities = [];

let dragging = false;
let dragging_coords = [570, 700];

const margin = ({top: 15, right: 50, bottom: 10, left: 50});
let chart_dims = [margin.left, window.innerWidth-margin.right, window.innerHeight*0.15,  window.innerHeight*0.3];
// let breakdown_chart_dims = [margin.left+10, window.innerWidth-margin.right-10, window.innerHeight*0.4,window.innerHeight*0.7];
let breakdown_chart_dims = [margin.left+40, window.innerWidth-margin.right-25, window.innerHeight*0.4,window.innerHeight*0.8];

const breakdown_boundary = ({left: margin.left, top: window.innerHeight*0.35, right: window.innerWidth-margin.right, bottom: window.innerHeight*0.98});

// console.log(breakdown_boundary);
let dist_button_dims = [];
const injury_dates = [new Date("May 27, 2018"), 
                      new Date("Jan 17, 2019"),
                      new Date("Apr 23, 2019"),
                      new Date("Jun 16, 2020"),
                      new Date("Feb 28, 2021")];
                      
     
                     

function preload() {
  // loadTable("https://gist.githubusercontent.com/ktbacher/460238b09ef41d9c8d1cb34c297f1392/raw/e9b520b75e86b8f720777c76909db0af25a513a3/activities.csv", 'csv', 'header', formatData);
  loadTable("https://gist.githubusercontent.com/ktbacher/bfc67bf0979cd645e002f5628ec31cd3/raw/69b4bea11067d7f20169be85d9afe53b7d1c4262/activities_new.csv", 'csv', 'header', formatData);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}


function draw() {
  background(255);
  
  noStroke();
  fill(0);
  textAlign(LEFT);
  textSize(height*0.058);
  textStyle(BOLD);
  text("Why am I always injured?", margin.left, height*0.072);
  textStyle(NORMAL);
  textSize(15);
  text("I        a lot, which means a lot of miles, time, and               too...", margin.left, chart_dims[2] - 30);
  text("I",  margin.left, chart_dims[2] - 30);
  fill('#4F345A');
  textStyle(BOLD);
  text("run", margin.left+9, chart_dims[2] - 30);

  fill(0);
  // text("a lot, which means a lot of miles, time, and",  margin.left+34, chart_dims[2]-30);
  fill('red');
  text("injuries", margin.left+324, chart_dims[2]-30);
  fill(0);
  // text("too...", margin.left+373, chart_dims[2]-30);

  textStyle(NORMAL);
  textSize(14);
  text("Deep dive into my collegiate running career to explore patterns, answers, and insights.", margin.left, chart_dims[2]-10)

  // stroke(0);
  // line(0,chart_dims[2] - 30, width,chart_dims[2] - 30);
  
  let ordered_coords = [...dragging_coords].sort((first, second) => Number(second) <= Number(first));
  // console.log("coords", ordered_coords);
  if (selected) {
    noStroke();
    // fill(50, 30);
    fill(select_fill);
    rectMode(CORNERS);
    // brush on chart
    // rect(dragging_coords[0], chart_dims[2]+margin.top, dragging_coords[1], chart_dims[3]-margin.bottom);
    rect(ordered_coords[0], chart_dims[2], ordered_coords[1], chart_dims[3]-margin.bottom/2);

    // break down charts background
    rect(breakdown_boundary.left, breakdown_boundary.top, breakdown_boundary.right, breakdown_boundary.bottom);
    rectMode(CORNER);

    // connecting lines
    // stroke(select_fill);
    // noFill();
    // strokeWeight(2);
    // bezier(dragging_coords[0], chart_dims[3]-margin.bottom/2, dragging_coords[0]-50, chart_dims[3]+40, breakdown_boundary.left+100, breakdown_boundary.top-50, breakdown_boundary.left+1, breakdown_boundary.top);
    // bezier(dragging_coords[1], chart_dims[3]-margin.bottom/2, dragging_coords[1]+50, chart_dims[3]+40, breakdown_boundary.right-100, breakdown_boundary.top-50, breakdown_boundary.right-1, breakdown_boundary.top);
    
    fill(select_fill);
    beginShape();
      vertex(ordered_coords[0], chart_dims[3]-margin.bottom/2);
      // bezierVertex(ordered_coords[0]-50, chart_dims[3]+40, breakdown_boundary.left+100, breakdown_boundary.top-50, breakdown_boundary.left, breakdown_boundary.top);
      if (ordered_coords[0]-breakdown_boundary.left < 200) {
        console.log("true", ordered_coords[0]-breakdown_boundary.left, map(ordered_coords[0]-breakdown_boundary.left, 0, 200, 0, 50), map(ordered_coords[0]-breakdown_boundary.left, 0, 200, 0, 100));
      }
      bezierVertex(ordered_coords[0]-min(50, map(ordered_coords[0]-breakdown_boundary.left, 0, 200, 0, 50)), chart_dims[3]+min(40, map(ordered_coords[0]-breakdown_boundary.left, 0, 200, 10, 40)), breakdown_boundary.left+min(100, map(ordered_coords[0]-breakdown_boundary.left, 0, 200, 0, 100)), breakdown_boundary.top-min(50, map(ordered_coords[0]-breakdown_boundary.left, 0, 200, 10, 50)), breakdown_boundary.left, breakdown_boundary.top);
      
      vertex(breakdown_boundary.right, breakdown_boundary.top);
      bezierVertex(breakdown_boundary.right-min(100, map(breakdown_boundary.right- ordered_coords[1], 0, 200, 0, 100)), breakdown_boundary.top-min(50, map(breakdown_boundary.right- ordered_coords[1], 0, 200, 10, 50)), ordered_coords[1]+min(50, map(breakdown_boundary.right- ordered_coords[1], 0, 200, 0, 50)), chart_dims[3]+min(40, map(breakdown_boundary.right- ordered_coords[1], 0, 200, 10, 40)), ordered_coords[1], chart_dims[3]-margin.bottom/2);
    
    endShape(CLOSE)
    // fill(0);
    // circle(ordered_coords[0]-min(50, map(ordered_coords[0]-breakdown_boundary.left, 0, 200, 0, 50)), chart_dims[3]+min(40, map(ordered_coords[0]-breakdown_boundary.left, 0, 200, 10, 40)), 5);
    // circle(breakdown_boundary.left+min(100, map(ordered_coords[0]-breakdown_boundary.left, 0, 200, 0, 100)), breakdown_boundary.top-min(50, map(ordered_coords[0]-breakdown_boundary.left, 0, 200, 10, 50)), 5)

  }
  
  if (metric == "Distance") {
    barChart(mile_totals, chart_dims[0],chart_dims[1], chart_dims[2],chart_dims[3], mile_daily_avg);
  } else if (metric == "Time") {
    barChart(time_totals, chart_dims[0],chart_dims[1], chart_dims[2],chart_dims[3], time_daily_avg);
  }

  fill(50);
  // stroke(50);
  noStroke();
  tooltip(tooltip_text, mouseX, chart_dims[3]+20);
  
  if (selected) {
    let date1, value1, date2, value2;
    if (metric == "Distance") {
      [date1, value1] = xToDate(ordered_coords[0], mile_totals);
      [date2, value2] = xToDate(ordered_coords[1], mile_totals);
    } else if (metric == "Time") {
      [date1, value1] = xToDate(ordered_coords[0], time_totals);
      [date2, value2] = xToDate(ordered_coords[1], time_totals);
    }
    // console.log("HERE", new Date(new Date(date1).toString().slice(4,15)), new Date(new Date(date2).toString().slice(4,15)), value1, value2);

    // stroke(0);
    textStyle(BOLD);
    fill(0);
    textSize(24);
    text("Daily Activity Duration", width*0.5, height*0.37);
    textStyle(NORMAL);
    textSize(15);
    text(new Date(date1).toString().slice(0,15) + " - " + new Date(date2).toString().slice(0,15),  width*0.5, height*0.37+20);
    

    // text("Off Days from "+ new Date(date1).toString().slice(0,15) + " - " + new Date(date2).toString().slice(0,15), width*0.5, breakdown_chart_dims[3] + height*0.1);
  
    stackedBar(time_totals, breakdown_chart_dims[0],breakdown_chart_dims[1], breakdown_chart_dims[2], breakdown_chart_dims[3], new Date(new Date(date1).toString().slice(4,15)), new Date(new Date(date2).toString().slice(4,15)));
  
    
  }
  noLoop();
  
  
}

function formatData(resp_data) {
  //console.log(resp_data);
  college_data = resp_data.getRows().filter(row => {
    return (
      new Date(row.getString('Activity Date')) >= new Date("Jun 1, 2016, 12:00:00 AM") && 
      row.getString("Activity Type") != "Hike" && 
      row.getString("Activity ID") != "1888829048"
    );
  });
  
  college_run_data = college_data.filter(row => {
    return (
      row.obj['Activity Type'] == 'Run'
    );
  });
  
  college_data = college_data.map(d => {
    if (d.obj["Activity Name"] == "Water Fitness" || d.obj["Activity Name"].toLowerCase().includes("aquajog")) {
      d.obj["Activity Type"] = "Aquajog";
      d.arr[3] = "Aquajog";
    }
    return d;
  });


  // calculations
  time_totals = calcSum("time");
  mile_totals = calcSum("miles");
  activity_breakdown = calcSum("activities");
  
  time_daily_avg = calcWkAvg(time_totals);
  mile_daily_avg = calcWkAvg(mile_totals);
  //console.log("time", time_totals);
  //console.log("mile", mile_totals);
  // console.log("activity calc", activity_breakdown);
  // console.log("time avg", time_daily_avg);
  // console.log("mile avg", mile_daily_avg);


}

function calcSum(data_metric) {
  if (data_metric == "time") {
    return d3.rollup(college_data, v => d3.sum(v, d => d.obj["Moving Time"]/60), d => new Date(d.obj["Activity Date"]+"+GMT").toString().slice(4,15));
  } else if (data_metric == "miles") {
    return d3.rollup(college_run_data, v => d3.sum(v, d => d.obj.miles), d => new Date(d.obj["Activity Date"]+"+GMT").toString().slice(4,15));
  } else if (data_metric == "activities") {
    return d3.rollup(college_data, v => d3.sum(v, d => d.obj["Moving Time"]/60), d => new Date(d.obj["Activity Date"]+"+GMT").toString().slice(4,15), d => d.obj["Activity Type"]);
  }
}


function calcWkAvg(metric_data) {
  let date_min = d3.min(metric_data, d => new Date(d[0]).getTime());
  let date_max = d3.max(metric_data, d => new Date(d[0]).getTime());
  let avg_map = new Map();
  let daily_vals = [];
  let ind = 0;
  for (var d = new Date(date_min); d <= date_max; d.setDate(d.getDate() + 1)) {
    // console.log(new Date(d).toString().slice(4,15));
    let val = metric_data.get(new Date(d).toString().slice(4,15));
    if(daily_vals.length < 7) {
      val = val ? val : 0;
      daily_vals.push(val)
    } else {
      val = val ? val : 0;
      daily_vals[ind] = val;
      ind++;
      ind = ind%7;
    }
    // console.log(new Date(d).toString().slice(4,15), val, daily_vals);
    avg_map.set(new Date(d).toString().slice(4,15), d3.sum(daily_vals)/daily_vals.length);
  }
  return avg_map;
}


function barChart(data, x_min, x_max, y_min, y_max, avg_data=null) {
  
  const college_min = d3.min(data, k =>  new Date(k[0]));
  const college_max = d3.max(data, k => new Date(k[0]));
  
  function xScale(x){
    return map(x, college_min, college_max, x_min, x_max-(x_max-x_min)/(college_max -college_min)*(1000*60*60*24));
  }
  
  const most = d3.least(data, ([, sum]) => -sum);
  function yScale(y){
    return map(y, 0, most[1], y_max-margin.bottom, y_min+margin.top);
  }
  
  // plot bars
  let bar_fill = 220;
  noStroke();
  fill(bar_fill);
  data.forEach((value,date) => {
    //console.log("d", date, value);
    rect(xScale(new Date(date)), yScale(value), (x_max-x_min)/(college_max -college_min)*(1000*60*60*24), y_max-margin.bottom-yScale(value));
  });

  // plot 7 day moving average 
  if (avg_data) {
    strokeWeight(2);
    noFill();
    beginShape();
    stroke(0);
    avg_data.forEach((value,date) => {
      let x = xScale(new Date(date));
      let y = yScale(value);
      vertex(x, y);
    });
    endShape();
  }
  strokeWeight(1);
  fill(0);

  // plot years on x axis
  [new Date("Jan 1, 2017, 11:59:59 PM"), 
    new Date("Jan 1, 2018, 11:59:59 PM"),
    new Date("Jan 1, 2019, 11:59:59 PM"),
    new Date("Jan 1, 2020, 11:59:59 PM"),
    new Date("Jan 1, 2021, 11:59:59 PM")].forEach(d => {
      stroke(0);
      line(xScale(d), y_max-8, xScale(d), y_max-4);
      textAlign(CENTER);
      noStroke();
      textStyle(BOLD);
      textSize(12);
      text(d.toString().slice(11,15), xScale(d), y_max+7);
      textStyle(NORMAL);
    });
  
  // plot injury lines
  stroke('red');
  fill('red');
  injury_dates.forEach(d => {
    line(xScale(new Date(d)), y_min, xScale(new Date(d)), y_max);
    circle(xScale(new Date(d)), y_max-10, 5);
  });

  // legend
  let legend_y = y_min - 35;
  stroke('red')
  line(width*0.83, legend_y+25, width*0.83+10, legend_y+25);
  noStroke();
  textAlign(LEFT);
  textStyle(NORMAL);
  fill(0);
  text("Injury", width*0.83+15, legend_y+30);

  stroke('black')
  line(width*0.83, legend_y+40, width*0.83+10, legend_y+40);
  noStroke();
  textAlign(LEFT);
  fill(0);
  text("7 day avgerage", width*0.83+15, legend_y+45);

  stroke(bar_fill)
  line(width*0.83, legend_y+55, width*0.83+10, legend_y+55);
  noStroke();
  textAlign(LEFT);
  fill(0);
  text("Daily " + (metric == "Time" ? "time exercising" : "miles run"), width*0.83+15, legend_y+60);

  // Select options
  // stroke(0);
  let options_x = width*0.57;
  noStroke();
  textStyle(BOLD);
  textSize(15);
  text("Click to switch metrics:", options_x, legend_y+5);
  textStyle(NORMAL);

  noStroke();
  if (metric == "Distance") {
    fill(50);
    rect(options_x + 200 -10, legend_y-10, 80, 20);
    fill(255);
  } else {
    fill(230);
    rect(options_x+200 -10, legend_y-10, 80, 20);
    fill(150);
  }
  text("Miles run", options_x+200, legend_y+5);

  fill(0);
  text("or", options_x+290, legend_y+5);


  // if (metric == "Time") {
  //   fill(50);
  //   rect(width*0.84-10, legend_y-10, 80, 20);
  //   fill(255);
  // } else {
  //   fill(230);
  //   rect(width*0.84-10, legend_y-10, 80, 20);
  //   fill(150);
  // }
  // text("Total time", width*0.84, legend_y+5);

  if (metric == "Time") {
    fill(50);
    rect(options_x+330, legend_y-10, 80, 20);
    fill(255);
  } else {
    fill(230);
    rect(options_x+330, legend_y-10, 80, 20);
    fill(150);
  }
  text("Total time", options_x+330 + 10, legend_y+5);

  textAlign(CENTER);
  
}



function stackedBar(data, x_min, x_max, y_min, y_max, date_min, date_max) {
  
  const chart_data = new Map(
    [...data]
    .filter((d) => {
      // console.log("val", value, "date", date);
      return (
        new Date(d[0]) >= date_min && 
        new Date(d[0]) <= date_max
      );
    })
  );
  // console.log("chart data", chart_data);

  const chart_activity_data = new Map(
    [...activity_breakdown]
    .filter((d) => {
        return (
          new Date(d[0]) >= date_min && 
          new Date(d[0]) <= date_max
        );
      })
  )

  // console.log("chart activity data", chart_activity_data);


  function xScale(x){
    return map(x, date_min, date_max, x_min, x_max -(x_max-x_min)/((date_max -date_min)/(1000*60*60*24)+1));
  }

  let most = d3.least(chart_data, ([, sum]) => -sum);
  if (!most) {
    most = [0,0];
  }
  function yScale(y){
    return map(y, 0, most[1], y_max-margin.bottom, y_min+margin.top);
  }
  // console.log("range:", date_max - date_min);
  if (date_max - date_min > 48826397289) {
    noStroke();
  } else {
    stroke(0);
  }

  function colorScale(activity) {
    let fill_col;
    if (activity == "Run") {
      // fill('#4E4187'); //1
      // fill('#4F345A'); //2 - dark
      fill_col = color('#4F345A');
      // if (selected_activities.length == 0 || selected_activities.includes("Run")) {
      //   fill('#4F345A'); //2 - dark
      // } else {
      //   fill('#4F345A');
      // }
    } else if (activity == "Ride") {
      // fill('#FFFF82');
      // fill('#F96E46'); //1
      // fill('#B2675E'); // 2
      fill_col = color('#B2675E');
    } else if (activity == "Swim" || activity == "Aquajog") {
      // fill('#55DDE0'); //1
      // fill('#4ECDC4');
      // fill('#0B5563'); //2
      fill_col = color('#0B5563');
    } else if (activity == "Elliptical") {
      // fill('#F96E46');
      // fill('#FFFF82'); // 1
      // fill('#F5CDA7'); //2
      fill_col = color('#F5CDA7');
    } else {
      fill('#8B939C'); // 1,2
      // fill('#5B6057');
      fill_col = color('#8B939C');
    }
    if (selected_activities.length == 0 || selected_activities.includes(activity) || (selected_activities.includes("Other") && activity != "Run" && activity != "Ride" && activity != "Swim" && activity != "Aquajog" && activity != "Elliptical")) {
      fill_col.setAlpha(255);
    } else {
      fill_col.setAlpha(50);
    }
    fill(fill_col);
  }




  // plot bars for stacked chart
  fill(0);
  noStroke();
  chart_activity_data.forEach((value,date) => {
    prev_time = 0;
    let time;
    // to keep same ordering
    if (value.get("Run") && (selected_activities.length == 0 || selected_activities.includes("Run"))) {
      colorScale("Run");
      time = value.get("Run");
      rect(xScale(new Date(date)), yScale(prev_time + time), (x_max-x_min)/((date_max -date_min)/(1000*60*60*24)+1), y_max-margin.bottom-yScale(time));
      prev_time += time;
    }
    if (value.get("Ride") && (selected_activities.length == 0 || selected_activities.includes("Ride"))) {
      colorScale("Ride");
      time = value.get("Ride");
      rect(xScale(new Date(date)), yScale(prev_time + time), (x_max-x_min)/((date_max -date_min)/(1000*60*60*24)+1), y_max-margin.bottom-yScale(time));
      prev_time += time;
    }
    if (value.get("Swim") && (selected_activities.length == 0 || selected_activities.includes("Aquajog"))) {
      colorScale("Swim");
      time = value.get("Swim");
      rect(xScale(new Date(date)), yScale(prev_time + time), (x_max-x_min)/((date_max -date_min)/(1000*60*60*24)+1), y_max-margin.bottom-yScale(time));
      prev_time += time;
    } 
    if (value.get("Aquajog") && (selected_activities.length == 0 || selected_activities.includes("Aquajog"))) {
      colorScale("Aquajog");
      time = value.get("Aquajog");
      rect(xScale(new Date(date)), yScale(prev_time + time), (x_max-x_min)/((date_max -date_min)/(1000*60*60*24)+1), y_max-margin.bottom-yScale(time));
      prev_time += time;
    }
    if (value.get("Elliptical") && (selected_activities.length == 0 || selected_activities.includes("Elliptical"))) {
      colorScale("Elliptical");
      time = value.get("Elliptical");
      rect(xScale(new Date(date)), yScale(prev_time + time), (x_max-x_min)/((date_max -date_min)/(1000*60*60*24)+1), y_max-margin.bottom-yScale(time));
      prev_time += time;
    }
    //get the "Other"s
    value.forEach((time, activity) => {
      if (activity != "Run" && activity != "Ride" && activity != "Swim" && activity != "Aquajog" && activity != "Elliptical" && (selected_activities.length == 0 || selected_activities.includes("Other"))){
        colorScale(activity);
        rect(xScale(new Date(date)), yScale(prev_time + time), (x_max-x_min)/((date_max -date_min)/(1000*60*60*24)+1), y_max-margin.bottom-yScale(time));
        prev_time += time;
      }
      
    });
  });

  // plot x-axis and y-axis
  stroke(200);
  strokeWeight(2);
  line(x_min, y_max, x_min, y_min); // y

  noStroke();
  fill(50);
  textSize(12);
  textAlign(RIGHT);
  text("Mins", x_min-5, y_min+10);

  // line(x_min, y_max+15, x_min, y_min); // y
  // line(x_min, yScale(0), x_max, yScale(0)); //x
  for (let i = 0; i<=round(most[1]); i += 30) {
    stroke(200);
    line(x_min-2, yScale(i), x_min+2, yScale(i));
    noStroke();
    fill(100);
    textSize(12);
    textAlign(RIGHT);
    text(i, x_min-5, yScale(i)+5);

  }

  if (round(most[1]) < 30) {
    stroke(200);
    line(x_min-2, yScale(round(most[1])), x_min+2, yScale(round(most[1])));
    noStroke();
    fill(100);
    textSize(12);
    textAlign(RIGHT);
    text(round(most[1]), x_min-5, yScale(round(most[1]))+5);
  }

  textAlign(LEFT);
  // line(x_min-2, yScale(most[1]), x_min+2, yScale(most[1]));
  // line(x_min-2, yScale(0), x_min+2, yScale(0));
  // noStroke();
  // textSize(12);
  // text(round(most[1]), x_min-15, yScale(round(most[1]))+5);
  // text("0", x_min-15, yScale(0)+5);

  strokeWeight(1);


  // plot years on x axis
  fill(0);
  [new Date("Jan 1, 2017, 11:59:59 PM"), 
    new Date("Jan 1, 2018, 11:59:59 PM"),
    new Date("Jan 1, 2019, 11:59:59 PM"),
    new Date("Jan 1, 2020, 11:59:59 PM"),
    new Date("Jan 1, 2021, 11:59:59 PM")].forEach(d => {
      if (d > date_min && d < date_max) {
        stroke(0);
        line(xScale(d), y_max-8, xScale(d), y_max-4);
        line(xScale(d), y_max+9, xScale(d), y_max+13);
        textAlign(CENTER);
        textSize(12);
        noStroke()
        textStyle(BOLD);
        text(d.toString().slice(11,15), xScale(d), y_max+7);
        textStyle(NORMAL);
      }
    });
  

  // activities legend
  let activities_legend_y = y_max+80;
  let act_gap = 100;
  textAlign(LEFT);
  textSize(12);
  noStroke();
  colorScale("Run");
  rect(width*0.5-2*act_gap-15 -5, activities_legend_y, 10,10);
  fill(0);
  text("Run", width*0.5-2*act_gap+5 -5, activities_legend_y+10);

  colorScale("Ride");
  rect(width*0.5-act_gap-15 -10, activities_legend_y, 10,10);
  fill(0);
  text("Ride", width*0.5-act_gap+5 -10, activities_legend_y + 10);

  colorScale("Aquajog");
  rect(width*0.5-35 -5, activities_legend_y, 10,10);
  fill(0);
  text("Aquajog/Swim", width*0.5-15 -5, activities_legend_y+10);

  colorScale("Elliptical");
  rect(width*0.5+act_gap-15 -5, activities_legend_y, 10,10);
  fill(0);
  text("Elliptical", width*0.5+act_gap+5 -5, activities_legend_y+10);

  colorScale("Other");
  rect(width*0.5+2*act_gap-15 -5, activities_legend_y, 10,10);
  fill(0);
  text("Other", width*0.5+2*act_gap+5 -5, activities_legend_y+10);

  textAlign(CENTER);


  if (date_max - date_min > 48826397289) {
    noStroke();
  } else {
    stroke(0);
  }

  // function onOffColorScale(val) {
  //   if (val == "Run") {
  //     fill(50);
  //   } else if (val == "Cross Train") {
  //     fill(130);
  //   } else {
  //     fill(255);
  //   }
  // }

  // noStroke();
  stroke(0);
  // off_days_top = y_max+height*0.15;
  off_days_top = y_max+15;
  // on / off days
  // let off_days = 0;
  let days = 0;
  let x_start = x_min;
  let weekly_off_days = 0;
  for (var d = new Date(date_min); d <= date_max; d.setDate(d.getDate() + 1)) {
    if (d > new Date(date_min) && d.getDay() == 0 || d == date_max) {
      // let fill_color = map(weekly_off_days, 0, days, 0, 255);
      let fill_color = map((days-weekly_off_days)**1.5, 0, days**1.5, 255, 50);
      fill(fill_color);
      stroke(0);
      rect(x_start, off_days_top, xScale(new Date(d))-x_start, 15);


      // // weekly line???
      // stroke(220);
      // line(xScale(new Date(d)), off_days_top, xScale(new Date(d)), y_min+margin.top);


      weekly_off_days = 0;
      days = 0;
      x_start = xScale(new Date(d));
    }

    if (!chart_activity_data.get(new Date(d).toString().slice(4,15))) {
      weekly_off_days += 1;
      // off_days +=1;
    }
    days +=1;

    // if (chart_activity_data.get(new Date(d).toString().slice(4,15))) {
    //   onOffColorScale("Cross Train")
    //   if (chart_activity_data.get(new Date(d).toString().slice(4,15)).get("Run")){
    //     onOffColorScale("Run");
    //   }
    // } else {
    //   off_days += 1;
    //   onOffColorScale("Off");
    // }
    // rect(xScale(new Date(d)), off_days_top, (x_max-x_min)/((date_max -date_min)/(1000*60*60*24)+1), 10);

  }

  d = new Date(date_max);
  // let fill_color = map(weekly_off_days, 0, days, 0, 255);
  stroke(0);
  let fill_color = map((days-weekly_off_days)**1.5, 0, days**1.5, 255, 50);
  fill(fill_color);
  rect(x_start, off_days_top, xScale(new Date(d.setDate(d.getDate() + 1)))-x_start, 15);


  // plot injury lines on activities chart
  stroke('red');
  fill('red');
  strokeWeight(3);
  injury_dates.forEach(d => {
    if (d > date_min && d < date_max) {
      // line(xScale(new Date(d)), y_min, xScale(new Date(d)), y_max);
      line(xScale(new Date(d)), y_min, xScale(new Date(d)), y_max+35);
      // circle(xScale(new Date(d)), y_max-margin.bottom, 5);
      circle(xScale(new Date(d)), y_max-margin.bottom+12, 5);
    }
  });
  strokeWeight(1);

  // injury lines on off days chart
  // stroke('red');
  // fill('red');
  // strokeWeight(2);
  // injury_dates.forEach(d => {
  //   if (d > date_min && d < date_max) {
  //     line(xScale(new Date(d)), off_days_top-5, xScale(new Date(d)), off_days_top+15);
  //     circle(xScale(new Date(d)), off_days_top+10, 5);
  //   }
  // });
  // strokeWeight(1);

  // legend
  // weekly
  noStroke();
  fill(0);
  let off_legend_top = activities_legend_y + 25;
  let off_width = width*0.02;
  textAlign(RIGHT);
  text("7 days off in a week", width*0.5-4.5*off_width,off_legend_top + 10);
  
  stroke(0);
  // fill(map(7, 0, 7, 0, 255));
  fill(map(0**1.5, 0, 7**1.5, 255, 50));
  rect(width*0.5 - 4*off_width, off_legend_top, off_width, 10);

  // fill(map(6, 0, 7, 0, 255));
  fill(map(1**1.5, 0, 7**1.5, 255, 50));
  rect(width*0.5-3*off_width, off_legend_top, off_width, 10);

  // fill(map(5, 0, 7, 0, 255));
  fill(map(2**1.5, 0, 7**1.5, 255, 50));
  rect(width*0.5 - 2*off_width, off_legend_top, off_width, 10);

  // fill(map(4, 0, 7, 0, 255));
  fill(map(3**1.5, 0, 7**1.5, 255, 50));
  rect(width*0.5 - off_width, off_legend_top, off_width, 10);

  // fill(map(3, 0, 7, 0, 255));
  fill(map(4**1.5, 0, 7**1.5, 255, 50));
  // rect(width*0.5, off_legend_top, width*0.025, 10);
  rect(width*0.5, off_legend_top, off_width, 10);

  // fill(map(2, 0, 7, 0, 255));
  fill(map(5**1.5, 0, 7**1.5, 255, 50));
  rect(width*0.5 + off_width, off_legend_top, off_width, 10);

  // fill(map(1, 0, 7, 0, 255));
  fill(map(6**1.5, 0, 7**1.5, 255, 50));
  rect(width*0.5 + off_width*2, off_legend_top, off_width, 10);

  // fill(map(0, 0, 7, 0, 255));
  fill(map(7**1.5, 0, 7**1.5, 255, 50));
  rect(width*0.5 + 3*off_width, off_legend_top, off_width, 10);

  noStroke();
  textAlign(LEFT);
  text("No days off in a week", width*0.5+4.5*off_width,off_legend_top + 10);

  textAlign(CENTER);


  // let wks = ((date_max -date_min)/(1000*60*60*24)+1)/7;
  // fill(0);
  // // noStroke();
  // stroke(0);
  // textSize(16);
  // text("Average " + nf(off_days/wks, 1,1) +" off days per week", width*0.5, off_legend_top + 30);



  // tooltip for activities and on/off
  if (mouseY > y_min && mouseX > x_min && mouseX < x_max) {
    noStroke();

    //date
    let text_fill = 50;

    fill(select_fill, 200);
    rect(mouseX -55, y_max+5 -12, 110, 18);

    fill(text_fill);
    textSize(14);
    let [date, val] = xToDate(mouseX, chart_data, x_min, x_max -(x_max-x_min)/((date_max -date_min)/(1000*60*60*24)+1), date_min, date_max);
    // tooltip(new Date(date).toString().slice(0,15), mouseX, y_max+50);
    tooltip(new Date(date).toString().slice(0,15), mouseX, y_max+7);
    
    // time
    noStroke();
    fill(255, 180);
    let no_vals = true;
    if (val) {
      
      // if (mouseY > y_min && mouseY < y_max) {
      let y_ind = 0;
      textSize(12);
      chart_activity_data.get(new Date(date).toString().slice(4,15)).forEach((time, activity) => {
        if (selected_activities.length == 0 || selected_activities.includes(activity) || (selected_activities.includes("Other") && activity != "Run" && activity != "Ride" && activity != "Swim" && activity != "Aquajog" && activity != "Elliptical")) {
          no_vals = false;
          // backing
          fill(255, 180);
          rect(mouseX-35, yScale(val)-22-y_ind*14, 70, 14);

          //label
          colorScale(activity);
          rect(mouseX-30,  yScale(val)-20-y_ind*14, 10, 10);
          fill(0);
          textAlign(LEFT);
          text(round(time) + " mins", mouseX-15, yScale(val)-10-y_ind*14);
          y_ind++;
        }
      });

      // } else {
      //   rect(mouseX-25, yScale(val)-30, 50, 20, 5);
      //   fill(text_fill);
      //   tooltip(round(val,2) + " mins", mouseX, yScale(val)-15);
      // }

    } 
    if (!val || no_vals) {
      rect(mouseX-25, y_max-30, 50, 20, 5);
      // console.log("no val here")
      fill(text_fill);
      tooltip("0 mins", mouseX, y_max-15);
    }

    // off days
    let count = 0;
    min_date = new Date(new Date(date).setDate(new Date(date).getDate()- new Date(date).getDay()));
    max_date = new Date(new Date(date).setDate(new Date(date).getDate() + (6 - new Date(date).getDay())));
    // console.log("date", new Date(date), "min", min_date, min_date.toString());
    for (var d = min_date; d <= max_date; d.setDate(d.getDate() + 1)) {
      if (!data.get(new Date(d).toString().slice(4,15))) {
        count += 1;
      }
    }
    // tooltip(count + " off days this week", mouseX, y_max+height*0.14);
    tooltip(count + " off days this week", mouseX, off_days_top+30);
  }
}


function tooltip(t, x, y) {
    textSize(12);
    textAlign(CENTER);
    text(t, x, y);
    
    
}

function mouseMoved(event) {
  if (mouseX > margin.left && mouseX < width-margin.right  && mouseY >= chart_dims[2] && mouseY <= chart_dims[3]) {
    if (metric == "Distance") {
      let [date, value] = xToDate(mouseX, mile_totals);
      if (value) {
       tooltip_text = new Date(date).toString().slice(0,15) + ": " + nf(value, 1, 2) + " miles";
      } else {
        tooltip_text = new Date(date).toString().slice(0,15) + ": 0 miles";
      }
    }
    else if (metric == "Time") {
      let [date, value] = xToDate(mouseX, time_totals);
      if (value) {
       tooltip_text = new Date(date).toString().slice(0,15) + ": " + nf(value, 1, 2) + " minutes";
      } else {
        tooltip_text = new Date(date).toString().slice(0,15) + ": 0 minutes";
      }
    }
  } else {
   tooltip_text = ""; 
  }
  loop();
}

function xToDate(x, data = null, min_x= margin.left, max_x = width-margin.right, min_date = null, max_date=null) {
  // console.log("xs", min_x, max_x, "data", data);
  if (!min_date) {
    min_date = d3.min(data, d => new Date(d[0]).getTime());
  } else {
    min_date = min_date.getTime();
  }
  if (!max_date) {
    max_date = d3.max(data, d => new Date(d[0]).getTime());
  }else {
    max_date = max_date.getTime();
  }
  let date = map (x, min_x, max_x, min_date, max_date);
  //console.log(new Date(date).toString(), mile_totals.get(new Date(date).toString().slice(4,15)));  
  return [date, data.get(new Date(date).toString().slice(4,15))];
  
}

function mouseClicked() {
  let legend_y = chart_dims[2] - 35;
  let act_gap = 100;
  let activities_legend_y = breakdown_chart_dims[3]+80;
  if (mouseX >= width*0.73-10 && mouseX <=width*0.73+70 && mouseY >=legend_y-10 && mouseY <= legend_y+10) {
    metric = "Distance";
  }
  else if (mouseX >= width*0.84-10 && mouseX <=width*0.84+70 && mouseY >=legend_y-10 && mouseY <= legend_y+10) {
    metric = "Time";
  }
  else if (mouseX >= width*0.5-2*act_gap-15-5 && mouseX <=width*0.5-2*act_gap-15-5+10 && mouseY >=activities_legend_y && mouseY <= activities_legend_y+10) {
    console.log("RUN");
    // rect(width*0.5-2*act_gap-15 -5, activities_legend_y, 10,10); //RUN
    if (selected_activities.includes("Run")){
      selected_activities = selected_activities.filter(el => el != "Run");
    } else {
      selected_activities.push("Run");
    }
  }
  else if (mouseX >= width*0.5-act_gap-15-10 && mouseX <=width*0.5-act_gap-15-10+10 && mouseY >=activities_legend_y && mouseY <= activities_legend_y+10) {
    console.log("RIDe");
    // rect(width*0.5-act_gap-15 -10, activities_legend_y, 10,10); // ride
    if (selected_activities.includes("Ride")){
      selected_activities = selected_activities.filter(el => el != "Ride");
    } else {
      selected_activities.push("Ride");
    }
  }
  else if (mouseX >= width*0.5-35-5 && mouseX <=width*0.5-35-5+10 && mouseY >=activities_legend_y && mouseY <= activities_legend_y+10) {
    console.log("AQUAJOG");
    // rect(width*0.5-35 -5, activities_legend_y, 10,10); // aquajog
    if (selected_activities.includes("Aquajog")){
      selected_activities = selected_activities.filter(el => el != "Aquajog");
    } else {
      selected_activities.push("Aquajog");
    }
  }
  else if (mouseX >= width*0.5+act_gap-15-5 && mouseX <=width*0.5+act_gap-15-5+10 && mouseY >=activities_legend_y && mouseY <= activities_legend_y+10) {
    console.log("eliptical");
    // rect(width*0.5+act_gap-15 -5, activities_legend_y, 10,10); // eliptical
    if (selected_activities.includes("Elliptical")){
      selected_activities = selected_activities.filter(el => el != "Elliptical");
    } else {
      selected_activities.push("Elliptical");
    }
  }
  else if (mouseX >= width*0.5+2*act_gap-15 -5 && mouseX <=width*0.5+2*act_gap-15-5+10 && mouseY >=activities_legend_y && mouseY <= activities_legend_y+10) {
    console.log("Other");
    // rect(width*0.5+2*act_gap-15 -5, activities_legend_y, 10,10); // other
    if (selected_activities.includes("Other")){
      selected_activities = selected_activities.filter(el => el != "Other");
    } else {
      selected_activities.push("Other");
    }
  } else if (mouseY > breakdown_boundary.top) {
    selected_activities = [];
  }
  loop();
}

function mousePressed() {
  if (mouseX >=  chart_dims[0] && mouseX < chart_dims[1] && mouseY >= chart_dims[2] && mouseY < chart_dims[3]) {
    dragging = true;
    selected = true;
    dragging_coords = [mouseX, mouseX];
  } else {
    // dragging = false;
    // selected = false;
  }
  // dragging_coords = [mouseX, mouseX];
}

function mouseDragged() {
  //console.log(dragging, dragging_coords);
  if (dragging) {
    dragging_coords[1] = max(chart_dims[0], min(chart_dims[1], mouseX));
    //console.log(dragging_coords[0], chart_dims[2], dragging_coords[1], chart_dims[3]);
  }
  loop()
}

function mouseReleased() {
  //console.log("done", dragging_coords);
  dragging = false;
  loop();
}
