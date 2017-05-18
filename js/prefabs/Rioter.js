function Rioter(game, spriteObject, positionX, positionY){
   Phaser.Sprite.call(this, game, positionX, positionY, spriteObject.key, spriteObject.frame);
   this.anchor.set(0.5);
   game.physics.enable(this);
   //this.x = this.body.x; //check to see conflict
   //this.y = this.body.y;

   //l("velocityx = " + this.body.velocity.x);
   //l("velocityy = " + this.body.velocity.y);
   //
   this.maxVelocity = 200;

   this.cohesionWeight = null;
   this.cohesionDistance = null;
   this.separationWeight = null;
   this.separationDistance = null;
   this.headingWeight = null;
   this.headingDistance = null;
   this.flockingVector = {x: 0, y: 0};
}
Rioter.prototype = Object.create(Phaser.Sprite.prototype);
Rioter.prototype.constructor = Rioter;
Rioter.prototype.setFlockingVector = function(xFlocking, yFlocking){
   //l("DEBUG: xFlocking = " + xFlocking + ", yFlocking = " + yFlocking); //Works
   this.flockingVector.x = xFlocking;
   this.flockingVector.y = yFlocking;
};
Rioter.prototype.getVelocities = function(){
   //l("getVelocities Called");
   return {x: this.body.velocity.x, y: this.body.velocity.y};
};
Rioter.prototype.setFlockingWeights = function(cWeight, sWeight, hWeight){
   this.cohesionWeight = cWeight;
   this.separationWeight = sWeight;
   this.headingWeight = hWeight;
};
Rioter.prototype.setFlockingDistances = function(cDist, sDist, hDist){
   this.cohesionDistance = cDist;
   this.separationDistance = sDist;
   this.headingDistance = hDist;
};
Rioter.prototype.update = function(){
   //l("DEBUG: RIOTER Update Called");Works

   //this.x = this.body.x; BAD
   //this.y = this.body.y; BAD

   //this.body.velocity.x = 0;
   //this.body.velocity.y = 0;

   //this.body.velocity.x = this.flockingVector.x;
   //this.body.velocity.y = this.flockingVector.y;
   //l("body.velocity.x is: "+ this.body.velocity.x);
   //l("DEBUG: this.flockingVector = "); Returns NaN, NaN
    //l(this.flockingVector);


     this.body.acceleration.x = this.flockingVector.x; //maybe not right method to add velocities
     this.body.acceleration.y = this.flockingVector.y;
   //this.body.acceleration.x = this.maxVelocity*this.flockingVector.x; //maybe not right method to add velocities
   //this.body.acceleration.y = this.maxVelocity*this.flockingVector.y;
};
