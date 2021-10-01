var alienship, alienImg1, alienImg2, alienImg3, alienGroup;
var mothership, mothershipImg;
var bg, bg_img;
var blast;
var jet, jetImg;
var laser, bluel, redl, greenl, orangel;
var life = 100;
var bossLife = 100;
var laser, LaserGroup;
var alienLaser, alienLaserGroup;
var score = 0;
var bgSound, blastSound, shootingSound;
var welcome;
var over, overImg;
var reset, resetImg;
var win , winImg;
var motherLaser, motherLaser2, motherLaser3, motherLaser4, motherLaser5;
var laserGroup1, laserGroup2, laserGroup3, laserGroup4, laserGroup5;

var gameState = 0;

var button;
var input;
var title;
var player;

var t = 0;
var v = 0;
var b = 0;
var m = 0;

function preload(){
  blast = loadAnimation("Images/Blast_(1).png","Images/Blast_(2).png","Images/Blast_(3).png","Images/Blast_(4).png","Images/Blast_(5).png","Images/Blast_(6).png","Images/Blast_(7).png","Images/Blast_(8).png","Images/Blast_(9).png");
  mothershipImg = loadAnimation("Images/Mothership_(1).png","Images/Mothership_(2).png","Images/Mothership_(3).png","Images/Mothership_(4).png","Images/Mothership_(5).png","Images/Mothership_(6).png");
  alienImg1 = loadImage("Images/Alienship1.png");
  alienImg2 = loadImage("Images/Alienship2.png");
  alienImg3 = loadImage("Images/Alienship3.png");
  bg_img = loadImage("Images/bkImg.png");
  jetImg = loadImage("Images/jet.png");
  bluel = loadImage("Images/BlueLaser.png");
  redl = loadImage("Images/RedLaser.png");
  greenl = loadImage("Images/GreenLaser.png");
  orangel = loadImage("Images/OrangeLaser.png");
  bgSound = loadSound("Sounds/BackgroundSound.mp3");
  blastSound = loadSound("Sounds/BlastSound.mpeg");
  shootingSound = loadSound("Sounds/ShootingSound.mpeg");
  welcome = loadImage("Images/Welcome_bk.jpg");
  overImg = loadImage("IMAGES/gameover.png");
  resetImg = loadImage("Images/reset.png");
  winImg = loadImage("Images/Winner.png");
}

function setup() {
 createCanvas(displayWidth,displayHeight);
 bg = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
 bg.addImage(bg_img);
 bg.velocityY = 6;

 jet = createSprite(displayWidth/2,displayHeight-100,30,40);
 jet.addImage(jetImg);
 jet.addAnimation("Blast",blast);
 jet.addAnimation("jet",jetImg);
 jet.scale = 0.1;

 AlienLaserGroup = createGroup();
 LaserGroup = createGroup();
 alienGroup = createGroup();
 laserGroup1 = createGroup();
 laserGroup2 = createGroup();
 laserGroup3 = createGroup();
 laserGroup4 = createGroup();
 laserGroup5 = createGroup();

 mothership = createSprite(displayWidth/2,displayHeight/2-650,40,50);
 mothership.addAnimation("ship",mothershipImg);
 mothership.addAnimation("blast",blast);
 mothership.scale = 0.5; 
 mothership.visible = false;
 mothership.setCollider("circle",mothership.x-650,mothership.y+300,400);
 //mothership.debug = true;

 over = createSprite(displayWidth/2,displayHeight/2);
 over.addImage(overImg);
 over.scale = 0.1;
 over.visible = false;

 reset = createSprite(displayWidth/2,displayHeight/2+200);
 reset.addImage(resetImg);
 reset.scale = 0.1;
 reset.visible = false;

 win = createSprite(displayWidth/2,displayHeight/2);
 win.addImage(winImg);
 win.scale = 0.1;
 win.visible = false;

 //bgSound.looping = true;

 bg.velocityY = 0;
 jet.visible = false;

 title = createElement("h1");
 title.html("Space War");
 title.position(displayWidth/2-50,displayHeight/2-300);

 input = createInput("name");
 input.position(displayWidth/2-50,displayHeight/2-100);

 button = createButton("PLAY");
 button.position(displayWidth/2,displayHeight/2);

}

function draw() {
  background(22,14,71);
 //bgSound.play();
 console.log(gameState);
 if (bg.y>displayHeight*3){
    bg.y = displayHeight/2;
 }

 jet.x = mouseX;

  jet.depth = jet.depth + 1;

  if (gameState == 0){
   background(welcome);

   player = input.value();

    button.mousePressed(function(){
      title.hide();
      input.hide();
      button.hide();
      gameState = 1;
    });

    fill(255);
    textSize(15);
    text("Instructions :-",displayWidth-1200,displayHeight-320);
    text("1. Use full screen to have better experience.",displayWidth-1200,displayHeight-300);
    text("2. Drag the mouse left or right to move your jet.",displayWidth-1200,displayHeight-280);
    text("3. Press 'Spacebar' to shoot your enemies.",displayWidth-1200,displayHeight-260);

    text("Story :-",displayWidth-400,displayHeight-650);
    text("The Earth is in danger and you have to protect your planet.",displayWidth-400,displayHeight-630);
    text("Enimies are going toward the Earth to destroy it.",displayWidth-400,displayHeight-610);
    text("So you have to destroy them before reaching to Earth.",displayWidth-400,displayHeight-590);
  }
  else if (gameState == 1){
    jet.visible = true;
    bg.velocityY = 5;

    if (life <= 0){
      life = 0;
    }

    if (score < 100){
      spawnAliens();
    }

    if (jet.x >= displayWidth-1180 && jet.x <= displayWidth-100 && v == 0){
      if (keyDown("space")){
        fire();
       }
     }

     if (AlienLaserGroup.isTouching(jet)){
      life = life-10;
      AlienLaserGroup.destroyEach();
     }

     if (laserGroup1.isTouching(jet)){
      life = life-20;
      laserGroup1.destroyEach();
     }

     if (laserGroup2.isTouching(jet)){
      life = life-20;
      laserGroup2.destroyEach();
     }

     if (laserGroup3.isTouching(jet)){
      life = life-20;
      laserGroup3.destroyEach();
     }

     if (laserGroup4.isTouching(jet)){
      life = life-20;
      laserGroup4.destroyEach();
     }

     if (laserGroup5.isTouching(jet)){
      life = life-20;
      laserGroup5.destroyEach();
     }
   
    if (life <= 0){
      jet.changeAnimation("Blast",blast);
      jet.scale = 0.5;
      bg.velocityY = 0;
     // blastSound.play();
      t = t + 1;
      v = 1;
    }
    
    if (t >= 66){
      jet.visible = false;
      gameState = 2;
    }

    if (bossLife <= 0){
      mothership.changeAnimation("blast",blast);
      mothership.scale = 0.8;
      b = b + 1;
      m = 1;
      console.log(b);
    }
   
    if (b >= 66){
      mothership.visible = false;
      gameState = 3;
    }

    if (alienGroup.y = displayHeight-640){
      if (LaserGroup.isTouching(alienGroup)){
      alienGroup.destroyEach();
      LaserGroup.destroyEach();
      score = score + 10;
     }
    }

    if (score >= 100){
      mothership.visible = true;
      mothership.velocityY = 4;
    }
    else{
      mothership.visible = false;
    }

   drawSprites();

   if (mothership.y >= 200){
    mothership.velocityY = 0;
    fill("red");
    textSize(20);
    text("Boss Health = "+bossLife,displayWidth-1250,displayHeight-680);
    if (v == 0 && m == 0){
    Motherlaser();
    }
  }

  if (mothership.isTouching(LaserGroup)){
    LaserGroup.destroyEach();

    if (mothership.y >= 200){
    score = score+20;
    bossLife = bossLife-10;
    }
  }

   if (life >= 80){
    fill("green");
    textSize(20);
    text("Health = "+life,displayWidth-120,displayHeight-670);
   }
   else if (life < 80 && life >=50){
    fill("orange");
    textSize(20);
    text("Health = "+life,displayWidth-120,displayHeight-670);
   }
   else if (life < 50 && life >=20){
    fill("yellow");
    textSize(20);
    text("Health = "+life,displayWidth-120,displayHeight-670);
   }
   else if (life < 20 && life >=0){
    fill("red");
    textSize(20);
    text("Health = "+life,displayWidth-120,displayHeight-670);
   }
   else{
    fill("red");
    textSize(20);
    text("Health = "+life,displayWidth-120,displayHeight-670);
   }
 
   fill("violet");
   textSize(20);
   text("score = "+score,displayWidth-120,displayHeight-700);
   fill("yellow");
   text(player,jet.x-20,jet.y+80);
  } 

  else if (gameState == 2){
    bg.velocityY = 0;
    mothership.velocityY = 4;
    
    over.visible = true;

    over.scale  = over.scale + 0.01;
    if (over.scale >= 1){
      over.scale = 1;
      reset.visible = true;
    }   

    if (mousePressedOver(reset)){
      gameState = 0;
      title.show();
      input.show();
      button.show();

      over.visible = false;
      reset.visible = false;

      score = 0;
      v = 0;
      t = 0;
      life = 100;
      jet.changeAnimation("jet",jetImg);
      jet.scale = 0.1;

      mothership.x = displayWidth/2;
      mothership.y = displayHeight/2-650;
    }

    drawSprites();

    fill("violet");
    textSize(20);
    text("score = "+score,displayWidth-120,displayHeight-700);
    fill("red");
    text("Health = "+life,displayWidth-120,displayHeight-670);
  }
  
   if (gameState == 3){
    bg.velocityY = 0;
    jet.visible = false;
    mothership.visible = false;
    win.visible = true;

    win.scale  = win.scale + 0.01;
    if (win.scale >= 0.8){
      win.scale = 0.8;
      reset.visible = true;
    }

    if (mousePressedOver(reset)){
      gameState = 0;
      title.show();
      input.show();
      button.show();

      reset.visible = false;
      win.visible = false;

      score = 0;
      v = 0;
      t = 0;
      m = 0;
      b = 0;

      life = 100;
      bossLife = 100;

      jet.visible = true;
      jet.changeAnimation("jet",jetImg);
      jet.scale = 0.1;

      mothership.changeAnimation("ship",mothershipImg);
      mothership.scale = 0.5;

      mothership.x = displayWidth/2;
      mothership.y = displayHeight/2-650;
    }

    drawSprites();
  }
}

function spawnAliens(){
  if (frameCount%100 == 0){
    alienship = createSprite(random(displayWidth-1100,displayWidth-150),0,30,40);
    alienship.velocityY = score%2 + 10;
    //alienship.addAnimation("Blast",blast);
    var rand = Math.round(random(1,3));

    switch (rand){
      case 1: alienship.addImage(alienImg1);
              alienship.scale = 0.08;
      break;
      case 2: alienship.addImage(alienImg2);
              alienship.scale = 0.08;
      break;
      case 3: alienship.addImage(alienImg3);
              alienship.scale = 0.08;
      break;
    }

    alienship.lifetime = 125;
    alienGroup.add(alienship);
   // console.log(alienGroup[0]);

    for (var i = 0; i<5; i++){
      //console.log(alienship.y+i);
      alienLaser = createSprite(alienship.x,alienship.y+i*100,10,10);
      alienLaser.addImage(bluel);
      alienLaser.scale = 0.02;
      alienLaser.velocityY = score%2 + 15;;
      AlienLaserGroup.add(alienLaser);
     // shootingSound.play();

    }
  }
}

function fire(){
  laser = createSprite(jet.x,jet.y,10,10);
  laser.addImage(greenl);
  laser.scale = 0.02;
  laser.velocityY = -10;
  LaserGroup.add(laser);
}

function Motherlaser(){
  if (frameCount% 25 == 0){
  motherLaser = createSprite(displayWidth/2,displayHeight/2,10,10);
  motherLaser.addImage(redl);
  motherLaser.scale = 0.02;
  motherLaser.velocityY = 20;
  motherLaser.lifetime = 100;
  laserGroup1.add(motherLaser);
  }

  if (frameCount% 20 == 0){
  motherLaser2 = createSprite(displayWidth/2-100,displayHeight/2,10,10);
  motherLaser2.addImage(redl);
  motherLaser2.scale = 0.02;
  motherLaser2.velocityY = 20;
  motherLaser2.lifetime = 100;
  laserGroup2.add(motherLaser2);
  }

  if (frameCount% 30 == 0){
  motherLaser3 = createSprite(displayWidth/2+100,displayHeight/2,10,10);
  motherLaser3.addImage(redl);
  motherLaser3.scale = 0.02;
  motherLaser3.velocityY = 20;
  motherLaser3.lifetime = 100;
  laserGroup2.add(motherLaser3);
  }

  if (frameCount% 35 == 0){
    motherLaser4 = createSprite(displayWidth/2+200,displayHeight/2,10,10);
    motherLaser4.addImage(redl);
    motherLaser4.scale = 0.02;
    motherLaser4.velocityY = 20;
    motherLaser4.lifetime = 100;
    laserGroup4.add(motherLaser4);
    }

    if (frameCount% 15 == 0){
      motherLaser5 = createSprite(displayWidth/2-200,displayHeight/2,10,10);
      motherLaser5.addImage(redl);
      motherLaser5.scale = 0.02;
      motherLaser5.velocityY = 20;
      motherLaser5.lifetime = 100;
      laserGroup5.add(motherLaser5);
      }
}