var createWallMesh = function(coords) {
  var wall = new THREE.Mesh(new THREE.CubeGeometry(gameDims[0] - 3, 0.4, 0.4),
         new THREE.MeshLambertMaterial({color: 0x666666}));

  wall.position.set(coords[0], coords[1], -0.5);
  return wall;
};

var createPaddleMesh = function(sizeArray, color, coords) {
  var g = new THREE.CubeGeometry(sizeArray[0], sizeArray[1], sizeArray[2]);
  var paddle = new THREE.Mesh(g, new THREE.MeshPhongMaterial({color: color}));
  paddle.position.set(coords[0], coords[1], 0);

  return paddle;
};

var createBallMesh = function(radius, vertslices, horizslices, color) {
  var g = new THREE.SphereGeometry(radius, vertslices, horizslices);
  var ball = new THREE.Mesh(g, new THREE.MeshPhongMaterial({color: color}));
  ball.position.set(0,0,0);
  return ball;
};

var createBackground = function() {
  var plane = new THREE.Mesh(new THREE.PlaneGeometry(30, 30),
         new THREE.MeshLambertMaterial({color: 0xffffff}));
  plane.position.set(0, 0, -1);
  plane.rotation.set(0, 0, 0);
  scene.add(plane);
};

var onMoveKey = function(axis) {
  keyAxis = axis.slice(0);
};

var toggleButtons = function() {
  if(buttonDebouncer) {
    var keys = KeyboardJS.activeKeys();
    if(keys[0] === "c"){
      if(camera.inOrthographicMode) {
        camera.toPerspective();
      } else {
        camera.toOrthographic();
      }
      buttonDebouncer = false;
      setTimeout(function() { buttonDebouncer = true; }, 200);
    }
    if(keys[0] === "l"){
      controlStyle = 1; // Leap Mode
      buttonDebouncer = false;
      setTimeout(function() { buttonDebouncer = true; }, 200);
    }
    if(keys[0] === "k"){
      controlStyle = 0; // Keyboard Mode
      buttonDebouncer = false;
      setTimeout(function() { buttonDebouncer = true; }, 200);
    }
  }
};

var movePlayer = function() {
  var keys = KeyboardJS.activeKeys();
  if(!controlStyle){
    if(keys[0] === "w"){
      if(playerMesh.position.y < 4){
        playerMesh.position.y += playerSpeed;
      }
    }
    if(keys[0] === "s") {
      if(- playerMesh.position.y < 4){
        playerMesh.position.y -= playerSpeed;
      }
    }
  } else {
    // Leap Control
    var position = leapPosition - 0.5;
    position *= 6;
    if(playerMesh.position.y < 4 && playerMesh.position.y < position){
      playerMesh.position.y = position;
    } else if (- playerMesh.position.y < 4 && playerMesh.position.y > position){
      playerMesh.position.y = position;
    }
  }
};

var moveCpu = function() {
  if(ballMesh.position.x > 2 && ballSpeedX > 0) {
    if(cpuMesh.position.y < 4 && ballMesh.position.y > cpuMesh.position.y){
      cpuMesh.position.y += cpuSpeed;
    } else if(-cpuMesh.position.y < 4 && ballMesh.position.y < cpuMesh.position.y){
      cpuMesh.position.y -= cpuSpeed;
    }
  }
};

var checkCollisions = function() {
  if((Math.abs(ballMesh.position.y) + ballRadius + 0.3) > gameDims[1]/2) {
    //Play Noise
    ballSpeedY *= -1;
  }

  if(Math.abs(Math.abs(ballMesh.position.x) - 6.85) < 0.05) {
    if(ballMesh.position.x < 0) {
      if(Math.abs(playerMesh.position.y - ballMesh.position.y) < 1.2) {
        ballSpeedX = 0.13;
        ballSpeedY = 0.13 * ((ballMesh.position.y - playerMesh.position.y)/1.2);
      }
    } else {
      if(Math.abs(cpuMesh.position.y - ballMesh.position.y) < 1.2) {
        ballSpeedX = -0.13;
        ballSpeedY = 0.13 * ((ballMesh.position.y - cpuMesh.position.y)/1.2);
      }
    }
  }

  if(Math.abs(ballMesh.position.x) + ballRadius > 10) {
    //Play Noise
    if(ballMesh.position.x > 0) {
      gameState = 'levelUp';
    } else {
      gameState = 'levelDown';
    }
    ballSpeedX *= -1;
  }
};