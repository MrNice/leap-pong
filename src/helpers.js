var createWallMesh = function(coords) {
  var wall = new THREE.Mesh(new THREE.CubeGeometry(gameDims[0] - 3, 0.4, 5),
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
  var ball = new THREE.Mesh(g, new THREE.MeshLambertMaterial({map: ballTexture}));
  ball.position.set(0,0,0);
  ball.rotation.set(0, -(Math.PI/2), 0);
  return ball;
};

var createBackground = function() {
  var plane = new THREE.Mesh(new THREE.PlaneGeometry(30, 30),
         new THREE.MeshLambertMaterial({color: 0xffffff}));
  plane.position.set(0, 0, -1);
  plane.rotation.set(0, 0, 0);
  return plane;
};

var toggleBackground = function() {
  scene.remove(backgroundMesh);
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
    var position = leapPosition - 0.7;
    position *= 6;
    if(playerMesh.position.y < 4 && playerMesh.position.y < position){
      playerMesh.position.y = position;
    } else if (- playerMesh.position.y < 4 && playerMesh.position.y > position){
      playerMesh.position.y = position;
    }
  }
};

var moveCpu = function() {
  if(cpuDisabled) return;
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
    ballRotationY *= -1;
  }

  if(Math.abs(Math.abs(ballMesh.position.x) - 6.85) < 0.05) {
    if(ballMesh.position.x < 0) {
      if(Math.abs(playerMesh.position.y - ballMesh.position.y) < 1.2) {
        ballSpeedX = 0.13;
        ballSpeedY = 0.13 * ((ballMesh.position.y - playerMesh.position.y)/1.2);
        ballRotationY *= -1;
      }
    } else {
      if(Math.abs(cpuMesh.position.y - ballMesh.position.y) < 1.2) {
        ballSpeedX = -0.13;
        ballSpeedY = 0.13 * ((ballMesh.position.y - cpuMesh.position.y)/1.2);
        ballRotationY *= -1;
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
    ballRotationY *= -1;
  }
};

var rotateBall = function() {
  if(level !== 1) {
    ballMesh.rotation.x += ballRotationX;
    ballMesh.rotation.y += ballRotationY;
    ballMesh.rotation.z += ballRotationZ;
  }
};

var volumeInit = function() {
    // var ctx = new webkitAudioContext()
    // , url = '//kevincennis.com/sound/loudpipes.mp3'  
    // , audio = new Audio(url)
    // // 2048 sample buffer, 1 channel in, 1 channel out  
    // , processor = ctx.createJavaScriptNode(2048, 1, 1)
    // , meter = document.getElementById('meter')
    // , source;

//       audio.addEventListener('canplaythrough', function(){
//     source = ctx.createMediaElementSource(audio)
//     source.connect(processor)
//     source.connect(ctx.destination)
//     processor.connect(ctx.destination)
//     audio.play()
//   }, false);
//   processor.onaudioprocess = function(evt){
// var input = evt.inputBuffer.getChannelData(0)
//   , len = input.length   
//   , total = i = 0
//   , rms;
//   while ( i < len ) total += Math.abs( input[i++] )
//   rms = Math.sqrt( total / len )
//   volume = rms;
// };
};
