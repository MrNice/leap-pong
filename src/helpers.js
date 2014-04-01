var createPaddle = function(sizeArray, color, coords) {
  var g = new THREE.CubeGeometry(sizeArray[0], sizeArray[1], sizeArray[2]);
  paddle = new THREE.Mesh(g, new THREE.MeshLambertMaterial({color: color}));
  paddle.position.set(coords[0], coords[1], 0.5);
  
  return paddle;
};

var createBall = function(radius, vertslices, horizslices, color) {
  var g = new THREE.SphereGeometry(radius, vertslices, horizslices);
  return new THREE.Mesh(g, new THREE.MeshLambertMaterial({color: color}));
};

var createWalls = function(width, height, depth, thickness) {
   // Create 4 meshes and bind them together

   // Then give them the right material
 };

// var onResize = function() {
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // camera.aspect = window.innerWidth/window.innerHeight;
  // camera.updateProjectionMatrix();
// };

var onMoveKey = function(axis) {
  keyAxis = axis.slice(0);
};

var createBackground = function() {
  var plane = new THREE.Mesh(new THREE.PlaneGeometry(30, 30),
         new THREE.MeshLambertMaterial({color: 0xffffff}));
  plane.position.set(0, 0, -1);
  plane.rotation.set(0, 0, 0);
  scene.add(plane);
};