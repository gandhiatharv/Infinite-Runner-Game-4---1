var dino, dinocollided, dinorunning, asteroid, asteroidimg, block;
var block1img, block2img, block3img, block4img;
var coin, coinimg, citybackground, citbackgroundimg, pizza, pizzaimg;
var opponentdinosaur, opponentdinosaur2, opponentdinosaur3, opponentdinosaur4, oppdino1running, oppdino1collided, shockedperson3, shockedperson3img;
var oppdino2running, rand4, rand5, rand6, rand7, rand8;
var oppdino2collided, oppdino3running, oppdino3collided, rand3;
var oppdino4running, start, startimg, roar, gameoversound;
var oppdino4collided, reset, gameover, resetimg, gameoverimg;
var missile, missileimg, line1, line2;
var shockedperson1, shockedperson1img, shockedperson2;
var shockedperson2img, yellowkey, yellowkeyimg, block4img, rand, rand2;
var shockedpersongroup, oppdino1group, oppdino2group, oppdino3group, oppdino4group, blockgroup, asteroidgroup;
var coingroup, pizzagroup, keygroup, missilegroup, invisibleground;
var message1 = "Welcome to the game! Jump using the space key. Move left and right using the respective arrow keys. Avoid the other dinosaurs and asteroids."
var message2 = "Eat as many people as you can. Jump on blocks to rest or collect special items. Collect coins to increase your score. Collect pizza to redeem missiles. "
var message3 = "You can use a missile by pressing the 'm' key down when you have one. You can see how many missiles you have by looking at the bottom left hand corner."
var message4 = "Missiles can help you destroy other dinosaurs and asteroids. Collect keys to redeem invisibility powerups. "
var message5 = "You can use an invisibility powerup by pressing the 'i' key down when you have one. "
var message6 = "The invisibility powerup lasts as long as you keep on presssing the 'i' key down."
var message7 = "You can see how many invisibility powerups you have by looking at the bottom right hand corner."
var message8 = "Invisibility powerups can help you stay invisble and protected from asteroids and other dinosaurs so you don't die."
var message9 = "If invisibility is not on, you die if you collide with another dinosaur or with an asteroid. But beware! If you are invisible, you can't collect coins & powerups!"
var message10 = "You also can't eat people or roar if you are invisible. To play again, click the reset button. Press 'r' to roar! Have fun!";
var value = 1;
var value20 = 1;
var distance = 0;
var score = 0;
var missilecount = 2;
var invisibilitycount = 2;
var eatenpeople = 0;
var PLAY = 1;
var END = 0;
var HOWTOPLAY = 2;
var gamestate = HOWTOPLAY;

function preload() {
  dinorunning = loadAnimation("dinoimg1.png", "dinoimg2.png")
  dinocollided = loadAnimation("dinoimg1.png");
  asteroidimg = loadImage("asteroid.png");
  block1img = loadImage("block1.png");
  block2img = loadImage("block2.png");
  block3img = loadImage("block3.png");
  block4img = loadImage("block4.png");
  missileimg = loadImage("missile.png");
  shockedperson1img = loadImage("shockedperson1.png");
  shockedperson2img = loadImage("shockedperson2.png");
  shockedperson3img = loadImage("shockedperson3.png");
  yellowkeyimg = loadImage("key.png");
  coinimg = loadImage("coin.png");
  pizzaimg = loadImage("pizza.png");
  citybackgroundimg = loadImage("background.png");
  resetimg = loadImage("reset.png");
  gameoverimg = loadImage("gameover.png");
  oppdino1running = loadAnimation("oppdino1img1.png", "oppdino1img2.png");
  oppdino1collided = loadAnimation("oppdino1img1.png");
  oppdino2running = loadAnimation("oppdino2img1.png", "oppdino2img2.png");
  oppdino2collided = loadAnimation("oppdino2img1.png");
  oppdino3running = loadAnimation("oppdino3img1.png", "oppdino3img2.png");
  oppdino3collided = loadAnimation("oppdino3img1.png");
  oppdino4running = loadAnimation("oppdino4img1.png", "oppdino4img2.png");
  oppdino4collided = loadAnimation("oppdino4img1.png");
  startimg = loadImage("start.png");
  roar = loadSound("dinoroar.mp3");
  gameoversound = loadSound("gameover.wav");
}

function setup() {
  createCanvas(1000, 540);

  citybackground = createSprite(500, 270, 900, 600);
  citybackground.addImage(citybackgroundimg);
  citybackground.scale = 1;

  dino = createSprite(190, 400, 20, 20);
  dino.addAnimation("running", dinorunning);
  dino.addAnimation("collided", dinocollided);
  dino.scale = 0.6;
  dino.setCollider("rectangle", 0, dino.height - 490, 400, 200);

  citybackground.depth = dino.depth - 6;

  invisibleground = createSprite(500, 485, citybackground.width, 120);
  invisibleground.visible = false;

  opponentdinosaur = createSprite(1400, dino.y, 0, 0);
  opponentdinosaur2 = createSprite(1400, dino.y, 0, 0);
  opponentdinosaur3 = createSprite(1400, dino.y, 0, 0);
  opponentdinosaur4 = createSprite(1400, dino.y, 0, 0);

  gameover = createSprite(485, 245);
  gameover.addImage(gameoverimg);
  gameover.depth = dino.depth + 1;

  reset = createSprite(gameover.x, gameover.y + 100);
  reset.addImage(resetimg);
  reset.scale = 1.3;
  reset.depth = gameover.depth;

  gameover.visible = false;
  reset.visible = false;

  start = createSprite(500, 420, 10, 10);
  start.addImage(startimg);

  line1 = createSprite(0, 270, 5, 540);
  line1.visible = false;
  line2 = createSprite(1000, 270, 5, 540);
  line2.visible = false;

  oppdino1group = createGroup();
  oppdino2group = createGroup();
  oppdino3group = createGroup();
  oppdino4group = createGroup();
  blockgroup = createGroup();
  asteroidgroup = createGroup();
  coingroup = createGroup();
  pizzagroup = createGroup();
  keygroup = createGroup();
  missilegroup = createGroup();
  shockedpersongroup = createGroup();
}

function draw() {
  background(360);
  
  camera.position.x = dino.x;
  camera.position.y = dino.y;
  
  dino.collide(invisibleground);
  dino.collide(line1);
  dino.collide(line2);
  dino.collide(blockgroup);

  drawSprites();
  if (gamestate === HOWTOPLAY) {
    textSize(14);
    fill("red");
    text(message1, 20, 80);
    text(message2, 20, 100);
    text(message3, 20, 120);
    text(message4, 20, 140);
    text(message5, 20, 160);
    text(message6, 20, 180);
    text(message7, 20, 200);
    text(message8, 20, 220);
    text(message9, 20, 240);
    text(message10, 20, 260);

    if (mousePressedOver(start)) {
      gamestate = PLAY;
      start.destroy();
      message1 = " ";
      message2 = " ";
      message3 = " ";
      message4 = " ";
      message5 = " ";
      message6 = " ";
      message7 = " ";
      message8 = " ";
      message9 = " ";
      message10 = " ";
    }
  }


  textSize(18);
  strokeWeight = 2;
  stroke("white");
  fill("white");

  text("Distance: " + distance, 30, 40);
  text("Score: " + score, 900, 40);
  text("Missiles: " + missilecount, 30, 530)
  text("Invisibility Powerups: " + invisibilitycount, 800, 530);
  text("People Eaten: " + eatenpeople, 450, 40);
  if (dino.visible === true) {
    text("Mode: Visible", 400, 530);
  } else if (dino.visible === false) {
    text("Mode: Invisible", 400, 530);
  }



  if (gamestate === PLAY) {
    citybackground.velocityX = -(2 + 2 * distance / 300);

    distance = distance + Math.round(getFrameRate() / 60);

    gameover.visible = false;
    reset.visible = false;

    gameoversound.stop();

    if (citybackground.x < 0) {
      citybackground.x = 1000;
    }

    dino.collide(invisibleground);
    dino.collide(line1);
    dino.collide(line2);
    dino.collide(blockgroup);

    if (keyDown("right")) {
      dino.x = dino.x + 10;
    }

    if (keyDown("left")) {
      dino.x = dino.x - 10;
    }

    if (keyDown("space") && dino.y >= 189) {
      dino.velocityY = -13;
    }

    if (missilegroup.isTouching(oppdino1group) || missilegroup.isTouching(oppdino2group) || missilegroup.isTouching(oppdino3group) || missilegroup.isTouching(oppdino4group)) {
      oppdino1group.destroyEach();
      oppdino2group.destroyEach();
      oppdino3group.destroyEach();
      oppdino4group.destroyEach();
    }

    if (missilegroup.isTouching(asteroidgroup)) {
      asteroidgroup.destroyEach();
    }

    if (dino.x < 0) {
      endgame();
    }

    spawnshockedpeople();
    spawnasteroids();
    spawnblocks();

    if (frameCount % 400 === 0) {
      rand2 = Math.round(random(1, 4));
      switch (rand2) {
        case 1:
          spawndino1();
          break;
        case 2:
          spawndino2();
          break;
        case 3:
          spawndino3();
          break;
        case 4:
          spawndino4();
          break;
        default:
          break;
      }
    }

    if (dino.visible === true) {

      if (shockedpersongroup.isTouching(dino)) {
        shockedpersongroup.destroyEach();
        eatenpeople = eatenpeople + 1;
      }

      if (asteroidgroup.isTouching(dino)) {
        endgame();
      }

      if (oppdino1group.isTouching(dino) || oppdino2group.isTouching(dino) || oppdino3group.isTouching(dino) || oppdino4group.isTouching(dino)) {
        endgame();
      }

      if (coingroup.isTouching(dino)) {
        coingroup.destroyEach();
        score = score + 1;
      }

      if (pizzagroup.isTouching(dino)) {
        pizzagroup.destroyEach();
        missilecount = missilecount + 1;
      }

      if (keygroup.isTouching(dino)) {
        keygroup.destroyEach();
        invisibilitycount = invisibilitycount + 1;
      }

      if (keyDown("r") && value20 === 1) {
        roar.play();
        value20 = 0;
      }
      if (keyWentUp("r") && value20 === 0) {
        value20 = 1;
      }

    }

    dino.velocityY = dino.velocityY + 0.8;

    if (keyDown("m") && missilecount > 0 && value === 1) {
      spawnmissiles();
      value = 0;
    }

    if (keyWentUp("m") && missilecount > 0 && value === 0) {
      missilecount = missilecount - 1;
      value = 1;
    }

    if (keyDown("i") && invisibilitycount > 0) {
      dino.visible = false;
    }

    if (keyWentUp("i") && invisibilitycount > 0) {
      dino.visible = true;
      invisibilitycount = invisibilitycount - 1;
    }

  } else if (gamestate === END) {
    dino.changeAnimation("collided", dinocollided);
    roar.stop();

    dino.velocityY = 0;
    dino.velocityX = 0;

    if (keyWentUp("m")) {
      value = 1;
    }

    oppdino1group.setVelocityXEach(0);
    oppdino1group.setLifetimeEach(-1);
    oppdino2group.setVelocityXEach(0);
    oppdino2group.setLifetimeEach(-1);
    oppdino4group.setVelocityXEach(0);
    oppdino3group.setLifetimeEach(-1);
    oppdino3group.setVelocityXEach(0);
    oppdino4group.setLifetimeEach(-1);
    citybackground.velocityX = 0;
    blockgroup.setVelocityXEach(0);
    blockgroup.setLifetimeEach(-1)
    asteroidgroup.setVelocityYEach(0);
    asteroidgroup.setLifetimeEach(-1);
    coingroup.setVelocityXEach(0);
    coingroup.setLifetimeEach(-1);
    pizzagroup.setVelocityXEach(0);
    pizzagroup.setLifetimeEach(-1);
    shockedpersongroup.setVelocityXEach(0);
    shockedpersongroup.setLifetimeEach(-1);
    missilegroup.setVelocityXEach(0);
    missilegroup.setLifetimeEach(-1);
    keygroup.setVelocityXEach(0);
    keygroup.setLifetimeEach(-1);

    dino.collide(invisibleground);
    dino.collide(line1);
    dino.collide(line2);
    dino.collide(blockgroup);


    if (mousePressedOver(reset)) {
      gamestate = PLAY;
      citybackground.x = 1000;
      dino.y = 400;
      oppdino1group.destroyEach();
      oppdino2group.destroyEach();
      oppdino3group.destroyEach();
      oppdino4group.destroyEach();
      blockgroup.destroyEach();
      asteroidgroup.destroyEach();
      coingroup.destroyEach();
      pizzagroup.destroyEach();
      keygroup.destroyEach();
      missilegroup.destroyEach();
      shockedpersongroup.destroyEach();
      dino.changeAnimation("running", dinorunning);
      distance = 0;
      score = 0;
      missilecount = 2;
      invisibilitycount = 2;
      eatenpeople = 0;
    }


    gameover.visible = true;
    reset.visible = true;
  }

  dino.collide(invisibleground);
  dino.collide(line1);
  dino.collide(line2);
  dino.collide(blockgroup);
}

function spawnasteroids() {
  if (frameCount % 300 === 0) {
    asteroid = createSprite(Math.round(random(50, 950)), 0, 20, 20);
    asteroid.addImage(asteroidimg);
    asteroid.scale = 0.4;
    asteroid.velocityY = (1.5 + 2 * distance / 300);
    asteroid.depth = dino.depth - 4;
    asteroid.lifetime = 900;
    asteroidgroup.add(asteroid);
  }
}

function spawndino1() {
  opponentdinosaur = createSprite(1400, invisibleground.y - 95, 0, 0);
  opponentdinosaur.velocityX = -(5 + 2 * distance / 300);
  opponentdinosaur.depth = dino.depth - 3;
  opponentdinosaur.addAnimation("dino1", oppdino1running);
  opponentdinosaur.lifetime = 900;
  oppdino1group.add(opponentdinosaur);
}



function spawndino2() {
  opponentdinosaur2 = createSprite(1400, invisibleground.y - 95, 0, 0);
  opponentdinosaur2.velocityX = -(5 + 2 * distance / 300);
  opponentdinosaur2.depth = dino.depth - 3;
  opponentdinosaur2.addAnimation("dino2", oppdino2running);
  opponentdinosaur2.lifetime = 900;
  oppdino2group.add(opponentdinosaur2);
}


function spawndino3() {
  opponentdinosaur3 = createSprite(1400, invisibleground.y - 95, 0, 0);
  opponentdinosaur3.velocityX = -(5 + 2 * distance / 300);
  opponentdinosaur3.depth = dino.depth - 3;
  opponentdinosaur3.addAnimation("dino3", oppdino3running);
  opponentdinosaur3.lifetime = 900;
  oppdino3group.add(opponentdinosaur3);
}


function spawndino4() {
  opponentdinosaur4 = createSprite(1400, invisibleground.y - 95, 0, 0);
  opponentdinosaur4.velocityX = -(5 + 2 * distance / 300);
  opponentdinosaur4.scale = 0.75;
  opponentdinosaur4.depth = dino.depth - 3;
  opponentdinosaur4.addAnimation("dino4", oppdino4running);
  opponentdinosaur4.lifetime = 900;
  oppdino4group.add(opponentdinosaur4);
}

function spawnmissiles() {
  missile = createSprite(dino.x + 170, dino.y, 10, 10);
  missile.addImage(missileimg);
  missile.scale = 0.35;
  missile.depth = dino.depth - 2;
  missile.velocityX = 5;
  missile.lifetime = 500;
  missilegroup.add(missile);
}

function resetgame() {
  gamestate = PLAY;
  citybackground.x = 1000;
  dino.x = 190;
  dino.y = 400;
  oppdino1group.destroyEach();
  oppdino2group.destroyEach();
  oppdino3group.destroyEach();
  oppdino4group.destroyEach();
  blockgroup.destroyEach();
  asteroidgroup.destroyEach();
  coingroup.destroyEach();
  pizzagroup.destroyEach();
  keygroup.destroyEach();
  missilegroup.destroyEach();
  shockedpersongroup.destroyEach();
  dino.changeAnimation("running", dinorunning);
  distance = 0;
  score = 0;
  missilecount = 2;
  invisibilitycount = 2;
  eatenpeople = 0;
}

function endgame() {
  gamestate = END;
  gameoversound.play();

  opponentdinosaur.addAnimation("dino1", oppdino1collided);
  opponentdinosaur2.addAnimation("dino2", oppdino2collided);
  opponentdinosaur3.addAnimation("dino3", oppdino3collided);
  opponentdinosaur4.addAnimation("dino4", oppdino4collided);

  oppdino1group.setVelocityXEach(0);
  oppdino1group.setLifetimeEach(-1);
  oppdino2group.setVelocityXEach(0);
  oppdino2group.setLifetimeEach(-1);
  oppdino4group.setVelocityXEach(0);
  oppdino3group.setLifetimeEach(-1);
  oppdino3group.setVelocityXEach(0);
  oppdino4group.setLifetimeEach(-1);
}

function spawnblocks() {
  if (frameCount % 450 === 0) {
    block = createSprite(1400, Math.round(random(200, 280)), 10, 10);
    block.velocityX = -(2.5 + 2 * distance / 300);
    block.depth = dino.depth - 1;
    rand3 = Math.round(random(1, 4));
    switch (rand3) {
      case 1:
        block.addImage(block1img);
        block.scale = 0.3;
        block.setCollider("rectangle", 130, 130, block.height, block.width);
        break;
      case 2:
        block.addImage(block2img);
        block.scale = 0.8;
        block.setCollider("rectangle", 70, 70, block.height, block.width);
        break;
      case 3:
        block.addImage(block3img);
        block.scale = 0.8;
        block.setCollider("rectangle", 40, 40, block.height, block.width);
        break;
      case 4:
        block.addImage(block4img);
        block.scale = 0.45;
        block.setCollider("rectangle", 10, 10, block.height, block.width);
        break;
      default:
        break;


    }

    block.lifetime = 900;
    blockgroup.add(block);

    rand4 = Math.round(random(1, 12));
    rand5 = Math.round(random(1, 12));
    rand6 = Math.round(random(1, 12));
    rand7 = Math.round(random(1, 12));
    rand8 = Math.round(random(1, 12));


    if (rand5 === rand4 || rand7 === rand8) {
      pizza = createSprite(Math.round(random(block.x - 110, block.x + 110)), block.y - 40, 10, 10);
      pizza.addImage(pizzaimg);
      pizza.scale = 0.1;
      pizza.depth = dino.depth - 0.5;
      pizza.velocityX = block.velocityX;
      pizza.lifetime = 900;
      pizzagroup.add(pizza);
    }

    if (rand5 === rand4 || rand6 === rand4 || rand7 === rand4 || rand8 === rand4 || rand5 === rand8 || rand6 === rand7 || rand6 === rand5 || rand6 === rand8) {
      coin = createSprite(Math.round(random(block.x - 110, block.x + 110)), block.y - 40, 10, 10);
      coin.addImage(coinimg);
      coin.scale = 0.1;
      coin.depth = dino.depth - 0.5;
      coin.velocityX = block.velocityX;
      coin.lifetime = 900;
      coingroup.add(coin);
    }

    if (rand7 === rand4 || rand5 === rand6) {
      yellowkey = createSprite(Math.round(random(block.x - 110, block.x + 110)), block.y - 40, 10, 10);
      yellowkey.addImage(yellowkeyimg);
      yellowkey.scale = 0.1;
      yellowkey.depth = dino.depth - 0.5;
      yellowkey.velocityX = block.velocityX;
      yellowkey.lifetime = 900;
      keygroup.add(yellowkey);
    }
  }



}

function spawnshockedpeople() {
  if (frameCount % 350 === 0) {
    rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        shockedperson1 = createSprite(1200, 315, 20, 20);
        shockedperson1.addImage(shockedperson1img);
        shockedperson1.scale = 0.5;
        shockedperson1.velocityX = citybackground.velocityX;
        shockedperson1.depth = dino.depth - 5;
        shockedperson1.lifetime = 800;
        shockedpersongroup.add(shockedperson1);
        break;
      case 2:
        shockedperson2 = createSprite(1200, 335, 20, 20);
        shockedperson2.addImage(shockedperson2img);
        shockedperson2.scale = 0.4;
        shockedperson2.velocityX = citybackground.velocityX;
        shockedperson2.depth = dino.depth - 5;
        shockedperson2.lifetime = 800;
        shockedpersongroup.add(shockedperson2);
        break;
      case 3:
        shockedperson3 = createSprite(1200, 320, 20, 20);
        shockedperson3.addImage(shockedperson3img);
        shockedperson3.scale = 0.25;
        shockedperson3.velocityX = citybackground.velocityX;
        shockedperson3.depth = dino.depth - 5;
        shockedperson3.lifetime = 800;
        shockedpersongroup.add(shockedperson3);
        break;

      default:
        break;

    }
  }
}