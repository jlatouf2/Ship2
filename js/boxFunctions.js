
	/*********************(****** 2D BOX FCNS ********)**************************/


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
