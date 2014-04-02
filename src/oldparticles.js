var particleCount = 1800,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 20
    });
var initParticles = function() {
  // // now create the individual particles
  // for (var p = 0; p < particleCount; p++) {

  //   // create a particle with random
  //   // position values, -250 -> 250
  //   var pX = Math.random() * 500 - 250,
  //       pY = Math.random() * 500 - 250,
  //       pZ = Math.random() * 500 - 250,
  //       particle = 
  //         new THREE.Vector3(pX, pY, pZ);
  //   particle.velocity = new THREE.Vector3(
  //                       0,              // x
  //                       -Math.random(), // y: random vel
  //                       0);             // z

        

  //   // add it to the geometry
  //   particles.vertices.push(particle);
  // }

  // // create the particle system
  // particleSystem = new THREE.ParticleSystem(
  //     particles,
  //     pMaterial);

  // // add it to the scene
  // scene.add(particleSystem);

  // // create the particle variables
  // pMaterial = new THREE.ParticleBasicMaterial({
  //   color: 0xFFFFFF,
  //   size: 0.5,
  //   blending: THREE.AdditiveBlending,
  //   transparent: true
  // });
  // // also update the particle system to
  // // sort the particles which enables
  // // the behaviour we want
  // particleSystem.sortParticles = true;
};

// create a velocity vector
var updateParticles = function() {

  // var pCount = particleCount;
  // while (pCount--) {

  //   // get the particle
  //   console.log(particles);
  //   var particle =
  //     particles.vertices[pCount];

  //   // check if we need to reset
  //   if (particle.position.y < -200) {
  //     particle.position.y = 200;
  //     particle.velocity.y = 0;
  //   }

  //   // update the velocity with
  //   // a splat of randomniz
  //   particle.velocity.y -= Math.random() * .1;

  //   // and the position
  //   particle.position.addSelf(
  //     particle.velocity);
  // }

  // // flag to the particle system
  // // that we've changed its vertices.
  // particleSystem.
  //   geometry.
  //   __dirtyVertices = true;
};