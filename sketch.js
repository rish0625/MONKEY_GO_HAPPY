
var monkey , monkey_running, ground;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstaclesGroup;
var survivalTime, score;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);

  monkey = createSprite(75,300,30,30);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,335,400,10);
  ground.velocityX = -5;
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
  survivalTime = 0;
  score = 0;
}


function draw() {
  background(220);
  
  stroke("white");
  textSize(20);
  fill("white");
  
  survivalTime = Math.round(frameCount/frameRate());
  text("Survival Time: " + survivalTime, 125, 50);
  
  stroke("white");
  textSize(20);
  fill("white");
  
  text("Bananas: " + score, 140, 75);
  
  if(ground.x <= 200){
    ground.x = ground.width /2;
  }
  
  if(keyDown("space")&& monkey.y >= 295) {
        monkey.velocityY = -15;
  }
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score + 1;
  }
  
  if(monkey.isTouching(obstaclesGroup)){
    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();
    score = 0;
    survivalTime = survivalTime - survivalTime;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  spawnBananas();
  spawnObstacle();
  
  drawSprites();
}

function spawnBananas() {
  var rand = Math.round(random(180,250));
  if (frameCount % 80 === 0) {
    banana = createSprite(400,rand,40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    

    banana.lifetime = 210;

    bananaGroup.add(banana);
  }
}

function spawnObstacle() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400,310,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    

    obstacle.lifetime = 210;

    obstaclesGroup.add(obstacle);
  }
}




