'ust strict';

(function(){ // Box2D alias
var b2Vec2 = Box2D.Common.Math.b2Vec2,  b2AABB = Box2D.Collision.b2AABB , b2BodyDef = Box2D.Dynamics.b2BodyDef ,  b2Body = Box2D.Dynamics.b2Body ,
b2FixtureDef = Box2D.Dynamics.b2FixtureDef , b2Fixture = Box2D.Dynamics.b2Fixture ,  b2World = Box2D.Dynamics.b2World , b2MassData = Box2D.Collision.Shapes.b2MassData ,
b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape ,
b2DebugDraw = Box2D.Dynamics.b2DebugDraw , b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef ,  b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef ;



var count = 0;
var canvas = document.querySelector("canvas");
var ctx;
var canvasWidth;
var canvasHeight;
var pxPerMeter = 30; // 30 pixels = 1 meter
var shouldDrawDebug = false;
var gameloop;
var count1 = 0;
var gravity1 = 0;
var isOnGround = undefined;
var showSide6 = 0;
var hitEnemy = true;
var objectMovement = false;
var tID; //we will use this variable to clear the setInterval()
var tID1; //we will use this variable to clear the setInterval()
var tID2; //we will use this variable to clear the setInterval()
var tID3; //we will use this variable to clear the setInterval()
var missleHitenemy = false;
var stopAnimation = true;
var missleFired = false;
var moveUp = false;
var moveDown = false;
var moveRight = false;
var moveLeft = false;
var screenScroll = true;
var spaceKeyIsDown = false;
var shoot = false;
var missleCount = 0;
var countEnemy = 0;
var saveditemCount;
var fruits = [];

//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;
var SPACE = 32;

	// The variables needed for the car game.
	var carGame = {

		paddleA: {
			speed: 5,
			x: 50,
			y: 520,
			width: 20,
			height: 70,
			directionX: 1,
			directionY: 1

		},

		gameWorld:{
			x: 0,
			y: 0,
			width: 2561,
			height: 1922
		},

		camera:{
			x: 0,
		  y: 0,
		  width: canvasWidth,
		  height: canvasHeight
		},

		paddleB: {
			speed: 5,

			x: 50,
			y: 220,
			width: 20,
			height: 70,
			directionX: 1,
			directionY: 1

		},

		paddleC: {
			speed: 5,

			x: 30,
			y: 100,
			width: 20,
			height: 70,
			directionX: 1,
			directionY: 1

		},

		enemy: {
			speed: 5,
			x: 30,
			y: 30,
			width: 40,
			height: 40,
			directionX: 1,
			directionY: 1

		},

		missle: {
			speed: 5,
			x: 130,
			y: 50,
			width: 40,
			height: 40,
			directionX: 1,
			directionY: 1

		},

		missle2: {
			speed: 5,
			x: 130,
			y: 50,
			width: 40,
			height: 40,
			directionX: 1,
			directionY: 1

		},

    missle22: {
      speed: 5,
      x: 130,
      y: 50,
      width: 40,
      height: 40,
      directionX: 1,
      directionY: 1

    },


		circle1: {
			speed: 5,
			x: 130,
			y: 50,
			width: 40,
			height: 40,
			directionX: 1,
			directionY: 1
			//Getters

		},

		monster: {
			sourceX:  100,
			sourceY: 0,
			speed: 5,
 			width: 40,
			height: 40,
			directionX: 1,
			directionY: 1,
 			//Getters

		},

		ship: {
			sourceX:  100,
			sourceY: 0,
			speed: 5,
 			width: 40,
			height: 40,
			directionX: 1,
			directionY: 1,
 			//Getters

		},

		enemyShip2: {
			sourceX:  100,
			sourceY: 0,
			speed: 5,
 			width: 40,
			height: 40,
			directionX: 1,
			directionY: 1,
 			//Getters

		},

				game: {
			offsetTop: $("#game").offset().top,
			height: parseInt($("#game").height()),
			width: parseInt($("#game").width()),
		 },

		 // game state constant
		 STATE_STARTING_SCREEN : 1,
		 STATE_PLAYING : 2,
		 STATE_GAMEOVER_SCREEN : 3,

		 state : 0,
		 fuel: 0,
		 fuelMax: 0,
		 currentLevel: 0

	}


	var sprites = [];

/*	//Create the cat sprite and center it
	var cat = Object.create(spriteObject);
	cat.x = (gameWorld.x + gameWorld.width / 2) - cat.width / 2;
	cat.y = (gameWorld.y + gameWorld.height / 2) - cat.height / 2;
	sprites.push(cat);

	//Load the image
	var image = new Image();
//	image.addEventListener("load", loadHandler, false);
	image.src = "../images/MSheet3.png";

*/

/*
I THINK CREATING LEVELS CAN BE DONE WITH STORING GAME OBJECTS IN THIS
TYPE OF ARRAY STYLE AND LOADING THEM PER LEVEL
*/

	carGame.levels = new Array();
carGame.levels[0] = [{"type":"car","x":50,"y":210,"fuel":20},
{"type":"box","x":250, "y":270, "width":250, "height":25, "rotation":0},
{"type":"box","x":500,"y":250,"width":65,"height":15,"rotation":-10},
{"type":"box","x":600,"y":225,"width":80,"height":15,"rotation":-20},
{"type":"box","x":950,"y":225,"width":80,"height":15,"rotation":20},
{"type":"box","x":1100,"y":250,"width":100,"height":15,"rotation":0},
{"type":"win","x":1200,"y":215,"width":15,"height":25,"rotation":0}];

carGame.levels[1] = [{"type":"car","x":50,"y":310,"fuel":20},
{"type":"box","x":250, "y":370, "width":250, "height":25, "rotation":0},
{"type":"box","x":500,"y":350,"width":65,"height":15,"rotation":-10},
{"type":"box","x":600,"y":325,"width":80,"height":15,"rotation":-20},
{"type":"box","x":666,"y":285,"width":80,"height":15,"rotation":-32},
{"type":"box","x":950,"y":225,"width":80,"height":15,"rotation":15},
{"type":"box","x":1100,"y":250,"width":100,"height":15,"rotation":0},
{"type":"win","x":1200,"y":215,"width":15,"height":25,"rotation":0}];


 	//Center the camera over the gameWorld
//	camera.x = (gameWorld.x + gameWorld.width / 2) - camera.width / 2;
//	camera.y = (gameWorld.y + gameWorld.height / 2) - camera.height / 2;



	//Create the cat sprite and center it
 	// carGame.mega.x = (gameWorld.x + gameWorld.width / 2) - carGame.mega.width / 2;
	// carGame.mega.y = (gameWorld.y + gameWorld.height / 2) - carGame.mega.height / 2;


	function initGame() {

	//	buildMap(map);
		//buildMap(gameObjects);

 		// place in init code
		//Sounds, REFER TO FUNCITON BELOW:
		myMusic = new sound("../media/dk2.mp3");
	 	myMusic.play();

	//	carGame.world = createWorld();

		console.log("The world is created. ",carGame.world);

	 	handleGameState();

if (objectMovement === true) {
	//drops player and enemy down.
	carGame.cat.directionX = 0;
	carGame.enemy.directionX = 0;
}


//Add keyboard listeners
window.addEventListener("keydown", function(event)
{
switch(event.keyCode)
{
	case UP:
	console.log('UP!');
		moveUp = true;
		break;

		case DOWN:
		console.log('DOWN!');
			moveDown = true;
			break;

	case LEFT:
	console.log('LEFT!');
		moveLeft = true;
		break;
	case RIGHT:
	console.log('RIGHT!');
		moveRight = true;
		break;
	/* case SPACE:
		if(!spaceKeyIsDown)
		{
			shoot = true;
		  spaceKeyIsDown = true;
		}
		*/
}
}, false);

window.addEventListener("keyup", function(event)
{
switch(event.keyCode)
{
	case UP:
	console.log('UP!');
		moveUp = false;
		break;

		case DOWN:
		console.log('DOWN!');
		moveDown = false;
			break;

	case LEFT:
 		moveLeft = false;
		console.log('LEFT!');
		break;
	case RIGHT:
		moveRight = false;
		console.log('RIGHT!');
		break;
//	case SPACE:
	//	spaceKeyIsDown = false;
}
}, false);


//   movePlayerShip();

		moveEnemyRight();

	  //	setTimeout( checkxvalue , 9000);

		//	createBox(600, 250);

		//	setTimeout( enemyAI , 2000);

		//	LineShape1(600, 150, 50, 50, 0);

			//NOTE THE SETTIMEOUT FUNCTION WILL ONLY WORK IF FUNCTION IS DEFINED OUTSIDE OF INIT!!!
		// 	paddleA.timer = setInterval(gameloop, 1000/30);
		//	setTimeout(shipApp, 1000);


 		getText();

		optionsMenu();

 	//	showDebugDraw();


	// get the reference of the context
	canvas = document.getElementById('game');
	ctx = canvas.getContext('2d');
	canvasWidth = parseInt(canvas.width);
	canvasHeight = parseInt(canvas.height);


	//	megaController();


		window.requestAnimationFrame(render);


		$("startScreen").fadeOut();

  	};

	function render(event)
	{


	//	var canvas = document.querySelector("canvas");
		//var drawingSurface = canvas.getContext("2d");

		 moveShip();

		 movePlayerShip();
	//	 movePlayerShip();

     //window.scrollTo(carGame.mega.x - 1000, carGame.mega.y);
			//console.log('GAMEWIDTH'+ game.width);
			//console.log('GAMEWIDTH22'+ carGame.ship.x);
			//console.log('GAMEWIDTH: '+ (carGame.ship.x));

		 //THIS IS THE CAMERA FOLLOWING SHIP THAT WORKS!
		 //USE THIS CAN ADJUST FOR EVERY DIFFERENT Games
		 //ALSO NOTE THAT LENGTH OF LEVEL AFFECTS CAMEAR FOLLOWING IN CENTER

		 /*************     NOTE: THIS WORKS, BUT HAVE TO MAKE BOX AROUND SHIP, THEN
		 BOX WILL HIT EDGE AND CAMERA WILL FOLLOW SHIP!!!!            *************/

		 if (screenScroll === true) {
			 //console.log('TURNED OFF');
			 window.scrollTo(carGame.ship.x - 500, 0);
			//window.scrollTo(carGame.ship.x - 300, carGame.ship.y);

		 }
/*
 		 if ( carGame.ship.x ==  1000) {
		 				console.log('GAMEWIDTHEXTENDED');

						var gameWidth = document.getElementById("game");
						gameWidth.style.width = "4000px";

					//	gameWidth.style.width = width+ 'px';
					//gameWidth.style.height = height+ 'px';

		 				//screenScroll = false;
		 				//window.scrollTo(carGame.ship.x , carGame.ship.y);

		 			}
*/
			/* 	if ( carGame.ship.x ==  1700) {
							console.log('blue');
							screenScroll = false;
							//window.scrollTo(carGame.ship.x , carGame.ship.y);

						}

						if (screenScroll === false) {
								console.log('hit point!!!!!');
								window.scrollTo(carGame.ship.x + 300, carGame.ship.y);

							}
			*/

			 //THIS WORKS SOMEHOW!!!!!
		  //window.scrollBy(100 , 100 );

			//		 window.scrollBy(carGame.mega.x, carGame.mega.y);
			//console.log(sprites);
		 // get the reference of the context

			//var sprites = [carGame['mega']];
			// console.log(sprites[0]);

		 canvas = document.getElementById('game');
		 ctx = canvas.getContext('2d');
		 canvasWidth = parseInt(canvas.width);
		 canvasHeight = parseInt(canvas.height);

		 //console.log(canvas.width);

	  ctx.clearRect(0, 0, canvas.width, canvas.height);

	  ctx.save();

		  //Move the drawing surface so that it's positioned relative to the camera
			 // ctx.translate(-camera.x, -camera.y);

			//		function player(item, speed, x, y, width, height, dirx, diry, gravity,
			//			accelerationX, accelerationY, friction, backgroundx, backgroundy, image){

			//console.log(sprites[0]);
	 	  //Loop through all the sprites and use their properties to display them
			  if(sprites.length !== 0)
				  {
				    for(var i = 0; i < sprites.length; i++)
				    {
				      var sprite = sprites[i];
				      ctx.drawImage
				      (
				        image,
				        sprite.sourceX, sprite.sourceY,
				        sprite.sourceWidth, sprite.sourceHeight,
				        Math.floor(sprite.x), Math.floor(sprite.y),
				        sprite.width, sprite.height
				      );
				    }
				  }

	  ctx.restore();
	}


	/********************(****** MOVEMENT FCNS ****)*****************************/


  function moveCharacter(){
 	$(document).keydown(function(e){
		switch(e.keyCode) {
			case 38: // UP

			 //	carGame.paddleC.directionY = -1;
			 //	carGame.paddleC.y += carGame.paddleC.speed * carGame.paddleC.directionY;

			// carGame.circle2.directionY = -1;
			// carGame.circle2.y += carGame.circle2.speed * carGame.circle2.directionY;

		//	carGame.cat.directionY = -1;
		// carGame.cat.y += carGame.cat.speed * carGame.cat.directionY;

 				return false;
				break;

			case 40: //  DOWN
			//carGame.paddleC.directionY = 1;
		 //	carGame.paddleC.y += carGame.paddleC.speed * carGame.paddleC.directionY;

		//	 carGame.circle2.directionY = 1;
		//	 carGame.circle2.y += carGame.circle2.speed * carGame.circle2.directionY;

	//	carGame.cat.directionY = 1;
	 //carGame.cat.y += carGame.cat.speed * carGame.cat.directionY;

		carGame.cat.directionX = 0;

 				return false;
				break;

			case 39: // RIGHT
			 //	carGame.paddleC.directionX = 1;
			//	carGame.paddleC.x += carGame.paddleC.speed * carGame.paddleC.directionX;

		//		carGame.circle2.directionX = 1;
		//		carGame.circle2.x += carGame.circle2.speed * carGame.circle2.directionX;

				carGame.cat.directionX = 1;
				carGame.cat.x += carGame.cat.speed * carGame.cat.directionX;

			//	var cat = carGame.cat;
			//		cat.x += cat.speed * cat.directionX;

 				return false;
				break;
			case 37: // LEFT
			//	carGame.paddleC.directionX = -1;
			//	carGame.paddleC.x += carGame.paddleC.speed * carGame.paddleC.directionX;

		//		carGame.circle2.directionX = -1;
		//		carGame.circle2.x += carGame.circle2.speed * carGame.circle2.directionX;

				carGame.cat.directionX = -1;
				carGame.cat.x += carGame.cat.speed * carGame.cat.directionX;

 				return false;
				break;

			case 32: // SPACEBAR

//			if(showSide === "bottom" && carGame.cat.speed * carGame.cat.directionX >= 0)
   //TO HALF JUMP: COUNT NUMBER OF TIMES THAT SPACEBAR IS HELD DOWN:
	 //IF LESS THAN CERTAIN AMOUNT CHANGE THE SETTIMEOUT TO NORMAL

	 	//I CAN CHANGE THE MOVEMENT STUFF USING SHOWSIDE == BOTTOM!!!!!
			if(showSide === "bottom" || showSide1 === "bottom"  || showSide2 === "bottom" || showSide3 === "bottom")
				{
					console.log(showSide);
						//CHANGES THE TILESHEET:
			//		var square = document.getElementById('cat');
				//	square.style.backgroundPosition = '0% 50%';

 					//	 isOnGround = true;
 					//	gravity1 = carGame.cat.speed * carGame.cat.directionX ;
					//	gravity1 = -(gravity1);
			/*		var cat = carGame.cat;
					cat.accelerationY = 10;
					cat.y += cat.gravity * cat.accelerationY;
*/
					showSide = blockRectangle(carGame.cat, carGame.box1);
					console.log(showSide);
					console.log(carGame.cat);
 					//THIS WILL ALLOW OBJECT TO JUMP CORRECTLY
					carGame.cat.gravity = -0.7;
 					//	fireMissile();
					//carGame.cat.directionX = -1;
				//	carGame.cat.x += 50 * carGame.cat.directionX;
					//	carGame.cat.accelerationX
					carGame.cat.directionY = -1;

					//THIS WILL ALLOW OBJECT TO JUMP EASILY
				// carGame.cat.y += 200 * carGame.cat.directionY;
				 carGame.cat.y -= carGame.cat.gravity * carGame.cat.accelerationY * carGame.cat.directionY;
				 console.log(carGame.cat.y);
		 setTimeout(setGravityback  , 500);
		 //	setTimeout( checkxvalue , 9000);

			//
				}
				//var square = document.getElementById('cat');
				//square.style.backgroundPosition = '0% 0%';



 			return false;
				break;

		}
	});
  }

  function movePlayerShip(){
  $(document).keydown(function(e){
    switch(e.keyCode) {

/*
      case 38: // UP

      var ship = carGame.ship;
       	ship.directionY = -1;
          ship.accelerationY = 5;
        	ship.y += ship.speed * ship.accelerationY * ship.directionY;


					//	enemyShip.directionY = -1;		//moves ship up
					//	enemyShip.y += enemyShip.speed * enemyShip.accelerationY* enemyShip.directionY;

					var square = document.getElementById('mega');
				//	 	square.style.backgroundImage =  "url('../images/MJump.png')";

				//	square.style.backgroundImage =  "url('../images/MJump.png')";
				//	square.style.backgroundPosition =  '0% 0%';


        return false;
        break;

      case 40: //  DOWN
      var ship = carGame.ship;

      ship.directionY = 1;
      ship.accelerationY = 5;
      	ship.y += ship.speed *ship.accelerationY * ship.directionY;
        //	ship.y += ship.speed * ship.accelerationY;

        return false;
        break;

      case 39: // RIGHT
      var ship = carGame.ship;

     ship.directionX = 1;
     ship.accelerationY = 10;
    	ship.x += ship.speed  * ship.accelerationY * ship.directionX;



        return false;
        break;

      case 37: // LEFT
      var ship = carGame.ship;

     	ship.directionX = -1;
     	ship.x += ship.speed * ship.directionX;

        return false;
        break;
*/


      case 32: // SPACEBAR
        //FOR MISSLE HITTING ENEMY:
          missleHitenemy = true;
      //SETS THE MISSLE AT THE CORRECT POSITION!
      carGame.missle22.x = carGame.ship.x;
  		carGame.missle22.y = carGame.ship.y + 70;
			missleFired = true;
	    missle('missle22', 1, 0, 0, 50, 50, 1, 1, 0.3, 0.96, 0, 0, "url('../images/Missle.png')");
	    //	function player(item, speed, x, y, width, height, dirx, diry, gravity,
	    //	accelerationX, accelerationY, friction, backgroundx, backgroundy, image){
	    //  fireMissile();

      return false;
      break;

    }
  });
  }


	function enemeyController(){
 	$(document).keydown(function(e){
		switch(e.keyCode) {
			case 38: // UP

 				return false;
				break;

			case 40: //  DOWN

		carGame.enemy.directionX = 0;

 				return false;
				break;

			case 39: // RIGHT

				carGame.enemy.directionX = 1;
				carGame.enemy.x += carGame.enemy.speed * carGame.enemy.directionX;

  				return false;
				break;

			case 37: // LEFT

				carGame.enemy.directionX = -1;
				carGame.enemy.x += carGame.enemy.speed * carGame.enemy.directionX;

 				return false;
				break;

		}
	});
  }


 	//function scrollWin(x, y) { window.scrollBy(x, y); }



	function megaController(){
	 	$(document).keydown(function(e){
			switch(e.keyCode) {
				case 38: // UP

 			// 	window.scrollBy(0, -10);		//Move Camera up

	 				return false;
					break;

				case 40: //  DOWN

		  	window.scrollBy(0, 10);			//Move Camera down

					stopAnimate();
				var elem = document.getElementById('mega').style.backgroundPosition =  '0% 0%';
			//	console.log(elem);
				carGame.mega.directionX = 0;

			  stopAnimation = true;

				stopAnimate();

				clearInterval(tID);
				clearInterval(tID1);
				clearInterval(tID2);
				clearInterval(tID3);


 	 				return false;
					break;

				case 39: // RIGHT

		  //	window.scrollBy(10, 0);		//Move Camera Right



 				carGame.mega.directionX = 1;
				carGame.mega.x += carGame.mega.speed * carGame.mega.directionX;

				var elem22 = document.getElementById('mega')
				elem22.style.transform = 'scaleX(1)'; // horizontal


	if (stopAnimation === true) {  animateScript(); stopAnimation = false;  	}



				//	carGame.enemy.directionX = 1;
				//	carGame.enemy.x += carGame.enemy.speed * carGame.enemy.directionX;

	  				return false;
					break;

				case 37: // LEFT

		 //	window.scrollBy(-50, 0);    	//Move Camera Left


				carGame.mega.directionX = -1;
				carGame.mega.x += carGame.mega.speed * carGame.mega.directionX;

				var elem22 = document.getElementById('mega')
				elem22.style.transform = 'scaleX(-1)'; // horizontal

				if (stopAnimation === true) {  animateScript(); stopAnimation = false;  	}


	 				return false;
					break;

					case 32: // SPACEBAR


		//			if(showSide === "bottom" && carGame.cat.speed * carGame.cat.directionX >= 0)
		   //TO HALF JUMP: COUNT NUMBER OF TIMES THAT SPACEBAR IS HELD DOWN:
			 //IF LESS THAN CERTAIN AMOUNT CHANGE THE SETTIMEOUT TO NORMAL

			 	//I CAN CHANGE THE MOVEMENT STUFF USING SHOWSIDE == BOTTOM!!!!!
					if(showSide6 === "bottom" || showSide7 === "bottom"  || showSide8 === "bottom" || showSide9 === "bottom")
						{
							console.log(showSide);

							clearInterval(tID);
							clearInterval(tID1);
							clearInterval(tID2);
							clearInterval(tID3);

 								//CHANGES THE TILESHEET:
					//		var square = document.getElementById('cat');
						//	square.style.backgroundPosition = '0% 50%';

						var square = document.getElementById('mega');
				//	 	square.style.backgroundImage =  "url('../images/MJump.png')";

			//	square.style.backgroundImage =  "url('../images/MJump.png')";
			//	square.style.backgroundPosition =  '0% 0%';


				square.style.width =  '100px';
			  square.style.height =   '150px';

					animateJump();

				 // animateJump();

					//	square.style.backgroundImage =  "url('../images/MJump.png')";
						//	square.style.backgroundPosition = '0% 0%';
						// square.style.backgroundPosition =    '50% 0%';

				  	//	 player('mega', 5, 250, 150, 164, 144, 1, 1, 0.3, 0, 0, 0.96, 0, 0, "url('../images/MSheet3.png')");



		 					//	 isOnGround = true;
		 					//	gravity1 = carGame.cat.speed * carGame.cat.directionX ;
							//	gravity1 = -(gravity1);
					/*		var cat = carGame.cat;
							cat.accelerationY = 10;
							cat.y += cat.gravity * cat.accelerationY;
		*/
							showSide9 = blockRectangle(carGame.mega, carGame.box1);
							console.log(showSide9);
							console.log(carGame.mega);
		 					//THIS WILL ALLOW OBJECT TO JUMP CORRECTLY
							carGame.mega.gravity = -0.7;
 							carGame.mega.directionY = -1;

							//THIS WILL ALLOW OBJECT TO JUMP EASILY
						// carGame.cat.y += 200 * carGame.cat.directionY;
						 carGame.mega.y -= carGame.mega.gravity * carGame.mega.accelerationY * carGame.mega.directionY;
						 console.log(carGame.mega.y);
			   	 setTimeout(setGravityback2  , 500);


		   	//	 square.style.backgroundImage =  "url('../images/MSheet3.png')";

				 //	setTimeout( checkxvalue , 9000);


						}
						//var square = document.getElementById('cat');
						//square.style.backgroundPosition = '0% 0%';


		 			return false;
						break;

			}
		});
	  }


		/*
		if (showSide ==! 'bottom'){
			console.log('did not hit bottom!');
			var tan = document.getElementById('mega');
		 tan.style.backgroundImage =  "url('../images/MSheet3.png')";
		 tan.style.backgroundPosition =  '0% 0%';

		 tan.style.width =  '164px';
		 tan.style.height =   '144px';

		}
*/


		function animateJump() {
			var    position = 0;
		 var  interval = 130;
		 const  diff = 100;     //diff as a variable for position offset
//document.getElementById("image").style.backgroundPosition = `-${position}px 0px`;

		 tID1 = setInterval ( () => {
			var tan = document.getElementById('mega');
			tan.style.backgroundImage =  "url('../images/MJump.png')";
			tan.style.backgroundPosition = `-${position}px 0px`;


 				if (position < 700   + diff)
			 { position = position + 100;}
				 else
			 {


			//	 position = 0;
				 //THIS IS THE CLEAR END OF THE ANIMATION, SO IT MUST STOP
				 clearInterval(tID1);
				 //Resets the position of player:
				 var tan = document.getElementById('mega');
	 			tan.style.backgroundImage =  "url('../images/MSheet3.png')";
				tan.style.backgroundPosition =  '0% 0%';

				tan.style.width =  '164px';
			  tan.style.height =   '144px';

 //164, 144,
			 }
				}
			 , interval );

 		 }


		//SPRITES MOVE SET
	function characterMovements() {
							//setInterval();
		for (var i = 10; i < 100; i=i+10) {
		//	array[i]
	//	console.log(i);
	//	square.style.backgroundPosition = '70% 0%';
	//square.style.backgroundPosition = '70% 0%';
//	var square = document.getElementById('mega');
	//square.style.backgroundPosition =  i + '%' + ' ' + '0%';


		setTimeout(function () { alert('hello');  }, 3000 );


		}
	}


	var i = 0, howManyTimes = 110;


function stopAnimate() {  clearInterval(tID);   } //end of stopAnimate()


 function animateScript() {
	 var    position1 = 0;
	 var  interval1 = 100;
	 const  diff1 = 100;     //diff as a variable for position offset

	 tID2 = setInterval ( () => {
		 document.getElementById('mega').style.backgroundPosition =  position1 + '%' + ' ' + '0%';

 			if (position1 < 100   + diff1)
		 { position1 = position1 + 10;}
			 else
		 { position1 = 0; }
			}
		 , interval1 );

}



 function animateScript2() {
 	var    position2 = 100;
 	var  interval2 = 0;
	const  diff2 = 100;     //diff as a variable for position offset

 	tID3 = setInterval ( () => {
 	var elem = document.getElementById('mega');
	elem.style.transform = 'scaleX (-1)'; // horizontal

	elem.style.backgroundPosition =  position2 + '%' + ' ' + '0%';
console.log(position2);
		//var elem = document.getElementById ( 'flipper' );
	 // elem.style.transform = 'scaleX (-1)'; // horizontal

 	 if (position2 > 0 + diff2)
 	{ position2 = position2 - 10;}
 	  else
 	{ position2 = 0; }
 	 }
 	, interval2 );

  }


	function moveEnemyRight() {
		carGame.enemy.directionX = 1;
		carGame.enemy.x += carGame.enemy.speed * carGame.enemy.directionX;
	 //setTimeout( moveEnemyLeft , 9000);
	 	console.log(carGame.enemy.x);
	 }


	function moveEnemyLeft() {
		carGame.enemy.directionX = 1;
		carGame.enemy.x += carGame.enemy.speed * carGame.enemy.directionX;
	 //setTimeout( checkxvalue , 9000);

	}

	function sound(src) {
	    this.sound = document.createElement("audio");
	    this.sound.src = src;
	    this.sound.setAttribute("preload", "auto");
	    this.sound.setAttribute("controls", "none");
	    this.sound.style.display = "none";
	    document.body.appendChild(this.sound);
	    this.play = function(){
	        this.sound.play();
	    }
	    this.stop = function(){
	        this.sound.pause();
	    }
	}

	let sound3 = new Audio();
//	sound3.addEventListener("canplaythrough", playSoundHandler, false);
	//sound3.src = "sounds/music.wav";

	function playSoundHandler(event) {
		sound3.play();
		sound3.volume = 0.5;
		//`loop` might or might not work depending on your browser.
		//If it does, you might hear a short pause before it restarts
		sound3.loop = true;
	}

/*
	this.update_camera_position = function() {

     this.camera.x = this.player.x - this.canvas.width / 2 ;
     this.camera.y = this.player.y - this.canvas.height / 2;
 }
 */


/*
// place in init code
//Sounds, REFER TO FUNCITON BELOW:
myMusic = new sound("media/dk2.mp3");
myMusic.play();

*/



	/********************(****** MOVEMENT FCNS ****)*****************************/


	function setGravityback() {
		carGame.cat.gravity = 0.7
	}

	function setGravityback2() {
		carGame.mega.gravity = 0.7;

		var square = document.getElementById('mega');
		square.style.backgroundImage =  "url('../images/MSheet3.png')";

	}


	function fireMissile()
 {

   var ship = carGame.ship;

  	//cargame missle hide
 	console.log(ship.x);
 	console.log(ship.y);

 	var x = document.createElement("IMG");

 	// var img = document.getElementById('tetris_image')
 	x.classList.add('missle');
  //x.setAttribute("id", "missle");

 	x.setAttribute("src", "../images/Missle.png");
  //x.setAttribute("id", "missle");

 	x.setAttribute("width", "50");
 	x.setAttribute("height", "50");
  //	 x.classList.add('yourCssClass')

 	x.style.left =  carGame.ship.x + 'px';
 	x.style.top =  carGame.ship.y +'px';


  // x.style.x = '100px';
 	 x.style.position = "absolute";


 	x.setAttribute("alt", "The Pulpit Rock");
 	document.body.appendChild(x);

 	//carGame.missle.directionX = 1;
 	//carGame.missle.x += carGame.missle.speed * carGame.missle.directionX;
 	//carGame.missle.timer = setInterval(gameloop, 1000/30);
 	moveMissle();

  };

  function moveMissle(){

  //REFER TO RESETBALL TO CHANGE X AND Y POSITION OF ROCKET.
 //	carGame.missle.x = carGame.paddleC.x + 'px';
 	carGame.missle.directionX = 1;
 	carGame.missle.x += carGame.missle.speed * carGame.missle.directionX;

 	//carGame.missle2.directionX = 1;
 //	carGame.missle2.x += carGame.missle2.speed * carGame.missle2.directionX;

 };


  function hitTestPoint(pointX, pointY)
	   {

	//console.log(carGame.football.left());

	     var hit = false;
	     if(pointX > carGame.football.left()
	     && pointX < carGame.football.right()
	     && pointY > carGame.football.top()
	     && pointY < carGame.football.bottom())

			 { 	hit = true;	}

	return hit;
}

//var blue =localStorage.getItem("savedItem");
 //var blue2 = carGame[blue];

 /******************(******** COLLISION FUNCTIONS ***)*************************/

  function hitTestCircle( c1 = carGame.circle2, c2 = carGame.circle3)
   {

     //Calculate the vector between the circles' center points
     var vx = c1.centerX() - c2.centerX();
     var vy = c1.centerY() - c2.centerY();
		//Find the distance between the circles by calculating //the vector's magnitude (how long the vector is)
		var magnitude = Math.sqrt(vx * vx + vy * vy);
     //Add together the circles' total radii
     var totalRadii = c1.halfWidth() + c2.halfWidth();
		//Set hit to true if the distance between the circles is //less than their totalRadii
		var hit = magnitude < totalRadii;
		return hit;
	}

	//BLOCKS THE CIRCLE FROM GOING INTO THE OTHER CIRCLE
	function blockCircle(c1 = carGame.circle2, c2 = carGame.circle3)
	{
		//Calculate the vector between the circles' center points
		var vx = c1.centerX() - c2.centerX();
		var vy = c1.centerY() - c2.centerY();
		//Find the distance between the circles by calculating //the vector's magnitude (how long the vector is)
		var magnitude = Math.sqrt(vx * vx + vy * vy);
		//Add together the circles' total radii
		var totalRadii = c1.halfWidth() + c2.halfWidth();
		//Figure out if there's a collision
		if(magnitude < totalRadii)
		{
		//Yes, a collision is happening.
		//Find the amount of overlap between the circles
		var overlap = totalRadii - magnitude;
		//Normalize the vector.
		//These numbers tell us the direction of the collision
		dx = vx / magnitude;
		dy = vy / magnitude;
		//Move circle 1 out of the collision by multiplying
		//the overlap with the normalized vector and add it to circle 1's position
		c1.x += overlap * dx;
		c1.y += overlap * dy;
		}
	}

	  function hitTestRectangle(r1 = carGame.cat, r2 = carGame.box1)
	{
	  //A variable to determine whether there's a collision
	  var hit = false;

	  //Calculate the distance vector
 	  var vx = r1.centerX() - r2.centerX();
	  var vy = r1.centerY() - r2.centerY();
	  //Figure out the combined half-widths and half-heights
	  var combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
	  var combinedHalfHeights = r1.halfHeight() + r2.halfHeight();
	  //Check for a collision on the X axis
	  if(Math.abs(vx) < combinedHalfWidths)
	  {
	    //A collision might be occurring. Check for a collision on the Y axis
	    if(Math.abs(vy) < combinedHalfHeights)
	    {
	      //There's definitely a collision happening
				hit = true;
			} else {
				      //There's no collision on the Y axis
				hit = false;
			}
		} else {
	    //There's no collision on the X axis
			hit = false; }
			return hit;
	}

	function blockRectangle(r1 = carGame.ship, r2 = carGame.box1)
	{
	  //A variable to tell us which side the collision is occurring on
	  var collisionSide = "";

	  //Calculate the distance vector
	  var vx = r1.centerX() - r2.centerX();
	  var vy = r1.centerY() - r2.centerY();

	  //Figure out the combined half-widths and half-heights
	  var combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
	  var combinedHalfHeights = r1.halfHeight() + r2.halfHeight();

	  //Check whether vx is less than the combined half-widths
	  if(Math.abs(vx) < combinedHalfWidths)
	  {
	    //A collision might be occurring!
	    //Check whether vy is less than the combined half-heights
	    if(Math.abs(vy) < combinedHalfHeights)
	    {
	      //A collision has occurred! This is good!
	      //Find out the size of the overlap on both the X and Y axes
	      var overlapX = combinedHalfWidths - Math.abs(vx);
	      var overlapY = combinedHalfHeights - Math.abs(vy);

	      //The collision has occurred on the axis with the
	      //*smallest* amount of overlap. Let's figure out which
	      //axis that is

	      if(overlapX >= overlapY)
	      {
	        //The collision is happening on the X axis
	        //But on which side? vy can tell us
	        if(vy > 0)
	        {
	          collisionSide = "top";

	          //Move the rectangle out of the collision
	          r1.y = r1.y + overlapY;
	        }
	        else
	        {
	          collisionSide = "bottom";

	          //Move the rectangle out of the collision
	          r1.y = r1.y - overlapY;
	        }
	      }
	      else
	      {
	        //The collision is happening on the Y axis
	        //But on which side? vx can tell us
	        if(vx > 0)
	        {
	          collisionSide = "left";

	          //Move the rectangle out of the collision
	          r1.x = r1.x + overlapX;
	        }
	        else
	        {
	          collisionSide = "right";

	          //Move the rectangle out of the collision
	          r1.x = r1.x - overlapX;
	        }
	      }
	    }
	    else
	    {
	      //No collision
	      collisionSide = "none";
	    }
	  }
	  else
	  {
	    //No collision
	    collisionSide = "none";
	  }

	  return collisionSide;
	}


	function hitTestRectangle2 (r1 = carGame.enemy, r2 = carGame.box1)
{
	//A variable to determine whether there's a collision
	var hit = false;
	//Calculate the distance vector
	var vx = r1.centerX() - r2.centerX();
	var vy = r1.centerY() - r2.centerY();
	//Figure out the combined half-widths and half-heights
	var combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
	var combinedHalfHeights = r1.halfHeight() + r2.halfHeight();
	//Check for a collision on the X axis
	if(Math.abs(vx) < combinedHalfWidths)
	{
		//A collision might be occurring. Check for a collision on the Y axis
		if(Math.abs(vy) < combinedHalfHeights)
		{
			//There's definitely a collision happening
			hit = true;
		} else {
						//There's no collision on the Y axis
			hit = false;
		}
	} else {
		//There's no collision on the X axis
		hit = false; }
		return hit;
}

	function blockRectangle2(r1 = carGame.enemy, r2 = carGame.box1)
{
	//A variable to tell us which side the collision is occurring on
	var collisionSide = "";

	//Calculate the distance vector
	var vx = r1.centerX() - r2.centerX();
	var vy = r1.centerY() - r2.centerY();

	//Figure out the combined half-widths and half-heights
	var combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
	var combinedHalfHeights = r1.halfHeight() + r2.halfHeight();

	//Check whether vx is less than the combined half-widths
	if(Math.abs(vx) < combinedHalfWidths)
	{
		//A collision might be occurring!
		//Check whether vy is less than the combined half-heights
		if(Math.abs(vy) < combinedHalfHeights)
		{
			//A collision has occurred! This is good!
			//Find out the size of the overlap on both the X and Y axes
			var overlapX = combinedHalfWidths - Math.abs(vx);
			var overlapY = combinedHalfHeights - Math.abs(vy);

			//The collision has occurred on the axis with the
			//*smallest* amount of overlap. Let's figure out which
			//axis that is

			if(overlapX >= overlapY)
			{
				//The collision is happening on the X axis
				//But on which side? vy can tell us
				if(vy > 0)
				{
					collisionSide = "top";

					//Move the rectangle out of the collision
					r1.y = r1.y + overlapY;
				}
				else
				{
					collisionSide = "bottom";

					//Move the rectangle out of the collision
					r1.y = r1.y - overlapY;
				}
			}
			else
			{
				//The collision is happening on the Y axis
				//But on which side? vx can tell us
				if(vx > 0)
				{
					collisionSide = "left";

					//Move the rectangle out of the collision
					r1.x = r1.x + overlapX;
				}
				else
				{
					collisionSide = "right";

					//Move the rectangle out of the collision
					r1.x = r1.x - overlapX;
				}
			}
		}
		else
		{
			//No collision
			collisionSide = "none";
		}
	}
	else
	{
		//No collision
		collisionSide = "none";
	}

	return collisionSide;
}


	function handleGameState(){
		// set the game state as "starting screen"
		carGame.state = carGame.STATE_STARTING_SCREEN;

		// start the game when clicking anywhere in starting screen
 	$('#game').click(function(){
			if (carGame.state === carGame.STATE_STARTING_SCREEN) {
				// change the state to playing.
				carGame.state = carGame.STATE_PLAYING;

				// start new game
				restartGame(carGame.currentLevel);

				document.getElementById("startScreen").innerHTML = "Start";

				$("#startScreen").fadeOut();

			}
		});

		$('#itemList').click(function(){
			console.log('this has worked!');
			if (carGame.state === carGame.STATE_STARTING_SCREEN || carGame.STATE_PLAYING) {
				// change the state to playing.
				carGame.state = carGame.STATE_PLAYING;

				var x = document.getElementById("optionsMenu");
				x.style.display = "none";

				// start new game
				restartGame(carGame.currentLevel);
			}

 		});

		//CREATES OPTIONS MENU, AND GOES TO OPTIONS SCREEN:
		$('#options').click(function(){

			if (carGame.state === carGame.STATE_STARTING_SCREEN) {
				// change the state to playing.
				carGame.state = carGame.STATE_PLAYING;

				console.log('this has worked!');
				var x = document.getElementById("options");
				x.style.display = "none";

				$("#level").html("Level " + (level+10));

				carGame.currentLevel = level;

				// change the background image to fit the level
				$('#game').removeClass().addClass('gamebg-level'+level);

				optionsMenuList(); //SHOWS LIST OF OPTIONS MENU
			}

		});

	}

	function getText() {
		//	$("p").text("Hello world!");
			document.getElementById("textStuff").innerHTML = "Lives!";
			document.getElementById("textStuff2").innerHTML = "Lives!";
			document.getElementById("textStuff3").innerHTML = "Level";
			document.getElementById("textStuff4").innerHTML = "Score";


		}



function optionsMenu() {
	//	$("p").text("Hello world!");
		document.getElementById("options").innerHTML = "Options";

	}

 	function optionsMenuList() {
				//	$("p").text("Hello world!");
					document.getElementById("stageSelection").innerHTML = "Stage Selection  ";
					document.getElementById("stageSelectionNumber").innerHTML = "01";
					document.getElementById("brightness").innerHTML = "Brightness";
					document.getElementById("brightnessNumber").innerHTML = "90";
					document.getElementById("soundLevel").innerHTML = "Sound";
					document.getElementById("soundLevelNumber").innerHTML = "90";

				}




	//CREATES IMAGE AND ALLOWS YOU TO MOVE TO ANY LOCATION!
	//REFER TO THE CLASS ON CSS PAGE FOR X AND Y POSITION
	//ALSO NOTE THAT ITS ABSOLUTE POSITIONING.

	function addImage() {
		var x = document.createElement("IMG");

		console.log(carGame.paddleC.x);
	 // var img = document.getElementById('tetris_image')
		x.classList.add('.missle');
		x.setAttribute("src", "../images/Missle.png");
		x.setAttribute("width", "50");
		x.setAttribute("height", "50");
	 //	x.style.marginLeft = carGame.paddleC.x+ 'px';
	 x.style.x = '100px';
		 x.style.position = "absolute";
		 console.log(carGame.paddleC.x);


		x.setAttribute("alt", "The Pulpit Rock");
		document.body.appendChild(x);
		//document.body.appendChild(domElement);
	}


	//NOTE THE SETTIMEOUT FUNCTION WILL ONLY WORK IF FUNCTION IS DEFINED OUTSIDE OF INIT!!!
	function shipApp() { 	paddleA.timer = setInterval(gameloop, 1000/30);   };

	function boxAppear() { boxShape1(400, 250);  };

	// browser render loop
//  function render() {     moveShip(); }

//console.log(gameWorld.y);

	/*******************(*********** MOVEMENT **********)************************/

	//REFER TO MOVEMENT.JS


	function removeEnemy() {
	//	var x = document.getElementById("enemy");
	//	x.remove(x.selectedIndex);
		//var image_x = document.getElementById('enemy');
	//image_x.parentNode.removeChild(image_x);

	$("#enemy").css('display', 'none');

	 showSide6 = undefined;

		  hitEnemy = false;
	}


function shipMovements() {
	//SPACESHIP MOVEMENT CONTROLS:


			if(moveUp && !moveDown)
	 {
		 var ship = carGame.ship;
		 ship.directionY = -1;
		 ship.accelerationY = 5;
		 ship.y += ship.speed * ship.accelerationY * ship.directionY;
		 console.log('moveUp');
	 }

	 if(moveDown && !moveUp)
	{
	var ship = carGame.ship;
				ship.directionY = 1;
				ship.accelerationY = 5;
				 ship.y += ship.speed *ship.accelerationY * ship.directionY;
			 console.log('moveDown');
	}

		 if(moveLeft && !moveRight)
	{
		var ship = carGame.ship;
		 ship.directionX = -1;
		 ship.x += ship.speed * ship.directionX;
		//  cannon.vx = −8;
		console.log('moveleft');
	}

 if(moveRight && !moveLeft)
 {
	 var ship = carGame.ship;
	ship.directionX = 1;
	ship.accelerationX = 5;
	ship.x += ship.speed * ship.directionX;

	// ship.x += ship.speed  * ship.accelerationX * ship.directionX;
 //  cannon.vx = 8;
 console.log('moveRight');
 }

 //Set the cannon's velocity to zero if none of the keys are being pressed
 if(!moveLeft && !moveRight)
 {
 //  cannon.vx = 0;
 }

 //Fire a missile if shoot is true
 if(shoot) {
	 console.log('shoot');
	// fireMissile();
	fireMissleStuff();
	 shoot = false;
 }


}

		//USED TO MOVE SHIP AND PLAYER IN CORRECT DIRECTIONS
		//DETERMINES IF PLAYER MOVES IN X OR Y DIR BY ITSELF

	//Variables used to setting movement of objects
	 function movementVariables(blue) {

	//movementVariables.prototype.moveStuff





	//movementVariables.prototype.moveStuff = 100;


	//var newtoy = new Gadget('webcam', 'black');

	//movementVariables.prototype.getInfo = function () {


 	 // var myFather2 = new collisionVariables();

	 //	document.getElementById("demo").innerHTML = "My father is " + myFather.moveStuff();
  //	myFather2.variables(blue)



	//var newtoy = new Gadget('webcam', 'black');


 	  	gravity1 = 1;

			var paddleC = carGame.paddleC;
		//	paddleC.x += paddleC.speed * paddleC.directionX;

			var missle = carGame.missle;
		//	missle.x += 50 * missle.directionX;

	  var missle22 = carGame.missle22;

			var box = carGame.box;

			var box1 = carGame.box1;

			var mega = carGame.mega;

	    var ship = carGame.ship;

			//GRAVITY FORCES:
			var cat = carGame.cat;
		//	cat.accelerationY = 10;
		//	cat.y += cat.gravity * cat.accelerationY;

			//var cat = carGame.cat;
			//	cat.x += cat.speed * cat.directionX;

			var enemy = carGame.enemy;

			var enemyShip = carGame.enemyShip;

		//	enemy.x += enemy.speed * enemy.directionX;

		//	enemy.accelerationY = 10;
		//	enemy.y += enemy.gravity * enemy.accelerationY;

			if (objectMovement === true) {

				 	paddleC.x += paddleC.speed * paddleC.directionX;
			  	missle.x += 50 * missle.directionX;

			 //	cat.accelerationY = 10;
			 //	cat.y += cat.gravity * cat.accelerationY;
			//	cat.x += cat.speed * cat.directionX;

				enemy.accelerationY = 10;
		   	enemy.x += enemy.speed * enemy.directionX;
		   	enemy.y += enemy.gravity * enemy.accelerationY;

			//	mega.accelerationY = 10;
		  // 	mega.x += mega.speed * mega.directionX;
		  // 	mega.y += mega.gravity * mega.accelerationY;

	      ship.accelerationX = 5;
		   	ship.x += ship.speed * ship.accelerationX* ship.directionX;

		   // ship.y += ship.speed * ship.accelerationY * ship.directionY;


	  //  var missle = carGame.missle;
	  //	missle.x += 50 * missle.directionX;

	    var missle22 = carGame.missle22;
	    missle22.x += 50 * missle22.directionX;

				shipMovements();

			var enemyShip = carGame.enemyShip;
			enemyShip.accelerationY = 5;

			var enemyShip2 = carGame.enemyShip2;
			enemyShip2.accelerationY = 5;

		//	var enemyShip3 = carGame.enemyShip3;
		//	enemyShip3.accelerationY = 5;

		//	enemyShip.directionX = -1;		//moves ship left
		//	enemyShip.x += enemyShip.speed * enemyShip.accelerationY* enemyShip.directionX;

		//	enemyShip.directionY = -1;		//moves ship up
		//	enemyShip.y += enemyShip.speed * enemyShip.accelerationY* enemyShip.directionY;


					$("#paddleC").css({
						"left" : paddleC.x + paddleC.speed * paddleC.directionX,
						"top" : paddleC.y + paddleC.speed * paddleC.directionY
					});

					$("#enemyShip").css({
						"left" : enemyShip.x + enemyShip.speed * enemyShip.directionX,
						"top" : enemyShip.y + enemyShip.speed * enemyShip.directionY
					});

							/*
					$("#paddleA").css({
						"left" : paddleA.x + paddleA.speed * paddleA.directionX,
						"top" : paddleA.y + paddleA.speed * paddleA.directionY
					});

					$("#paddleB").css({
						"left" : paddleB.x + paddleB.speed * paddleB.directionX,
						"top" : paddleB.y + paddleB.speed * paddleB.directionY
					});


							*/

	        $(".missle").css({
	          "left" : missle.x + missle.speed * missle.directionX,
	          "top" : missle.y + missle.speed * missle.directionY
	        });

	        $("#missle22").css({
	          "left" : missle22.x + missle22.speed * missle22.directionX,
	          "top" : missle22.y + missle22.speed * missle22.directionY
	        });


				/*	$("#football").css({
						"left" : football.x + football.speed * football.directionX,
						"top" : football.y + football.speed * football.directionY
					});


					$("#circle2").css({
						"left" : circle2.x + circle2.speed * circle2.directionX,
						"top" : circle2.y + circle2.speed * circle2.directionY
					});

					$("#circle3").css({
						"left" : circle3.x + circle3.speed * circle3.directionX,
						"top" : circle3.y + circle3.speed * circle3.directionY
					});

					$("#cat").css({
						"left" : cat.x + cat.speed * cat.directionX,
						"top" : cat.y + cat.speed * cat.directionY
					});

				*/

			/*	$("#box").css({
						"left" : box.x + box.speed * box.directionX,
						"top" : box.y + box.speed * box.directionY
					});

					$("#box1").css({
						"left" : box1.x + box1.speed * box1.directionX,
						"top" : box1.y + box1.speed * box1.directionY
					});

					$("#mega").css({
						"left" : mega.x + mega.speed * mega.directionX,
						"top" : mega.y + mega.speed * mega.directionY
					});

	*/
					$("#enemy").css({
						"left" : enemy.x + enemy.speed * enemy.directionX,
						"top" : enemy.y + enemy.speed * enemy.directionY
					});


	        $("#ship").css({
						"left" : ship.x + ship.speed * ship.directionX,
						"top" : ship.y + ship.speed * ship.directionY
					});

					$("#enemyShip2").css({
						"left" : enemyShip2.x + enemyShip2.speed * enemyShip2.directionX,
						"top" : enemyShip2.y + enemyShip2.speed * enemyShip2.directionY
					});




			}


	}

function fireMissleStuff() {

	 //FOR MISSLE HITTING ENEMY:
		 missleHitenemy = true;
 //SETS THE MISSLE AT THE CORRECT POSITION!
 carGame.missle22.x = carGame.ship.x;
 carGame.missle22.y = carGame.ship.y + 70;
 missleFired = true;

 missle('missle22', 1, 0, 0, 50, 50, 1, 1, 0.3, 0.96, 0, 0, "url('../images/Missle.png')");


}


		//<button onclick="setTimeout(myFunction, 3000)">Try it</button>

	//Collision variables

	//localStorage.setItem("savedItem", blue);

	//	localStorage.setItem("savedItem2", blue2);
	//	console.log(blue2);


	function collisionVariables(blue) {
//console.log(saveditemCount);

	//	localStorage.setItem(saveditemCount, blue);





			//console.log(blue);

			//console.log(carGame[blue]);
			//console.log(carGame[raptor]);


		if (objectMovement === true) {

/*
			//THIS WORKS!!! IT ALLOWS YOU TO SET MOVEMENT OF STUFF WHEN YOU ADD TO ENEMY FUNCTION!!!!
			var raptor =localStorage.getItem(saveditemCount);

	// 	console.log(raptor);

		var raptorStuff = carGame[raptor];
		//console.log(raptorStuff);

		raptorStuff.directionX = -1;		//moves ship left
		//	raptorStuff.x += 5 * raptorStuff.directionX ;
			raptorStuff.x += 1 * raptorStuff.directionX ;

		//					console.log(this.enemyShip3);

		var raptorS = '#' + raptor;

		$(raptorS).css({
		"left" : raptorStuff.x + raptorStuff.speed * raptorStuff.directionX,
		"top" : raptorStuff.y + raptorStuff.speed * raptorStuff.directionY
	});
*/
//	console.log(fruits[0]);



	//THIS WORKS!!! IT ALLOWS YOU TO SET MOVEMENT OF STUFF WHEN YOU ADD TO ENEMY FUNCTION!!!!
for (var i = 0; i < fruits.length; i++) {
 	//console.log(carGame[fruits[0]]);
	//	console.log(fruits[i]);


		var raptorStuff = carGame[fruits[i]];
		//console.log(raptorStuff);

		raptorStuff.directionX = -1;		//moves ship left
			raptorStuff.x += 5 * raptorStuff.directionX ;
			//raptorStuff.x += 1 * raptorStuff.directionX ;

		//					console.log(this.enemyShip3);

		var raptorS = '#' + fruits[i];

		$(raptorS).css({
		"left" : raptorStuff.x + raptorStuff.speed * raptorStuff.directionX,
		"top" : raptorStuff.y + raptorStuff.speed * raptorStuff.directionY
	});

}


			//var raptor =localStorage.getItem("savedItem");
	//	 console.log(carGame[raptor]);

		 //	var raptor =localStorage.getItem("savedItem2");
		 //	console.log(raptor[blue]);

		// check right
		if (ballHitsRightWall()) {



			resetBall();
	 	//	$("#missle").remove();
			$("#missle22").remove();
		//	console.log('removed stuff');
		 //	var x = document.getElementById("missle22");
		 	//x.remove(x.selectedIndex);

	  //  $("#missle").remove();

		}


		var enemyShip = carGame.enemyShip;

		enemyShip.directionX = -1;		//moves ship left
			enemyShip.x += 5 * enemyShip.directionX ;

			var enemyShip2 = carGame.enemyShip2;

			enemyShip2.directionX = -1;		//moves ship left
				enemyShip2.x += 5 * enemyShip2.directionX ;


 		//enemyship3 movement
				var enemyShip3 = carGame.enemyShip3;

				enemyShip3.directionX = -1;		//moves ship left
					enemyShip3.x += 5 * enemyShip3.directionX ;

					enemyShip3.x += 1 * enemyShip3.directionX ;

//					console.log(this.enemyShip3);


 		/*		$("#enemyShip3").css({
						"left" : enemyShip3.x + enemyShip3.speed * enemyShip3.directionX,
						"top" : enemyShip3.y + enemyShip3.speed * enemyShip3.directionY
					});
*/

var raptor =localStorage.getItem("savedItem");
	// console.log(carGame[raptor]);

					//CHANGE STYLE OF DOC ELEMENT
	//	var square = document.getElementById("enemyShip3");


	//	 square.style.left =   enemyShip3.x + enemyShip3.speed * enemyShip3.directionX + 'px';
	//	 square.style.top =   enemyShip3.y + enemyShip3.speed * enemyShip3.directionY +'px';



			//enemyShip.y -=  5 *  enemyShip.directionY;

		//enemyShip.x += enemyShip.speed * enemyShip.accelerationY* enemyShip.directionX;
		//for X values: just go in straght line, back and forth,
		//for y values, you
		//var cx = x - radius * Math.cos(angle0 * Math.PI / 180);

	//	For a circle with origin (j, k) and radius r:

	//	x(t) = r cos(t) + j;
	//	y(t) = r sin(t) + k;
	//console.log( 10 * Math.cos(10) * 100);

	//where you need to run this equation for t taking values within the
	// range from 0 to 360, then you will get your x and y each on the boundary of the circle.


		//ENEMEY AI MOVEMENT!
	for (var i = 0; i < 1000; i++) {
			if ( carGame.enemy.x + carGame.enemy.speed * carGame.enemy.directionX > 800 ) {
	 		 //resetBall();
	 		 carGame.enemy.directionX = -1;
				carGame.enemy.x += carGame.enemy.speed * carGame.enemy.directionX;
		 }

		 if ( carGame.enemy.x + carGame.enemy.speed * carGame.enemy.directionX < 400 ) {
	  		carGame.enemy.directionX = 1;
			 carGame.enemy.x += carGame.enemy.speed * carGame.enemy.directionX;
		}
	}

	var enemyShip = carGame.enemyShip;


			if (  enemyShip.x +  enemyShip.speed * enemyShip.directionX < 800 ) {

					var enemyShip = carGame.enemyShip;

				 	 enemyShip.directionY = -1;
				 	enemyShip.y -=  enemyShip.speed *  enemyShip.directionY;

				}

				if (  enemyShip.x +  enemyShip.speed * enemyShip.directionX < 700 ) {

						var enemyShip = carGame.enemyShip;

						 enemyShip.directionY = -1;
						enemyShip.y +=  enemyShip.speed *  enemyShip.directionY;

					//	enemyShip.directionY = -1;
					 enemyShip.y +=  enemyShip.speed *  enemyShip.directionY;

					}

				/*	if (  enemyShip.x +  enemyShip.speed * enemyShip.directionX < 600 ) {

	 						var enemyShip = carGame.enemyShip;
							//SETTING A POSITION STOPS THE SHIP!
						//	carGame.enemyShip.x = 599;
						// carGame.enemyShip.y = 100;
							enemyShip.directionY = 1;
						enemyShip.y +=  enemyShip.speed *  enemyShip.directionY;

						enemyShip.y +=  7 *  enemyShip.directionY;

						}
	*/

				if (  enemyShip.x +  enemyShip.speed * enemyShip.directionX < 600 ) {


					}



			//	 enemyShip.directionY = 1;
			//	enemyShip.y +=  enemyShip.speed *  enemyShip.directionY;

			//  enemyShip.directionX = -1;
			//	 enemyShip.x +=  enemyShip.speed *  enemyShip.directionX;

			//	 enemyShip.directionY = 1;
			// 	enemyShip.y +=  enemyShip.speed *  enemyShip.directionY;


		/* if ( enemyShip.x + enemyShip.speed * enemyShip.directionX < 400 ) {
			 var enemyShip = carGame.enemyShip;

				enemyShip.directionX = 1;
			 enemyShip.x += enemyShip.speed *enemyShip.directionX;

			  enemyShip.directionY = 1;
			 	enemyShip.y +=  enemyShip.speed *  enemyShip.directionY;

		}
	*/

	/*
	//ENEMY GETS TO DOOR AND TRIGGERS ALERT MESSAGE!
	if ( carGame.cat.x + carGame.cat.speed * carGame.cat.directionX > 1000 ) {

		document.getElementById("textStuff").innerHTML = "";
		document.getElementById("textStuff").innerHTML = "You win!";

		var x = document.getElementById("enemy");
		x.remove(x.selectedIndex);

	 //alert('You have won');
	}
	*/

	  //HANDLES SHIP HIT ENEMY
	if(hitTestRectangle(carGame.ship, carGame.enemy))
	{
	   if (showSide10 === 'left' || showSide10 ==='right') {
	     console.log('enemy was hit by ship');
	     console.log(showSide10);
	     var square = document.getElementById('enemy');
	      square.style.backgroundPosition = '100% 0%';
	      carGame.enemy.directionX = 0;
	      setTimeout( removeEnemy, 1000);
	       //	setTimeout( checkxvalue , 9000);
	       showSide10= undefined;

	     console.log('enemy was destroyed!');

	   } else if (showSide10 === 'bottom' || showSide10 === 'top') {
	     console.log('enemy was hit top ship');
	     console.log(showSide10);

	     var square = document.getElementById('enemy');
	      square.style.backgroundPosition = '100% 0%';
	      carGame.enemy.directionX = 0;
	      setTimeout( removeEnemy, 1000);
	       //	setTimeout( checkxvalue , 9000);
	       showSide10= undefined;

	     console.log('enemy was destroyed!');
	   }
	}


	if (missleHitenemy == true) {
	console.log();
	  //HANDLES SHIP HIT ENEMY
	  if(hitTestRectangle(carGame.enemy, carGame.missle22))
	  {
	   if (showSide11 === 'left' || showSide11 ==='right') {

	     console.log('enemy was destroyed!');
	     console.log(showSide10);

	   } else if (showSide11 === 'bottom' || showSide11 === 'top') {
	     console.log('enemy was hit top ship');
	     console.log(showSide10);

	     var square = document.getElementById('enemy');
	      square.style.backgroundPosition = '100% 0%';
	      carGame.enemy.directionX = 0;
	      setTimeout( removeEnemy, 1000);
	       //	setTimeout( checkxvalue , 9000);
	       showSide10= undefined;

	     console.log('enemy was destroyed!');
	   }
	  }

	}


	 //			if(hitTestRectangle(carGame.cat, carGame.box))

	/*
		if(hitTestRectangle(carGame.cat, carGame.box))
		{
	 //	console.log("Box Collision!");
			//THIS WORKS, IF PROBLEMS PUT THIS OUTSIDE OF THIS FUNCTION!
			//ALSO SWITCH CAT AND BOX ARGUMENTS TO MAKE BOX MOVE!
		showSide = blockRectangle(carGame.cat, carGame.box);
		console.log(showSide);
		}
		else {
			// console.log("No Collision!");
		}

	//HANDLES ENEMY COLLISIONS
		if(hitTestRectangle(carGame.enemy, carGame.cat))
		{
			 //	console.log("Box Collision!");
					//THIS WORKS, IF PROBLEMS PUT THIS OUTSIDE OF THIS FUNCTION!
					//ALSO SWITCH CAT AND BOX ARGUMENTS TO MAKE BOX MOVE!
		   //	 console.log(showSide6);

			 if (showSide6 === 'left' || showSide6 ==='right') {
				 console.log('player was hit');


			 } else if (showSide6 === 'bottom') {
				 var square = document.getElementById('enemy');
					square.style.backgroundPosition = '100% 0%';
					carGame.enemy.directionX = 0;
					setTimeout( removeEnemy, 1000);
					 //	setTimeout( checkxvalue , 9000);
					 showSide6= undefined;

				 console.log('enemy was destroyed!');
			 }
		}
	*/

	showSide4 = blockRectangle(carGame.enemy, carGame.box3);


	/*	showSide = blockRectangle(carGame.cat, carGame.box1);

		showSide1 = blockRectangle(carGame.cat, carGame.box2);

		showSide2 = blockRectangle(carGame.cat, carGame.grass);

		showSide3 = blockRectangle(carGame.cat, carGame.box3);

		showSide4 = blockRectangle(carGame.enemy, carGame.box3);

		showSide5 = blockRectangle(carGame.cat, carGame.box4);

		showSide6 = blockRectangle(carGame.mega, carGame.box4);	//collision between mega and box4

		showSide7 = blockRectangle(carGame.mega, carGame.box3);	//collision between mega and box3

		showSide8 = blockRectangle(carGame.mega, carGame.box2);	//collision between mega and box3
	*/
	//	showSide9 = blockRectangle(carGame.mega, carGame.box1);	//collision between mega and box3

	  showSide10 = blockRectangle(carGame.ship, carGame.enemy);	//collision between mega and box3


			if (missleFired == true) {
				showSide11 = blockRectangle(carGame.missle22, carGame.enemy);	//collision between mega and box3
			}

	//  showSide10 = blockRectangle(carGame.missle, carGame.enemy);	//collision between mega and box3

	if (hitEnemy === true) {
		showSide6 = blockRectangle(carGame.ship, carGame.enemy);

	}


		//showSide5 = blockRectangle(carGame.enemy, carGame.box3);

	//	console.log(showSide);


	//		console.log(showSide);
		// showSide = blockRectangle(carGame.cat, carGame.box);

	 //console.log(showSide);
	//	 carGame.cat.x += carGame.cat.speed * carGame.cat.directionX;


	/*
	 if(showSide === "bottom" && carGame.cat.speed * carGame.cat.directionX >= 0)
		 {
			 //Tell the game that the cat is on the ground if it's standing on top of a platform
			isOnGround = true;
			 //Neutralize gravity by applying its exact opposite force to the character's vy
			 gravity1 = carGame.cat.speed * carGame.cat.directionX ;

			 gravity1 = -(gravity1);

		 }
	 else if(showSide === "top" && carGame.cat.speed * carGame.cat.directionX <= 0)
		 {
	//	 cat.vy = 0;
			}
	 else if(showSide === "right" && carGame.cat.speed * carGame.cat.directionX >= 0)
		{
	//	cat.vx = 0;
		}
	else if(showSide === "left" && carGame.cat.speed * carGame.cat.directionX <= 0)
		{
	//	cat.vx = 0;
		}
	if(showSide !== "bottom" && carGame.cat.speed  > 0)
		{
	//		console.log('not bottom');
			isOnGround = false;
			//console.log(isOnGround);
		}
		*/
	}


	}


	  function moveShip() {

			movementVariables();

	 			window.requestAnimationFrame(render);

			collisionVariables();


	//console.log(gravity1);
	  }


		/*
		The JavaScript prototype property also allows you to add new methods to objects constructors:

		Example
		function Person(first, last, age, eyecolor) {
		  this.firstName = first;
		  this.lastName = last;
		  this.age = age;
		  this.eyeColor = eyecolor;
		}

		Person.prototype.name = function() {
		  return this.firstName + " " + this.lastName;
		};
		Person.prototype.name = function() {
		  return this.firstName + " " + this.lastName;
		};

		removeEnemy.prototype.nationality = "English";
		 */



	/*******************(************** ITEM FCNS *****)**************************/

	//Useless because for each item, the style needs to change,
	//and there are tons of variables for each thing, spped,x, y,...

	/*CAN BE USED TO MAKE AN ITEM, BUT YOU STILL NEED TO:
	1) MAKE SPEED IN moveShip()
	2) CHANGE THE CSS VALUES IN CSS
	3) THE STOP VALUES IN RESETBALL()
	*/


 function gameItem(item, speed, x, y, width, height, dirx, diry, image){
		var blue = item;

			localStorage.setItem("savedItem", blue);
		//	console.log(blue);
			 carGame[blue] = {speed: speed,
										x: x,
										y: y,
										width: width,
										height: height,
										directionX: dirx,
										directionY: diry,
										//Point properties
										left: function()
									  {
									    return this.x;
									  },
									  right: function()
										{
											return this.x + this.width;
										},
										top: function()
										{
											return this.y;
										},
										bottom: function()
										{
											return this.y + this.height;
										},
										//Circle Properties
										centerX: function()
										{
											return this.x + (this.width / 2);
										},
										centerY: function()
										{
											return this.y + (this.height / 2);
										},
										halfWidth: function()
										{
											return this.width / 2;
										},
										halfHeight: function()
										{
											return this.height / 2;
										}


 								   };

			//	localStorage.setItem("savedItem2", blue2);
		//		console.log(blue2);

			//	var raptor =localStorage.getItem("savedItem2");
			//	console.log(raptor[blue]);

				// RESETS IMAGE TO PARTICULAR LOCATION
				if (ballHitsRightWall()) {
	  			blue2.x = 200;
				blue2.y = 80;
				blue2.directionX = 0;
				}

					//CREATE DOM ELEMENT
			var para = document.createElement("div");
			para.id = blue;

		 	var element = document.getElementById("gameAssets");
			var child = document.getElementById(blue);
			element.insertBefore(para,child);

						//CHANGE STYLE OF DOC ELEMENT
			var square = document.getElementById(blue);
	 		square.style.backgroundImage = image;

		 }



	function backgroundItems(item, speed, x, y, width, height, dirx, diry, gravity,
		accelerationX, accelerationY, friction, image){
		 var blue = item;

			 localStorage.setItem("savedItem", blue);
		 //	console.log(blue);
				carGame[blue] = {speed: speed,
										 x: x,
										 y: y,
										 width: width,
										 height: height,
										 directionX: dirx,
										 directionY: diry,
										 gravity: gravity,
										 accelerationX: accelerationX,
										 accelerationY: accelerationY,
										 friction: friction,
										 //Point properties
										 left: function()
										 {
											 return this.x;
										 },
										 right: function()
										 {
											 return this.x + this.width;
										 },
										 top: function()
										 {
											 return this.y;
										 },
										 bottom: function()
										 {
											 return this.y + this.height;
										 },
										 //Circle Properties
										 centerX: function()
										 {
											 return this.x + (this.width / 2);
										 },
										 centerY: function()
										 {
											 return this.y + (this.height / 2);
										 },
										 halfWidth: function()
										 {
											 return this.width / 2;
										 },
										 halfHeight: function()
										 {
											 return this.height / 2;
										 }


										};

			 //	localStorage.setItem("savedItem2", blue2);
		 //		console.log(blue2);

			 //	var raptor =localStorage.getItem("savedItem2");
			 //	console.log(raptor[blue]);

				 // RESETS IMAGE TO PARTICULAR LOCATION
				 if (ballHitsRightWall()) {
					 blue2.x = 200;
				 blue2.y = 80;
				 blue2.directionX = 0;
				 }

					 //CREATE DOM ELEMENT
			 var para = document.createElement("div");
			 para.id = blue;

			 var element = document.getElementById("gameAssets");
			 var child = document.getElementById(blue);
			 element.insertBefore(para,child);

						 //CHANGE STYLE OF DOC ELEMENT
			 var square = document.getElementById(blue);
			 square.style.backgroundImage = image;
 		 //square.style.sourceX =   '0';
  				square.style.width = width+ 'px';
				square.style.height = height+ 'px';

			 	square.style.left =   x + 'px';
			 	square.style.top =   y +'px';

			//	square.style.backgroundPosition = '25% 10%';

			 // x.style.x = '100px'; backgroundPosition
			  square.style.backgroundSize = 'contain';

			 square.style.position = 'absolute';

			}


//backgroundItems('grass', 5, 0, 700, 1300, 100, 1, 1, 0.3, 0, 0, 0.96, "url('../images/grass.png')");


	function enemy(item, speed, x, y, width, height, dirx, diry, gravity,
		accelerationX, accelerationY, friction, image){
	 		 var blue = item;

	 			 localStorage.setItem("savedItem", blue);
	 		 //	console.log(blue);
	 				carGame[blue] = {speed: speed,
	 										 x: x,
	 										 y: y,
	 										 width: width,
	 										 height: height,
	 										 directionX: dirx,
	 										 directionY: diry,
	 										 gravity: gravity,
	 										 accelerationX: accelerationX,
	 										 accelerationY: accelerationY,
	 										 friction: friction,
	 										 //Point properties
	 										 left: function()
	 										 {
	 											 return this.x;
	 										 },
	 										 right: function()
	 										 {
	 											 return this.x + this.width;
	 										 },
	 										 top: function()
	 										 {
	 											 return this.y;
	 										 },
	 										 bottom: function()
	 										 {
	 											 return this.y + this.height;
	 										 },
	 										 //Circle Properties
	 										 centerX: function()
	 										 {
	 											 return this.x + (this.width / 2);
	 										 },
	 										 centerY: function()
	 										 {
	 											 return this.y + (this.height / 2);
	 										 },
	 										 halfWidth: function()
	 										 {
	 											 return this.width / 2;
	 										 },
	 										 halfHeight: function()
	 										 {
	 											 return this.height / 2;
	 										 }


	 										};

	 			 //	localStorage.setItem("savedItem2", blue2);
	 		 //		console.log(blue2);

	 			 //	var raptor =localStorage.getItem("savedItem2");
	 			 //	console.log(raptor[blue]);

	 				 // RESETS IMAGE TO PARTICULAR LOCATION
	 				 if (ballHitsRightWall()) {
	 					 blue2.x = 200;
	 				 blue2.y = 80;
	 				 blue2.directionX = 0;
	 				 }

	 					 //CREATE DOM ELEMENT
	 			 var para = document.createElement("div");
	 			 para.id = blue;

	 			 var element = document.getElementById("gameAssets");
	 			 var child = document.getElementById(blue);
	 			 element.insertBefore(para,child);

	 						 //CHANGE STYLE OF DOC ELEMENT
	 			 var square = document.getElementById(blue);
	 			 square.style.backgroundImage = image;
	 			 square.sourceX =   '100px';
	 			 square.sourceY =    0;

	 		 //square.style.sourceX =   '0';
	   				square.style.width = width+ 'px';
	 				square.style.height = height+ 'px';

	 			 	square.style.left =   x + 'px';
	 			 	square.style.top =   y +'px';

	 				square.style.backgroundPosition = '50% 0%';

	 			 // x.style.x = '100px'; backgroundPosition
	 			// square.style.backgroundSize = 'contain';

	 			 	square.style.position = 'absolute';

	 			}

	//	enemy('enemy', 5, 400, 60, 64, 64, 1, 1, 0.3, 0, 0, 0.96, "url('../images/hedgehogApocalypse.png')");

/* 	TO MAKE THE DOOR WORK, YOU CAN USE THE RESETBALL FUNCTION   */
		function doorItem(item, speed, x, y, width, height, dirx, diry, gravity,
			accelerationX, accelerationY, friction,  image){
		 		 var blue = item;

		 			 localStorage.setItem("savedItem", blue);
		 		 //	console.log(blue);
		 				carGame[blue] = {speed: speed,
		 										 x: x,
		 										 y: y,
		 										 width: width,
		 										 height: height,
		 										 directionX: dirx,
		 										 directionY: diry,
		 										 gravity: gravity,
		 										 accelerationX: accelerationX,
		 										 accelerationY: accelerationY,
		 										 friction: friction,
		 										 //Point properties
		 										 left: function()
		 										 {
		 											 return this.x;
		 										 },
		 										 right: function()
		 										 {
		 											 return this.x + this.width;
		 										 },
		 										 top: function()
		 										 {
		 											 return this.y;
		 										 },
		 										 bottom: function()
		 										 {
		 											 return this.y + this.height;
		 										 },
		 										 //Circle Properties
		 										 centerX: function()
		 										 {
		 											 return this.x + (this.width / 2);
		 										 },
		 										 centerY: function()
		 										 {
		 											 return this.y + (this.height / 2);
		 										 },
		 										 halfWidth: function()
		 										 {
		 											 return this.width / 2;
		 										 },
		 										 halfHeight: function()
		 										 {
		 											 return this.height / 2;
		 										 }


		 										};

		 			 //	localStorage.setItem("savedItem2", blue2);
		 		 //		console.log(blue2);

		 			 //	var raptor =localStorage.getItem("savedItem2");
		 			 //	console.log(raptor[blue]);


		 					 //CREATE DOM ELEMENT
		 			 var para = document.createElement("div");
		 			 para.id = blue;

		 			 var element = document.getElementById("gameAssets");
		 			 var child = document.getElementById(blue);
		 			 element.insertBefore(para,child);

		 						 //CHANGE STYLE OF DOC ELEMENT
		 			 var square = document.getElementById(blue);
		 			 square.style.backgroundImage = image;
		 			 square.sourceX =   '100px';
		 			 square.sourceY =    0;

		 		 //square.style.sourceX =   '0';
		   				square.style.width = width+ 'px';
		 				square.style.height = height+ 'px';

		 			 	square.style.left =   x + 'px';
		 			 	square.style.top =   y +'px';

		 				square.style.backgroundPosition = '50% 25%';

		 			 // x.style.x = '100px'; backgroundPosition
		 			// square.style.backgroundSize = 'contain';

		 			 	square.style.position = 'absolute';

		 			}

	//	 doorItem('door', 5, 1100, -65, 64, 64, 1, 1, 0.3, 0, 0, 0.96, "url('../images/hedgehogApocalypse.png')");


function player(item, speed, x, y, width, height, dirx, diry, gravity,
	accelerationX, accelerationY, friction, backgroundx, backgroundy, image){
	 var blue = item;

		 localStorage.setItem("savedItem", blue);
	 //	console.log(blue);
			carGame[blue] = {speed: speed,
									 x: x,
									 y: y,
									 width: width,
									 height: height,
									 directionX: dirx,
									 directionY: diry,
									 gravity: gravity,
									 accelerationX: accelerationX,
									 accelerationY: accelerationY,
									 friction: friction,
								 backgroundx: backgroundx,
								 backgroundy: backgroundy,

									 //Point properties
									 left: function()
									 {
										 return this.x;
									 },
									 right: function()
									 {
										 return this.x + this.width;
									 },
									 top: function()
									 {
										 return this.y;
									 },
									 bottom: function()
									 {
										 return this.y + this.height;
									 },
									 //Circle Properties
									 centerX: function()
									 {
										 return this.x + (this.width / 2);
									 },
									 centerY: function()
									 {
										 return this.y + (this.height / 2);
									 },
									 halfWidth: function()
									 {
										 return this.width / 2;
									 },
									 halfHeight: function()
									 {
										 return this.height / 2;
									 }


									};

		 //	localStorage.setItem("savedItem2", blue2);
	 //		console.log(blue2);

		 //	var raptor =localStorage.getItem("savedItem2");
		 //	console.log(raptor[blue]);

			 // RESETS IMAGE TO PARTICULAR LOCATION
			 if (ballHitsRightWall()) {
				 blue2.x = 200;
			 blue2.y = 80;
			 blue2.directionX = 0;
			 }

				 //CREATE DOM ELEMENT
		 var para = document.createElement("div");
		 para.id = blue;

		 var element = document.getElementById("gameAssets");
		 var child = document.getElementById(blue);
		 element.insertBefore(para,child);

					 //CHANGE STYLE OF DOC ELEMENT
		 var square = document.getElementById(blue);
		 square.style.backgroundImage = image;
		 square.sourceX =   '100px';
		 square.sourceY =    0;

	 //square.style.sourceX =   '0';
				square.style.width = width+ 'px';
			square.style.height = height+ 'px';

		 	square.style.left =   x + 'px';
		 	square.style.top =   y +'px';

		//	square.style.backgroundPosition = '0% 0%';

		square.style.backgroundPosition =  backgroundx + '%' + ' ' + backgroundy + '%';

		 // x.style.x = '100px'; backgroundPosition
		// square.style.backgroundSize = 'contain';

		 	square.style.position = 'absolute';

		}

/*	THIS WORKS PERFECT!!!!!
		THE CHARACTER FLOATS ON GROUND CORRECTLY, AND HAS THE PERFECT DIMENSIONS
		THIS IS PROBABLY DUE TO FACT THAT OLD CHARACTER WAS USED ON BOX OBJECT, AND DIMENSIONS
		ARE CORRECTLY MADE!!!!
		*/

    function missle(item, speed, x, y, width, height, dirx, diry, gravity,
    	accelerationX, accelerationY, friction,  image){
    	 var blue = item;

    		 localStorage.setItem("savedItem", blue);
    	 //	console.log(blue);
    			carGame[blue] = {speed: speed,
    									 x: x,
    									 y: y,
    									 width: width,
    									 height: height,
    									 directionX: dirx,
    									 directionY: diry,
    									 gravity: gravity,
    									 accelerationX: accelerationX,
    									 accelerationY: accelerationY,
    									 friction: friction,

    									 //Point properties
    									 left: function()
    									 {
    										 return this.x;
    									 },
    									 right: function()
    									 {
    										 return this.x + this.width;
    									 },
    									 top: function()
    									 {
    										 return this.y;
    									 },
    									 bottom: function()
    									 {
    										 return this.y + this.height;
    									 },
    									 //Circle Properties
    									 centerX: function()
    									 {
    										 return this.x + (this.width / 2);
    									 },
    									 centerY: function()
    									 {
    										 return this.y + (this.height / 2);
    									 },
    									 halfWidth: function()
    									 {
    										 return this.width / 2;
    									 },
    									 halfHeight: function()
    									 {
    										 return this.height / 2;
    									 }


    									};

    		 //	localStorage.setItem("savedItem2", blue2);
    	 //		console.log(blue2);

    		 //	var raptor =localStorage.getItem("savedItem2");
    		 //	console.log(raptor[blue]);


    				 //CREATE DOM ELEMENT
    		 var para = document.createElement("div");
    		 para.id = blue;

    		 var element = document.getElementById("gameAssets");
    		 var child = document.getElementById(blue);
    		 element.insertBefore(para,child);

    					 //CHANGE STYLE OF DOC ELEMENT
    		 var square = document.getElementById(blue);
    		 square.style.backgroundImage = image;

    	 //square.style.sourceX =   '0';
    				square.style.width = width+ 'px';
    			square.style.height = height+ 'px';

    		 	//square.style.left =   carGame.ship.x + 'px';
    		 //	square.style.top =   carGame.ship.y +'px';

          carGame.missle22.x = carGame.ship.x;
      		carGame.missle22.y = carGame.ship.y;

    		//	square.style.backgroundPosition = '0% 0%';

    	//	square.style.backgroundPosition =  backgroundx + '%' + ' ' + backgroundy + '%';

    		 // x.style.x = '100px'; backgroundPosition
    	  square.style.backgroundSize = 'contain';

    		 	square.style.position = 'absolute';

    		}





	function enemy2(item, speed, x, y, width, height, dirx, diry, gravity,
		accelerationX, accelerationY, friction, backgroundx, backgroundy, image){
		 var blue = item;



			 localStorage.setItem("savedItem", blue);


		 //	console.log(blue);
				carGame[blue] = {speed: speed,
										 x: x,
										 y: y,
										 width: width,
										 height: height,
										 directionX: dirx,
										 directionY: diry,
										 gravity: gravity,
										 accelerationX: accelerationX,
										 accelerationY: accelerationY,
										 friction: friction,
									 backgroundx: backgroundx,
									 backgroundy: backgroundy,

										 //Point properties
										 left: function()
										 {
											 return this.x;
										 },
										 right: function()
										 {
											 return this.x + this.width;
										 },
										 top: function()
										 {
											 return this.y;
										 },
										 bottom: function()
										 {
											 return this.y + this.height;
										 },
										 //Circle Properties
										 centerX: function()
										 {
											 return this.x + (this.width / 2);
										 },
										 centerY: function()
										 {
											 return this.y + (this.height / 2);
										 },
										 halfWidth: function()
										 {
											 return this.width / 2;
										 },
										 halfHeight: function()
										 {
											 return this.height / 2;
										 }


										};

			 //	localStorage.setItem("savedItem2", blue2);
		 //		console.log(blue2);

			 //	var raptor =localStorage.getItem("savedItem2");
			 //	console.log(raptor[blue]);

				 // RESETS IMAGE TO PARTICULAR LOCATION

					 //CREATE DOM ELEMENT
			 var para = document.createElement("div");
			 para.id = blue;

			 var element = document.getElementById("gameAssets");
			 var child = document.getElementById(blue);
			 element.insertBefore(para,child);

						 //CHANGE STYLE OF DOC ELEMENT
			 var square = document.getElementById(blue);
			 square.style.backgroundImage = image;
			 square.sourceX =   '100px';
			 square.sourceY =    0;

		 //square.style.sourceX =   '0';
					square.style.width = width+ 'px';
				square.style.height = height+ 'px';

			 	square.style.left =   x + 'px';
			 	square.style.top =   y +'px';

			//	square.style.backgroundPosition = '0% 0%';

			square.style.backgroundPosition =  backgroundx + '%' + ' ' + backgroundy + '%';

			 // x.style.x = '100px'; backgroundPosition
			// square.style.backgroundSize = 'contain';

			 	square.style.position = 'absolute';

 		//	var black = carGame.;
			console.log(carGame[blue].x);

			//	movementVariables.prototype..accel = 5;
			console.log(blue);

			var black333 = carGame[blue];
			console.log(black333);
		 	//window.requestAnimationFrame(render2);

		 	console.log(carGame[blue]);




			//ALLOWS YOU TO SET VARIABLE TO MOVEMENT AUTOMATICALLY
 			countEnemy++;
 			 saveditemCount = "savedItem" + countEnemy;
 			localStorage.setItem(saveditemCount, blue);
 				var raptor =localStorage.getItem(saveditemCount);
 				console.log(carGame[blue]);
 		 	console.log(carGame[raptor]);

		//	var fruits = [];
			fruits.push(blue);
console.log(fruits);

//console.log(movementVariables.prototype.moveStuff);

/*

movementVariables.prototype.moveStuff = function(blue) {
		this.white = "Jarred";
		 this.teal22 = "#" + blue;
		 console.log(this.teal22);
	$(this.teal22).css({
		"left" : carGame[blue].x + carGame[blue].speed * carGame[blue].directionX,
		"top" : carGame[blue].y + carGame[blue].speed * carGame[blue].directionY
	});

	carGame[blue].directionX = -1;		//moves ship left
		carGame[blue].x += 500 * carGame[blue].directionX ;
	carGame[blue].accelerationY = 5;
	console.log('Accel ' + carGame[blue].accelerationY);
	console.log('X value ' + carGame[blue].x);
};


collisionVariables.prototype.enemyMoves = function(blue, black333) {
	 this.white = "Jarred";
		this.teal22 = "#" + blue;
		this.works = black333;
		console.log(carGame[blue]);

		//enemyship3 movement
			 this.playerMoves = carGame[blue];

			 carGame[blue].directionX = -1;		//moves ship left
				 carGame[blue].x += 5 * carGame[blue].directionX ;
				 carGame[blue].x += 1 * carGame[blue].directionX ;

				 //CHANGE STYLE OF DOC ELEMENT
	 var square = document.getElementById(blue);
	 console.log(square);
		 square.style.left =   carGame[blue].x + carGame[blue].speed * carGame[blue].directionX + 'px';
		 square.style.top =   carGame[blue].y + carGame[blue].speed * carGame[blue].directionY +'px';
		 console.log(square);

};

movementVariables.prototype.price = 100;
	var myFather = new movementVariables();
 var myFather2 = new collisionVariables(blue);

 //	document.getElementById("demo").innerHTML = "My father is " + myFather.moveStuff();
 myFather.moveStuff(blue)
 myFather2.enemyMoves(blue)

movementVariables.prototype.moveStuff = 100;


//var newtoy = new Gadget('webcam', 'black');

movementVariables.prototype.getInfo = function () {
		 return 'Rating: '  + ', price: ';
};

	for (var prop in myFather2) {
		console.log(prop + ' = ' + myFather[prop]);
}

console.log(myFather.price);
console.log(myFather);
console.log(myFather2);
console.log(myFather2.enemyMoves);
console.log(myFather2.playerMoves);

console.log(myFather.hasOwnProperty('white'));

			collisionVariables.prototype.variables = function(blue) {
 						var enemyShip = carGame[blue];
						carGame[blue].directionX = -1;		//moves ship left
							carGame[blue].x += 10 * carGame[blue].directionX ;
						carGame[blue].accelerationY = 5;
						console.log(carGame[blue].accelerationY);
						console.log(carGame[blue].x);
						};


			movementVariables.prototype.moveStuff = function(blue) {
 			 	   this.teal22 = "#" + blue;
					 console.log(this.teal22);
				$(this.teal22).css({
					"left" : carGame[blue].x + carGame[blue].speed * carGame[blue].directionX,
					"top" : carGame[blue].y + carGame[blue].speed * carGame[blue].directionY
				});

				carGame[blue].directionX = -1;		//moves ship left
					carGame[blue].x += 500 * carGame[blue].directionX ;
				carGame[blue].accelerationY = 5;
				console.log(carGame[blue].accelerationY);
				console.log(carGame[blue].x);
		 };


			 var myFather = new movementVariables();
			 var myFather2 = new collisionVariables();

			//	document.getElementById("demo").innerHTML = "My father is " + myFather.moveStuff();
			myFather.moveStuff(blue)
			myFather2.variables(blue)

*/

			}


			console.log(fruits);

/*********************(******** RESET FCNS ********)***************************/

 function ballHitsRightWall() {
	//    return carGame.paddleB.x + carGame.paddleB.speed * carGame.paddleB.directionX > 500;
 	 	return carGame.missle22.x + carGame.missle22.speed * carGame.missle22.directionX > carGame.ship.x + 800;
		console.log('missle hit mark!');
			//    return pingpong.ball.x + pingpong.ball.speed * pingpong.ball.directionX > pingpong.playground.width;


		}


 	function resetBall() {
    carGame.missle.x = carGame.ship.x;
		carGame.missle.y = carGame.ship.y + 70;

 		carGame.paddleC.directionX = 0;
		carGame.missle.directionX = 0;

	}


	 function restartGame(level) {
 		$("#level").html("Level " + (level+1));

 		carGame.currentLevel = level;

 		// change the background image to fit the level
 		$('#game').removeClass().addClass('gamebg-level'+level);

 		// destroy existing bodies.
 	//	removeAllBodies();


				leveloneObjects();

				objectMovement = true;

 					//drops player down.
				//	carGame.cat.directionX = 0;

       // carGame.ship.directionX = 0;

        //  carGame.ship.directionY = 0;

					//carGame.enemy.directionX = 0;
					//ctx.clearRect(carGame.mega.x - (canvasWidth/2),carGame.mega.y - (canvasHeight/2), canvasWidth, canvasHeight)

				//window.scrollTo(500, 0);
				//$('html, body').animate({scrollTop:1200},'1');



	 		// create a ground in our newly created world
	 		// load the ground info from level data
	 		for(var i=0;i<carGame.levels[level].length;i++) {
	 			var obj = carGame.levels[level][i];

					//THIS LOADS ASSETS FOR EACH LEVELS
	 		/*	// create car
	 			if (obj.type === "car") {
	 				carGame.car = createCarAt(obj.x, obj.y);
	 				carGame.fuel = obj.fuel;
	 				carGame.fuelMax = obj.fuel;
	 				$(".fuel-value").width('100%');
	 				continue;
	 			}

	 			var groundBody = createGround(obj.x, obj.y, obj.width, obj.height, obj.rotation);

	 			if (obj.type === "win") {
	 				carGame.gamewinWall = groundBody;
	 				groundBody.SetUserData( document.getElementById('flag') );
	 			}
				*/

	 		}

 	}



	function leveloneObjects() {

		//gameItem('box', 5, 150, 150, 100, 80, 1, 1, "url('../images/box.png')");

	//	gameItem('box1', 5, 250, 400, 480, 110, 1, 1, "url('../images/box.png')");


	//	backgroundItems('box2', 5, 200, 640, 1400, 80, 1, 1, 0.3, 0, 0, 0.96, "url('../images/box.png')");

		backgroundItems('box3', 5, 400, 140, 500, 80, 1, 1, 0.3, 0, 0, 0.96, "url('../images/box.png')");


	//	backgroundItems('box4', 5, 800, 0, 400, 80, 1, 1, 0.3, 0, 0, 0.96, "url('../images/box.png')");

		backgroundItems('grass', 5, 0, 700, 1300, 100, 1, 1, 0.3, 0, 0, 0.96, "url('../images/grass.png')");

		enemy('enemy', 5, 400, 60, 64, 64, 1, 1, 0.3, 0, 0, 0.96, "url('../images/hedgehogApocalypse.png')");

		doorItem('door', 5, 1100, -65, 64, 64, 1, 1, 0.3, 0, 0, 0.96, "url('../images/hedgehogApocalypse.png')");

	//	player('cat', 5, 250, 150, 64, 64, 1, 1, 0.3, 0, 0, 0.96, "url('../images/hedgehogApocalypse.png')");

	//	player('cat', 5, 250, 150, 64, 64, 1, 1, 0.3, 0, 0, 0.96, 0, 0, "url('../images/hedgehogApocalypse.png')");

	//	player('mega', 5, 250, 150, 164, 144, 1, 1, 0.3, 0, 0, 0.96, 0, 0, "url('../images/MSheet3.png')");


    player('ship', 1, 250, 150, 92, 81, 1, 1, 0.3, 0, 0, 0.96, 0, 0, "url('../images/ship22.png')");

		player('enemyShip', 1, 1150, 150, 50, 50, 1, 1, 0.3, 0, 0, 0.96, 30, 0, "url('../images/enemyship.png')");

		enemy2('enemyShip2', 1, 1150, 350, 50, 50, 1, 1, 0.3, 0, 0, 0.96, 30, 0, "url('../images/enemyship.png')");

		enemy2('enemyShip3', 1, 750, 350, 50, 50, 1, 1, 0.3, 0, 0, 0.96, 30, 0, "url('../images/enemyship.png')");

		enemy2('enemyShip4', 1, 150, 150, 50, 50, 1, 1, 0.3, 0, 0, 0.96, 30, 0, "url('../images/enemyship.png')");

		enemy2('enemyShip5', 1, 650, 150, 50, 50, 1, 1, 0.3, 0, 0, 0.96, 30, 0, "url('../images/enemyship.png')");

		console.log('COUNT: ' + countEnemy);

		console.log(fruits);


	  //  player('missle22', 1, 250, 150, 92, 81, 1, 1, 0.3, 0, 0, 0.96, 0, 0, "url('../images/Missle.png')");
		//animateScript( );

	//	carGame.mega.directionX = 0;

	//carGame.enemyShip.directionX = 0;


	}

//	function player(item, speed, x, y, width, height, dirx, diry, gravity,
//	accelerationX, accelerationY, friction, backgroundx, backgroundy, image){


	function removeAllBodies() {
		// loop all body list to destroy them
		for (var body = carGame.world.GetBodyList(); body != null; body = body.GetNext()) {
			carGame.world.DestroyBody(body);
		}

		for (var joint = carGame.world.GetJointList(); joint != null; joint = joint.GetNext()) {
			carGame.world.DestroyJoint(joint);
		}
	}


 	// After all the definition, we init the game.
	initGame();

})();
