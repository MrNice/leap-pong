var delta = 1, clock = new THREE.Clock();
var heartShape, particleCloud, sparksEmitter, emitterPos;
var _rotation = 0;
var timeOnShapePath = 0;
var composer;
var effectBlurX, effectBlurY, hblur, vblur;
var group, text, plane;
var speed = 50;

var initParticles = function(){
  pointLight = new THREE.PointLight( 0xffffff, 2, 300 );
  pointLight.position.set( 0, 0, 0 );
  scene.add( pointLight );
  group = new THREE.Object3D();
  scene.add( group );

  // Create particle objects for Three.js

  var particlesLength = 20000;

  var particles = new THREE.Geometry();

  function newpos( x, y, z ) {

    return new THREE.Vector3( x, y, z );

  }


  var Pool = {
    __pools: [],
    // Get a new Vector
    get: function() {
      if ( this.__pools.length > 0 ) {
        return this.__pools.pop();
      }
      console.log( "pool ran out!" )
      return null;
    },
    // Release a vector back into the pool
    add: function( v ) {
      this.__pools.push( v );
    }
  };


  for ( i = 0; i < particlesLength; i ++ ) {

    particles.vertices.push( newpos( Math.random() * 200 - 100, Math.random() * 100 + 150, Math.random() * 50 ) );
    Pool.add( i );

  }


  // Create pools of vectors

  attributes = {

    size:  { type: 'f', value: [] },
    pcolor: { type: 'c', value: [] }

  };

  var sprite = generateSprite() ;

  texture = new THREE.Texture( sprite );
  texture.needsUpdate = true;

  uniforms = {

    texture:   { type: "t", value: texture }

  };

  // PARAMETERS

  // Steadycounter
  // Life
  // Opacity
  // Hue Speed
  // Movement Speed

  function generateSprite() {
    var canvas = document.createElement( 'canvas' );
    canvas.width = 128;
    canvas.height = 128;

    var context = canvas.getContext( '2d' );

    context.beginPath();
    context.arc( 64, 64, 60, 0, Math.PI * 2, false) ;

    context.lineWidth = 0.5; //0.05
    context.stroke();
    context.restore();

    var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );

    gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
    gradient.addColorStop( 0.2, 'rgba(255,255,255,1)' );
    gradient.addColorStop( 0.4, 'rgba(200,200,200,1)' );
    gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

    context.fillStyle = gradient;

    context.fill();

    return canvas;

  }


  var shaderMaterial = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    attributes: attributes,

    vertexShader: document.getElementById( 'vertexshader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true

  });

  particleCloud = new THREE.ParticleSystem( particles, shaderMaterial );
    var vertices = particleCloud.geometry.vertices;
  var values_size = attributes.size.value;
  var values_color = attributes.pcolor.value;

  for( var v = 0; v < vertices.length; v ++ ) {

    values_size[ v ] = 50;

    values_color[ v ] = new THREE.Color( 0x000000 );

    particles.vertices[ v ].set( Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY );

  }

  group.add( particleCloud );
  particleCloud.y = 800;


  // Create Particle Systems

  // EMITTER STUFF

  // Heart

  var x = 0, y = 0;

  heartShape = new THREE.Shape();

  heartShape.moveTo( x + 25, y + 25 );
  heartShape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
  heartShape.bezierCurveTo( x - 30, y, x - 30, y + 35,x - 30,y + 35 );
  heartShape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
  heartShape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
  heartShape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
  heartShape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );


  var hue = 0;

  var setTargetParticle = function() {

    var target = Pool.get();
    values_size[ target ] = Math.random() * 200 + 100;

    return target;

  };

  var onParticleCreated = function( p ) {

    var position = p.position;
    p.target.position = position;

    var target = p.target;

    if ( target ) {

      // console.log(target,particles.vertices[target]);
      // values_size[target]
      // values_color[target]

      hue += 0.0003 * delta;
      if ( hue > 1 ) hue -= 1;

      // TODO Create a PointOnShape Action/Zone in the particle engine

      timeOnShapePath += 0.00035 * delta;
      if ( timeOnShapePath > 1 ) timeOnShapePath -= 1;

      var pointOnShape = heartShape.getPointAt( timeOnShapePath );

      emitterpos.x = pointOnShape.x * 5 - 100;
      emitterpos.y = -pointOnShape.y * 5 + 400;

      // pointLight.position.copy( emitterpos );
      pointLight.position.x = emitterpos.x;
      pointLight.position.y = emitterpos.y;
      pointLight.position.z = 100;

      particles.vertices[ target ] = p.position;

      values_color[ target ].setHSL( hue, 0.6, 0.1 );

      pointLight.color.setHSL( hue, 0.8, 0.5 );


    };

  };

  var onParticleDead = function( particle ) {

    var target = particle.target;

    if ( target ) {

      // Hide the particle

      values_color[ target ].setRGB( 0, 0, 0 );
      particles.vertices[ target ].set( Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY );

      // Mark particle system as available by returning to pool

      Pool.add( particle.target );

    }

  };

  var engineLoopUpdate = function() {

  };


  sparksEmitter = new SPARKS.Emitter( new SPARKS.SteadyCounter( 500 ) );

  emitterpos = new THREE.Vector3( 0, 0, 0 );

  sparksEmitter.addInitializer( new SPARKS.Position( new SPARKS.PointZone( emitterpos ) ) );
  sparksEmitter.addInitializer( new SPARKS.Lifetime( 1, 15 ));
  sparksEmitter.addInitializer( new SPARKS.Target( null, setTargetParticle ) );


  sparksEmitter.addInitializer( new SPARKS.Velocity( new SPARKS.PointZone( new THREE.Vector3( 0, -5, 1 ) ) ) );
  // TOTRY Set velocity to move away from centroid

  sparksEmitter.addAction( new SPARKS.Age() );
  sparksEmitter.addAction( new SPARKS.Accelerate( 0, 0, -50 ) );
  sparksEmitter.addAction( new SPARKS.Move() );
  sparksEmitter.addAction( new SPARKS.RandomDrift( 90, 100, 2000 ) );


  sparksEmitter.addCallback( "created", onParticleCreated );
  sparksEmitter.addCallback( "dead", onParticleDead );
  sparksEmitter.start();


  // POST PROCESSING

  var effectFocus = new THREE.ShaderPass( THREE.FocusShader );

  var effectCopy = new THREE.ShaderPass( THREE.CopyShader );
  effectFilm = new THREE.FilmPass( 0.5, 0.25, 2048, false );

  var shaderBlur = THREE.TriangleBlurShader;
  effectBlurX = new THREE.ShaderPass( shaderBlur, 'texture' );
  effectBlurY = new THREE.ShaderPass( shaderBlur, 'texture' );

  var radius = 15;
  var blurAmountX = radius / window.innerWidth;
  var blurAmountY = radius / window.innerHeight;

  hblur = new THREE.ShaderPass( THREE.HorizontalBlurShader );
  vblur = new THREE.ShaderPass( THREE.VerticalBlurShader);

  hblur.uniforms[ 'h' ].value =  1 / window.innerWidth;
  vblur.uniforms[ 'v' ].value =  1 / window.innerHeight;

  effectBlurX.uniforms[ 'delta' ].value = new THREE.Vector2( blurAmountX, 0 );
  effectBlurY.uniforms[ 'delta' ].value = new THREE.Vector2( 0, blurAmountY );

  effectFocus.uniforms[ 'sampleDistance' ].value = 0.99; //0.94
  effectFocus.uniforms[ 'waveFactor' ].value = 0.003;  //0.00125

  var renderScene = new THREE.RenderPass( scene, camera );

  composer = new THREE.EffectComposer( renderer );
  composer.addPass( renderScene );
  composer.addPass( hblur );
  composer.addPass( vblur );

  vblur.renderToScreen = true;
  effectBlurY.renderToScreen = true;
  effectFocus.renderToScreen = true;
  effectCopy.renderToScreen = true;
  effectFilm.renderToScreen = true;

};