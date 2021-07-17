var PLAY=1,END=0,gameState=PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var rand,cloud,cloudImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacle;
var score=0;
var obstaclesGroup,cloudsGroup;
var gameOver,gameOverImage,restart,restartImage;
var jumpSound,dieSound,checkpointSound;
var number ='1234'

function preload() {
        
        trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
        trex_collided = loadImage("trex_collided.png");
        groundImage = loadImage("ground2.png");
        cloudImage=loadImage("cloud.png");
        obstacle1=loadImage("obstacle1.png");
        obstacle2=loadImage("obstacle2.png");
        obstacle3=loadImage("obstacle3.png");
        obstacle4=loadImage("obstacle4.png");
        obstacle5=loadImage("obstacle5.png");
        obstacle6=loadImage("obstacle6.png");
      gameOverImage=loadImage('gameOver.png')
      restartImage=loadImage('restart.png')
      jumpSound=loadSound("jump.mp3");
      dieSound=loadSound("die.mp3");
      checkpointSound=loadSound("checkpoint.mp3");
}

function setup() {

        createCanvas(600, 200);
       var message='this is Ravish'

        //create a trex sprite
        trex = createSprite(50,160,20,50);
        trex.addAnimation("running", trex_running);
        trex.addAnimation("collided" ,trex_collided);
        trex.scale = 0.5;
        trex.setCollider("rectangle",0,0,400,trex.height);
        //trex.debug=true;

        //create a ground sprite
        ground = createSprite(200,180,400,20);
        ground.addImage("ground",groundImage);
        ground.x = ground.width /2;
      
        gameOver=createSprite(300,100) 
        gameOver.addImage('gameOver',gameOverImage)
         gameOver.scale=0.5
        restart=createSprite(300,140)
        restart.addImage('restart',restartImage)
        restart.scale=0.5
        
        //Create an invisible Ground
        invisibleGround=createSprite(200,190,400,10);
        invisibleGround.visible=false;
        
        obstaclesGroup=new Group();
        cloudsGroup=new Group();
      
     

}
function draw() {

        background(180);
        //jump when the space button is pressed
        text("score : " +score,500,50);
        console.log(number)
        if(gameState === PLAY){
               // ground.velocityX = -(4+score/100);

                score=score+Math.round(frameCount/60);
                if(score>0 && score%100===0){
                        checkpointSound.play();
                }
                if (keyDown("space") && trex.y>90) {
                        trex.velocityY = -15;
                        jumpSound.play();

                }

                trex.velocityY = trex.velocityY + 0.8;

                if (ground.x < 0) {
                        ground.x = ground.width / 2;
                }
                gameOver.visible=false
                restart.visible=false
                spawnClouds();
                spawnObstacles();
                if(obstaclesGroup.isTouching(trex)){
                       gameState=END;
                        dieSound.play();
                     //  trex.velocityY=-10;
                      // jumpSound.play();
                }
        }
        else if (gameState === END){
                ground.velocityX=0;
                trex.velocityY=0;
                trex.changeAnimation("collided",trex_collided);

                //set Lifetime of the game objects so that they never destroyed
                obstaclesGroup.setLifetimeEach(-1) ;
                cloudsGroup.setLifetimeEach(-1);
                gameOver.visible=true
                restart.visible=true

                obstaclesGroup.setVelocityXEach(0);
                cloudsGroup.setVelocityXEach(0)

                if(mousePressedOver(restart)){
                        reset()
                }
        }

       
        trex.collide(invisibleGround);
        drawSprites();
     
}
        function reset(){
                score=0
                gameState=PLAY
                gameOver.visible=false
                restart.visible=false
                trex.changeAnimation('running',trex_running)
                obstaclesGroup.destroyEach()
                cloudsGroup.destroyEach()
}


function spawnClouds(){
        if(frameCount % 80 === 0){
        cloud=createSprite(600,100,40,10);  
        cloud.addImage(cloudImage);
        cloud.y=Math.round(random(10,60));
        cloud.velocityX=-3;
        cloud.scale=0.2;
        cloud.lifetime=210;
        cloud.depth=trex.depth;
        trex.depth=trex.depth+1;
        cloudsGroup.add(cloud);

        }
}

function spawnObstacles(){
if(frameCount % 80 === 0){
        obstacle=createSprite(600,165,10,40);
        obstacle.velocityX=-(4+score/100);
        rand=Math.round(random(1,6));

        switch(rand){
        case 1:obstacle.addImage(obstacle1);
                break;
        case 2:obstacle.addImage(obstacle2);
                break;
        case 3:obstacle.addImage(obstacle3);
                break;    
        case 4:obstacle.addImage(obstacle4);
                break;
        case 5:obstacle.addImage(obstacle5);
                break;
        case 6:obstacle.addImage(obstacle6);
                break;
        default:break;
        }
        obstacle.scale=0.1;
        obstacle.lifetime=150;
        obstaclesGroup.add(obstacle);
}
}



