var b2World        = Box2D.Dynamics.b2World,
    b2FixtureDef   = Box2D.Dynamics.b2FixtureDef,
    b2BodyDef      = Box2D.Dynamics.b2BodyDef,
    b2Body         = Box2D.Dynamics.b2Body,
    b2CircleShape  = Box2D.Collision.Shapes.b2CircleShape,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2Settings     = Box2D.Common.b2Settings,
    b2Vec2         = Box2D.Common.Math.b2Vec2,

    // Box2D world variables
    wWorld,
    wTop,
    wBottom,
    wPlayer,
    wCpu,
    wBall;

var createPhysicsWorld = function() {
  wWorld = new b2World(new b2Vec2(0, 0), true);

  var fixDef = new b2FixtureDef();
  var bodyDef = new b2BodyDef();

  bodyDef.type = b2Body.b2_staticBody; // Paddles are controlled seperately from game physics
  fixDef.density = 1;
  fixDef.friction = 0.0;
  fixDef.resitution = 1;
  fixDef.shape = new b2PolygonShape();

  // Game Walls
  fixDef.shape.SetAsBox(gameDims[0], cpuDims[0]);
  bodyDef.position.Set(0, gameDims[1]/2);
  wTop = wWorld.CreateBody(bodyDef).CreateFixture(fixDef);

  bodyDef.position.Set(0, - gameDims[1]/2);
  wBottom = wWorld.CreateBody(bodyDef).CreateFixture(fixDef);


  // Player
  bodyDef.position.Set(playerStart, playerDims[1]/2);
  fixDef.shape.SetAsBox(playerDims[0], playerDims[1]);
  wPlayer = wWorld.CreateBody(bodyDef);
  wPlayer.CreateFixture(fixDef);

  // CPU
  bodyDef.position.Set(cpuStart, cpuDims[1]/2);
  fixDef.shape.SetAsBox(cpuDims[0], cpuDims[1]);
  wCpu = wWorld.CreateBody(bodyDef);
  wCpu.CreateFixture(fixDef);

  // Add the ball
  bodyDef.type = b2Body.b2_dynamicBody;
  bodyDef.position.Set(0, 0);
  fixDef.shape = new b2CircleShape(ballRadius);
  wBall = wWorld.CreateBody(bodyDef);
  wBall.CreateFixture(fixDef);
  var f = new b2Vec2(wBall.GetMass()*0.25,0);
  wBall.ApplyImpulse(f, wBall.GetPosition());

};

var updatePhysicsWorld = function() {

  // Add CPU setposition etc
  // Add Player setposition etc
  // wBall.ApplyImpulse(f, wBall.GetPosition());          
  keyAxis = [0,0];
  // Take a time step.
  wWorld.Step(1/60, 8, 3);
};