//The game map
var assetsToLoad = [];
var assetsLoaded = 0;

var sprites = [];

//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/hedgehogApocalypse.png";
assetsToLoad.push(image);

var map =
[
	[7,7,8,9,7,7,7,8,9,7,7,7,8,9,7,7],
	[8,9,7,7,4,9,7,7,7,8,9,7,7,7,8,5],
	[4,7,7,7,7,7,8,9,7,7,7,8,9,7,4,4],
	[7,7,4,7,7,4,4,4,4,7,7,7,7,7,7,7],
	[8,9,4,7,7,7,7,8,9,7,7,4,8,9,7,7],
	[7,4,4,4,7,8,9,7,7,7,4,4,7,7,4,8],
	[9,7,8,9,7,7,7,8,9,4,7,4,9,7,7,7],
	[7,7,7,7,7,4,4,7,7,7,7,4,4,4,4,7],
	[8,9,7,7,7,7,7,7,7,8,9,7,7,8,9,7],
	[7,7,4,4,4,4,7,7,4,7,7,7,7,7,7,7],
	[7,7,7,7,7,7,7,7,7,4,7,7,7,7,7,7],
	[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]
]

//The game objects map

var gameObjects =
[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0]
];


//Map code
var EMPTY = 0;
var CAT = 1;
var HEDGEHOG = 2;
var BOX = 4;
var DOOR = 5;

//The size of each tile cell
var SIZE = 64;

//Sprites we need to access by name
var cat = null;
var door = null;
var gameOverDisplay = null;
var gameOverMessage = null;


//The number of rows and columns
var ROWS = map.length;
var COLUMNS = map[0].length;

//The number of columns on the tilesheet
var tilesheetColumns = 3;

function loadHandler()
{
  assetsLoaded++;
  if(assetsLoaded === assetsToLoad.length)
  {
    //Remove the load handlers
    image.removeEventListener("load", loadHandler, false);

    //Build the map
    gameState = BUILD_MAP;
  }
}

function buildMap(levelMap)
{
  for(var row = 0; row < ROWS; row++)
  {
    for(var column = 0; column < COLUMNS; column++)
    {
      var currentTile = levelMap[row][column];

      if(currentTile !== EMPTY)
      {
        //Find the tile's x and y position on the tile sheet
        var tilesheetX = Math.floor((currentTile - 1) % tilesheetColumns) * SIZE;
        var tilesheetY = Math.floor((currentTile - 1) / tilesheetColumns) * SIZE;

        switch (currentTile)
        {
          case CAT:
            cat = Object.create(spriteObject);
            cat.sourceX = tilesheetX;
            cat.sourceY = tilesheetY;
            cat.x = column * SIZE;
            cat.y = row * SIZE;
            sprites.push(cat);
            break;

          case HEDGEHOG:
            var hedgehog = Object.create(hedgehogObject);
            hedgehog.sourceX = tilesheetX;
            hedgehog.sourceY = tilesheetY;
            hedgehog.x = column * SIZE;
            hedgehog.y = row * SIZE;
            hedgehog.vx = hedgehog.speed;
            sprites.push(hedgehog);
            hedgehogs.push(hedgehog);
            break;

          case BOX:
            var box = Object.create(spriteObject);
            box.sourceX = tilesheetX;
            box.sourceY = tilesheetY;
            box.x = column * SIZE;
            box.y = row * SIZE;
            sprites.push(box);
            boxes.push(box);
            break;

          case DOOR:
            door = Object.create(spriteObject);
            door.sourceX = tilesheetX;
            door.sourceY = tilesheetY;
            door.x = column * SIZE;
            door.y = row * SIZE;
            sprites.push(door);
            break;

          default:
            var sprite = Object.create(spriteObject);
            sprite.sourceX = tilesheetX;
            sprite.sourceY = tilesheetY;
            sprite.x = column * SIZE;
            sprite.y = row * SIZE;
            sprites.push(sprite);
        }
      }
    }
  }
}




first store the actual function in a variable..

var oldFunction = someFunction;
then define your own:

someFunction = function(){
  // do something before
  oldFunction();
  // do something after
};




1) create level
2) add more enemies
3) add pause screen
4) Fix start screen
5)Learn state change for animation


1) Add movement controls
2) Add shoot
3) Add enaemy
4) Add Colision for  top of level and bottom of level



function gameItem(item){
	var blue = item;

	localStorage.setItem("savedItem", blue);

	//CREATES JSON OBJECT WITH DATA,
	// NOTE: CAN CHANGE THESE IF CHANGE PARAMETERS OF FUNCTION
carGame[blue] = {speed: 5,
							x: 100,
							y: 10,
							width: 100,
							height: 80,
							directionX: 1,
							directionY: 1};


			//moveShip
	     var blue2 = carGame[blue];
			 console.log(blue2);
    blue2.x += blue2.speed * blue2.directionX;

		localStorage.setItem("savedItem2", blue2);

			//console.log(blue2);

			// RESETS IMAGE TO PARTICULAR LOCATION
			if (ballHitsRightWall()) {
			//	resetBall();
			//USE TO POSITION IMAGE TO PARTICULAR LOCATION,
			//THE X AND Y VALUES CAN BE CHANGED!
			blue2.x = 200;
			blue2.y = 80;
			blue2.directionX = 0;
			}

	//g = document.createElement('div');
	//g.id = 'desiredId'
	//		<div id="paddleC" class="paddle"></div>

				//CREATE DOM ELEMENT
	var para = document.createElement("div");
	para.id = blue;
	//var node = document.createTextNode("This is new.");
	//para.appendChild(node);

	var element = document.getElementById("gameAssets");
	var child = document.getElementById(blue);
	element.insertBefore(para,child);




				//CHANGE STYLE OF DOC ELEMENT
	var square = document.getElementById(blue);
	//	square.style.backgroundColor = "#fa4";
		square.style.backgroundImage = "url('../images/ship.png')";
//document.getElementById("myDiv").style.backgroundImage = "url('img_tree.png')";
//  document.getElementById("myAnchor").id = "newid";
//document.body.style.backgroundImage = "url('img_tree.png')";

//var square = document.getElementById("square"),
//  square.style.backgroundColor = "#fa4";


var black =localStorage.getItem("savedItem");
var red = "#" + black;

var green  = localStorage.getItem("savedItem2");
	console.log(green);

//var black = "#"+blue;
//console.log(red);
	$(red).css({
		"left" : green.x + green.speed * green.directionX,
		"top" : green.y + green.speed * green.directionY
	});

		/*
		left: 80px;
		 width:50px;
		height:50px;
		transform: rotate(90deg);

		background-image: url(../images/ship.png);
		*/

 //window.requestAnimationFrame();
	// 	blue2.timer = setInterval(gameloop, 1000/30);
	//	function render() {  renderShip();  window.requestAnimationFrame(render);  }
	//	function gameloop() {  moveShip();   }

}
5) Get movement for 2dbox objects.

//in the Step() function
  //cancel gravity for body 1 only
  //bodies[1]->ApplyForce( bodies[1]->GetMass() * -m_world->GetGravity(), bodies[1]->GetWorldCenter() );

switch(e.keyCode) {
  case 38: // UP
  var force = new b2Vec2(0, -10);
    carGame.car.ApplyForce(force, carGame.car.GetWorldCenter());
  //	carGame.car.SetLinearVelocity(new b2Vec2(0,-100));
    //carGame.car.ApplyForce(carGame.car.GetMass() * -carGame.world.GetGravity(), carGame.car.GetWorldCenter() );
    //		var gravity = new b2Vec2(0, 10);

  //	carGame.car.ApplyForce(carGame.car.GetMass() * -carGame.car.GetGravity(), carGame.car.GetWorldCenter() );
    //		carGame.car = createCarAt(50, 210);
    //THIS IS USED TO CREATE CAR IN MAIN GAME function

//	carGame.paddleC.directionY = -1;
//	carGame.paddleC.y += 25 * carGame.paddleC.directionY;


    console.log('UP');
    return false;
    break;

    case 40: //  DOWN
      var force = new b2Vec2(-150, 0);
      carGame.car.ApplyForce(force, carGame.car.GetWorldCenter());


    //	carGame.paddleC.directionY = 1;
    //	carGame.paddleC.y += 25 * carGame.paddleC.directionY;
      console.log('DOWN');
      return false;
      break;
    case 39: // RIGHT
  //	carGame.paddleC.directionX = 1;

  var force = new b2Vec2(0, 150);
    carGame.car.ApplyForce(force, carGame.car.GetWorldCenter());

/*
    //apply gradual force upwards
    bodies[0]->ApplyForce( b2Vec2(0,50), bodies[0]->GetWorldCenter() );
    break;
  case 'w':
    //apply immediate force upwards
    bodies[1]->ApplyLinearImpulse( b2Vec2(0,50), bodies[1]->GetWorldCenter() );

    //Box2D v2.2.1 onwards
    body->SetGravityScale(0);//cancel gravity (use -1 to reverse gravity, etc)
    carGame.car.GetWorldCenter(0);
    //in the Step() function
      //cancel gravity for body 1 only
      bodies[1]->ApplyForce( bodies[1]->GetMass() * -m_world->GetGravity(), bodies[1]->GetWorldCenter() );
*/


//	carGame.paddleC.directionX = 1;
//		carGame.paddleC.x += carGame.paddleC.speed * carGame.paddleC.directionX;
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


'use strict';

//The input and output fields
var input = document.querySelector("#input");
var output = document.querySelector("#output");

 var inputValue;
var outputValue;
//Game variables
var mysteryNumber = 50;
var playersGuess = 0;

var guessesRemaining = 10;
var guessesMade = 0;
var gameState = "";

function change()
{
    document.getElementById("myButton1").value="Close Curtain";
    console.log('blue');
}

function changeColor() {
  document.getElementById("demo").style.color = "red";
}

function changeText() {
  document.getElementById("id2").innerHTML = "Blueman";
}

function guess() {
  document.getElementById("myText").value = "Johnny Bravo";
}


function guess2() {

inputValue = document.getElementById("field2");
outputValue = document.getElementById('noText');

playersGuess = parseInt(inputValue.value);

guessesRemaining--;
guessesMade ++;
gameState = " Guess: " + guessesMade + ", Remaining: " + guessesRemaining;


  //Try 10 times
  if (inputValue.value == "") {
    console.log("please enter text!");
    outputValue.innerHTML = "Please enter text!" +gameState;
    //displays warning if no text
    setTimeout(function () {
    outputValue.innerHTML= "";
  }, 3000);
} else if (playersGuess > mysteryNumber){
    outputValue.innerHTML= "Number too high, try again!" +gameState;
} else if (playersGuess < mysteryNumber) {
      outputValue.innerHTML= "Number too low, try again!" +gameState;
} else if (playersGuess == mysteryNumber){
    outputValue.innerHTML= "Well Done!";

} else {
    outputValue.innerHTML= "Invalid Output!";
}

  console.log(document.getElementById("field2").value);

/*
  //document.getElementById("field2").value;
  if (inputValue.value == "") {
    console.log("please enter text!");
    outputValue.innerHTML = "Please enter text!";
    //displays warning if no text
    setTimeout(function () {
    outputValue.innerHTML= "";
  }, 3000);
} else if (playersGuess > mysteryNumber){
    outputValue.innerHTML= "Number too high, try again!";
} else if (playersGuess < mysteryNumber) {
      outputValue.innerHTML= "Number too low, try again!";
} else {
    outputValue.innerHTML= "Well Done!";

}

  console.log(document.getElementById("field2").value);
  */
}





<!doctype html>
<html>
<head>
<title>Pacmania</title>
<!--<link rel="stylesheet" href="styles.css">  -->

</head>
<body>
<h1>Pac-man</h1>
  <script src="b.js"></script>
  <!--<link rel="stylesheet" href="styles.css">

  <input onclick="change()" type="button" value="Open Curtain" id="myButton1"></input>
  <p id="demo" onclick="changeColor()">Click me to change my color.</p>
  <p id="id2" >Click button to change text!.</p>
  <input onclick="changeText()" type="button" value="Change Text" id="myButton2"></input>
 -->
  <!-- You will not be able to see this text. -->
  <button onclick="guess()" id="myButton3">Try it!</button>

  <input type="text" id="myText"  >


  <p>Guess The Number 10 Times!.</p>

  <!-- You will not be able to see this text. -->
  <button onclick="guess2()" id="myButton4">Guess Number!</button> <br>

  <input type="text" id="field2" autofocus>

  <p>Guess The Number!.</p>

  <p id="noText"></p>

</body>
</html>
