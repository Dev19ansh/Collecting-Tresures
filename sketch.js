var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameState="play";
var stopImg;
var gameOver;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
  stopImg=loadAnimation("runner1.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("SahilStop",stopImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
  
gameOver=createSprite(200,200,10,10);
  gameOver.addImage(endImg);
  gameOver.visible=false;
  gameOver.scale=0.5;
}

function draw() {

  background(0);
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(gameState==="play"){
     if (cashG.isTouching(boy)) {
       treasureCollection = treasureCollection + 10;
      cashG.destroyEach();
    }
    else if (diamondsG.isTouching(boy)) {
      treasureCollection = treasureCollection + 50;
      diamondsG.destroyEach();
      
    }else if(jwelleryG.isTouching(boy)) {
     treasureCollection = treasureCollection + 30;
      jwelleryG.destroyEach();
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState="end";
        swordGroup.destroyEach();
        jwelleryG.destroyEach();
        cashG.destroyEach();
        diamondsG.destroyEach();
    }
      if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    boy.x = World.mouseX;
  }
  
  if(gameState==="end"){
    path.velocityY=0;
    boy.changeAnimation("SahilStop",stopImg);
     cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
     cashG.setLifetimeEach(-2);
    diamondsG.setLifetimeEach(-2);
    jwelleryG.setLifetimeEach(-2);
    gameOver.visible=true;
    
  }
   
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  gameOver.depth=cash.depth+1;

  cashG.add(cash);
  }
  
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  gameOver.depth=diamonds.depth+1;

  diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  gameOver.depth=jwellery.depth+1;

  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}