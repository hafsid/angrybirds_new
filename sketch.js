const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg, platform;
var bird, slingShot, slingshot2;
var gameState = PLAY;
var PLAY = 1;
var END = 0,fail_img,fail;


function preload() {
    backgroundImg = loadImage("sprites/bg.png");
    fail_img = loadImage("sprites/level_fail_img.jpg")
}

function setup() {
    var canvas = createCanvas(1200, 400);
    engine = Engine.create();
    world = engine.world;
    fail = createSprite(200,200,50,50)
    fail.addImage("fail", fail_img)
    ground = new Ground(600, height, 1200, 20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700, 320, 70, 70);
    box2 = new Box(920, 320, 70, 70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810, 260, 300, PI / 2);

    box3 = new Box(700, 240, 70, 70);
    box4 = new Box(920, 240, 70, 70);
    pig3 = new Pig(810, 220);

    log3 = new Log(810, 180, 300, PI / 2);

    box5 = new Box(810, 160, 70, 70);
    log4 = new Log(760, 120, 150, PI / 7);
    log5 = new Log(870, 120, 150, -PI / 7);

    bird = new Bird(100, 100);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body, { x: 220, y: 50 });
   
}

function draw() {
    background(backgroundImg);
    if(gameState == PLAY){
        Engine.update(engine);
        strokeWeight(4);
        fail.visibility = false;
        box1.display();
        box2.display();
        ground.display();
        pig1.display();
        log1.display();
    
        box3.display();
        box4.display();
        pig3.display();
        log3.display();
    
        box5.display();
        log4.display();
        log5.display();
    
        bird.display();
        platform.display();
        //log6.display();
        slingshot.display();
if(bird.body.isTouching(pig3.body)  ||  bird.body.isTouching(pig1.body)){
    gameState = END;
}
  
    }

    if(gameState == END){
        fail.visibility = true; 

    }
   
   drawSprites();
}

function mouseDragged() {
    Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
}


function mouseReleased() {
    slingshot.fly();
   

}

function keyPressed(){
    if(keyCode === 32   && gameState == PLAY){
        slingshot.attach(bird.body);
        bird.body.position.x = 100;
        bird.body.position.y = 100;
    }

}