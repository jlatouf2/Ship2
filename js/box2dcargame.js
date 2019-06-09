'ust strict';

(function(){ // Box2D alias
var b2Vec2 = Box2D.Common.Math.b2Vec2,  b2AABB = Box2D.Collision.b2AABB , b2BodyDef = Box2D.Dynamics.b2BodyDef ,  b2Body = Box2D.Dynamics.b2Body ,
b2FixtureDef = Box2D.Dynamics.b2FixtureDef , b2Fixture = Box2D.Dynamics.b2Fixture ,  b2World = Box2D.Dynamics.b2World , b2MassData = Box2D.Collision.Shapes.b2MassData ,
b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape ,
b2DebugDraw = Box2D.Dynamics.b2DebugDraw , b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef ,  b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef ;


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


	var count = 0;
 	var canvas;
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
	var stopAnimation = true;




	function initGame() {

	//	buildMap(map);
		//buildMap(gameObjects);

 		// place in init code
		//Sounds, REFER TO FUNCITON BELOW:
		myMusic = new sound("../media/dk2.mp3");
	//	myMusic.play();

		carGame.world = createWorld();

		console.log("The world is created. ",carGame.world);

	 	handleGameState();

if (objectMovement === true) {
	//drops player and enemy down.
	carGame.cat.directionX = 0;
	carGame.enemy.directionX = 0;

}

		moveEnemyRight();

	  //	setTimeout( checkxvalue , 9000);

		//	createBox(600, 250);

		//	setTimeout( enemyAI , 2000);

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

		// showSide = blockRectangle(carGame.cat, carGame.box);

		//console.log(showSide);

 		getText();

 		showDebugDraw();

		// get the reference of the context
		canvas = document.getElementById('game');
		ctx = canvas.getContext('2d');
		canvasWidth = parseInt(canvas.width);
		canvasHeight = parseInt(canvas.height);




 		// setup the gameloop
		setInterval(updateWorld, 1/60);


	//	moveCharacter();		//CONTROLS


		megaController();

	//	enemeyController();

		window.requestAnimationFrame(render);


 //	gameItem('football', 5, 100, 10, 100, 80, 1, 1, "url('../images/football-player.png')");
 	};

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



	function megaController(){
	 	$(document).keydown(function(e){
			switch(e.keyCode) {
				case 38: // UP

	 				return false;
					break;

				case 40: //  DOWN

					stopAnimate();
				var elem = document.getElementById('mega').style.backgroundPosition =  '0% 0%';
			//	console.log(elem);
				carGame.mega.directionX = 0;

			  stopAnimation = true;

				stopAnimate();

	 				return false;
					break;

				case 39: // RIGHT

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

				carGame.mega.directionX = -1;
				carGame.mega.x += carGame.mega.speed * carGame.mega.directionX;

				var elem22 = document.getElementById('mega')
				elem22.style.transform = 'scaleX(-1)'; // horizontal

				if (stopAnimation === true) {  animateScript(); stopAnimation = false;  	}

				//elem22.style.backgroundPosition =   '100% 0%';

				//elem.style.transform = 'scaleX (-1)'; // horizontal

				//document.getElementById('mega').style.backgroundPosition =  position + '%' + ' ' + '0%';

 				//	animateScript2();


				//	var square = document.getElementById('mega');
	 			//	square.style.backgroundPosition = '70% 0%';
	 				//carGame.enemy.directionX = 0;

				//		characterMovements();
				//animatePlayer();
				//animateScript();

		 			//	setTimeout( removeEnemy, 1000);
		 				 //	setTimeout( checkxvalue , 9000);
		 				// showSide6= undefined;
						//1945
 			// console.log('enemy was destroyed!');

	 				return false;
					break;

			}
		});
	  }
/*
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

*/

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
	function animatePlayer() {
//	    alert( "hi" );
 	    i= i + 10;

	    if( i < howManyTimes ){
				var square = document.getElementById('mega');
				square.style.backgroundPosition =  i + '%' + ' ' + '0%';
			//	console.log(square.style.backgroundPosition);
	        setTimeout( animatePlayer, 80 );

					if (i == 1000) {
						i = 0;
					//	console.log('loop 2');
					}
 				}
	}
/*
function anim() {
	var    position = 0;
	var  interval = 100;
	tID = setInterval ( () => {
		  document.getElementById('mega').style.backgroundPosition =  position + '%' + ' ' + '0%';

		if (position < 100)
 	{ position = position + 10;
	}
 	  else { position = 0; }
		, interval);

		};
*/


function stopAnimate() {
clearInterval(tID);
} //end of stopAnimate()




 function animateScript() {
	 var    position = 0;
	 var  interval = 100;
	 const  diff = 100;     //diff as a variable for position offset

	 tID = setInterval ( () => {
		 document.getElementById('mega').style.backgroundPosition =  position + '%' + ' ' + '0%';

			if (position < 100   + diff)
		 { position = position + 10;}
			 else
		 { position = 0; }
			}
		 , interval );

}


/*
function animateScript() {
	var    position = 0;
	var  interval = 100;

	tID = setInterval ( () => {
		document.getElementById('mega').style.backgroundPosition =  position + '%' + ' ' + '0%';

	 if (position < 100)
	{ position = position + 10;}
	  else
	{ position = 0; }
	 }
	, interval );

return true;
 }
*/



 function animateScript2() {
 	var    position = 100;
 	var  interval = 0;
	const  diff = 100;     //diff as a variable for position offset

 	tID = setInterval ( () => {
 	var elem = document.getElementById('mega');
	elem.style.transform = 'scaleX (-1)'; // horizontal

	elem.style.backgroundPosition =  position + '%' + ' ' + '0%';
console.log(position);
		//var elem = document.getElementById ( 'flipper' );
	 // elem.style.transform = 'scaleX (-1)'; // horizontal

 	 if (position > 0 + diff)
 	{ position = position - 10;}
 	  else
 	{ position = 0; }
 	 }
 	, interval );

  }

//	f();

//	for (var start = 1; start < 10; start++)
  //  setTimeout(function () { alert('hello');  }, 3000 * start);






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


	this.update_camera_position = function() {

     this.camera.x = this.player.x - this.canvas.width / 2 ;
     this.camera.y = this.player.y - this.canvas.height / 2;
 }


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

	function blockRectangle(r1 = carGame.cat, r2 = carGame.box1)
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
			}
		});
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
  function render() {     moveShip(); }


	/*******************(*********** MOVEMENT **********)************************/

function removeEnemy() {
//	var x = document.getElementById("enemy");
//	x.remove(x.selectedIndex);
	//var image_x = document.getElementById('enemy');
//image_x.parentNode.removeChild(image_x);

$("#enemy").css('display', 'none');

 showSide6 = undefined;

	  hitEnemy = false;
}
	//USED TO MOVE SHIP AND PLAYER IN CORRECT DIRECTIONS
	//DETERMINES IF PLAYER MOVES IN X OR Y DIR BY ITSELF

//Variables used to setting movement of objects
 function movementVariables() {

	gravity1 = 1;

		var paddleC = carGame.paddleC;
	//	paddleC.x += paddleC.speed * paddleC.directionX;

		var missle = carGame.missle;
	//	missle.x += 50 * missle.directionX;

		var box = carGame.box;

		var box1 = carGame.box1;

		var mega = carGame.mega;

		//GRAVITY FORCES:
		var cat = carGame.cat;
	//	cat.accelerationY = 10;
	//	cat.y += cat.gravity * cat.accelerationY;

		//var cat = carGame.cat;
		//	cat.x += cat.speed * cat.directionX;

		var enemy = carGame.enemy;
	//	enemy.x += enemy.speed * enemy.directionX;

	//	enemy.accelerationY = 10;
	//	enemy.y += enemy.gravity * enemy.accelerationY;

		if (objectMovement === true) {

			 	paddleC.x += paddleC.speed * paddleC.directionX;
		  	missle.x += 50 * missle.directionX;

		 	cat.accelerationY = 10;
		 	cat.y += cat.gravity * cat.accelerationY;
			cat.x += cat.speed * cat.directionX;

			enemy.accelerationY = 10;
	   	enemy.x += enemy.speed * enemy.directionX;
	   	enemy.y += enemy.gravity * enemy.accelerationY;

			mega.accelerationY = 10;
	   	mega.x += mega.speed * mega.directionX;
	   	mega.y += mega.gravity * mega.accelerationY;




				$("#paddleC").css({
					"left" : paddleC.x + paddleC.speed * paddleC.directionX,
					"top" : paddleC.y + paddleC.speed * paddleC.directionY
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
			*/
				$("#cat").css({
					"left" : cat.x + cat.speed * cat.directionX,
					"top" : cat.y + cat.speed * cat.directionY
				});

				$("#box").css({
					"left" : box.x + box.speed * box.directionX,
					"top" : box.y + box.speed * box.directionY
				});

				$("#box1").css({
					"left" : box1.x + box1.speed * box1.directionX,
					"top" : box1.y + box1.speed * box1.directionY
				});

				$("#enemy").css({
					"left" : enemy.x + enemy.speed * enemy.directionX,
					"top" : enemy.y + enemy.speed * enemy.directionY
				});

				$("#mega").css({
					"left" : mega.x + mega.speed * mega.directionX,
					"top" : mega.y + mega.speed * mega.directionY
				});


		}

	/*	var football = carGame.football;
		football.x += football.speed * football.directionX;

		var circle2 = carGame.circle2;
	//	circle2.x += 1 * circle2.directionX;
	//	circle2.y += 1 * circle2.directionY;

		var circle3 = carGame.circle3;
		circle3.x += circle3.speed * circle3.directionX;
*/

	/*    var paddleA = carGame.paddleA;
			 paddleA.x += paddleA.speed * paddleA.directionX;

			 var paddleB = carGame.paddleB;
				paddleB.x += paddleB.speed * paddleB.directionX;
	*/

	//	cat.x *= .3;
	//		cat.x += cat.speed * cat.directionX;

	/*		var missle2 = carGame.missle2;
			missle2.x += missle2.speed * missle2.directionX;

			var enemy = carGame.enemy;
			enemy.x += enemy.speed * enemy.directionX;
	*/




/*			$("#enemy").css({
				"left" : enemy.x + enemy.speed * enemy.directionX,
				"top" : enemy.y + enemy.speed * enemy.directionY
			});

			$(".missle2").css({
				"left" : missle2.x + missle2.speed * missle2.directionX,
				"top" : missle2.y + missle2.speed * missle2.directionY
			});
*/

}

//Collision variables
function collisionVariables() {

	if (objectMovement === true) {

	// check right
	if (ballHitsRightWall()) {
		resetBall();
		$(".missle").remove();
	}

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


//ENEMY GETS TO DOOR AND TRIGGERS ALERT MESSAGE!
if ( carGame.cat.x + carGame.cat.speed * carGame.cat.directionX > 1000 ) {

	document.getElementById("textStuff").innerHTML = "";
	document.getElementById("textStuff").innerHTML = "You win!";

	var x = document.getElementById("enemy");
	x.remove(x.selectedIndex);

 //alert('You have won');
}




/*
	if(hitTestPoint( carGame.paddleC.x,  carGame.paddleC.y))
	//if(hitTestPoint(101, 11))
	{
		console.log("Collision!");
	 }  else {
			//	 console.log("No Collision!");
	 }
*/

	//   blockCircle(firstSprite, secondSprite);
	//		 	 if(hitTestCircle(carGame.circle2, carGame.circle3))

/*
	if(blockCircle(carGame.circle2, carGame.circle3))
		{
			console.log("Circle Collision!");
		}
		else {
				// console.log("No Collision!");
		}
*/
//			if(hitTestRectangle(carGame.cat, carGame.box))

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

	showSide = blockRectangle(carGame.cat, carGame.box1);

	showSide1 = blockRectangle(carGame.cat, carGame.box2);

	showSide2 = blockRectangle(carGame.cat, carGame.grass);

	showSide3 = blockRectangle(carGame.cat, carGame.box3);

	showSide4 = blockRectangle(carGame.enemy, carGame.box3);

	showSide5 = blockRectangle(carGame.cat, carGame.box4);

	showSide6 = blockRectangle(carGame.mega, carGame.box4);	//collision between mega and box4

	showSide7 = blockRectangle(carGame.mega, carGame.box3);	//collision between mega and box3

	showSide7 = blockRectangle(carGame.mega, carGame.box2);	//collision between mega and box3

	showSide7 = blockRectangle(carGame.mega, carGame.box1);	//collision between mega and box3

if (hitEnemy === true) {
	showSide6 = blockRectangle(carGame.cat, carGame.enemy);

}


	//showSide5 = blockRectangle(carGame.enemy, carGame.box3);

//	console.log(showSide);


//		console.log(showSide);
	// showSide = blockRectangle(carGame.cat, carGame.box);

 //console.log(showSide);
//	 carGame.cat.x += carGame.cat.speed * carGame.cat.directionX;

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

function getText() {
	//	$("p").text("Hello world!");
		document.getElementById("textStuff").innerHTML = "New text!";

	}

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


 //	gameItem('football', 5, 100, 10, 100, 80, 1, 1, "url('../images/football-player.png')");

	//gameItem('circle2', 5, 100, 10, 100, 80, 1, 1, "url('../images/circle1.png')");

//	gameItem('circle3', 5, 50, 50, 100, 80, 1, 1, "url('../images/circle2.png')");

	//gameItem('cat', 5, 200, 140, 100, 95, 1, 1, "url('../images/cat.png')");

	//gameItem('box', 5, 150, 150, 100, 80, 1, 1, "url('../images/box.png')");

	//gameItem('box1', 5, 250, 350, 480, 110, 1, 1, "url('../images/box.png')");


	function tileSheetItem(item, speed, x, y, width, height, dirx, diry, sourceX, sourceY, image){
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
									 sourceX: sourceX,
									 sourceY: sourceY,
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

				square.style.backgroundPosition = '0% 100%';

			 // x.style.x = '100px'; backgroundPosition
			 //square.style.backgroundSize = 'contain';

			 	square.style.position = 'absolute';

		}

 //	tileSheetItem('monster1', 5, 50, 150, 64, 64, 1, 1, 64, 64, "url('../images/collisionTileSheet.png')");


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

//	moveItem('cat', 5, 200, 140, 100, 95, 1, 1, 0.3, 0, 0, 0.96, "url('../images/cat.png')");

//backgroundItems('box2', 5, 200, 540, 800, 80, 1, 1, 0.3, 0, 0, 0.96, "url('../images/box.png')");

//backgroundItems('box3', 5, 400, 140, 500, 80, 1, 1, 0.3, 0, 0, 0.96, "url('../images/box.png')");

//backgroundItems('box4', 5, 800, 0, 400, 80, 1, 1, 0.3, 0, 0, 0.96, "url('../images/box.png')");

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


	//	 player('cat', 5, 250, 150, 64, 64, 1, 1, 0.3, 0, 0, 0.96, "url('../images/hedgehogApocalypse.png')");

	console.log(carGame.cat);

//	console.log(carGame);

/*********************(******** RESET FCNS ********)***************************/

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

	/*	carGame.football.x = 300;
		carGame.football.y = 10;

		carGame.circle2.x = 300;
		carGame.circle2.y = 10;

		carGame.circle3.x = 200;
		carGame.circle3.y = 100;
*/
//console.log(carGame.football);
	//	carGame.missle2.x =  50;
	//	carGame.missle2.y = 50;

		// update the ball location variables;
	//	carGame.paddleA.directionX = 0;
	//	carGame.paddleB.directionX = 0;
		carGame.paddleC.directionX = 0;
		carGame.missle.directionX = 0;
	//	carGame.football.directionX = 0;
	//	carGame.circle2.directionX = 0;
	//	carGame.circle3.directionX = 0;

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



				leveloneObjects();

				objectMovement = true;

 					//drops player down.
					carGame.cat.directionX = 0;
					//carGame.enemy.directionX = 0;





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

		gameItem('box', 5, 150, 150, 100, 80, 1, 1, "url('../images/box.png')");

		gameItem('box1', 5, 250, 400, 480, 110, 1, 1, "url('../images/box.png')");


		backgroundItems('box2', 5, 200, 640, 800, 80, 1, 1, 0.3, 0, 0, 0.96, "url('../images/box.png')");

		backgroundItems('box3', 5, 400, 140, 500, 80, 1, 1, 0.3, 0, 0, 0.96, "url('../images/box.png')");


		backgroundItems('box4', 5, 800, 0, 400, 80, 1, 1, 0.3, 0, 0, 0.96, "url('../images/box.png')");

		backgroundItems('grass', 5, 0, 700, 1300, 100, 1, 1, 0.3, 0, 0, 0.96, "url('../images/grass.png')");

		enemy('enemy', 5, 400, 60, 64, 64, 1, 1, 0.3, 0, 0, 0.96, "url('../images/hedgehogApocalypse.png')");

		doorItem('door', 5, 1100, -65, 64, 64, 1, 1, 0.3, 0, 0, 0.96, "url('../images/hedgehogApocalypse.png')");

	//	player('cat', 5, 250, 150, 64, 64, 1, 1, 0.3, 0, 0, 0.96, "url('../images/hedgehogApocalypse.png')");

		player('cat', 5, 250, 150, 64, 64, 1, 1, 0.3, 0, 0, 0.96, 0, 0, "url('../images/hedgehogApocalypse.png')");

		player('mega', 5, 250, 150, 164, 144, 1, 1, 0.3, 0, 0, 0.96, 0, 0, "url('../images/MSheet3.png')");

		//animateScript( );

		carGame.mega.directionX = 0;

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


/*********************(****** 2D BOX FCNS ********)**************************/



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
