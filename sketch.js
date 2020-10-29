
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var back ;
var back2;
var back3;
var back4 ;
var back5;
var back6;
var invisibleGround ; 
var score ;

var gameState = "Start"
var reset;

var sonicdeath;
var reset1;

var ring = 0;

var foodImage;

var start;


var start1;

var music1;

var play;
var play1;

var mute ;
var mute1;

var ani;



function preload(){
  
  
  monkey_running = loadAnimation("frame_0_delay-0.06s-removebg-preview.png","frame_1_delay-0.06s-removebg-preview.png","frame_2_delay-0.06s-removebg-preview.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  
  back = loadImage("40226e60188af52_1200x600.png");
 
  
  obstacleImage = loadImage("obstacle.png");


foodImage = loadAnimation("coin1-removebg-preview.png",
                          "coin2-removebg-preview.png",
                         "coin3-removebg-preview.png",
                         "coin4-removebg-preview.png");

  
  sonicdeath = loadAnimation("giphy.gif");
  
  
  reset = loadImage("download-removebg-preview.png");
  
  
  
  music = loadSound("Super Mario Bros.-Coin Sound Effect.mp3")
  

  
  back11 = loadAnimation(
    "ee65a020443c4dd7bf31435390a42c96_1_1200x600.png");
  
  
  
  start = loadImage("580b57fcd9996e24bc43c4f9.png");
  
  
  
  music1 = loadSound("safarrr.mp3");
  
  play1 = loadImage("play.png");
  
  mute1 = loadImage("mute.png");
  
  ani = loadAnimation("frame_0_delay-0.06s-removebg-preview.png")
}



function setup() {
  
  createCanvas(windowWidth,windowHeight);
  
  back2 = createSprite(300,100);
  back2.addAnimation("back1",back)
  back2.addAnimation("back2",back11)
  back2.x = back2.width/2;
 
  
  
  monkey = createSprite(50,240);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("death",sonicdeath)
  monkey.addAnimation("start",ani);
  monkey.scale = 0.11;
  
  
  
  invisibleGround = createSprite(50,270,10000,10);
  invisibleGround.visible = false;
  
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  FoodGroup2 = createGroup();
  FoodGroup3 = createGroup();
  
  
  
  start1 = createSprite(300,150,0,0);
    start1.addImage(start);
  start1.visible = false;
  start1.scale = 0.040;
  
  
   reset1 = createSprite(300,150);
    reset1.addImage(reset);
    reset1.scale = 0.3;
  
  
  
  play = createSprite(500,50,0,0);
  play.addImage(play1);
  play.scale = 0.070
  
  
  
  mute = createSprite(550,50,0,0);
  mute.addImage(mute1);
  mute.scale = 0.070;
  
  
 
  score =0;
  
    
  
  
}


function draw() {

 background("white");
  
 reset1.x = 1000;
  
  
  if(mousePressedOver(play)){
    
    
    if(!music1.isPlaying()){
    
    
    music1.play();
    
  }
    
    
  }
  
  if(mousePressedOver(mute)){
    
    
    
    
    
    music1.stop();
    
  }
    
  

  
  
  
  if(gameState === "Start"){
    
    
    
    start1.visible = true;
    
    monkey.changeAnimation("start",ani);
    
    
    if(mouseIsOver(start1)){
      
      
      start1.scale = 0.070
      
    } else{
      
      start1.scale = 0.040;
      
      
    }
    
    if(mousePressedOver(start1)){
      
      
      gameState = "Play"
      
    }
    
    
    
  }
  
  
  if(gameState === "Play"){
  
   start1.visible = false;
    monkey.changeAnimation("running",monkey_running)
    
  monkey.collide(invisibleGround);
  
   back2.velocityX = -(4 + 3* score/100);
  //////////////////////////
 if (back2.x < 0){
      back2.x = back2.width/2;
    }
  /////////////////////////////////
  
  
  
  
  if(touches > 0 || keyWentDown("space")&& monkey.y >=190){
    
    
    monkey.velocityY = -10;
    
    touches = []
    
    
  }
  spawnObstacles();
    spawnfood();
    food2();
    food3();
    
    
  monkey.velocityY = monkey.velocityY + 0.5
    
    
    score = score + Math.round(getFrameRate()/60);
    
    
    
   
    
  }
  if(monkey.isTouching(obstaclesGroup)){
      
      
      gameState = "End";
      
      
      
    }
  
 
  
  if(gameState === "End"){
    
  
    
    monkey.velocityX = 0;
    back2.velocityX = 0;
    monkey.velocityY = 0;
    
     obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    FoodGroup2.setLifetimeEach(-1);
    FoodGroup3.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
    FoodGroup2.setVelocityXEach(0);
    FoodGroup3.setVelocityXEach(0);
   
    monkey.changeAnimation("death",sonicdeath);
    monkey.scale = 0.2;
    monkey.y = 200;  
    
     reset1.x = 300;
  
    
    
    
    
  }
  
  if(mouseIsOver(reset1)){
    
    
    reset1.scale = 0.5;
    
    
  } else{
    
    
    reset1.scale = 0.3;
    
    
  }
  
  
  
  if(mousePressedOver(reset1)||touches>2){
    
    
    resetvv();
    
    
    
  }
  
  
  if(FoodGroup.isTouching(monkey)){
    
    FoodGroup.destroyEach();
    
    ring = ring+1;
    
    music.play();
    
    
  }
  
  
  if(FoodGroup2.isTouching(monkey)){
    
    FoodGroup2.destroyEach();
    
    ring = ring+1;
    
    music.play();
    
    
  }
  
  
  if(FoodGroup3.isTouching(monkey)){
    
    FoodGroup3.destroyEach();
    
    ring = ring+1;
    
    music.play();
    
    
  }
  
  
  if(ring === 30){
    
    
    back2.changeAnimation("back2",back11);
    
    
    
    
  }
  
  
  
  if(ring === 100){
    
    
    
    back2.changeAnimation("back1",back)
    
    
  }
  
  
  if(ring === 150){
    
    
    back2.changeAnimation("back2",back11);
    
    
    
    
  }
  
  
  if(ring === 200){
    
    
    
    back2.changeAnimation("back1",back)
    
    
  }
  if(ring === 300){
    
    
    back2.changeAnimation("back2",back11);
    
    
    
    
  }
  
  
  if(ring === 400){
    
    
    
    back2.changeAnimation("back1",back)
    
    
  }
  if(ring === 500){
    
    
    back2.changeAnimation("back2",back11);
    
    
    
    
  }
  
  
  if(ring === 600){
    
    
    
    back2.changeAnimation("back1",back)
    
    
  }
  if(ring === 700){
    
    
    back2.changeAnimation("back2",back11);
    
    
    
    
  }
  
  
  if(ring === 800){
    
    
    
    back2.changeAnimation("back1",back)
    
    
  }
  if(ring === 900){
    
    
    back2.changeAnimation("back2",back11);
    
    
    
    
  }
  
  
  if(ring === 1000){
    
    
    
    back2.changeAnimation("back1",back)
    
    
  }
  if(ring === 1500){
    
    
    back2.changeAnimation("back2",back11);
    
    
    
    
  }
  
  
  if(ring === 1600){
    
    
    
    back2.changeAnimation("back1",back)
    
    
  }
  
  
  
  
  
  
  
  drawSprites();
  fill("red");
  textSize(20);
  text("Survival Time --- " +score,250,30)
  text("Rings -- " +ring , 50,30);
  
  
}





function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,240,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstacleImage);
    
   obstacle.x = Math.round(random(700,950));
   
             
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
   
   
    
    
   
   
   
 }
}





function spawnfood(){
 if (frameCount % 120 === 0){
   var food = createSprite(600,170,10,40);
   food.y = Math.round(random(140,200));
    food.x = Math.round(random(600,750));
   food.velocityX = -(6 + score/100);
   food.addAnimation("coins",foodImage);
    
   
   
             
    food.scale = 0.1;
    food.lifetime = 300;
   
   
    FoodGroup.add(food);
 }
}

function resetvv(){
  
gameState = "Play";
 
  reset1.x = 1000;
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  FoodGroup2.destroyEach();
  FoodGroup3.destroyEach();
  monkey.changeAnimation("running", monkey_running);
  monkey.scale = 0.11;
  score = 0;
  ring = 0;
  back2.changeAnimation("back1",back);
}


function food2(){
 if (frameCount % 120 === 0){
   var food2 = createSprite(600,170,10,40);
   food2.y = Math.round(random(140,200));
    food2.x = Math.round(random(800,950));
   food2.velocityX = -(6 + score/100);
   food2.addAnimation("coins",foodImage);
    
   
   
             
    food2.scale = 0.1;
    food2.lifetime = 300;
   
   
    FoodGroup2.add(food2);
 }
}



function food3(){
 if (frameCount % 120 === 0){
   var food3 = createSprite(600,170,10,40);
   food3.y = Math.round(random(140,200));
    food3.x = Math.round(random(750,800));
   food3.velocityX = -(6 + score/100);
   food3.addAnimation("coins",foodImage);
    
   
   
             
    food3.scale = 0.1;
    food3.lifetime = 300;
   
   
    FoodGroup3.add(food3);
 }
}







