var planet, planetImg;
var moon, moonImg, moonsGroup;
var space, spaceImg;
var meteor, meteorImg, meteorsGroup;
var moonsCollection = 0;
var gameOver, gameOverImg, restart, restartImg;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
    spaceImg = loadImage("space.jpg");
    planetImg = loadImage("planet.png")
    moonImg = loadImage("moon.png");
    meteorImg = loadImage("meteor.png"); 
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");
}

function setup() {
    createCanvas(1000, 800);
    space = createSprite(600, 350);
    space.addImage("space", spaceImg);
    space.scale = 3;
    

    planet = createSprite(400,650,1,1);
    planet.addImage("planet", planetImg);
    planet.scale = 0.2;
    
    gameOver = createSprite(500,350);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(500,450);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.3;
    restart.scale = 2;
  
    gameOver.visible = false;
    restart.visible = false;

    moonsGroup = new Group();

    meteorsGroup = new Group();

}

function draw() {
    //planet.debug = true;
    if (gameState===PLAY){
        background(0)
        
         edges= createEdgeSprites();
         planet.collide(edges);

         space.velocityY = 2;

        if(space.y > 445){
            space.y = 350
        }
        
        if(keyDown("left_arrow")){
            planet.x = planet.x -3;
          }
      
          if(keyDown("right_arrow")){
            planet.x = planet.x +3;
          }
        

        

        if (moonsGroup.isTouching(planet)) {
            moonsGroup.destroyEach();
            moonsCollection=moonsCollection+1;
        }

        planet.setCollider("rectangle",0,0,220,220);

        spawnMoons();
        spawnMetors();

        if(meteorsGroup.isTouching(planet)){
            gameState = END;
        }
      }
      else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
        
        space.velocityY = 0;
        meteorsGroup.setVelocityYEach(0);
        moonsGroup.setVelocityYEach(0);
        
    
        meteorsGroup.setLifetimeEach(-1);
        moonsGroup.setLifetimeEach(-1);

        
        if(touches.length > 0 || mousePressedOver(restart)) {
          reset();
          touches = [];
        }
      }

        

   
    
    

    drawSprites();
    textSize(20);
    fill(255);
    text("Luas: "+ moonsCollection,10,30);
 }


function spawnMoons(){
    if(frameCount%240 == 0){
        var moon = createSprite(200, -50);
        moon.addImage(moonImg);
        moon.x = Math.round(random(100, 1000));
        moon.velocityY = 3;
        moon.scale = 0.2;

        moon.lifetime = 1100;

        moonsGroup.add(moon);
        

    }
    
}

function spawnMetors(){
    if(frameCount%40 == 0){
        var meteor = createSprite(200, -50);
        meteor.addImage(meteorImg);
        meteor.x = Math.round(random(100, 1000));
        meteor.velocityY = 4;
        meteor.scale = 0.2;

        meteor.lifetime = 1100;

        meteorsGroup.add(meteor);
        

    }
    
}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

    planet.x = 500;
    
    
    meteorsGroup.destroyEach();
    moonsGroup.destroyEach();

    moonsCollection = 0;
}