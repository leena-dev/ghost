var spookySound,tower,towerImage;
var ghost,ghostJumpingImg,ghostStandingImg;
var door,doorImage,climber,climberImage;
var invisibleBlock;
var doorGroup,invisibleBlockGroup,climberGroup;
var END=0;
var PLAY=1;
var gameState=PLAY;

function preload() {
  spookySound = loadSound("spooky.wav");
  towerImage  = loadImage("tower.png");
  ghostStandingImage = loadImage("ghost-standing.png");
  climberImage=loadImage("climber.png");
  doorImage=loadImage("door.png");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  
  tower=createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(300,200);
  ghost.addImage("ghostStanding",ghostStandingImage);
  ghost.scale=0.3;
  
  doorGroup=new Group();
  invisibleBlockGroup=new Group();
  climberGroup=new Group();
}

function draw() {
  
  background(220);
  if (gameState === PLAY) {
    if (tower.y>400) {
      tower.y=300;
    }
    
    ghost.velocityY=15;

    spawnDoors();

    if (keyDown("right")) {
      ghost.x=ghost.x+4;
    }

    if (keyDown("left")) {
      ghost.x=ghost.x-4;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if ((ghost.y>600) || (invisibleBlockGroup.isTouching(ghost))) {
      gameState=END;
    }

  } else if (gameState === END) {
    tower.destroy();
    ghost.destroy();
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    background("black"); 
    textSize(26);
    fill("yellow");
    text ("Game Over",200,200);

    
  }
  
  
  drawSprites();
}

function spawnDoors() {
  if (frameCount%160 ===   0) {
    var door = createSprite(random(100,500),0);
    door.addImage("door",doorImage);
    door.velocityY=3;
    doorGroup.add(door);
    
    var climber = createSprite(door.x,door.y+50);
    climber.addImage("climber",climberImage);
    climber.velocityY=3;
    climberGroup.add(climber);
    invisibleBlock=createSprite(door.x,door.y+60,climber.width,2);
    invisibleBlock.debug=true;
    invisibleBlock.velocityY=3;
    invisibleBlockGroup.add(invisibleBlock);
     ghost.depth=door.depth=climber.depth=invisibleBlock.depth;
    ghost.depth++;
  }
}