var createPaddle = function(sizeArray, color) {
  var g = new THREE.CubeGeometry(sizeArray[0], sizeArray[1], sizeArray[2]);
  return new THREE.Mesh(g, new THREE.MeshLambertMaterial({color: color}));
};

var createBall = function(radius, vertslices, horizslices, color) {
  var g = new THREE.SphereGeometry(radius, vertslices, horizslices);
  return new THREE.Mesh(g, new THREE.MeshLambertMaterial({color: color}));
};

var createWalls = function(width, height, depth, thickness) {
   // Create 4 meshes and bind them together

   // Then give them the right material
 };

var onResize = function() {
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // camera.aspect = window.innerWidth/window.innerHeight;
  // camera.updateProjectionMatrix();
};

var onMoveKey = function(axis) {
  keyAxis = axis.slice(0);
};