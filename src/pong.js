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
    controlStyle = 0,
    buttonDebouncer = true,

    // Game objects
    planeMesh,
    borderMesh,
    ballMesh,
    playerMesh,
    cpuMesh,
    topMesh,
    bottomMesh,
    ballLight,
    playerStart = [-7, 0],
    cpuStart = [7, 0],

    // Game state
    gameDims    = [20, 10], // Width & Height
    cameraMod   = 57,
    gameState   = 'initialize',
    ballRadius  = 0.25, // Perfect
    playerDims  = [0.3, 1.2, 0.4], // Same as cpu for now
    cpuDims     = [0.3, 1.2, 0.4], // Same as player for now
    playerColor = 0x0055ff,
    cpuColor    = 0xffcc33,
    ballColor   = 0xffffff,
    playerSpeed = 0.2, // TODO: Calibrate this :D
    cpuSpeed    = 0.09, // TODO: Calibrate this :D
    ballSpeedX  = -0.13, // TODO: Calibrate this
    ballSpeedY  = 0.13, // TODO: Calibrate this
    level       = 1;



var createWorld = function() {
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
  var directionalLight = new THREE.DirectionalLight( 0xffffff, .9 );
  directionalLight.position.set( 0, 0, 10 );
  scene.add( directionalLight );

  var ballLight = new THREE.PointLight( 0x3333ff, 1, 1000 );
  ballLight.position.set(0, 0, 3);
  scene.add( ballLight );

  // Camera
  camera = new THREE.CombinedCamera(gameDims[0] * cameraMod,
                                    gameDims[1] * cameraMod,
                                    70,
                                    1, 20,
                                    -10, 20); // TODO: Fix this

  camera.position.set(0, 0, 10);
  /****************************************************************************/
  camera.toOrthographic();

  // Action
  createBackground();
  scene.add(camera);

};

var updateWorld = function() {
  // Update ball position.
  movePlayer();
  moveCpu();
  ballMesh.position.x += ballSpeedX;
  ballMesh.position.y += ballSpeedY;
};

var gameLoop = function() { // TODO FINISH THIS
  switch(gameState) {

    case 'initialize':
      createWorld();
      camera.position.set(0, 0, 9);
      gameState = 'play';
      break;

    case 'play':
      toggleButtons();
      updateWorld();
      renderer.render(scene, camera);
      // Add game logic here
      checkCollisions();
      break;

    case 'levelUp':
      if(level === 1) {
        level = 2;
        // transitionToPerspective();
        camera.toPerspective();
      } else if(level === 2) {
        level = 3;
        // danceParty.start();
      }
      gameState = 'play';
      $('#level').text('Level ' + level);
      break;

    case 'levelDown':
      if(level === 2) {
        level = 1;
        // transitionToPerspective();
        camera.toOrthographic();
      } else if(level === 3){
        level = 2;
        // danceParty.end();
      }
      $('#level').text('Level ' + level);
      gameState = 'play';
      break;

    case 'loseBall':
      break;
  }

  // Keep the game loop going
  requestAnimationFrame(gameLoop);
};


$(function() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameDims[0] * cameraMod, gameDims[1] * cameraMod);
  document.getElementById('gamebox').appendChild(renderer.domElement);

  // Start the game loop
  requestAnimationFrame(gameLoop);
});