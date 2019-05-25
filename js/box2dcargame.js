'use strict';
(function(){

	// Box2D alias
	var b2Vec2 = Box2D.Common.Math.b2Vec2
	, b2AABB = Box2D.Collision.b2AABB
	, b2BodyDef = Box2D.Dynamics.b2BodyDef
	, b2Body = Box2D.Dynamics.b2Body
	, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
	, b2Fixture = Box2D.Dynamics.b2Fixture
	, b2World = Box2D.Dynamics.b2World
	, b2MassData = Box2D.Collision.Shapes.b2MassData
	, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
	, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
	, b2DebugDraw = Box2D.Dynamics.b2DebugDraw
	, b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef
	, b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
	;



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


	var count = 0;
 	var canvas;
	var ctx;
	var canvasWidth;
	var canvasHeight;
	var pxPerMeter = 30; // 30 pixels = 1 meter
	var shouldDrawDebug = false;
	var gameloop;
	var count1 = 0;

	function initGame() {


		carGame.world = createWorld();

		console.log("The world is created. ",carGame.world);

	 	handleGameState();

		setTimeout( checkxvalue , 9000);

	//	createBox(600, 250);

	//	LineShape1(600, 150, 50, 50, 0);

		//NOTE THE SETTIMEOUT FUNCTION WILL ONLY WORK IF FUNCTION IS DEFINED OUTSIDE OF INIT!!!
	// 	paddleA.timer = setInterval(gameloop, 1000/30);
	//	setTimeout(shipApp, 1000);

	//	paddleB.timer = setInterval(gameloop, 1000/30);

	//	paddleC.timer = setInterval(gameloop, 1000/30);

	//	setTimeout(boxAppear, 2000);

 		createGround(600, 550, 300, 15, 0);

		//carGame.car = createCarAt(50, 210);


	//	carGame.car = createSimplePolygonBody(350, 200);

 	//	createSimplePolygonBody2(350, 200);



 		showDebugDraw();

		// get the reference of the context
		canvas = document.getElementById('game');
		ctx = canvas.getContext('2d');
		canvasWidth = parseInt(canvas.width);
		canvasHeight = parseInt(canvas.height);

 		// setup the gameloop
		setInterval(updateWorld, 1/60);

		//KEYBOARD CONTROL FOR SHIP
		$(document).keydown(function(e){
			switch(e.keyCode) {
				case 38: // UP

				 	carGame.paddleC.directionY = -1;
				 	carGame.paddleC.y += carGame.paddleC.speed * carGame.paddleC.directionY;
					console.log('UP');
					return false;
					break;

				case 40: //  DOWN
			 	carGame.paddleC.directionY = 1;
			 	carGame.paddleC.y += carGame.paddleC.speed * carGame.paddleC.directionY;
					console.log('DOWN');
					return false;
					break;

				case 39: // RIGHT
				 	carGame.paddleC.directionX = 1;
			 		carGame.paddleC.x += carGame.paddleC.speed * carGame.paddleC.directionX;
					console.log('RIGHT');
					return false;
					break;
				case 37: // LEFT
					carGame.paddleC.directionX = -1;
					carGame.paddleC.x += carGame.paddleC.speed * carGame.paddleC.directionX;
				console.log('LEFT');
					return false;
					break;

				case 32: // SPACEBAR
				fireMissile();
				console.log('SPACE');
				return false;
					break;

			}
		});

	//	gameItem('blackman');


//

		window.requestAnimationFrame(render);

		//GETS THE FOOTBALL VALUES
		var blue =localStorage.getItem("savedItem");
			var blue2 = carGame[blue];
			console.log(blue2);
			console.log(blue2.x);			//X VALUE
			console.log(blue2.y);			//Y VALUE

			console.log(carGame[blue].left());





 //	gameItem('football', 5, 100, 10, 100, 80, 1, 1, "url('../images/football-player.png')");


	};



function checkxvalue () {
	console.log("PaddleC: " + carGame.paddleC.x)
}

	function hitTestPoint(pointX, pointY)
	   {
			 var blue =localStorage.getItem("savedItem");
	 			var blue2 = carGame[blue];
			//	console.log(blue2.left());
	     var hit = false;
	     if(pointX > blue2.left()
	     && pointX < blue2.right()
	     && pointY > blue2.top()
	     && pointY < blue2.bottom())

			 { 	hit = true;	}

	return hit;
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
			}
		});
	}


function fireMissile()
{

 	//cargame missle hide
	console.log(carGame.paddleC.x);
	console.log(carGame.paddleC.y);

	var x = document.createElement("IMG");

	// var img = document.getElementById('tetris_image')
	x.classList.add('missle');
	x.setAttribute("src", "../images/Missle.png");
	x.setAttribute("width", "50");
	x.setAttribute("height", "50");
 //	 x.classList.add('yourCssClass')
	x.style.left =  carGame.paddleC.x + 'px';
	x.style.top =  carGame.paddleC.y +'px';

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
  function render() {      moveShip(); }


	function whiteMove(){   }


	//USED TO MOVE SHIP AND PLAYER IN CORRECT DIRECTIONS
  function moveShip() {

/*    var paddleA = carGame.paddleA;
     paddleA.x += paddleA.speed * paddleA.directionX;

		 var paddleB = carGame.paddleB;
			paddleB.x += paddleB.speed * paddleB.directionX;
*/
 		var paddleC = carGame.paddleC;
 			paddleC.x += paddleC.speed * paddleC.directionX;

			var missle = carGame.missle;
 			missle.x += 50 * missle.directionX;

			var football = carGame.football;
 			football.x += football.speed * football.directionX;

	/*		var missle2 = carGame.missle2;
 			missle2.x += missle2.speed * missle2.directionX;

			var enemy = carGame.enemy;
 			enemy.x += enemy.speed * enemy.directionX;
*/
/*
			if (count1 !== 0) {
				//	console.log(count1);
					for (var i = 0; i < count1; i++) {
						var blue =localStorage.getItem("savedItem");
					 	var blue2 = carGame[blue];
					 	blue2.x += blue2.speed * blue2.directionX;

					 	 var red = "#" + blue;

					 	$(red).css({
					 		"left" : blue2.x + blue2.speed * blue2.directionX,
					 		"top" : blue2.y + blue2.speed * blue2.directionY
					 	});
					}

			}

*/
		/*	var paddleA = carGame.paddleA;
			var paddleB = carGame.paddleB;
			var paddleC = carGame.paddleC;
			var missle = carGame.missle;
			var missle2 = carGame.missle2;
			var enemy = carGame.enemy;
	 //	     var blue2 = carGame[blue];
*/
/*	    $("#paddleA").css({
	      "left" : paddleA.x + paddleA.speed * paddleA.directionX,
	      "top" : paddleA.y + paddleA.speed * paddleA.directionY
	    });

			$("#paddleB").css({
				"left" : paddleB.x + paddleB.speed * paddleB.directionX,
				"top" : paddleB.y + paddleB.speed * paddleB.directionY
			});
*/
			$("#paddleC").css({
				"left" : paddleC.x + paddleC.speed * paddleC.directionX,
				"top" : paddleC.y + paddleC.speed * paddleC.directionY
			});

			$(".missle").css({
				"left" : missle.x + missle.speed * missle.directionX,
				"top" : missle.y + missle.speed * missle.directionY
			});

			$("#football").css({
				"left" : football.x + football.speed * football.directionX,
				"top" : football.y + football.speed * football.directionY
			});

/*			$("#enemy").css({
				"left" : enemy.x + enemy.speed * enemy.directionX,
				"top" : enemy.y + enemy.speed * enemy.directionY
			});

			$(".missle2").css({
				"left" : missle2.x + missle2.speed * missle2.directionX,
				"top" : missle2.y + missle2.speed * missle2.directionY
			});
*/



			window.requestAnimationFrame(render);

			// check right
	    if (ballHitsRightWall()) {
	      resetBall();
				$(".missle").remove();

	    }


			if(hitTestPoint( carGame.paddleC.x,  carGame.paddleC.y))
			//if(hitTestPoint(101, 11))

			{
						// message = "Collision!";
						console.log("Collision!");
					 }
			else {
					 //  message = "No Collision...";
				//	 console.log("No Collision!");
					 }


  }




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
										}

 								   };
				//moveShip
		     var blue2 = carGame[blue];
			//	 console.log(blue2);

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


	//object["property"] = value;
//	gameItem('blackman');
//	gameItem('blueman');

 	gameItem('football', 5, 100, 10, 100, 80, 1, 1, "url('../images/football-player.png')");

	console.log(carGame);

	//carGame["property"] = {x: 'value', y: 'blue'};


	  function ballHitsRightWall() {
	//    return carGame.paddleB.x + carGame.paddleB.speed * carGame.paddleB.directionX > 500;
			return carGame.missle.x + carGame.missle.speed * carGame.missle.directionX > 1000;
			//    return pingpong.ball.x + pingpong.ball.speed * pingpong.ball.directionX > pingpong.playground.width;
	  }


 	function resetBall() {
		// reset the ball;
	/*	carGame.paddleB.x = 250;
		carGame.paddleB.y = 100;

		carGame.paddleA.x = 350;
		carGame.paddleA.y = 300; */

 //	carGame.paddleC.x = 100;
	// 	carGame.paddleC.y = 10;


		carGame.missle.x = carGame.paddleC.x;
		carGame.missle.y = carGame.paddleC.y + 70;

		carGame.football.x = 200;
		carGame.football.y = 10;

//console.log(carGame.football);
	//	carGame.missle2.x =  50;
	//	carGame.missle2.y = 50;

		// update the ball location variables;
	//	carGame.paddleA.directionX = 0;
	//	carGame.paddleB.directionX = 0;
		carGame.paddleC.directionX = 0;
		carGame.missle.directionX = 0;
		carGame.football.directionX = 0;

	//	carGame.missle2.directionX = 0;

	//	carGame.enemy.directionX = 0;

	/*	var blue =localStorage.getItem("savedItem");
 		var blue2 = carGame[blue];

		blue2.x = 150;
		blue2.y = 100;
		blue2.directionX = 0;
*/
		/*
		// player B lost.
		pingpong.scoreA += 1;
		$("#score-a").text(pingpong.scoreA);
		*/



	}


	 function restartGame(level) {
 		$("#level").html("Level " + (level+1));

 		carGame.currentLevel = level;

 		// change the background image to fit the level
 		$('#game').removeClass().addClass('gamebg-level'+level);

 		// destroy existing bodies.
 		removeAllBodies();

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


	function removeAllBodies() {
		// loop all body list to destroy them
		for (var body = carGame.world.GetBodyList(); body != null; body = body.GetNext()) {
			carGame.world.DestroyBody(body);
		}

		for (var joint = carGame.world.GetJointList(); joint != null; joint = joint.GetNext()) {
			carGame.world.DestroyJoint(joint);
		}
	}


	function showDebugDraw() {
		shouldDrawDebug = true;

		//setup debug draw
		var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(document.getElementById('game').getContext('2d'));
		debugDraw.SetDrawScale(pxPerMeter);
		debugDraw.SetFillAlpha(0.3);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

		carGame.world.SetDebugDraw(debugDraw);

		carGame.world.DrawDebugData();
	}


	function updateWorld() {
		// Move the physics world 1 step forward.
		carGame.world.Step(1/60, 10, 10);

		//Box2D v2.2.1 onwards
		//body->SetGravityScale(0);//cancel gravity (use -1 to reverse gravity, etc)

		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		// Display the build-in debug drawing.
		if (shouldDrawDebug) {
			carGame.world.DrawDebugData();
		}


		// Clear previous applied force.
		carGame.world.ClearForces();

		  drawWorld(carGame.world, ctx);

			//checkCollision();
	}


	// Create and return the Box2D world.
	function createWorld() {
		// Define the gravity
		var gravity = new b2Vec2(0, 10);


		// set to allow sleeping object
		var allowSleep = true;

		// finally create the world with the size, graivty and sleep object parameter.
		var world = new b2World(gravity, allowSleep);

		return world;
	}

	// create a static ground body.
	function createGround(x, y, width, height, rotation) {
		var bodyDef = new b2BodyDef;
		var fixDef = new b2FixtureDef;

		bodyDef.type = b2Body.b2_staticBody;
		bodyDef.position.x = x /pxPerMeter;
		bodyDef.position.y = y /pxPerMeter;
		bodyDef.angle = rotation * Math.PI / 180;

		fixDef.shape = new b2PolygonShape();
		fixDef.shape.SetAsBox(width/pxPerMeter, height/pxPerMeter);
		fixDef.restitution = 0.4;
		fixDef.friction = 3.5;

		// create the body from the definition.
		var body = carGame.world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);

		return body;
	}

	function createCarAt(x, y) {
		var bodyDef = new b2BodyDef;
		var fixDef = new b2FixtureDef;

		// car body
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.x = 50/pxPerMeter;
		bodyDef.position.y = 210/pxPerMeter;

		fixDef.shape = new b2PolygonShape();
		fixDef.density = 1.0;
		fixDef.friction = 1.5;
		fixDef.restitution = 0.4;
		fixDef.shape.SetAsBox(40/pxPerMeter, 20/pxPerMeter);

		carBody = carGame.world.CreateBody(bodyDef);

		carBody.CreateFixture(fixDef);

		// creating the wheels
		var wheelBody1 = createWheel(x-25, y+20);
		var wheelBody2 = createWheel(x+25, y+20);

		// create a joint to connect left wheel with the car body
		var jointDef = new b2RevoluteJointDef();
		jointDef.Initialize(carBody, wheelBody1, new b2Vec2( (x-25)/pxPerMeter ,  (y+20)/pxPerMeter ));
		carGame.world.CreateJoint(jointDef);

		// create a joint to connect right wheel with the car body
		var jointDef = new b2RevoluteJointDef();
		jointDef.Initialize(carBody, wheelBody2, new b2Vec2( (x+25)/pxPerMeter ,  (y+20)/pxPerMeter ));
		carGame.world.CreateJoint(jointDef);

		return carBody;

	}

	function createWheel(x, y) {
		var bodyDef = new b2BodyDef;
		var fixDef = new b2FixtureDef;

		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.x = x/pxPerMeter;
		bodyDef.position.y = y/pxPerMeter;

		fixDef.shape = new b2CircleShape();
		fixDef.shape.SetRadius(10/pxPerMeter);

		fixDef.density = 1.0;
		fixDef.restitution = 0.1;
		fixDef.friction = 4.3;

		var body = carGame.world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);

		return body;
	}

	// temporary function
	function createBox(x, y) {
		var bodyDef = new b2BodyDef;
		var fixDef = new b2FixtureDef;

		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.x = x/pxPerMeter;
		bodyDef.position.y = y/pxPerMeter;

		fixDef.shape = new b2PolygonShape();
		fixDef.shape.SetAsBox(20/pxPerMeter, 20/pxPerMeter);
		var body = carGame.world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);

		return body;
	}


	// create a static ground body.
	function LineShape1(x, y, width, height, rotation) {
		var bodyDef = new b2BodyDef;
		var fixDef = new b2FixtureDef;

		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.userData = document.getElementById('ship22');

		bodyDef.position.x = x /pxPerMeter;
		bodyDef.position.y = y /pxPerMeter;
		bodyDef.angle = rotation * Math.PI / 180;

 		// Use SetAsArray() to define the shape using the points array

		fixDef.shape = new b2PolygonShape();
 		fixDef.shape.SetAsBox(width/pxPerMeter, height/pxPerMeter);
		fixDef.restitution = 0.4;
		fixDef.friction = 3.5;
 		// create the body from the definition.
		var body = carGame.world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);

		return body;
	}


	// temporary function
	function boxShape1(x, y) {
		var bodyDef = new b2BodyDef;
		var fixDef = new b2FixtureDef;

		bodyDef.type = b2Body.b2_dynamicBody;
		//used as reference for ship texture
		bodyDef.userData = document.getElementById('bus');
		bodyDef.position.x = x/pxPerMeter;
		bodyDef.position.y = y/pxPerMeter;

		fixDef.shape = new b2PolygonShape();
		fixDef.shape.SetAsBox(40/pxPerMeter, 40/pxPerMeter);



		var body = carGame.world.CreateBody(bodyDef);
 		body.CreateFixture(fixDef);

		return body;
	}


	function createSimplePolygonBody(x,y) {
	    var bodyDef = new b2BodyDef;
	    bodyDef.type = b2Body.b2_dynamicBody;

			//used as reference for ship texture
			bodyDef.userData = document.getElementById('ship22');

	    bodyDef.position.x = x / pxPerMeter;
	    bodyDef.position.y = y / pxPerMeter;


	    var fixtureDef = new b2FixtureDef;

	    fixtureDef.density = 1.0;
	    fixtureDef.friction = 0.5;
	    fixtureDef.restitution = 0.6;
	    fixtureDef.shape = new b2PolygonShape();
	    // Create an array of b2Vec2 points in clockwise direction
	    var points = [
				new b2Vec2(0, -1.5),
				new b2Vec2(2 ,   1.3),
				new b2Vec2(-2 , 1.3),

/*
BASIC TRIANGLE:
polyDef.vertices[0].Set(0,-1);
polyDef.vertices[1].Set(1,1);
polyDef.vertices[2].Set(-1,1);
*/
 	];


	    // Use SetAsArray() to define the shape using the points array
	    fixtureDef.shape.SetAsArray(points, points.length);

	    var body = carGame.world.CreateBody(bodyDef);
	     body.CreateFixture(fixtureDef);
 			 return body;
	}



		function createSimplePolygonBody2(x,y) {
		    var bodyDef = new b2BodyDef;
		    bodyDef.type = b2Body.b2_dynamicBody;

				//used as reference for ship texture
				bodyDef.userData = document.getElementById('ship22');
		    bodyDef.position.x = x / pxPerMeter;
		    bodyDef.position.y = y / pxPerMeter;
		    var fixtureDef = new b2FixtureDef;

		    fixtureDef.density = 1.0;
		    fixtureDef.friction = 0.5;
		    fixtureDef.restitution = 0.6;
		    fixtureDef.shape = new b2PolygonShape();
		    // Create an array of b2Vec2 points in clockwise direction
		    var points = [
					new b2Vec2(0, -1.5),
					new b2Vec2(2 ,   1.3),
					new b2Vec2(-2 , 1.3),
 	 	];

		    // Use SetAsArray() to define the shape using the points array
		    fixtureDef.shape.SetAsArray(points, points.length);

		    var body = carGame.world.CreateBody(bodyDef);
		     body.CreateFixture(fixtureDef);
				 return body;
		}

	// drawing functions
	function drawWorld(world, context) {
		for (var body = carGame.world.GetBodyList(); body != null;
			body = body.GetNext()) {
			if (body.GetUserData() !== null && body.GetUserData() !== undefined) {
				// the user data contains the reference to the image
				var img = body.GetUserData();
				// the x and y of the image. We have to subtract the half width/height
				var x = body.GetPosition().x;
				var y = body.GetPosition().y;
				var topleftX = - $(img).width()/2;
				var topleftY = - $(img).height()/2;
				context.save();
				context.translate(x * pxPerMeter,y * pxPerMeter);
				context.rotate(body.GetAngle());
				context.drawImage(img, topleftX, topleftY);
				context.restore();
		}
	}
}




	// After all the definition, we init the game.
	initGame();

})();
