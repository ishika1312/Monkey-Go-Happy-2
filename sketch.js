var backGround , backImage;
var ground;

var monkey , monkeyImage;

var bananaImage , bananaGroup;
var stoneImage , stoneGroup;

var count = 0;

function preload() {
  
  //the background image
  backImage = loadImage("jungle.jpg");
  
  //preloading the monkey's image
  monkeyImage = loadAnimation("Monkey_01.png" , "Monkey_02.png" , "Monkey_03.png" , "Monkey_04.png" , "Monkey_05.png" , "Monkey_06.png" , "Monkey_07.png" , "Monkey_08.png" , "Monkey_09.png" , "Monkey_10.png");
  
  //preloading the banana's image
  bananaImage = loadImage("banana.png");
  
  //the stone's image
  stoneImage = loadImage("stone.png");
   
} 


function setup() {
  //creating th canvas
  createCanvas(700, 400);
  
  //creating the back ground
  backGround = createSprite(200, 200, 700, 700);
  backGround.addImage("back_ground" , backImage);
  backGround.velocityX = -3;
  backGround.x = backGround.width/2;
  
  //creating the monkey sprite
  monkey = createSprite(35, 377, 10, 10);
  monkey.addAnimation("monkey_running" , monkeyImage);
  monkey.scale = 0.1;
  
  //creating the invisible ground
  ground = createSprite(350, 390 , 700, 10);
  ground.velocityX = -3;
  ground.x = ground.width/2;
  ground.visible = false;

  //creating groups
  bananaGroup = new Group();
  stoneGroup = new Group();

}


function draw() {
  background(220);
  
  //reseting the ground
  if (ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  //reseting the back ground
  if (backGround.x < 300) {
    backGround.x = backGround.width/2
  }
  
   //jump when space key is pressed
  if (keyDown("space") && monkey.y >=320) {
    monkey.velocityY = -17;
  }
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.7;
  
  //colliding the monkey with ground
  monkey.collide(ground);

  //calling the user-defined functions
  spawnBanana();
  spawnStone();
  
  //implement score and destroy bananas when the monkey touches them
  if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    count = count + 2;
  }
  
  //implement score and reduce the monkey's scale when touching a stone
  if (stoneGroup.isTouching(monkey)) {
    monkey.scale = 0.08;
    //count = count - 2;
  }
  
  switch(count){
    case 10: monkey.scale = 0.12;
            break;
    case 20: monkey.scale = 0.14;
            break;
    case 30: monkey.scale = 0.16;
            break;
    case 40: monkey.scale = 0.18;
            break;
    default: break;         
  }
      

  drawSprites();
  
  textSize(18);
  fill("white");
  text("Survival Time: " + count, 500 , 30);
  
}


function spawnBanana() {
  if (frameCount % 80 === 0) {
    //creating the banana sprite
    var banana = createSprite(700,250,40,10);
    banana.addImage(bananaImage);

    //assign a random Y position between 120 to 200
    banana.y = random(120,200);    
    
    //assign a velocity and scale 
    banana.scale = 0.05;
    banana.velocityX = -4;

    //assign lifetime to the variable
    banana.lifetime = 300;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnStone() {
  if(frameCount % 300 === 0) {
    //creating the stone sprite
    var stone = createSprite(800,350,10,40);
    stone.addImage(stoneImage);

    //assign a velocity
    stone.velocityX = -5;
    
    //assign lifetime and scale   
    stone.scale = 0.2;
    stone.lifetime = 300;
    
    //add each stone to the group
    stoneGroup.add(stone);
  }
}
