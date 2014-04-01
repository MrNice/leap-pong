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
  var wall = new THREE.Mesh(new THREE.CubeGeometry(gameDims[0] - 3, cpuDims[0], 0.4),
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