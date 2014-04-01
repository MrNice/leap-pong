/****************************************
Hacker Pong
Cohort 11 Hackathon Project
MrNice <Nicholas@niceguys.co>
Made with love and theft <3
****************************************/

var camera,
    scene,
    renderer,
    light,

    // Keyboard
    keyAxis = [0, 0],

    // Game objects
    planeMesh,
    borderMesh,
    ballMesh,
    playerMesh,
    cpuMesh,
    topMesh,
    bottomMesh,
    ballLight,
    playerStart = [-5, 0],
    cpuStart = [5, 0],


    // Game state
    gameDims    = [17, 10], // Width & Height
    cameraMod   = 57,
    gameState   = 'initialize',
    ballRadius  = 0.25, // Perfect
    playerDims  = [0.3, 1.2, 0.4], // Same as cpu for now
    cpuDims     = [0.3, 1.2, 0.4], // Same as player for now
    playerColor = 0x0055ff,
    cpuColor    = 0xffcc33,
    ballColor   = 0xffffff,
    playerSpeed = 0.3, // TODO: Calibrate this :D
    cpuSpeed    = 0.1, // TODO: Calibrate this :D
    ballSpeedX  = -0.2, // TODO: Calibrate this
    ballSpeedY  = 0.2, // TODO: Calibrate this
    level       = 1,

    // Textures

    // Box2D shortcuts
    b2World        = Box2D.Dynamics.b2World,
    b2FixtureDef   = Box2D.Dynamics.b2FixtureDef,
    b2BodyDef      = Box2D.Dynamics.b2BodyDef,
    b2Body         = Box2D.Dynamics.b2Body,
    b2CircleShape  = Box2D.Collision.Shapes.b2CircleShape,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2Settings     = Box2D.Common.b2Settings,
    b2Vec2         = Box2D.Common.Math.b2Vec2,

    // Box2D world variables
    wWorld,
    wTop,
    wBottom,
    wPlayer,
    wCpu,
    wBall;

    var createPhysicsWorld = function() {
      wWorld = new b2World(new b2Vec2(0, 0), true);

      var fixDef = new b2FixtureDef();
      var bodyDef = new b2BodyDef();

      bodyDef.type = b2Body.b2_staticBody;// Paddles are controlled seperately from game physics
      fixDef.density = 0.5;
      fixDef.friction = 0.0;
      fixDef.resitution = 1;
      fixDef.shape = new b2PolygonShape();

      // Game Walls
      fixDef.shape.SetAsBox(gameDims[0], cpuDims[0]);
      bodyDef.position.Set(0, gameDims[1]/2);
      wTop = wWorld.CreateBody(bodyDef).CreateFixture(fixDef);

      bodyDef.position.Set(0, - gameDims[1]/2);
      wBottom = wWorld.CreateBody(bodyDef).CreateFixture(fixDef);


      // Player
      bodyDef.position.Set(playerStart, playerDims[1]/2);
      fixDef.shape.SetAsBox(playerDims[0], playerDims[1]);
      wPlayer = wWorld.CreateBody(bodyDef).CreateFixture(fixDef);

      // CPU
      bodyDef.position.Set(cpuStart, cpuDims[1]/2);
      fixDef.shape.SetAsBox(cpuDims[0], cpuDims[1]);
      wCpu = wWorld.CreateBody(bodyDef).CreateFixture(fixDef);

      // Add the ball
      bodyDef.type = b2Body.b2_dynamicBody;
      bodyDef.position.Set(0, 0);
      fixDef.shape = new b2CircleShape(ballRadius);
      wBall = wWorld.CreateBody(bodyDef).CreateFixture(fixDef);

    };

    var createRenderWorld = function() {
      scene = new THREE.Scene();

      // Meshes for paddles, ball, and walls
      playerMesh = createPaddleMesh(playerDims, playerColor, playerStart);
      cpuMesh = createPaddleMesh(cpuDims, cpuColor, cpuStart);
      ballMesh = createBallMesh(ballRadius, 32, 32, ballColor);
      topMesh = createWallMesh([0, gameDims[1]/2 - 0.3]);
      bottomMesh = createWallMesh([0, - (gameDims[1]/2 - 0.3)]);
      scene.add(playerMesh);
      scene.add(cpuMesh);
      scene.add(ballMesh);
      scene.add(topMesh);
      scene.add(bottomMesh);

      // Lights
      var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
      directionalLight.position.set( 0, 0, 5 );
      scene.add( directionalLight );

      var ballLight = new THREE.PointLight( 0xffffff, 1, 1000 );
      ballLight.position.set(0, 0, 4);
      scene.add( ballLight );

      // Camera
      camera = new THREE.CombinedCamera( gameDims[0] * cameraMod,
                                         gameDims[1] * cameraMod,
                                         70,
                                         1, 20,
                                         -10, 20); // TODO: Fix this
      camera.position.set(0, 0, 10);
      /****************************************************************************/
      // camera.toOrthographic();

      // Action
      createBackground();
      scene.add(camera);

    };

    var updatePhysicsWorld = function() {

    };

    var updateRenderWorld = function() {

    };

    var gameLoop = function() { // TODO FINISH THIS
      switch(gameState) {

        case 'initialize':
          createPhysicsWorld();
          createRenderWorld();
          camera.position.set(0, 0, 9);
          gameState = 'play';
          break;

        case 'play':
          updateRenderWorld();
          renderer.render(scene, camera);
          // Add game logic here
          break;

        case 'levelUp':
          break;

        case 'loseBall':
          break;
      }

      // Keep the game loop going
      requestAnimationFrame(gameLoop);
    };


    $(function() {
      // Create the Renderer:
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(gameDims[0] * cameraMod, gameDims[1] * cameraMod);
      // $('#gamebox').appendChild(renderer.domElement);
      // document.body.appendChild(renderer.domElement);
      document.getElementById('gamebox').appendChild(renderer.domElement);


      // Input Event Bindings
      KeyboardJS.bind.axis('up', 'down', onMoveKey);
      // $(window).resize(onResize);

      // Start the game loop
      requestAnimationFrame(gameLoop);
    });