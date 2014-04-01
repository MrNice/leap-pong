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
    backgroundMesh,
    ballLight,
    playerStart = [-7, 0],
    cpuStart    = [7, 0],
    ballTexture = THREE.ImageUtils.loadTexture('img/hr2.png'),

    // Game state
    gameDims    = [20, 10], // Width & Height
    cameraMod   = 57,
    gameState   = 'initialize',
    cpuDisabled = true,
    // ballRadius  = 0.25, // Perfect
    ballRadius = 0.35,
    playerDims  = [0.3, 1.2, 0.4], // Same as cpu for now
    cpuDims     = [0.3, 1.2, 0.4], // Same as player for now
    playerColor = 0x0055ff,
    cpuColor    = 0xffcc33,
    ballColor   = 0xffffff,
    playerSpeed = 0.2, // TODO: Calibrate this :D
    cpuSpeed    = 0.09, // TODO: Calibrate this :D
    ballSpeedX  = -0.13, // TODO: Calibrate this
    ballSpeedY  = 0.13, // TODO: Calibrate this
    ballRotationX = 0.05,
    ballRotationY = 0.05,
    ballRotationZ = 0.02,
    level       = 1,
    danceParty  = {
      on: function(){

      },
      off: function(){

      },
      render: function(){

      }
    };




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
  var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
  directionalLight.position.set( 0, 0, 10 );
  scene.add( directionalLight );

  var ballLight = new THREE.PointLight( 0x3333ff, 1, 1000 );
  ballLight.position.set(0, 0, 3);
  scene.add( ballLight );

  var spotLight = new THREE.SpotLight( 0xffffff, 5 );
  spotLight.castShadow = true;
  spotLight.shadowMapWidth = 10;
  spotLight.shadowMapHeight = 10;
  spotLight.shadowCameraNear = 20;
  spotLight.shadowCameraFar = 100;
  spotLight.shadowCameraFov = 70;
  spotLight.position.set( -10, 10, 0 );
  spotLight.rotation.set(Math.PI/6, Math.PI/6, 0);
  scene.add( spotLight );
  spotLight = new THREE.SpotLight( 0xffffff, 5 );
  spotLight.castShadow = true;
  spotLight.shadowMapWidth = 10;
  spotLight.shadowMapHeight = 10;
  spotLight.shadowCameraNear = 20;
  spotLight.shadowCameraFar = 100;
  spotLight.shadowCameraFov = 70;
  spotLight.position.set( 10, -10, 0 );
  spotLight.rotation.set(-Math.PI/6, -Math.PI/6, 0);
  scene.add( spotLight );

  // Camera
  camera = new THREE.CombinedCamera(gameDims[0] * cameraMod,
                                    gameDims[1] * cameraMod,
                                    70,
                                    1, 25,
                                    -10, 20); // TODO: Fix this

  camera.position.set(0, 0, 10);
  /****************************************************************************/
  camera.toOrthographic();

  // Action
  backgroundMesh = createBackground();
  scene.add(backgroundMesh);
  scene.add(camera);

};

var updateWorld = function() {
  // Update ball position.
  movePlayer();
  moveCpu();
  ballMesh.position.x += ballSpeedX;
  ballMesh.position.y += ballSpeedY;
  rotateBall();
};

var gameLoop = function() { // TODO FINISH THIS
  switch(gameState) {

    case 'initialize':
      createWorld();
      initParticles();
      camera.position.set(0, 0, 9);
      gameState = 'play';
      break;

    case 'play':
      toggleButtons();
      updateWorld();
      danceParty.render();
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
        danceParty.on();
      }
      gameState = 'play';
      $('#level').text('Level ' + level);
      break;

    case 'levelDown':
      if(level === 2) {
        level = 1;
        // transitionToPerspective();
        ballMesh.rotation.set(0, -(Math.PI/2), 0);
        camera.toOrthographic();
      } else if(level === 3){
        level = 2;
        danceParty.off();
      }
      $('#level').text('Level ' + level);
      gameState = 'play';
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