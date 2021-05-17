var PLAY=1
var END=0
var gamestate=PLAY

var pikachu,pikachuimage,pikachustop
var bg,bgimage
var ghostGroup,ghost;
var haunter,gengar,gastly
var ground
var gameover,gameoverimage
var score=0;
function preload(){
  pikachuimage=loadAnimation("images/p1.jpg","images/p2.jpg","images/p3.jpg","images/p4.jpg")
  pikachustop=loadAnimation("images/p2.jpg")
  bgimage=loadImage("images/bg.jpg")
  gastlyimage=loadAnimation("images/gastly1.png","images/gastly2.png","images/gastly3.png","images/gastly4.png")
  haunterimage=loadAnimation("images/haunter1.png","images/haunter2.png","images/haunter3.png","images/haunter4.png","images/haunter5.png")
 gengarimage=loadAnimation("images/gengar1.png","images/gengar2.png","images/gengar3.png","images/gengar4.png","images/gengar5.png")
 gameoverimage=loadImage("images/gameover.jpg")
}
function setup(){
  createCanvas (1000,700)
 
bg=createSprite(500,300,1000,600)
bg.addImage(bgimage)
bg.scale=2.9

ground=createSprite(500,550,1000,10)
pikachu=createSprite(70,470)
pikachu.scale=0.6
pikachu.addAnimation("running",pikachuimage)
pikachu.addAnimation("stop",pikachustop)
//pikachu.debug=true
pikachu.setCollider("circle",50,30,120)
gameover=createSprite(500,300)
gameover.addImage(gameoverimage)
gameover.visible=false
ground.visible=false
gastlyGroup=new Group()
gengarGroup=new Group()
haunterGroup=new Group()
}
function draw (){
  background("blue")
  pikachu.collide(ground) 
  if (gamestate===PLAY){
    if (bg.x < 0){
      bg.x = bg.width/2;
    }
    bg.velocityX=-5
    if (keyDown("space")&& pikachu.y>450){
      pikachu.velocityY=-15;

    }
    pikachu.velocityY=pikachu.velocityY+0.5
 score=score+Math.round(frameRate()/60)
    var r = Math.round(random(1,3))
  
    switch(r){
      case 1:spawngastly()
      break;
      case 2:spawngengar()
      break;
      case 3:spawnhaunter()
      break;
    }
    if (pikachu.isTouching(gengarGroup)||pikachu.isTouching(gastlyGroup)||pikachu.isTouching(haunterGroup)){
      gamestate=END
    }
  }
  else if (gamestate===END){
    bg.velocityX=0
pikachu.changeAnimation("stop",pikachustop)
gastlyGroup.setLifetimeEach(-1)
gengarGroup.setLifetimeEach(-1)
haunterGroup.setLifetimeEach(-1)
gastlyGroup.setVelocityXEach(0)
gengarGroup.setVelocityXEach(0)
haunterGroup.setVelocityXEach(0)
pikachu.velocityY=0;
gameover.visible=true
  }
 

  
  drawSprites()
  textSize(25)
  fill("white")
  text("score-"+score,30,30)
}
function spawngastly(){
  if(World.frameCount % 100 === 0) {
    var gastly = createSprite(1000,random(370,430),10,40);
    //gastly.debug=true
   // gastly.shapeColor="blue"
    gastly.addAnimation("gas",gastlyimage)
    gastly .velocityX = -8;     
    gastly.setCollider("circle",0,0,80)       
    gastly .scale = 0.5;
    gastly.lifetime = 170;
    gastlyGroup.add(gastly); 
  }
}
function spawngengar(){
  if(World.frameCount % 100 === 0) {
    var gengar = createSprite(1000,470,10,40);
   // gengar.debug=true
   // gengar.shapeColor="red"
    gengar.addAnimation("gen",gengarimage)
    gengar .velocityX = -8;    
    gengar.setCollider("circle",0,0,200)        
    gengar .scale = 0.35;
    gengar.lifetime = 170;
    gengarGroup.add(gengar); 
  }
}
function spawnhaunter(){
  if(World.frameCount % 100 === 0) {
    var haunter = createSprite(1000,random(370,430),10,40);
   // haunter.debug=true
    haunter.addAnimation("haun",haunterimage)
    haunter.velocityX = -8;        
    haunter.setCollider("circle",0,0,100)    
    haunter.scale = 0.5;
    haunter.lifetime = 170;
    haunterGroup.add(haunter); 
  }
}