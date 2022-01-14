var xwing,xwingImg;
var balas,balaImg,balasGroup;
var estrellas,estrellasImg;
var meteorito,meteoritoImg,meteoritoGroup;
var enemigo,enemigoImg,enemigoGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var sonidoin;
var sonidods;
var sonidops;
var score;
var sonidosr

function preload(){
  
xwingImg=loadImage("xwing.png");
estrellasImg=loadImage("estrellas.png");
balaImg=loadImage("bala.png");
meteoritoImg=loadImage("meteorito.png");
enemigoImg=loadImage("nave.png");
sonidoin=loadSound("Star Wars Main Theme (Full)_48k.mp3");
sonidods=loadSound("Star Wars stardestroyer blaster sound effect 3_48k.mp3");
sonidops=loadSound("Sonido De Explosion_48k.mp3");
sonidosr=loadSound("Sonido de pregunta_48k.mp3");
  
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  balasGroup=new Group();
  meteoritoGroup=new Group();
  enemigoGroup=new Group();
  
  estrellas=createSprite(displayWidth/2,displayHeight/2);
  estrellas.scale=2.5;
  estrellas.velocityY=3;
  estrellas.addImage("estrellas",estrellasImg);
  
  xwing=createSprite(displayWidth/2,displayHeight/2);
  xwing.addImage("avion",xwingImg);
  xwing.scale=0.3;
  
  sonidoin.play();
  score=0;
}

function draw() {
  background(0);
  xwing.x=mouseX;
  
  text("Score: "+ score, displayWidth -390,100);
   textSize(10);
   fill("blue");
  
 if(gameState===PLAY){
   //velocidad estandar 
      balasGroup.setVelocityXEach(0);
   
   //movimiento de fondo
     if(estrellas.y > 400){
      estrellas.y=300;
    }
   //disparo
    if(keyWentDown("space")){
        bala();
        sonidods.play();
    }
   
    if(keyDown("right_arrow") || keyDown("d")){
          balasGroup.setVelocityXEach(2);
        }
   
   if(keyDown("left_arrow") || keyDown("a")){
          balasGroup.setVelocityXEach(-2);
        }
   
   //si chocas o le pegas a algien con tu bala
   score = score + Math.round(getFrameRate()/60);
        estrellas.depth=score.depth-1;
   
   if(score>0 && score%200 === 0){
     sonidosr.play();
    }
   
  if(balasGroup.isTouching(meteoritoGroup)){
    balasGroup.destroyEach();
    sonidops.play();
    meteoritoGroup.destroyEach();
  }
  
  if(balasGroup.isTouching(enemigoGroup)){
    balasGroup.destroyEach();
    sonidops.play();
    enemigoGroup.destroyEach();
  }
  
  if(enemigoGroup.isTouching(xwing)){
    enemigoGroup.destroyEach();
    sonidops.play();
    gameState=END;
  }
   
   if(meteoritoGroup.isTouching(xwing)){
    meteoritoGroup.destroyEach();
    sonidops.play();
    gameState=END;
  }
   
  //ya mamos a mis metoritos
  meteoritos();
  enemigos();
 }
  
  if(gameState===END){
    muerto();
    if(keyWentDown("r")){
      gameState=PLAY;
        sonidoin.play();
    }
  }
  
  drawSprites();
  
  
}

function muerto(){
  enemigoGroup.destroyEach();
  meteoritoGroup.destroyEach();
  xwing.x=1200;
  time=60;
  sonidoin.stop();
}



function bala(){
  balas=createSprite(xwing.x,xwing.y);
  balas.addImage("balas",balaImg);
  balas.scale=0.3;
  balas.velocityY=-4;
  balas.lifetime=200;
  balasGroup.add(balas);           
}

function meteoritos(){
  if (frameCount % 150 === 0){
  meteorito=createSprite(xwing.x,-100);
  meteorito.addImage("meteorito",meteoritoImg);
  meteorito.scale=0.3;
  meteorito.velocityY=6;
  meteorito.lifetime=200;
  meteoritoGroup.add(meteorito);
  }
}

function enemigos(){
  if (frameCount % 20 === 0){
  enemigo=createSprite(Math.round(random(displayWidth-displayWidth,displayWidth)),-100);
  enemigo.addImage("naveenemiga",enemigoImg);
  enemigo.scale=0.5;
  enemigo.velocityY=6;
  enemigo.lifetime=200;
  enemigoGroup.add(enemigo);
  }
}

