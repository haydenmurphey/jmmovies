
let button;
let keyval;
let input;

function setup() {
    createCanvas(800, 600);
    input = createInput();
    button = createButton("Fetch");
    button.mousePressed(fetchData);
    keyval = new Keyval(KEYVAL_API_KEY);
}



function draw() {
    background(0);
}

function fetchData() {
    keyval.set("test", input.value(), function (data) {
        keyval.get("test", function (data) {
            console.log(data);
        });
    });
}

let img;
let ball_x = 200;
let ball_y = 50;
let ball_dy = 0; // acceleration
let gravity = 0.5;
let start_stop = true;
let irotate = 0;
function preload(){
  img = loadImage('https://www.jmu.edu/cise/cs/_images/faculty-staff-images/riley.png');
}

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  rotate(irotate);
  image(img,10,10,50,50);
  irotate += 5;

  // Draw button
  button = createButton("Start/Stop");

  button.position(0, 425);
  button.mousePressed(start);
  
  // Draw ball
  fill(0, 255, 255);
  circle(ball_x, ball_y, 30);
  
  // Acceleration with gravity
  ball_dy += gravity;
  ball_y += ball_dy;
  
  // Bounce
  if (ball_y > 379) {
    ball_dy *= -1;  
  } 
  
  // Start and stop ball from moving
  function start() {
    if (start_stop == true) {
      start_stop = false;
      y_save = ball_y;
      dy_save = ball_dy;
      gravity = 0;
      ball_dy = 0;
    } else {
      start_stop = true;
      gravity = 0.5;
      ball_y = y_save;
      ball_dy = dy_save;
    }  
  }
}