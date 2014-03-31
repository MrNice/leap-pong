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
    gameState   = 'initialize',
    ballRadius  = 0.25,
    playerDims  = [0.3, 1.2, 0.6],
    cpuDims     = [0.3, 1.2, 0.6],
    wallDims    = [6, 7.2, 0.6, 0.3], // Width*20, Height*6, Depth, width
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
    wBall;

    var createPhysicsWorld = function() {

    };

    var createRenderWorld = function() {
      scene = new THREE.Scene();

      var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
      directionalLight.position.set( 0, 1, 5 );
      scene.add( directionalLight );

      // Meshes for paddles, ball, and walls
      playerMesh = createPaddle(playerDims, playerColor);
      cpuMesh = createPaddle(cpuDims, cpuColor);
      ballMesh = createBall(ballRadius, 32, 32, ballColor);
      wallsMesh = createWalls(wallDims[0], wallDims[1], wallDims[2], wallDims[3])
      scene.add(playerMesh);
      scene.add(cpuMesh);
      scene.add(ballMesh);

      camera = new THREE.CombinedCamera( window.innerWidth / 2, window.innerHeight / 2, 70, 1, 10, - 5, 10); // TODO: Fix this
      camera.position.set(1, 1, 4);
      camera.toOrthographic();
      scene.add(camera);

    };

    var createMeshes = function() {

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
          camera.position.set(1, 1, 5);
          gameState = 'play';
          break;

        case 'play':
          updateRenderWorld();
          renderer.render(scene, camera);
          break;

        case 'levelUp':
          break;
      }

      // Keep the game loop going
      requestAnimationFrame(gameLoop);
    };

    var onResize = function() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
    };

    var onMoveKey = function(axis) {
      keyAxis = axis.slice(0);
    };

    jQuery.fn.centerv = function() {

    };

    jQuery.fn.centerh = function() {

    };

    jQuery.fn.center = function() {
      this.centerv();
      this.centerh();
      return this;
    };

    $(function() {

      // Create the Renderer:
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // Input Event Bindings
      KeyboardJS.bind.axis('up', 'down', onMoveKey);
      $(window).resize(onResize);

      // Start the game loop
      requestAnimationFrame(gameLoop);
    });