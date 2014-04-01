var createPaddleMesh = function(sizeArray, color, coords) {
  var g = new THREE.CubeGeometry(sizeArray[0], sizeArray[1], sizeArray[2]);
  paddle = new THREE.Mesh(g, new THREE.MeshLambertMaterial({color: color}));
  paddle.position.set(coords[0], coords[1], 0.5);

  return paddle;
};

var createBallMesh = function(radius, vertslices, horizslices, color) {
  var g = new THREE.SphereGeometry(radius, vertslices, horizslices);
  return new THREE.Mesh(g, new THREE.MeshLambertMaterial({color: color}));
};

var createBackground = function() {
  var plane = new THREE.Mesh(new THREE.PlaneGeometry(30, 30),
         new THREE.MeshLambertMaterial({color: 0xffffff}));
  plane.position.set(0, 0, -1);
  plane.rotation.set(0, 0, 0);
  scene.add(plane);
};

var createWallMesh = function(coords) {
  var wall = new THREE.Mesh(new THREE.CubeGeometry(gameDims[0] - 3, 0.4, 0.4),
         new THREE.MeshLambertMaterial({color: 0x666666}));

  wall.position.set(coords[0], coords[1], 1);
  return wall;
};

var onMoveKey = function(axis) {
  keyAxis = axis.slice(0);
};

var updatePaddle = function(target, paddleBody) {
  // Updates a paddle given a target

};

var movePlayer = function() {
  var keys = KeyboardJS.activeKeys();
  if(keys[0] === "l"){
    controlStyle = 1; // Leap Mode
  }
  if(keys[0] === "k"){
    controlStyle = 0; // Keyboard Mode
  }
  if(keys[0] === "w"){
    playerMesh.position.y += playerSpeed;
  }
  if(keys[0] === "s") {
    playerMesh.position.y -= playerSpeed;
  }
};

var moveCpu = function() {
  if(ballMesh.position.x > 1 && ballSpeedX > 0) {
    if(ballMesh.position.y > cpuMesh.position.y) {
      cpuMesh.position.y += cpuSpeed;
    } else {
      cpuMesh.position.y -= cpuSpeed;
    }
  }
};

var checkCollisions = function() {
  if((Math.abs(ballMesh.position.y) + ballRadius + 0.5) > gameDims[1]/2) {
    //Play Noise
    ballSpeedY *= -1;
  }

  if(Math.abs(Math.abs(ballMesh.position.x - 0.13) - 7) < 0.05) {
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

  if(Math.abs(ballMesh.position.x + ballRadius) > 10) {
    //Play Noise
    if(ballMesh.position.x > 0) {
      gameState = 'levelUp';
    } else {
      gameState = 'levelDown';
    }
    ballSpeedX *= -1;
  }
};