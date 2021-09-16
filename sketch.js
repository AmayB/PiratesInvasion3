//balls, showcannonballs, display for cannonball
const World = Matter.World;
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var canvas, angle, tower, ground, cannon, towerImage;
var engine, world, background;
var cannonball;
var balls = [];

function preload() {
  background = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  createCanvas(1000, 700);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 15;

  var options = {
    isStatic:true
  }

  ground = Bodies.rectangle(0, width, -1, width * 2, 1, options);
  World.add(world, ground);
  tower = Bodies.rectangle(100,450,160,310, options);
  World.add(world, tower)

  cannon = new Cannon(105,270,100,100);

  rectMode(CENTER);
  ellipse(RADIUS);
}

function draw() {
  image(background, 0, 0, width, height);

  Engine.update(engine);

  cannon.display();
  cannonball.display();

  rect(ground.position.x, ground.position.y, width * 2, 1); 

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i]);
  }

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 300);
  pop();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    var cannonball = new cannonBall(cannon.x, cannon.y);
    cannonball.trajectory = [];
    Matter.Body.setAngle(cannonball.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball) {
  if (ball) {
    ball.display();
  }
}

function keyReleased() {
  if(keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}