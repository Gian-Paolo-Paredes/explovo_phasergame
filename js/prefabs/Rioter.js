function Rioter(game, spriteObject, positionX, positionY, mainTravelGoalX, mainTravelGoalY){
   Phaser.Sprite.call(this, game, positionX, positionY, spriteObject.key, spriteObject.frame);
   this.anchor.set(0.5);
   game.physics.enable(this);
   //this.x = this.body.x; //check to see conflict
   //this.y = this.body.y;

   //l("velocityx = " + this.body.velocity.x);
   //l("velocityy = " + this.body.velocity.y);
   //
   this.maxVelocity = 10;

   this.cohesionWeight = null;
   this.cohesionDistance = null;
   this.separationWeight = null;
   this.separationDistance = null;
   this.headingWeight = null;
   this.headingDistance = null;
   this.flockingVector = {x: 0, y: 0};

   this.velocityOverridden = false;
   this.vOverrideType = 0;

   this.primaryGoalX = mainTravelGoalX;
   this.primaryGoalX = mainTravelGoalY;
}
Rioter.prototype = Object.create(Phaser.Sprite.prototype);
Rioter.prototype.constructor = Rioter;
Rioter.prototype.setFlockingVector = function(xFlocking, yFlocking){
   //l("DEBUG: xFlocking = " + xFlocking + ", yFlocking = " + yFlocking); //Works
   this.flockingVector.x = xFlocking;
   this.flockingVector.y = yFlocking;
};
Rioter.prototype.setGoalPoint = function(x, y){
   this.primaryGoalX = x;
   this.primaryGoalX = y;
};
Rioter.prototype.getVelocities = function(){
   //l("getVelocities Called");
   return {x: this.body.velocity.x, y: this.body.velocity.y};
};
Rioter.prototype.velocityOverride = function(type){
   this.velocityOverriden = true;
   if(type == "directToGoal"){
      this.vOverrideType = 1;
   }
   if(type == "random"){
      this.vOverrideType = 2;
   }
   if(type == "freeze"){
      this.vOverrideType = 3;
   }
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

   velX = this.body.velocity.x;
   velY = this.body.velocity.y;
   //l("DEBUG: RIOTER Update Called");//Works

   //this.x = this.body.x; BAD
   //this.y = this.body.y; BAD

   //this.body.velocity.x = 0;
   //this.body.velocity.y = 0;

   //this.body.velocity.x = this.flockingVector.x;
   //this.body.velocity.y = this.flockingVector.y;
   //l("body.velocity.x is: "+ this.body.velocity.x);
   //l("DEBUG: this.flockingVector = "); Returns NaN, NaN
    //l(this.flockingVector);

/*
     this.body.acceleration.x = 20*this.flockingVector.x; //maybe not right method to add velocities
     this.body.acceleration.y = 20*this.flockingVector.y;
*/

   DEBUGTEMPCurrentVelocity = 1; //changed to +=
   //velocityLimit = 1;

   //l("fvx: " + this.flockingVector.x + ", fvy: " + this.flockingVector.y);
   /*
   if(this.velocityOverridden === true){
      if(this.vOverrideType == 1){
         normalizedGoalVector = normalize((this.mainTravelGoalX-this.X),(this.mainTravelGoalY-this.Y));
         this.body.velocity.x = DEBUGTEMPCurrentVelocity*normalizedGoalVector.x;
         this.body.velocity.y = DEBUGTEMPCurrentVelocity*normalizedGoalVector.y;
      }else if(this.vOverrideType == 2){ //random
         this.body.velocityX = velocityLimit;//randInt(velocityLimit, (-1*velocityLimit));
         this.body.velocityY = velocityLimit;//randInt(velocityLimit, (-1*velocityLimit));
      }else if(this.vOverrideType == 3){
         this.body.velocityX = 0;
         this.body.velocityY = 0;
      }
      resetOverride();
   }else{*/
      velX += DEBUGTEMPCurrentVelocity*this.flockingVector.x; //changed to +=
      velY += DEBUGTEMPCurrentVelocity*this.flockingVector.y;
      //l("velocityX: " + this.body.velocity.x + ", velocityY: " + this.body.velocity.y);
   //}

   //this.body.acceleration.x = this.maxVelocity*this.flockingVector.x; //maybe not right method to add velocities
   //this.body.acceleration.y = this.maxVelocity*this.flockingVector.y;
   //
   //

   velocityHyp = Math.sqrt((velX*velX)+(velY*velY));
   if(velocityHyp > this.maxVelocity){
      similarTriangleProportion = this.maxVelocity/velocityHyp;
      velX*=similarTriangleProportion;
      velY*=similarTriangleProportion;
   }

//l("velX: " + velX + ", velY: " + velY);

   this.body.velocity.x = velX;
   this.body.velocity.y = velY;


   function resetOverride(){
      this.vOverrideType = 0;
      this.velocityOverridden = false;
   }
};
