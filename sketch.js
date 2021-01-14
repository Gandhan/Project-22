var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground,box1,box2,box3;
var score,gameState;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	score = 0;
	gameState = "waitxd";

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)
	


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.5	, isStatic:true});
	World.add(world, packageBody);
	
	box1 = new Box(390,650,200,20);
	box2 = new Box(300,590,20,100);
	box3 = new Box(480,590,20,100);


	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
	 World.add(world, ground);
	 



	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  if(keyCode === 13) {
	gameState = "fall";
  }
  push ();
  textSize(20);
  text("Score : " + score,10,15);

 
  if(gameState === "waitxd"){ 
	  text("Press Enter To Continue",380,350);

  }
 
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 
  drawSprites();
  keyPressed();
 
  box1.display();
  box2.display();
  box3.display();

  if(packageBody.position.y >= 635 && gameState === "wait") {
	  score ++ ;
	  gameState = "waitxd"
	  packageBody.position.y = 200; 
	
	  Matter.Body.setStatic(packageBody,true);
	 
	

  }
  keyPressed();
  console.log(gameState);

 
}

function keyPressed() {
 if (keyCode === DOWN_ARROW && gameState == "fall") {
	// Look at the hints in the document and understand how to make the package body fall only on
	Matter.Body.setStatic(packageBody,false);
	gameState = "wait";
    
  }
}



