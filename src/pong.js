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
    light,

    // Game state
    gameDims    = [20, 14], // Width & Height
    gameState   = 'initialize',
    ballRadius  = 0.25, // Perfect
    playerDims  = [0.3, 1.2, 0.6], // Same as cpu for now
    cpuDims     = [0.3, 1.2, 0.6], // Same as player for now
    wallDims    = [7, 10, 1, 0.3], // Autocadded for basic feel
    playerColor = 0xbbbbcc,
    cpuColor    = 0xbbbbcc,
    ballColor   = 0xffffff,
    paddleSpeed = undefined, // TODO: Calibrate this :D
    ballSpeedX  = undefined, // TODO: Calibrate this
    ballSpeedY  = undefined, // TODO: Calibrate this
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
    wPlayer,
    wCpu,
    wBall;

    var createPhysicsWorld = function() {
      // Make world object
      wWorld = new b2World(new b2Vec2(0, 0), true);

      // Create the paddles
      var bodyDef = new b2BodyDef();
      bodyDef.type = b2Body.b2_dynamicBody;

      bodyDef.position.Set(-1.5, playerDims[1]/2);
      wPlayer = wWorld.CreateBody(bodyDef);
    };

    var createRenderWorld = function() {
      scene = new THREE.Scene();

      // Meshes for paddles, ball, and walls
      playerMesh = createPaddle(playerDims, playerColor);
      cpuMesh = createPaddle(cpuDims, cpuColor);
      ballMesh = createBall(ballRadius, 32, 32, ballColor);
      wallsMesh = createWalls(wallDims[0], wallDims[1], wallDims[2], wallDims[3])
      scene.add(playerMesh);
      scene.add(cpuMesh);
      scene.add(ballMesh);

      // Lights
      var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
      directionalLight.position.set( 0, 1, 5 );
      scene.add( directionalLight );

      // Camera
      camera = new THREE.CombinedCamera( gameDims[0]*57, gameDims[1]*57, 30, 1, 10, - 10, 20); // TODO: Fix this
      camera.position.set(0, 0, 9);
      camera.toOrthographic();

      // Action
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
      renderer.setSize(gameDims[0]*57, gameDims[1]*57);
      // $('#gamebox').appendChild(renderer.domElement);
      // document.body.appendChild(renderer.domElement);
      document.getElementById('gamebox').appendChild(renderer.domElement);


      // Input Event Bindings
      KeyboardJS.bind.axis('up', 'down', onMoveKey);
      $(window).resize(onResize);

      // Start the game loop
      requestAnimationFrame(gameLoop);
    });