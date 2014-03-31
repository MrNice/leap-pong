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
    // Game state
    gameState   = 'initialize',
    ballRadius  = 0.25,
    playerDims  = [0.3, 1.2],
    cpuDims     = [0.3, 1.2],
    paddleSpeed = undefined, // TODO: Calibrate this :D
    ballSpeedX  = undefined, // TODO: Calibrate this
    ballSpeedY  = undefined, // TODO: Calibrate this
    level       = 1,
    // Textures

    // Box2d shortcuts
    b2World        = Box2d.Dynamics.b2World,
    b2FixtureDef   = Box2d.Dynamics.b2FixtureDef,
    b2BodyDef      = Box2D.Dynamics.b2BodyDef,
    b2Body         = Box2D.Dynamics.b2Body,
    b2CircleShape  = Box2D.Collision.Shapes.b2CircleShape,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2Settings     = Box2D.Common.b2Settings,
    b2Vec2         = Box2D.Common.Math.b2Vec2,
    // Box2d world variables
    wWorld,
    wBall;

    var createPhysicsWorld = function() {

    };

    var createRenderWorld = function() {

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
          break;

        case 'play':
          break;

        case 'levelUp':
          break;
      }
    };

    var onResize = function() {

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

      requestAnimationFrame(gameLoop);
    });