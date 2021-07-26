var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var boy,boy_Running;
var game_OverImg;
var ground,invisibleGround,groundImg;
var jump,jumpSound;
var die,dieSound;
var obsticle1Img,obsticle1;
var obsticle2Img,obsticle2;
var obsticle3Img,obsticle3;
var obsticleGroup;
var reset;

function preload(){
boy_Running = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png");
game_OverImg = loadImage("gameOver.png");
groundImg = loadImage("ground.png");
jumpSound = loadSound("jump.mp3");
dieSound = loadSound("death.mp3");
obsticle1Img = loadImage("obsticle1.png");
obsticle2Img = loadImage("obsticle2.png");
obsticle3Img = loadImage("obsticle3.png");


}

function setup() {
createCanvas(800,800);

ground = createSprite(400,400,400,20);
ground.addImage("ground", groundImg);
ground.x = ground.width /2;

boy = createSprite(70,520,10,30);
boy.addAnimation("running", boy_Running);
boy.scale = 0.7;

gameOver = createSprite(400,100);
gameOver.addImage(game_OverImg);

invisibleGround = createSprite(100,690,400,10);
invisibleGround.visible = false;


obsticleGroup = createGroup();
 
}

function draw() {
    
    
    if(gameState === PLAY){
      
        background("ground.png");
       
        gameOver.visible = false;

    
       ground.velocityX = -(4 + 3)

       //jump when the space key is pressed
     if(keyDown("space")&& boy.y >= 100) {
        boy.velocityY = -12;
        jumpSound.play();
    }
          
    if (ground.x < 0){
        ground.x = ground.width/2;
      }
   
    //add gravity
    boy.velocityY = boy.velocityY + 0.8

    //spawn obsticles on the ground
    spawnObsticles();

//set lifetime of the game objects so that they are never destroyed
obsticleGroup.setLifetimeEach(-1);

    boy.collide(invisibleGround);

    } 

    drawSprites();   
}

function spawnObsticles(){
    
        if (frameCount % 60 === 0){
          var obsticle = createSprite(800,770,10,40);
          obsticle.velocityX = -(6 + score/100);
          
           //generate random obsticles
           var rand = Math.round(random(1,3));
           switch(rand) {
             case 1: obsticle.addImage(obsticle1Img);
                     break;
             case 2: obsticle.addImage(obsticle2Img);
                     break;
             case 3: obsticle.addImage(obsticle3Img);
                     break;
             default: break;
           }
          
           //assign scale and lifetime to the obsticle           
           obsticle.scale = 0.5;
           obsticle.lifetime = 300;
          
          //add each obsticle to the group
          obsticleGroup.add(obsticle);
           
        }
       }
        

    


function reset(){
    gameState=PLAY;
    obsticleGroup.destroyEach();
    cloudsGroup.destroyEach();
   
    boy.changeAnimation("running", boy_running);
    
    score=0;
   
    
   
   }