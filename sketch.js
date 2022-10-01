var trex, trex_running, edges;
var groundImage;
var ground
var invisible_ground
var cloud, cloudImage
var o1, o2, o3, o4, o5, o6, obstacle;
var obstacleGroup, cloudsGroup;
var score = 0
var PLAY = 1, END = 0
var gameState = PLAY
var trex_collided
var gameOver, gameOverImg
var restart, restartImg
var jump_sound
var die_sound
var checkpoint_sound



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  o1 = loadImage ("obstacle1.png")
  o2 = loadImage ("obstacle2.png")
  o3 = loadImage ("obstacle3.png")
  o4 = loadImage ("obstacle4.png")
  o5 = loadImage ("obstacle5.png")
  o6 = loadImage ("obstacle6.png")
  trex_collided = loadAnimation("trex1.png")
  gameOverImg = loadImage ("gameOver.png")
  restartImg = loadImage ("restart.png")
  jump_sound = loadSound ("jump.mp3")
  die_sound = loadSound ("die.mp3")
  checkpoint_sound = loadSound ("checkpoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  gameOver = createSprite(width/2, height/2)
  gameOver.addImage(gameOverImg)
  gameOver.visible=false
  restart = createSprite(width/2, height/2+75)
  restart.addImage(restartImg)
  restart.visible=false
  trex = createSprite(50,height-35,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  edges = createEdgeSprites();

//trex.debug=true

  ground=createSprite(width/2, height-30, width,20)
  ground.addImage(groundImage)
  
  trex.scale = 0.5;
  trex.x = 50

invisible_ground = createSprite(width/2, height-5, width, 20)
invisible_ground.visible=false

cloudsGroup = new Group();
obstacleGroup = new Group();






}


function draw(){
  
  background("white");
textSize(30)
text("score="+score, width-200, 70)
if (gameState===PLAY){

score+=Math.round(getFrameRate()/60)


ground.velocityX=-(8+3*score/100)
  if (ground.x<0){
    ground.x=ground.width/2

  }
  //logging the y position of the trex
  console.log(trex.y)
  
  //jump when space key is pressed
  if ((touches.length > 0 || keyDown("space"))&& trex.y>height-50){
    trex.velocityY = -10;
    jump_sound.play()
    touches = []
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  
  if (score>0 && score%100==0){
    checkpoint_sound.play()
  }

  
  spawnClouds()
  spawnObstacles()
  if (obstacleGroup.isTouching(trex)){
    gameState = END
     die_sound.play()
    //trex.velocityY = -10
    //jump_sound.play()
  }
}
if (gameState===END){
  ground.velocityX = 0
  trex.changeAnimation("collided")
  trex.velocityY=0

  obstacleGroup.setLifetimeEach(-1)
  obstacleGroup.setVelocityXEach(0)

  cloudsGroup.setVelocityXEach(0)
  cloudsGroup.setLifetimeEach(-1)

  gameOver.visible = true
  restart.visible = true

 if (touches.length >0 || mousePressedOver(restart)){
  reset()
  touches = []
 }

}
trex.collide(invisible_ground)
  drawSprites();
  
}
function reset(){
  obstacleGroup.destroyEach()
  cloudsGroup.destroyEach()
  gameState = PLAY
  score = 0
  trex.changeAnimation("running")
  gameOver.visible = false
  restart.visible = false
}




function spawnClouds(){
  // write your code here 
  if (frameCount%35==0){
 cloud=createSprite(width , height-300, 40, 20 )
 cloud.addImage(cloudImage)
 cloud.velocityX = -3
 cloud.scale = 1.2
 cloud.y = Math.round(random(height/4, height-150))
 trex.depth=cloud.depth+1
 cloud.lifetime = 550
 cloudsGroup.add(cloud)
 gameOver.depth = cloud.depth+1





  }
 }
 
 function spawnObstacles (){
 if (frameCount%60==0){
  obstacle = createSprite(width, height-40)
  obstacle.velocityX=-(8+3*score/100)
var x = Math.round(random(1,6))
switch(x){
  case 1: obstacle.addImage (o1)
  break;
  case 2: obstacle.addImage (o2)
  break;
  case 3: obstacle.addImage (o3)
  break;
  case 4: obstacle.addImage (o4)
  break;
  case 5: obstacle.addImage (o5)
  break;
  case 6: obstacle.addImage (o6)
  break;

}
obstacle.scale = 0.6
obstacle.lifetime =600

obstacleGroup.add(obstacle)
 }
 }